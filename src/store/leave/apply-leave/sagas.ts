/*
 * This file is part of OrangeHRM
 *
 * Copyright (C) 2020 onwards OrangeHRM (https://www.orangehrm.com/)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

import {takeEvery, put} from 'redux-saga/effects';
import {apiCall, apiPostCall} from 'store/saga-effects/api';
import {
  openLoader,
  closeLoader,
  showSnackMessage,
} from 'store/saga-effects/globals';
import {SAVE_SINGLE_DAY_LEAVE_REQUEST} from 'store/leave/apply-leave/types';
// import {
//   fetchMyLeaveEntitlementsFinished,
//   fetchMyLeaveRequestsFinished,
// } from 'store/leave/leave-usage/actions';
// import {assignColorsToLeaveTypes} from 'lib/helpers/leave';

function* saveSingleDayLeaveRequest() {
  try {
    yield openLoader();
    const response = yield apiCall(
      apiPostCall,
      '/api/v1/employee/3/leave-request',
      {
        type: 1,
        fromDate: '2020-07-03',
        toDate: '2020-07-03',
        singleType: 'half_day',
        singleAMPM: 'AM',
        action: 'PENDING',
      },
    );
    console.log(response);
    if (response.data) {
      // yield put(
      //   fetchMyLeaveEntitlementsFinished(
      //     assignColorsToLeaveTypes(response.data),
      //   ),
      // );
    } else {
      // yield put(fetchMyLeaveEntitlementsFinished(undefined, true));
    }
  } catch (error) {
    console.log(error);
    yield showSnackMessage('Failed to Fetch Leave Details');
    // yield put(fetchMyLeaveEntitlementsFinished(undefined, true));
  } finally {
    yield closeLoader();
  }
}

// function* fetchMyLeaveRequests() {
//   try {
//     yield openLoader();
//     const response = yield apiCall(
//       apiGetCall,
//       '/api/v1/leave/my-leave-request',
//     );
//     if (response.data) {
//       yield put(fetchMyLeaveRequestsFinished(response.data));
//     } else {
//       yield put(fetchMyLeaveRequestsFinished(undefined, true));
//     }
//   } catch (error) {
//     yield showSnackMessage('Failed to Fetch Leave Details');
//     yield put(fetchMyLeaveRequestsFinished(undefined, true));
//   } finally {
//     yield closeLoader();
//   }
// }

export function* watchApplyLeaveActions() {
  yield takeEvery(SAVE_SINGLE_DAY_LEAVE_REQUEST, saveSingleDayLeaveRequest);
  // yield takeEvery(FETCH_MY_LEAVE_REQUEST, fetchMyLeaveRequests);
}
