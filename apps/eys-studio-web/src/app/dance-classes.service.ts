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

  constructor(private db: AngularFirestore) {
    this.loadClasses();
  }

  loadClasses(): void {
    this.db
      .collection<DanceClass>('dance-class')
      .valueChanges({ idField: 'id' })
      .subscribe((classes: DanceClass[]) => {
        console.log(classes);
        this.danceClasses.next(classes);
      });
  }

  getClass(id: string): Observable<DanceClass> {
    return this.danceClasses.pipe(
      filter(val => Boolean(val)),
      map((danceClasses: DanceClass[]) => {
        console.log('getClass', id, danceClasses);
        const danceClass = danceClasses.find(
          danceClass => danceClass.id === id
        );
        console.log(danceClass);
        return danceClass;
      })
    );
  }

  fetchClasses(): Observable<DanceClass[]> {
    return this.danceClasses.asObservable();
  }
}
