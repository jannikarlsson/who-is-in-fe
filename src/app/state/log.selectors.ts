import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LogState } from './log.state';
import { Row } from '../models/row';

function filterForPerson(data: Row[], currentUser: string) {
    return data.filter(row => row.user === currentUser);
}

const selectLogState = createFeatureSelector<LogState>('log');

export const selectWeek = createSelector(
  selectLogState,
  (state) => state.week
);

export const selectYear = createSelector(
    selectLogState,
    (state) => state.year
  );

export const selectWeeklyData = createSelector(
    selectLogState,
    (state) => state.weeklyData
);

export const selectWeeklyDataForUser = createSelector(
    selectLogState,
    (state) => filterForPerson(state.weeklyData, state.user)
);

export const selectUser = createSelector(
    selectLogState,
    (state) => state.user
);

export const selectRowToUpdate = createSelector(
    selectLogState,
    (state) => ({
      year: state.year,
      week: state.week,
      user: state.user
    })
  );