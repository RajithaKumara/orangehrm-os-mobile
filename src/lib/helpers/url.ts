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

export const checkUrl = (
  url: string,
  withPath: boolean = true,
  withProtocol: boolean = true,
) => {
  if (withPath && withProtocol) {
    return isValid(
      url.match(
        /^((https):\/\/)([\p{L}\p{N}\p{S}\-\.])+(\.?([\p{L}\p{N}]|xn--[\p{L}\p{N}-]+)+\.?)(:[0-9]+)?((\/[\p{L}]+)+)?$/gu,
      ),
    );
  } else if (withProtocol) {
    return isValid(
      url.match(
        /^((https):\/\/)([\p{L}\p{N}\p{S}\-\.])+(\.?([\p{L}\p{N}]|xn--[\p{L}\p{N}-]+)+\.?)(:[0-9]+)?$/gu,
      ),
    );
  } else if (withPath) {
    return isValid(
      url.match(
        /^([\p{L}\p{N}\p{S}\-\.])+(\.?([\p{L}\p{N}]|xn--[\p{L}\p{N}-]+)+\.?)(:[0-9]+)?(\/[\p{L}]+)+?$/gu,
      ),
    );
  } else {
    return isValid(
      url.match(
        /^([\p{L}\p{N}\p{S}\-\.])+(\.?([\p{L}\p{N}]|xn--[\p{L}\p{N}-]+)+\.?)(:[0-9]+)?$/gu,
      ),
    );
  }
};

export const checkDomain = (url: string) => {
  return isValid(
    url.match(
      /^([\p{L}\p{N}\p{S}\-\.])+(\.?([\p{L}\p{N}]|xn--[\p{L}\p{N}-]+)+\.?)?$/gu,
    ),
  );
};

const isValid = (regExpMatch: RegExpMatchArray | null) => {
  if (regExpMatch === null) {
    return false;
  } else if (regExpMatch.length === 1) {
    return true;
  }
  return false;
};

export default {checkUrl, checkDomain};
