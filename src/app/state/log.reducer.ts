import { createReducer, on } from '@ngrx/store';
import * as LogActions from './log.actions'; // Import your actions
// import { forward, backward } from './log.actions';
import { initialState } from './log.state'; // Import the initial state
import { Row } from '../models/row';

function updateRow(data: Row[], rowToUpdate: Row): Row[] {
    const rowIndex = data.findIndex(row => row.id === rowToUpdate.id);
  
    if (rowIndex === -1) {
      return data;
    }
  
    const updatedData = [...data];
    updatedData[rowIndex] = { ...updatedData[rowIndex], ...rowToUpdate };
  
    return updatedData;
  }

function addNewRow(data: Row[], rowToAdd: Row) {
    const updatedWeeklyData = [...data];

    updatedWeeklyData.push(rowToAdd);

    return updatedWeeklyData
}

export const logReducer = createReducer(
  initialState,

  on(LogActions.setDate, (state, { week, year }) => ({
    ...state,
    week,
    year
  })),

  on(LogActions.getWeeklySuccess, (state, { weeklyData }) => ({
    ...state,
    weeklyData
  })),

  on(LogActions.patchFormRowSuccess, (state, { rowToUpdate }) => ({
    ...state,
    weeklyData: updateRow(state.weeklyData, rowToUpdate)
  })),

  on(LogActions.createFormRowSuccess, (state, { rowToUpdate }) => ({
    ...state,
    weeklyData: addNewRow(state.weeklyData, rowToUpdate)
  })),

);
