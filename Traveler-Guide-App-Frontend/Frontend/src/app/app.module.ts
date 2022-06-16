import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import CitiesComponent from './components/CreateUpdatePageComponents/add-or-remove-locations/cities.component';
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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MyTravelsComponent } from './pages/my-travels/my-travels.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { TravelItinerariesComponent } from './components/MyTravelsPageComponents/travel-itineraries/travel-itineraries.component';
import { TravelsSearchComponent } from './components/MyTravelsPageComponents/travels-search/travels-search.component';
import { AddNewTravelComponent } from './components/MyTravelsPageComponents/add-new-travel/add-new-travel.component';
import { TravelService } from './services/travel.service';
import { MatDialogModule } from '@angular/material/dialog';
import NewTravelItineraryComponent from './pages/create-update-travel-itinerary/new-travel-itinerary.component';
import { MatStepperModule } from '@angular/material/stepper';
import { CreateTravelItineraryComponent } from './components/CreateUpdatePageComponents/create-travel-itinerary/create-travel-itinerary.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ViewTravelComponent } from './components/MyTravelsPageComponents/view-travel/view-travel.component';
import { MyFilterPipe } from './components/MyTravelsPageComponents/travel-itineraries/filter-pipe';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { GetInfoFromIdService } from './services/get-info-from-id.service';
import { SettingsService } from './services/settings.service';
import { DatePipe } from '@angular/common';
import { UpdateTravelService } from './services/update-travel.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { LocationsTableComponent } from './components/CreateUpdatePageComponents/locations-table/locations-table.component';
import { FinishTravelItineraryComponent } from './components/FinishTravelItinerary/finish-travel-itinerary/finish-travel-itinerary.component';
import { LottieModule } from 'ngx-lottie';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { LocationsDirectionsComponent } from './pages/locations-directions/locations-directions.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'account', component: AccountComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'my-travels', component: MyTravelsComponent },
  { path: 'new-travel', component: NewTravelItineraryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'showRoutes', component: LocationsDirectionsComponent }
];
export function playerFactory(): any {
  return import('lottie-web');
}

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
    MyTravelsComponent,
    TravelItinerariesComponent,
    TravelsSearchComponent,
    AddNewTravelComponent,
    NewTravelItineraryComponent,
    CreateTravelItineraryComponent,
    ViewTravelComponent,
    MyFilterPipe,
    LocationsTableComponent,
    FinishTravelItineraryComponent,
    LocationsDirectionsComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
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
    GooglePlaceModule,
    MatSnackBarModule,
    MatTableModule,
    CommonModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatSortModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  exports: [RouterModule],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    TravelService,
    GetInfoFromIdService,
    SettingsService,
    UpdateTravelService,
    MatDatepickerModule,
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
