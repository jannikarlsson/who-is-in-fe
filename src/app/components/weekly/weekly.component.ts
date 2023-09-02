import { Component } from '@angular/core';
import { getISOWeek } from 'date-fns';
import { Row } from '../../models/row';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { LogActions, LogState, selectWeeklyData } from 'src/app/state';

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.css']
})
export class WeeklyComponent {
  edit = false;

  currentDate = new Date();
  currentYear = this.currentDate.getFullYear();
  currentWeek = getISOWeek(this.currentDate);

  weeklyData: Row[] = [];

  constructor(private store: Store<LogState>) {
    this.store.select(selectWeeklyData).pipe(takeUntilDestroyed()).subscribe((weeklyData: Row[]) => {
      this.weeklyData = weeklyData;
    });
  }

  ngOnInit() {
    this.store.dispatch(LogActions.setDate({ week: this.currentWeek, year: this.currentYear }));
  }

  editChange() {
    this.edit = !this.edit
  }
}

