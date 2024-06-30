import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

//IMPORTAR COMPONENTES
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ErrorComponent} from './components/error/error.component';
import { userGuardGuard } from "./user-guard.guard";
import { CrearCocheComponent } from "./crear-coche/crear-coche.component";
import { ListaCochesComponent } from "./lista-coches/lista-coches.component";
import { LogoutComponent } from "./logout/logout.component";
import { CompararComponent } from './components/comparar/comparar.component';
import { HomeComponent } from './components//home/home.component'; 

const appRoutes: Routes = [
    {path:'',component:LoginComponent},
    {path:'inicio',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent,canActivate:[userGuardGuard]},
    {path:'crearcoche',component:CrearCocheComponent,canActivate:[userGuardGuard]},
    {path:'listadocoches',component:ListaCochesComponent,canActivate:[userGuardGuard]},
    {path: 'comparar', component: CompararComponent,canActivate:[userGuardGuard] },
    {path:'logout',component:LogoutComponent,canActivate:[userGuardGuard]},
    {path:'**', component:ErrorComponent}
]

//EXPORTAR CONFIGURACIÓN
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);