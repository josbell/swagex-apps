import { Inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  BookedClassPayload,
  DanceClass,
  DanceClassStoreApi,
  LineItem
} from '@swagex/shared-models';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, filter, switchMap, tap } from 'rxjs/operators';
import { AngularFireFunctions } from '@angular/fire/functions';
import { StripeService } from 'ngx-stripe';
import { WindowRefService } from '@swagex/utils';

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
    private stripeService: StripeService,
    private windowService: WindowRefService,
    @Inject('environment') private environment: any
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
    classDate,
    spaceNumber,
    timeDisplay
  }: BookedClassPayload): LineItem[] {
    const imageUrl = `${this.environment.webAppUrl}/assets/images/dance-classes/${id}.jpg`;
    const description = `${classDate}, ${timeDisplay} - Space Number: ${spaceNumber}`;
    const lineItems = [
      {
        name: title,
        amount: 1500,
        currency: 'usd',
        quantity: 1,
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

    const successRoute = 'payment-succeeded';
    const cancelRoute = `classes/${bookedClass.id}/book`;
    const customerEmail = bookedClass.studentDetails.email;
    const metadata = {
      danceClassId: bookedClass.id,
      danceClassTitle: bookedClass.title,
      danceClassTime: bookedClass.timeDisplay,
      danceClassDate: bookedClass.classDate,
      spaceNumber: bookedClass.spaceNumber,
      ...bookedClass.studentDetails
    };

    createSession({
      lineItems,
      successRoute,
      cancelRoute,
      customerEmail,
      metadata
    })
      .pipe(
        switchMap(({ id: sessionId }: StripeCheckoutSession) => {
          let confirmationCache = {
            spaceNumber: bookedClass.spaceNumber,
            danceClassTitle: bookedClass.title,
            danceClassDate: bookedClass.classDate,
            danceClassTime: bookedClass.timeDisplay
          };
          this.windowService.nativeWindow.localStorage.setItem(
            sessionId,
            JSON.stringify(confirmationCache)
          );
          return this.stripeService.redirectToCheckout({ sessionId });
        })
      )
      .subscribe(
        response => console.log('redirectToCheckout response', response),
        err => console.log('redirectToCheckout error', err)
      );
  }
}
