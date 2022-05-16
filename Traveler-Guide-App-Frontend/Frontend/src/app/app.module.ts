import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { CitiesComponent } from './pages/cities/cities.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AccountComponent } from './pages/account/account.component';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { GoogleMapsModule } from '@angular/google-maps';
import { LocationsComponent } from './pages/locations/locations.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MyTravelsComponent } from './pages/my-travels/my-travels.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { TravelItinerariesComponent } from './components/travel-itinerary-components/travel-itineraries/travel-itineraries.component';
import { TravelsSearchComponent } from './components/travel-itinerary-components/travels-search/travels-search.component';
import { AddNewTravelComponent } from './components/travel-itinerary-components/add-new-travel/add-new-travel.component';
import { TravelService } from './services/travel-service';
import { MatDialogModule } from '@angular/material/dialog';
import { NewTravelItineraryComponent } from './pages/new-travel-itinerary/new-travel-itinerary.component';
import { MatStepperModule } from '@angular/material/stepper';
import { CreateTravelItineraryComponent } from '../app/components/new-travel-components/create-travel-itinerary/create-travel-itinerary.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ViewTravelComponent } from './components/travel-itinerary-components/view-travel/view-travel.component';
import { MyFilterPipe } from './components/travel-itinerary-components/travel-itineraries/filter-pipe';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cities', component: CitiesComponent },
  { path: 'account', component: AccountComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'my-travels', component: MyTravelsComponent },
  { path: 'locations', component: LocationsComponent },
  { path: 'new-travel', component: NewTravelItineraryComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CitiesComponent,
    AccountComponent,
    LoginComponent,
    RegisterComponent,
    LocationsComponent,
    MyTravelsComponent,
    TravelItinerariesComponent,
    TravelsSearchComponent,
    AddNewTravelComponent,
    NewTravelItineraryComponent,
    CreateTravelItineraryComponent,
    ViewTravelComponent,
    MyFilterPipe,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    GoogleMapsModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatDialogModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [RouterModule],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    TravelService,
    MatDatepickerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
