import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-espace-client',
  templateUrl: './espace-client.component.html',
  styleUrls: ['./espace-client.component.css']
})
export class EspaceClientComponent implements OnInit{

  isLoggedIn: boolean = false;
  isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private auth: AuthService, private breakpointObserver: BreakpointObserver) {}


  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }
  showCode: boolean = true;

  hideCode() {
    this.showCode = false;
  }
}
 



