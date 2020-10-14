import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DanceClass } from '@swagex/shared-models';
import {
  DanceClassStoreApi,
  BookedClassPayload
} from '@swagex/sign-up-for-class';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { AngularFireFunctions } from '@angular/fire/functions';
import { StripeService } from 'ngx-stripe';
import { environment } from '../environments/environment';

interface LineItem {
  name: string;
  amount: number;
  currency: string;
  quantity: number;
  images?: string[];
  description?: string;
}
interface StripeCheckoutSession {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class DanceClassesService implements DanceClassStoreApi {
  danceClasses: BehaviorSubject<DanceClass[]> = new BehaviorSubject(null);
  danceClassRef = this.db.collection<DanceClass>('dance-class');

  constructor(
    private db: AngularFirestore,
    private firebaseFunctions: AngularFireFunctions,
    private stripeService: StripeService
  ) {}

  loadClasses(): void {
    this.danceClassRef
      .valueChanges({ idField: 'id' })
      .subscribe((classes: DanceClass[]) => {
        this.danceClasses.next(classes);
      });
  }

  fetchClasses(): Observable<DanceClass[]> {
    return this.danceClasses.asObservable();
  }

  getClass(id: string): Observable<DanceClass> {
    // Need to handle id not found
    const areDanceClassesLoaded = !!this.danceClasses.getValue();
    return areDanceClassesLoaded
      ? this._getClassFromLocalCache(id)
      : this._getClassFromDB(id);
  }

  private _getClassFromLocalCache(id: string): Observable<DanceClass> {
    return this.danceClasses.pipe(
      filter(val => Boolean(val)),
      map((danceClasses: DanceClass[]) => {
        const danceClass = danceClasses.find(
          danceClass => danceClass.id === id
        );
        return danceClass;
      })
    );
  }

  private _getClassFromDB(id: string): Observable<DanceClass> {
    return this.danceClassRef.doc<DanceClass>(id).valueChanges();
  }

  buildLineItem({
    id,
    title,
    bookingDate,
    spaceNumber,
    quantity,
    timeDisplay
  }: BookedClassPayload): LineItem[] {
    const imageUrl = `${environment.webAppUrl}/assets/images/dance-classes/${id}.jpg`;
    const description = `${bookingDate}, ${timeDisplay} - Space Number: ${spaceNumber}`;
    const lineItems = [
      {
        name: title,
        amount: 1500,
        currency: 'usd',
        quantity,
        images: [imageUrl],
        ...(!!description && { description })
      }
    ];
    return lineItems;
  }

  createCheckoutSession(bookedClass: BookedClassPayload) {
    const lineItems = this.buildLineItem(bookedClass);

    const createSession = this.firebaseFunctions.httpsCallable(
      'stripeCheckout'
    );

    createSession({ line_items: lineItems })
      .pipe(
        switchMap(({ id: sessionId }: StripeCheckoutSession) =>
          this.stripeService.redirectToCheckout({ sessionId })
        )
      )
      .subscribe(
        response => console.log('redirectToCheckout response', response),
        err => console.log('redirectToCheckout error', err)
      );
  }
}
