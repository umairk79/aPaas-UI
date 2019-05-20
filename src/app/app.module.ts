import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParticlesModule } from 'angular-particle';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http'
import { CdkDetailRowDirective } from './dashboard/cdk-detail-row.directive'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PagerService } from './_services/pager.service'

import { MaterialModule } from './material.module';
import { LoginComponent } from './login/login.component';

import { DragulaModule } from 'ng2-dragula';

@NgModule({
  declarations: [ 
    AppComponent, DashboardComponent, LoginComponent, CdkDetailRowDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ParticlesModule,
    DragulaModule.forRoot()
  ],
  providers: [PagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
