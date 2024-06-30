import { Injectable, Pipe } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { list_coches } from "./global";
import { delete_coche } from "./global";

@Injectable()


export class ListcochesService {
  public url: string
  public url_delete: string


  private _refresh$ = new Subject<void>();
  constructor(

    public _http: HttpClient

  ) {
    this.url = list_coches.url,
    this.url_delete = delete_coche.url


  }
  get refresh$() {
    return this._refresh$;
  }
  test() {
    return "Hola mundo desde un servicio!!";
  }

  getcoches(): Observable<any[]> {


    return this._http.get<any[]>(this.url)

  }

  deletecoche(id: string): Observable<any> {


    return this._http.delete(this.url_delete + id)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      )


  }

 

}
