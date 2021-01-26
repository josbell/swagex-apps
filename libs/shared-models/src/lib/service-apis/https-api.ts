import { Observable } from 'rxjs';

export abstract class HttpsApi {
  createSession: (data) => Observable<{ id: string }>;
}
