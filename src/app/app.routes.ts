import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { HotelDetailsComponent } from './Components/hotel-details/hotel-details.component';
import { RegisterComponent } from './Components/auth/register/register.component';
import { LoginComponent } from './Components/auth/login/login.component';
import { BookingComponent } from './Components/booking/booking.component';
import { authGuard } from './guards/auth.guard';
import { AddHotelComponent } from './Components/add-hotel/add-hotel.component';
import { hostGuard } from './guards/Host/host.guard';
import { FavoritesComponent } from './Components/favorites/favorites.component';

export const routes: Routes = [

    {path:'',component:HomeComponent},
    {path:'hotel-details/:id',component:HotelDetailsComponent},
    {path:'register',component:RegisterComponent},
    {path:'login',component:LoginComponent},
    {path:'booking',component:BookingComponent,canActivate:[authGuard]},
    {path:'add',component:AddHotelComponent,canActivate:[hostGuard]},
    {path:'favorites',component:FavoritesComponent},


    {path:'**',component:NotFoundComponent}
];
    