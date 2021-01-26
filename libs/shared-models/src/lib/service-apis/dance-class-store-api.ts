import { Observable } from 'rxjs';
import { DanceClass } from '../dance-class.model';

export abstract class DanceClassStoreApi {
  danceClasses: Observable<DanceClass[]>;

  fetchClasses: () => Observable<DanceClass[]>;

  getClass: (id: string) => Observable<DanceClass>;
}
