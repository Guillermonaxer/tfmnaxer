import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpLoginComponent } from 'src/app/pop-up-login/pop-up-login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public login: Login;
  public errorMessage: string = '';

  constructor(
    private _LoginService: LoginService,
    public cookieService: CookieService,
    private dialogRef: MatDialog,
    private router: Router,
  ) {
    this.login = new Login('', '');
  }

  ngOnInit() {
    console.log('LoginComponent initialized');
  }

  openDialog() {
    this.dialogRef.open(PopUpLoginComponent);
  }

  onSubmit(form: any) {
    this._LoginService.login(this.login).subscribe(
      {
        next: response => {
          console.log(response);

          // Guardamos el token en las cookies (con nombre token).
          this.cookieService.set('token', response.token);
          this.cookieService.set('username', response.username);
          form.reset();
          this.openDialog();
          this.router.navigate(['/listadocoches']);
        },
        error: error => {
          console.log(<any>error);
          this.errorMessage = 'Datos incorrectos';
        }
      }
    );
  }
}
