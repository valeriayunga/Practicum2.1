import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {InicioComponent} from "./inicio/inicio.component";
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'inicio', component: InicioComponent},
  {path:'register',component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
