import { Component } from '@angular/core';
import { User } from './models/user'
import { AuthService } from './service/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-front-lalacolab';
  user : User;
  authStatus : boolean;

  constructor(
   private authService: AuthService,
   private router: Router) {}

 ngOnInit() {
   this.authStatus = this.authService.isSignedIn();
   this.user = this.authService.getUserDetails();
   this.authService.change.subscribe(
     () => {
     console.log('Sign in successful!');
     console.log(this.authService.isSignedIn());
     this.user = this.authService.getUserDetails();
     this.authStatus = this.authService.isSignedIn();
   })
 }
}
