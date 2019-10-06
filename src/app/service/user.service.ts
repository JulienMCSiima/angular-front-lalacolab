import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly endpoint = 'http://localhost:23196/siima/users';
  readonly httpOptions = {
    headers: {
      'Content-Type':  'application/json',
       Authorization: `Bearer ${this.authService.getToken()}`
     }
  };

  constructor(private httpClient:HttpClient , private authService : AuthService) {}

  //modify the a user info
  // modifictication is a json with  the field you need to modifie and there new value
  public async modifyUser( modification: any , idUser:String ){
    let promise = new Promise((resolve, reject) => {
      this.httpClient
        .patch(this.endpoint + "/" + idUser, modification ,  this.httpOptions)
        .subscribe((response) => {
          resolve(response);
        },(error) => {
          console.log('ERROR : ' + error);
          reject(error);
        }
        );
    });
    return promise;
  }

  // create a new user associate to the given user
  //info is a json with the name field and creator with the user id
  public async createUser( info: any ){
    let promise = new Promise((resolve, reject) => {
      this.httpClient
        .post(this.endpoint + "/", info , this.httpOptions)
        .subscribe((response) => {
          resolve(response);
        },(error) => {
          console.log('ERROR : ' + error);
          reject(error);
        }
        );
    });
    return promise;
  }

  //delete the user
  //idAdmin is the user who want to delete this user
  public async deleteUser(idUser : String){
    let promise = new Promise((resolve, reject) => {
      this.httpClient
        .delete(this.endpoint + "/" +idUser, this.httpOptions)
        .subscribe((response) => {
          resolve(response);
        },(error) => {
          console.log('ERROR : ' + error);
          reject(error);
        }
        );
    });
    return promise;
  }

  //return all the info of the user
  //idUser is the id of the user
  public async getUser(idUser : String){
    let promise = new Promise((resolve, reject) => {
    this.httpClient
        .get(this.endpoint + "/" +idUser, this.httpOptions)
        .subscribe((response) => {
          resolve(response);
        },(error) => {
          console.log('ERROR : ' + error);
          reject(error);
        }
        );
    });
    return promise;
  }

  //return the profilePicture
  // the id is the id of the user which you want the profile picture from
  public async getUserProfilePicture(idUser : String){
    let promise = new Promise( async (resolve, reject) => {
      this.httpClient.get(this.endpoint +'/'+ idUser +'/profile_picture' ,{ responseType: 'blob' }).subscribe(async (data : Blob) => {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
          resolve(reader.result);
        }, false);
        if (data) {
          reader.readAsDataURL(data);
        }
      }, error => {
        reject(error);
      });
    });
    return promise;
  }


    //change the profile picture
    //selectedFile is the directory, name is the name of the file and the id the id of the user
  public async setUserProfilePicture(selectedFile : File ,idUser : String) {
    let promise = new Promise( async (resolve, reject) => {
      const uploadData = new FormData();
      uploadData.append('file',selectedFile);
      uploadData.append('mediaType','picture');
      var httpOptionsMedia = {
        headers: {
           Authorization: `Bearer ${this.authService.getToken()}`
         }
      };
      return this.httpClient.put(this.endpoint+'/'+ idUser +'/profile_picture', uploadData,httpOptionsMedia).subscribe(event => {
        resolve(event);
      },(error)=>{
        reject(error);
      });
    });
    return promise;
  }

  //query a specific list of user using fields
  //query represent the fields, page is the number of page
  // and limit is the number of element for each page
  public async queryUser(query:any,page: any,limit: any){
    var parameterType = ["mail","name"];
    let promise = new Promise((resolve, reject) => {
      var param = "?";
      var cmp = 0;
      for(var element of parameterType){
        cmp = cmp +1;
        if(query[element]!=undefined){
          param +=  element + "=" + query[element];
        }
        param += "&";

      }
      param += "page="+String(page);
      param += "&limit"+String(limit);
      this.httpClient
          .get(this.endpoint + param, this.httpOptions)
          .subscribe((response) => {
            resolve(response);
      });
    });
    return promise;
  }

}
