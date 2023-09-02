import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WeeklyComponent } from './components/weekly/weekly.component';
import { FormComponent } from './components/form/form.component';

import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StepperComponent } from './components/stepper/stepper.component';
import { EditComponent } from './components/edit/edit.component';
import { ViewComponent } from './components/view/view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store'
import { logReducer } from './state/log.reducer';
import { initialState } from './state/log.state';
import { LogEffects } from './state/log.effects';
import { EffectsModule } from '@ngrx/effects';
import { DayComponent } from './components/day/day.component';
import { LoginComponent } from './components/login/login.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    WeeklyComponent,
    FormComponent,
    StepperComponent,
    EditComponent,
    ViewComponent,
    DayComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ log: logReducer }, { initialState: { log: initialState } }),
    EffectsModule.forRoot([LogEffects]),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
