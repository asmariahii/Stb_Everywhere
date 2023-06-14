import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup } from '@angular/forms';


interface UserProfile {
  flName: string;
  image: string;
  telephone: string;
  email: string;
  region: string;
  uid:string;
  rib:string;
  accountType: string; // Déclaration de la variable accountType
}

@Component({
  selector: 'app-espace-client',
  templateUrl: './espace-client.component.html',
  styleUrls: ['./espace-client.component.css']
})
export class EspaceClientComponent implements OnInit {
  showForm: boolean = false;

  infoForm: FormGroup;
currentUser: any; // Variable pour stocker les données utilisateur actuelles

  isLoggedIn: boolean = false;
  isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches)
  );

  Uid: string | undefined;
  dataProfile: UserProfile = {
    flName: '',
    image: 'https://previews.123rf.com/images/salamatik/salamatik1801/salamatik180100019/92979836-ic%C3%B4ne-de-visage-anonyme-de-profil-personne-silhouette-grise-avatar-par-d%C3%A9faut-masculin-photo.jpg',
    telephone: '',
    email: '',
    region: '',
    uid:'',
    rib:'',
    accountType:''
  };
  name: string | undefined;
  successUpdate: boolean = false;
  task!: AngularFireUploadTask;
  ref!: AngularFireStorageReference;
  percentages: any;
  uploadProgress: number | undefined;
  uploadCompleted: boolean = false;


  constructor(
    private as: AuthService,
    private breakpointObserver: BreakpointObserver,
    private fs: AngularFirestore,
    private router: Router,
    private fst: AngularFireStorage,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {
    this.as.user.subscribe((user) => {
      if (user) {
        this.Uid = user.uid;
      }
    });
    this.infoForm = this.formBuilder.group({
      telephone: '',
      adresse: ''
    });
  }

  ngOnInit(): void {
    this.fs.collection("users").ref.doc(localStorage.getItem("userConnect") || '').get().then((doc) => {
      const data = doc.data() as UserProfile;
      console.log(data);
      this.dataProfile.flName = data?.flName ?? '';
      this.dataProfile.image = data?.image ?? 'https://previews.123rf.com/images/salamatik/salamatik1801/salamatik180100019/92979836-ic%C3%B4ne-de-visage-anonyme-de-profil-personne-silhouette-grise-avatar-par-d%C3%A9faut-masculin-photo.jpg';
      this.dataProfile.telephone = data?.telephone ?? '';
      this.dataProfile.email = data?.email ?? '';
      this.dataProfile.region = data?.region ?? '';

      this.dataProfile.uid = localStorage.getItem("userConnect") ?? ''; // Update the UID value with fallback
      this.dataProfile.rib = data?.rib ?? '';

    });
    

    this.authService.getUser().subscribe(user => {
      if (user) {
        // Utilisateur connecté, redirection vers la consultation du compte actif
        this.router.navigate(['account']); // Remplacez 'account' par le chemin de la consultation du compte actif
      } else {
        // Utilisateur déconnecté, restez sur la page actuelle
      }
    });
  }

  showCode: boolean = true;

  hideCode(): void {
    this.showCode = false;
  }
  saveProfile() {
    if (this.infoForm.valid) {
      const updatedProfile = {
        telephone: this.infoForm.value.telephone,
        adresse: this.infoForm.value.adresse
      };
  
      this.fs.collection("users").doc(this.dataProfile.uid).update(updatedProfile)
        .then(() => {
          console.log("Profile updated successfully!");
          // Display a success message or redirect the user if needed
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
          // Display an error message to the user
        });
    }
  }
  

  logout(): void {
    this.as.signOut();
    this.router.navigate(['/home']);
  }

  uploadImage(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
  
    if (file) {
      const id = Math.random().toString(36).substring(2);
      const filePath = `user-profiles/${this.dataProfile.uid}/${id}`;
      this.ref = this.fst.ref(filePath);
      this.task = this.ref.put(file);
      this.uploadProgress = 0;
  
      console.log('UID:', this.dataProfile.uid); // Check the UID value
  
      this.task.percentageChanges().subscribe((percentage) => {
        if (percentage) {
          this.uploadProgress = Math.round(percentage);
          console.log('Upload Progress:', this.uploadProgress); // Check the upload progress
          if (this.uploadProgress === 100) {
            this.task.then((snapshot) => {
              snapshot.ref.getDownloadURL().then((url) => {
                this.dataProfile.image = url;
                console.log('Image URL:', this.dataProfile.image); // Check the image URL
                this.fs.collection('users').doc(this.dataProfile.uid).update({
                  image: url
                }).then(() => {
                  console.log('Image updated successfully!');
                }).catch((error) => {
                  console.error('Error updating image:', error);
                });
              });
            });
          }
        }
      });
    }
  }
  saveInfo() {
    if (this.infoForm.valid) {
      const updatedInfo = {
        telephone: this.infoForm.value.telephone,
        adresse: this.infoForm.value.adresse
      };
  
      this.fs.collection("users").doc(this.dataProfile.uid).update(updatedInfo)
        .then(() => {
          console.log("Informations mises à jour avec succès !");
          // Afficher un message de succès ou rediriger l'utilisateur si nécessaire
        })
        .catch((error) => {
          console.error("Erreur lors de la mise à jour des informations :", error);
          // Afficher un message d'erreur à l'utilisateur
        });
    }
  }
  
  cancelInfo() {
    // Réinitialiser les valeurs du formulaire avec les données utilisateur actuelles
    this.infoForm.patchValue({
      telephone: this.currentUser.telephone,
      adresse: this.currentUser.adresse
    });
  }
  
  
  
  
  }      

 
  

