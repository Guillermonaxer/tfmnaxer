import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from '@angular/common/http';
import{Observable} from'rxjs';
import {global_register } from "./global";


@Injectable()


export class UserService{
url: any;

constructor(

    public _http:HttpClient,
    

){
   this.url = global_register.url
}
test(){
    return "Hola mundo desde un servicio!!";
}

register(user: any): Observable<any> {

    let json = JSON.stringify(user);
    let params = 'json=' + json;
    console.log("adios");

    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this._http.post(this.url, json, { headers: headers })



}


}