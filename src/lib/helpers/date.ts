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

/**
 * Return array of dates for given period
 * @param {Date} startDate
 * @param {Date} endDate
 * @returns {Date[]}
 */
const getDatesWithinPeriod = (startDate: Date, endDate: Date): Date[] => {
  if (startDate > endDate) {
    [startDate, endDate] = [endDate, startDate];
  }

  const dates = [];
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

/**
 * Return date in ISO-8601 format (YYYY-MM-DD)
 * @param {Date} date
 * @returns {string}
 */
const getDateString = (date: Date): string => {
  return date.toISOString().substring(0, 10);
};

export {getDatesWithinPeriod, getDateString};
