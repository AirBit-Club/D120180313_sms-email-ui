import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ExpectedConditions } from 'protractor';
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { TestBed, fakeAsync, tick, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { appRoutes } from './app.module';
import { EmailComponent } from './components/email/email.component';
import { SmsComponent } from './components/sms/sms.component';
import { MaterialModule } from './material.module';


describe('Component: App', () => {

  let location: Location;
  let router: Router;
  let fixture;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(appRoutes),
        FormsModule,
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent,
        EmailComponent,
        SmsComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('navigate to "email" takes you to /email', fakeAsync(() => {
    router.navigate(['email']).then(() => {
      expect(router.url).toBe('/email');
    }, () => {
      fail('failed to open page');
    });
  }));

  it('navigate to "sms" takes you to /sms', fakeAsync(() => {
    router.navigate(['sms']).then(() => {
      expect(router.url).toBe('/sms');
    }, () => {
      fail('failed to open page');
    });
  }));
});
