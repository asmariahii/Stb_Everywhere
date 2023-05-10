import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface UserProfile {
  flName: string;
  image: string;
  bio: string;
}

@Component({
  selector: 'app-espace-client',
  templateUrl: './espace-client.component.html',
  styleUrls: ['./espace-client.component.css']
})
export class EspaceClientComponent implements OnInit {
  isLoggedIn: boolean = false;
  isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches)
  );

  Uid: string | undefined;
  dataProfile: UserProfile = {
    flName: '',
    image: '',
    bio: ''
  };
  name: string | undefined;

  constructor(
    private as: AuthService,
    private breakpointObserver: BreakpointObserver,
    private fs: AngularFirestore,
    private router: Router
  ) {
    this.as.user.subscribe((user) => {
      if (user) {
        this.Uid = user.uid;
      }
    });
  }

  ngOnInit(): void {
    this.fs.collection("users").ref.doc(localStorage.getItem("userConnect") || '').get().then((doc) => {
      const data = doc.data() as UserProfile;
      console.log(data);
      this.dataProfile.flName = data?.flName ?? '';
      this.dataProfile.image = data?.image ?? '';
      this.dataProfile.bio = data?.bio ?? '';
    });
  }

  showCode: boolean = true;

  hideCode() {
    this.showCode = false;
  }

  logout() {
    this.as.signOut();
    this.router.navigate(['/home']);
  }
}
