import { Component, EventEmitter, Output } from '@angular/core';
import { Form } from 'src/app/models/form';
import { daysOfTheWeek } from 'src/app/utils';
import { Row } from 'src/app/models/row';
import { Store } from '@ngrx/store';
import { LogState, selectWeeklyDataForUser } from 'src/app/state';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  @Output() formValueToEmit = new EventEmitter<Form>();

  daysOfTheWeek = daysOfTheWeek;
  weeklyDataForUser: Row[] = [];
  weeklyDataForUser$ = this.store.select(selectWeeklyDataForUser);

  constructor(private store: Store<LogState>) {
    this.store.select(selectWeeklyDataForUser).pipe(takeUntilDestroyed()).subscribe((weeklyData: Row[]) => {
      this.weeklyDataForUser = weeklyData;
    });
  }
}
