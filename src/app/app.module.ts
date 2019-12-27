import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
import { HereMapComponent } from './components/here-map/here-map.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppService } from './app.service'
import { SharedModule } from './shared/shared.module'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HereMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
