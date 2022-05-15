import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/auth/login/login.component';
import { RegisterComponent } from 'src/auth/register/register.component';
import { AccountComponent } from './pages/account/account.component';
import { CitiesComponent } from './pages/cities/cities.component';
import { HomeComponent } from './pages/home/home.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { MyTravelsComponent } from './pages/my-travels/my-travels.component';
import { NewTravelItineraryComponent } from './pages/new-travel-itinerary/new-travel-itinerary.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cities', component: CitiesComponent },
  { path: 'account', component: AccountComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'my-travels', component: MyTravelsComponent },
  { path: 'locations', component: LocationsComponent },
  { path: 'new-travels', component: NewTravelItineraryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
