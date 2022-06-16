import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { UpdateTravelService } from 'src/app/services/update-travel.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-finish-travel-itinerary',
  templateUrl: './finish-travel-itinerary.component.html',
  styleUrls: ['./finish-travel-itinerary.component.css']
})
export class FinishTravelItineraryComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/lottie-animations/finish-travel-itinerary.json'
  };
  @Output('resetStepper') resetStepper: EventEmitter<any> = new EventEmitter<any>();
  constructor(private updateTravelService: UpdateTravelService,
    private router: Router) { }

  ngOnInit(): void {
  }
  onAnimate(animationItem: AnimationItem): void {
  }
  viewYourTravels() {
    this.updateTravelService.setTravelId(0);
    this.updateTravelService.setTravelInfo('', new Date())
    this.router.navigate(['../my-travels']);
  }

}
