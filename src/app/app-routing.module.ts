import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './location/create/create.component';
import { DetailsComponent } from './location/details/details.component';
import { LocationComponent } from './location/location.component';
import { UpdateComponent } from './location/update/update.component';


const routes: Routes = [
  { path: '', redirectTo: 'locations', pathMatch: 'full' },
  { path: 'locations', component: LocationComponent },
  { path: 'location/:id', component: DetailsComponent },
  { path: 'create', component: CreateComponent},
  { path: 'update/:id', component: UpdateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
