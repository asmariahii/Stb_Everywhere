import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface UserData {
  rib: string;
  cin: string
  // Ajoutez ici d'autres propriétés utilisateur si nécessaire
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User | null>;

  constructor(private afAuth: AngularFireAuth, private router: Router, private fs: AngularFirestore) {
    this.user = this.afAuth.user;
  }

  signUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async getUID(): Promise<string> {
    const user = await this.afAuth.currentUser;
    return user?.uid ?? '';
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['/']); // Navigate to home page after sign out
    });
  }
  getUser(): Observable<any> {
    return this.afAuth.user;
  }
  async getUserEmail(): Promise<string | null> {
    const user = await this.afAuth.currentUser;
    return user?.email ?? null;
  }

  async getUserCin(): Promise<string | null> {
    const user = await this.afAuth.currentUser;
    if (user) {
      const userDoc = await this.fs.collection('users').doc(user.uid).get().toPromise();
      if (userDoc && userDoc.exists) {
        const userData = userDoc.data() as UserData;
        return userData && userData.cin ? userData.cin : null;
      }
    }
    return null;
  }
  
  async getUserRib(): Promise<string | null> {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        const userDoc = await this.fs.collection('users').doc(user.uid).get().toPromise();
        if (userDoc && userDoc.exists) {
          const userData = userDoc.data() as UserData;
          const rib = userData && userData.rib ? userData.rib : null;
          return rib;
        }
      }
      return null;
    } catch (error) {
      console.error('Error retrieving user RIB:', error);
      return null;
    }
  }
}
