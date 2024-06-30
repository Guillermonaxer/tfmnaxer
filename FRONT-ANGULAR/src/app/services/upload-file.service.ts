import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { crear_coche } from "./global";

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = crear_coche.url; // Asegúrate de que crear_coche.url contenga la URL correcta
  }

  test(): string {
    return "Hola mundo desde un servicio!!";
  }

  uploadFile(file: any): Observable<any> {
    let json = JSON.stringify(file); // Convierte el objeto file a JSON
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    return this._http.post(this.url, json, { headers: headers });
  }
}
