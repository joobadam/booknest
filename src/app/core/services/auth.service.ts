import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { User } from '../models/user.model';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.doc<User>(`users/${user.uid}`).valueChanges().pipe(
            map(userData => userData ?? null)
          );
        } else {
          return of(null);
        }
      })
    );
  }

  async signIn(email: string, password: string): Promise<void> {
    const credential = await this.afAuth.signInWithEmailAndPassword(email, password);
    if (credential.user) {
      const userRef = this.firestore.doc(`users/${credential.user.uid}`);
      const userSnapshot = await userRef.get().toPromise();
      if (!userSnapshot?.exists) {
        await userRef.set({
          uid: credential.user.uid,
          email: credential.user.email,
          isAdmin: false 
        });
      }
    }
  }

  async signOut(): Promise<void> {
    await this.afAuth.signOut();
  }

  isLoggedIn(): Observable<boolean> {
    return this.user$.pipe(
      map(user => {
        const isLoggedIn = !!user;
        console.log('User login state:', isLoggedIn);
        return isLoggedIn;
      })
    );
  }

  isAdmin(): Observable<boolean> {
    return this.user$.pipe(map(user => user?.isAdmin ?? false));
  }

  async signUp(email: string, password: string): Promise<void> {
    try {
      const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      if (credential.user) {
        await this.firestore.doc(`users/${credential.user.uid}`).set({
          uid: credential.user.uid,
          email: credential.user.email,
          isAdmin: false
        });
      }
    } catch (error) {
      console.error('Hiba a regisztráció során:', error);
      throw error;
    }
  }
}