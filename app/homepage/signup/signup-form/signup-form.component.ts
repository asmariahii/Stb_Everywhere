import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit{
  signupForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    
  );
  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
    ){}

  ngOnInit(): void {}

  onSubmit(){
    console.log(this.signupForm.value);

    this.httpClient
    .post(
      "https://stb-c54bc-default-rtdb.firebaseio.com/users.json",
     this.signupForm.value
     )
     .subscribe(
      (response) => {
      console.log(response);
      this.signupForm.reset();
      this.router.navigate(["../","login"],{
        relativeTo: this.activatedRoute});
      },
      (error) =>{
        console.log(error);
      }
     );
      
  }
}
