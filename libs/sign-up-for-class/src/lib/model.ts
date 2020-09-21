import { BehaviorSubject, Observable } from 'rxjs';
import { DanceClass } from '@swagex/shared-models';

export abstract class DanceClassStoreApi {
  danceClasses: Observable<DanceClass[]>;

  loadClasses: () => void;

  fetchClasses: () => Observable<DanceClass[]>;

  getClass: (id: string) => Observable<DanceClass>;
}
