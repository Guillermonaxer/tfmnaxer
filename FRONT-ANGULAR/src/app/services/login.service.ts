import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import{Observable} from'rxjs';
import {User} from '../models/user';
import { global_login } from "./global";

@Injectable({
  providedIn: 'root'
})

  export class LoginService{
    public url:string
    constructor(
    
        public _http:HttpClient
    
    ){this.url = global_login.url
    
    }
    test(){
        return "Hola mundo desde un servicio!!";
    }
    
    login(login: any):Observable<any>{
    let json= JSON.stringify(login);
    let params = 'json='+json;
    console.log(json);
    let headers = new HttpHeaders().set('Content-Type', 'application/json',);
    
    return this._http.post(this.url, json, {headers:headers})


    
    }
    
    }