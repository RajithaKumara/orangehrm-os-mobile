import {RootState} from 'store';
import {createSelector} from 'reselect';

import {
  AttendanceObject,
  LeaveObject,
  MyAttendanceState,
  GraphRecordsObject,
  Holiday,
  WorkWeek,
  SingleEmployeeAttendance,
} from './types';

export const selectMyAttendaceState = (state: RootState) => state.myAttendance;

export const selectAttendanceRecords = createSelector<
  RootState,
  MyAttendanceState,
  AttendanceObject[] | undefined
>([selectMyAttendaceState], (myAttendance) => myAttendance.attendanceObjects);

export const selectLeaveRecords = createSelector<
  RootState,
  MyAttendanceState,
  LeaveObject[] | undefined
>([selectMyAttendaceState], (myAttendance) => myAttendance.leaveObjects);

export const selectAttendanceGraphRecords = createSelector<
  RootState,
  MyAttendanceState,
  GraphRecordsObject | undefined
>([selectMyAttendaceState], (myAttendance) => myAttendance.graphObject);

export const selectHolidays = createSelector<
  RootState,
  MyAttendanceState,
  Holiday[] | undefined
>([selectMyAttendaceState], (myAttendance) => myAttendance.holidays);

export const selectWorkWeek = createSelector<
  RootState,
  MyAttendanceState,
  WorkWeek | undefined
>([selectMyAttendaceState], (myAttendance) => myAttendance.workWeek);

export const selectEmployeeAttendanceList = createSelector<
  RootState,
  MyAttendanceState,
  SingleEmployeeAttendance[] | undefined
>([selectMyAttendaceState], (myAttendance) => myAttendance.employeeList);