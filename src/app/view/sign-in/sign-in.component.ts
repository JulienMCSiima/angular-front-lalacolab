import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../service/auth.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {


  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  async onSignIn(form: NgForm) {
    const email = form.value['email'];
    const password = form.value['password'];
    try{
      await this.authService.signIn(email, password);
    } catch(e) {
      console.log(e);
    }
  }

 async onSignOut() {
   await this.authService.signOut();
 }

}
