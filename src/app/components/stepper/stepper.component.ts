import { Component } from '@angular/core';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { endOfYear, getISOWeek } from 'date-fns';
import { LogActions, LogState, selectWeek, selectYear } from 'src/app/state';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent {
  left = faAnglesLeft;
  right = faAnglesRight;
  currentWeek: number = 0;
  currentYear: number = 0;

  constructor(private store: Store<LogState>) {
    this.store.select(selectWeek).subscribe((week: number) => {
      this.currentWeek = week;
    });
    this.store.select(selectYear).subscribe((year: number) => {
      this.currentYear = year;
    });
  }

  goLower() {
    if (this.currentWeek == 1) {
      this.currentYear -= 1;
      this.currentWeek = getISOWeek(endOfYear(new Date(this.currentYear, 11, 31)));
    } else {
      this.currentWeek -= 1;
    }
    this.store.dispatch(LogActions.setDate({ week: this.currentWeek, year: this.currentYear }));
  }
  
  goHigher() {
    if (this.currentWeek == getISOWeek(endOfYear(new Date(this.currentYear, 11, 31)))) {
      this.currentWeek = 1;
      this.currentYear += 1;
    } else {
      this.currentWeek += 1;
    }
    this.store.dispatch(LogActions.setDate({ week: this.currentWeek, year: this.currentYear }));
  }
}
