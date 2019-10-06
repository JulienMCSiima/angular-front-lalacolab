import { User } from '../models/user';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() change: EventEmitter<any> = new EventEmitter();
  private token: string;
  readonly endpoint = 'http://localhost:23196/siima/users';
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private httpClient : HttpClient, private router: Router) {}

  isAuth = false;

  public async signIn( email : string , password: string ): Promise<void> {
    const credentials = ({
      email: email,
      pwd: password,
    });
    console.log(credentials);
    this.httpClient
      .post(this.endpoint + "/signin", credentials)
      .subscribe(
          (response) => {
          this.saveToken(response["token"]);
          this.change.emit(null);
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
    this.isAuth = true;
  }

  public signUp( username: string, email:string , password: string ) {
    return this.httpClient
      .post(this.endpoint + "/" , JSON.stringify({username : username, mail: email, password: password }));
  }

  private saveToken(token: string): void {
    console.log(token);
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public getUserDetails(): User {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public signOut(): void {
    const user = this.getUserDetails();
    this.httpClient.get(this.endpoint + "/" + user._id  + "/signout", { headers: { Authorization: `Bearer ${this.getToken()}`}} ).subscribe(
        (response) => {
        this.isAuth = false;
        this.token = '';
        window.localStorage.removeItem('mean-token');
        this.change.emit(null);
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }

  public isSignedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.expirationDate > Date.now() / 1000;
    } else {
      return false;
    }
  }
}
