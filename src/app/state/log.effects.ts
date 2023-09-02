import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { LogActions, LogState, selectRowToUpdate } from '.';
import { ApiService } from '../services/api.service';
import { Store, select } from '@ngrx/store';
import { Row } from '../models/row';

@Injectable()
export class LogEffects {
  constructor(private actions$: Actions, private api: ApiService, private store: Store<LogState>) {}

  getWeekly$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LogActions.setDate),
      switchMap((action) =>
        this.api.getWeeklyLogs(action.year, action.week).pipe(
          map((data) => {
            return LogActions.getWeeklySuccess({ weeklyData: data });
          }),
          catchError((error) => {
            console.log(error)
            return of(error);
          })
        )
      )
    )
  );

  patchFormRow$ = createEffect(() =>
  this.actions$.pipe(
    ofType(LogActions.patchFormRow),
    withLatestFrom(this.store.pipe(select(selectRowToUpdate))),
    switchMap(([action, combinedData]) => {
      const requestBody = {
        ...combinedData,
        ...action.rowToUpdate,
      };

      return this.api.patchLogRow(requestBody).pipe(
        map(() => {
          return LogActions.patchFormRowSuccess({ rowToUpdate: requestBody });
        }),
        catchError((error) => {
          console.log(error);
          return of(error);
        })
      );
    })
  )
);

createFormRow$ = createEffect(() =>
  this.actions$.pipe(
    ofType(LogActions.createFormRow),
    withLatestFrom(this.store.pipe(select(selectRowToUpdate))),
    switchMap(([action, combinedData]) => {
      const requestBody = {
        ...combinedData,
        ...action.rowToUpdate,
      };

      delete requestBody.id;

      return this.api.postLogRow(requestBody).pipe(
        map((response) => {
            const rowToUpdate: Row = {
                ...(<{ message: string; data: Row }>response).data,
                user: combinedData.user,
              };
          return LogActions.createFormRowSuccess({ rowToUpdate});
        }),
        catchError((error) => {
          console.log(error);
          return of(error);
        })
      );
    })
  )
);

loginUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(LogActions.login),
    switchMap((action) => {
        console.log(action)
      return this.api.login(action.username, action.password).pipe(
        map((response) => {
          return LogActions.loginSuccess({ username: (<{ message: string; data: string }>response).data });
        }),
        catchError((error) => {
          console.log(error);
          return of(error);
        })
      );
    })
  )
);

}
