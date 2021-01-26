import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private firebaseFunctions: AngularFireFunctions) {}

  createSession(data): Observable<{ id: string }> {
    return this.firebaseFunctions.httpsCallable('stripeCheckout')(data);
  }
}
