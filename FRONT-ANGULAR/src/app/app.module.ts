import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CookieService } from 'ngx-cookie-service';
import { CrearCocheComponent } from './crear-coche/crear-coche.component';
import { ListaCochesComponent } from './lista-coches/lista-coches.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import {MatDialogModule} from '@angular/material/dialog';
import { LogoutComponent } from './logout/logout.component';
import { PopUpLoginComponent } from './pop-up-login/pop-up-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CompararComponent } from './components/comparar/comparar.component';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    CrearCocheComponent,
    ListaCochesComponent,
    PopUpComponent,
    LogoutComponent,
    PopUpLoginComponent,
    CompararComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [
    appRoutingProviders,
    CookieService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
