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
import {StyleSheet} from 'react-native';
import {Button, Text, NativeBase} from 'native-base';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';

const DefaultButton = (props: DefaultButtonProps) => {
  const {
    title,
    transparent,
    primary,
    secondary,
    theme,
    style,
    textProps,
    fullWidth,
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

  let borderedColor;
  if (restProps.bordered) {
    borderedColor = color;
    color = undefined;
  }

  return (
    <Button
      style={[
        {
          backgroundColor: color,
          borderRadius: theme.borderRadius,
        },
        borderedColor ? {borderColor: borderedColor} : undefined,
        style,
      ]}
      rounded
      androidRippleColor={borderedColor ? borderedColor : undefined}
      transparent={transparent}
      {...restProps}>
      <Text
        {...textProps}
        style={[
          {color: theme.typography.secondaryColor},
          textProps?.style,
          fullWidth ? styles.fullWidth : undefined,
          borderedColor ? {color: borderedColor} : undefined,
        ]}>
        {title}
      </Text>
    </Button>
  );
};

interface DefaultButtonProps extends NativeBase.Button, WithTheme {
  title: string;
  primary?: boolean;
  secondary?: boolean;
  textProps?: NativeBase.Text;
  transparent?: boolean;
  fullWidth?: boolean;
}

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
    textAlign: 'center',
  },
});

export default withTheme<DefaultButtonProps>()(DefaultButton);
