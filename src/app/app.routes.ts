import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { HotelDetailsComponent } from './Components/hotel-details/hotel-details.component';
import { RegisterComponent } from './Components/auth/register/register.component';
import { LoginComponent } from './Components/auth/login/login.component';

export const routes: Routes = [

    {path:'',component:HomeComponent},
    {path:'hotel-details/:id',component:HotelDetailsComponent},
    {path:'register',component:RegisterComponent},
    {path:'login',component:LoginComponent},

    {path:'**',component:NotFoundComponent}
];
