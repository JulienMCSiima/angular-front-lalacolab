import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../service/auth.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  private signUpErrorMessage : string | undefined =  undefined;
  private email : string;
  private name : string;
  private cpassword : string;
  private password : string;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  async onSignUp(form: NgForm) {
    this.signUpErrorMessage =  undefined;
    this.email = form.value['email'];
    this.name = form.value['name'];
    this.cpassword = form.value['cpassword'];
    this.password = form.value['password'];
    if (this.password === this.cpassword){
      try{
        await this.authService.signUp(this.name, this.email, this.password);
      } catch(e) {
        console.log(e);
        this.signUpErrorMessage = e.message;
      }
    }
  }


}
