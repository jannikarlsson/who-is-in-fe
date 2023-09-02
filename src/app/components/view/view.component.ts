import { Component, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { Row } from 'src/app/models/row';
import { LogState, selectUser } from 'src/app/state';
import { daysOfTheWeek } from 'src/app/utils';
import { faBuilding, faBowlFood, faPersonDrowning, faMartiniGlassCitrus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  @Input() weeklyData: Row[] = [];

  daysOfTheWeek = daysOfTheWeek;
  currentUser: string = "";

  office = faBuilding;
  lunch = faBowlFood;
  swim = faPersonDrowning;
  aw = faMartiniGlassCitrus;

  constructor(private store: Store<LogState>) {
    this.store.select(selectUser).pipe(takeUntilDestroyed()).subscribe((user: string) => {
      this.currentUser = user;
    });
  }

  getDayData(day: number) {
    if (this.weeklyData.length) {
      return this.weeklyData.filter(row => row.day === day);
    }
    return null
  }

}
