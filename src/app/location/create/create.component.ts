import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { City } from 'src/app/models/city';
import { LocationService } from 'src/app/services/location.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {
  createForm: FormGroup;
  submitted = false;
  cities: City[];
  subscription: Subscription;

  constructor(private formBuilder: FormBuilder, private locationService: LocationService, private router: Router) { }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
      city: ['', Validators.required],
      longitude: ['', Validators.required],
      latitude: ['', Validators.required]
    });
    this.subscription = this.locationService.getCities().subscribe(data => {
      this.cities = data;
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.createForm.invalid) {
        return;
    }
    this.subscription = this.locationService.createLocation(this.createForm.value).subscribe(data => {
      Swal.fire({
        title: 'Location created successfully!',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      }).then((result) => {
        this.router.navigate(['/locations']);
      });
    });
  }

  onCancel() {
    this.createForm.reset();
    this.router.navigate(['/locations']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
