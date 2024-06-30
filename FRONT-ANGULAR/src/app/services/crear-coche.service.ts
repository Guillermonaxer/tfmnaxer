import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { crear_coche } from "./global";

@Injectable({
  providedIn: 'root'
})
export class CrearCocheService {
  private apiUrl = crear_coche.url;

  constructor(private http: HttpClient) { }

  crearCoche(imageData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, imageData);
  }
}