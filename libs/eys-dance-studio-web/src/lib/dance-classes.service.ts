import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DanceClass, DanceClassStoreApi } from '@swagex/shared-models';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, filter, take, switchMap, tap } from 'rxjs/operators';

interface StripeCheckoutSession {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class DanceClassesService implements DanceClassStoreApi {
  danceClasses: BehaviorSubject<DanceClass[]> = new BehaviorSubject(null);
  danceClassRef = this.db.collection<DanceClass>('dance-class');

  constructor(private db: AngularFirestore) {}

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
    return this.danceClasses.asObservable().pipe(
      take(1),
      filter(val => Boolean(val)),
      switchMap((danceClasses: DanceClass[]) => {
        const danceClass = danceClasses.find(
          danceClass => danceClass.id === id
        );
        return of(danceClass);
      })
    );
  }

  private _getClassFromDB(id: string): Observable<DanceClass> {
    return this.danceClassRef
      .doc<DanceClass>(id)
      .valueChanges()
      .pipe(
        take(1),
        map((danceClass: DanceClass) => {
          danceClass.id = id;
          return danceClass;
        })
      );
  }
}
