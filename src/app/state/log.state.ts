import { Row } from "../models/row";

export interface LogState {
    isEditMode: boolean;
    year: number,
    week: number;
    user: string;
    isLoggedIn: boolean;
    weeklyData: Row[]
}

export const initialState: LogState = {
    isEditMode: false,
    year: 0,
    week: 0,
    user: 'Janni',
    isLoggedIn: false,
    weeklyData: []
};