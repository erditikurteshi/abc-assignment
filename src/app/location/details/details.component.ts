import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocationService } from 'src/app/services/location.service';
import { Location } from '../../models/location';
declare var google: any;
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
  lat: number;
  lng: number;

  constructor(private route: ActivatedRoute, private locationService: LocationService, private router: Router) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.locationId = params.id;
    });

    this.subscription = this.locationService.getLocationById(this.locationId).subscribe(data => {
      this.location = data;
      this.lat = parseFloat(data.latitude);
      this.lng = parseFloat(data.longitude);
    },
    error => {
      this.router.navigate(['/locations']);
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.subscription.unsubscribe();
  }

}
