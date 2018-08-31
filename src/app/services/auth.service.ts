import { of, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { auth } from 'firebase/app';

@Injectable()
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private http: HttpClient
  ) {}
  public login(): Promise<string> {
    const provider = new auth.GoogleAuthProvider();
    return new Promise((resolve, reject) => {
      this.oAuthLogin(provider)
        .then(uc => {
          resolve(uc.user.displayName);
        })
        .catch(e => reject(e));
    });
  }

  private oAuthLogin(provider): Promise<auth.UserCredential> {
    const promise = this.afAuth.auth.signInWithPopup(provider);
    promise.then(credential => {
      this.updateUserData(credential.user);
    });
    return promise;
  }

  private updateUserData(user) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data, { merge: true });
  }

  public logout(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  public testFunctions() {
    this.afAuth.idToken.subscribe(token => {
      console.log('okej, kao imam token ', token);
      this.http
        .get('https://us-central1-fitlog-fc6be.cloudfunctions.net/app/', {
          headers: { authorization: 'Bearer ' + token }
        })
        .subscribe(
          data => {
            console.log('got back data', data);
          },
          error => {
            console.log('got back error', error);
          }
        );
    });
  }
}
