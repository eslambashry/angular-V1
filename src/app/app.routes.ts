import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { HotelDetailsComponent } from './Components/hotel-details/hotel-details.component';

export const routes: Routes = [

    {path:'',component:HomeComponent},
    {path:'hotel-details/:id',component:HotelDetailsComponent},
    {path:'**',component:NotFoundComponent}
];
