import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CreatecustomerComponent } from './createcustomer/createcustomer.component';
import { FindAllComponent } from './find-all/find-all.component';
import { UpdataComponent } from './updata/updata.component';


const routes: Routes = [
  {path: '',component: LoginComponent},
  {path: 'login',component: LoginComponent},
  {path: 'home',component: HomeComponent},
  {path: 'find-all',component: FindAllComponent},
  {path: 'createcustomer',component: CreatecustomerComponent},
  {path: 'updata',component: UpdataComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    enableTracing: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
