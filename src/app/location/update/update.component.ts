import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { City } from 'src/app/models/city';
import { Location } from 'src/app/models/location';
import { LocationService } from 'src/app/services/location.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit, OnDestroy {
  updateForm: FormGroup;
  submitted = false;
  cities: City[];
  location: Location;
  locationId: string;
  private routeSub: Subscription;
  private subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private locationService: LocationService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.locationId = params.id;
    });

    this.updateForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
      city: ['', Validators.required],
      longitude: ['', Validators.required],
      latitude: ['', Validators.required]
    });
    this.subscription = this.locationService.getLocationById(this.locationId).subscribe(data => {
      this.updateForm.controls.name.setValue(data.name);
      this.updateForm.controls.address.setValue(data.address);
      this.updateForm.controls.city.setValue(data.city);
      this.updateForm.controls.longitude.setValue(data.longitude);
      this.updateForm.controls.latitude.setValue(data.latitude);
    },
    error => {
      this.router.navigate(['/locations']);
    });

    this.subscription = this.locationService.getCities().subscribe(data => {
      this.cities = data;
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.updateForm.invalid) {
        return;
    }
    this.subscription = this.locationService.updateLocation(this.locationId, this.updateForm.value).subscribe(data => {
      Swal.fire({
        title: 'Location updated successfully!',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      }).then((result) => {
        this.router.navigate(['/location', this.locationId]);
      });
    });
  }

  onCancel() {
    this.updateForm.reset();
    this.router.navigate(['/locations']);
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.subscription.unsubscribe();
  }

}
