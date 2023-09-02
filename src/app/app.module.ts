import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
    WeeklyComponent,
    FormComponent,
    StepperComponent,
    EditComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ log: logReducer }, { initialState: { log: initialState } }),
    EffectsModule.forRoot([LogEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
