import { createAction, props } from '@ngrx/store';
import { Row } from '../models/row';
import { Form } from '../models/form';

export const setDate = createAction('[Log] Set Date', props<{ week: number, year: number }>());
export const getDate = createAction('[Init] Get Date');
export const getWeeklySuccess = createAction('[Init] Get Weekly Success', props<{ weeklyData: Row[] }>())
export const patchFormRow = createAction('[Form] Patch Form Row', props<{ rowToUpdate: Form }>());
export const patchFormRowSuccess = createAction('[Form] Update Form Row Success', props<{ rowToUpdate: Row }>());
export const createFormRow = createAction('[Form] Create Form Row', props<{ rowToUpdate: Form }>());
export const createFormRowSuccess = createAction('[Form] Create Form Row Success', props<{ rowToUpdate: Row }>());
export const login = createAction('[Login] Login User', props<{ username: string, password: string}>());
export const loginSuccess = createAction('[Login] Login User Success', props<{ username: string }>());