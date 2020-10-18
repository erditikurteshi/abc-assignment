import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { LocationComponent } from './location/location.component';
import { ListComponent } from './location/list/list.component';
import { DetailsComponent } from './location/details/details.component';
import { CreateComponent } from './location/create/create.component';
import { UpdateComponent } from './location/update/update.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    LocationComponent,
    ListComponent,
    DetailsComponent,
    CreateComponent,
    UpdateComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCGZ2FxIkIdbt1CpMo1EUICYt8Tk4bLbx0'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
