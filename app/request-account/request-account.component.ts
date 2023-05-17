import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

interface UserProfile {
  accountType: string;
  solde: string;
  rib: string;
 
}


@Component({
  selector: 'app-request-account',
  templateUrl: './request-account.component.html',
  styleUrls: ['./request-account.component.css']
})
export class RequestAccountComponent implements OnInit {
///listAccount = [{ "accountId" : "1","numCompte" : "1001406030788","solde":"1000","typeCompte":"Compte Cheque","rib":"10404100140603078855"},

Uid: string | undefined;
dataProfile: UserProfile = {
  solde: '10.000',
  accountType: '',
  rib:'',


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
    this.dataProfile.solde = data?.solde ?? '10.000';
    this.dataProfile.accountType = data?.accountType ?? '10.000';
    this.dataProfile.rib = data?.rib ?? '';


    
 
    

  });
}


}


