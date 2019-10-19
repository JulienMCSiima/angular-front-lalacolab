import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../service/auth.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  async onSignUp(form: NgForm) {
    const email = form.value['email'];
    const name = form.value['name'];
    const cpassword = form.value['cpassword'];
    const password = form.value['password'];
    if (password === cpassword){
      try{
        await this.authService.signUp(name, email, password);
      } catch(e) {
        console.log(e);
      }
    }
  }


}
