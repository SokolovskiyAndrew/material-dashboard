import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SignupComponent } from './componenets/signup/signup.component';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, SignupComponent],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
