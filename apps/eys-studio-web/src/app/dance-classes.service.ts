import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DanceClass } from '@swagex/shared-models';
import { DanceClassStoreApi } from '@swagex/sign-up-for-class';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, filter } from 'rxjs/operators';

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
}
