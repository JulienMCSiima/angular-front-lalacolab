import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../service/auth.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  private signUpErrorMessage : string | undefined =  undefined;
  private email : string;
  private password : string;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  async onSignIn(form: NgForm) {
    this.signUpErrorMessage = undefined;
    this.email = form.value['email'];
    this.password = form.value['password'];
    try{
      await this.authService.signIn(this.email, this.password);
    } catch(e) {
      console.log(e);
      this.signUpErrorMessage = e.message;
    }
  }

 async onSignOut() {
   await this.authService.signOut();
 }

}
