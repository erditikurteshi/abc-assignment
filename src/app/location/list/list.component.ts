import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { Location } from '../../models/location';
import { ColumnMode } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  locations: Location[];
  ColumnMode = ColumnMode;

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.locationService.getLocations().subscribe(data => {
      this.locations = data;
    });
  }

  removeLocation(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.locationService.deleteLocation(id).subscribe(data => {
          window.location.reload();
        });
      }
    });
  }

}
