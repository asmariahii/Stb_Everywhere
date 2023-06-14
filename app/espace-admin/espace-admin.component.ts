import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-espace-admin',
  templateUrl: './espace-admin.component.html',
  styleUrls: ['./espace-admin.component.css']
})
export class EspaceAdminComponent implements OnInit {
  successUpdate: boolean = false;
  task!: AngularFireUploadTask;
  ref!: AngularFireStorageReference;
  percentages: any;
  uploadProgress: number | undefined;
  uploadCompleted: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      if (user) {
        // Utilisateur connecté, redirection vers la consultation du compte actif
        this.router.navigate(['users']); // Remplacez 'account' par le chemin de la consultation du compte actif
      } else {
        // Utilisateur déconnecté, restez sur la page actuelle
      }
    });  }
  
}
