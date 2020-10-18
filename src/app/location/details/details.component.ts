import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocationService } from 'src/app/services/location.service';
import { Location } from '../../models/location';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  location: Location;
  locationId: string;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private locationService: LocationService) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params.id);
      this.locationId = params.id;
    });

    this.subscription = this.locationService.getLocationById(this.locationId).subscribe(data => {
      this.location = data;
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.subscription.unsubscribe();
  }

}
