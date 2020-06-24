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

import React from 'react';
import {
  Button,
  Text,
  StyleProvider,
  NativeBase /* getTheme */,
} from 'native-base';
// import variables from 'native-base/src/theme/variables/material';
import variables from 'native-base/src/theme/variables/platform';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';

import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';

function DefaultButton(props: DefaultButtonProps) {
  const {
    title,
    transparent,
    primary,
    secondary,
    theme,
    style,
    textProps,
    ...restProps
  } = props;
  let color: string | undefined = theme.palette.default;
  if (transparent) {
    color = undefined;
  } else if (primary) {
    color = theme.palette.primary;
  } else if (secondary) {
    color = theme.palette.secondary;
  }

  const {...allVariables} = variables;
  console.log(allVariables.brandPrimary);
  // allVariables.brandPrimary = theme.
  console.log(allVariables.brandPrimary);
  console.log(getTheme(allVariables)['NativeBase.Button']);

  // console.log(theme.palette.primary)
  // console.log(getTheme({brandPrimary:theme.palette.primary})['NativeBase.Button'])

  return (
    // <StyleProvider style={getTheme(allVariables)}>
    <Button
      style={[
        {
          backgroundColor: color,
          borderRadius: theme.borderRadius,
        },
        style,
      ]}
      transparent={transparent}
      {...restProps}>
      <Text
        {...textProps}
        style={[{color: theme.typography.secondaryColor}, textProps?.style]}>
        {title}
      </Text>
    </Button>
    // </StyleProvider>
  );
}

interface DefaultButtonProps extends NativeBase.Button, WithTheme {
  title: string;
  primary?: boolean;
  secondary?: boolean;
  textProps?: NativeBase.Text;
  transparent?: boolean;
}

export default withTheme<DefaultButtonProps>()(DefaultButton);
