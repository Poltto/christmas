import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'main', component: MainComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledNonBlocking',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
