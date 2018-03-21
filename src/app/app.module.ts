import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EmailComponent } from './components/email/email.component';
import { MaterialModule } from './material.module';
import { SmsComponent } from './components/sms/sms.component';
import { SmsService } from './services/sms.service';
import { EmailService } from './services/email.service'

export const appRoutes: Routes = [
  { path: '', component: EmailComponent},
  { path: 'email', component: EmailComponent},
  { path: 'sms', component: SmsComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    EmailComponent,
    SmsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
