/**
 * OrangeHRM is a comprehensive Human Resource Management (HRM) System that captures
 * all the essential functionalities required for any enterprise.
 * Copyright (C) 2006 OrangeHRM Inc., http://www.orangehrm.com
 *
 * OrangeHRM is free software; you can redistribute it and/or modify it under the terms of
 * the GNU General Public License as published by the Free Software Foundation; either
 * version 2 of the License, or (at your option) any later version.
 *
 * OrangeHRM is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with this program;
 * if not, write to the Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor,
 * Boston, MA  02110-1301, USA
 */
import React from 'react';
import {StyleSheet} from 'react-native';
import {Item, Input, Icon, Label, NativeBase} from 'native-base';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';

function StandardTextField(
  props: React.PropsWithChildren<StandardTextFieldProps>,
) {
  const {label, iconName, style, theme, ...restProps} = props;
  return (
    <Item floatingLabel style={[styles.item, style]}>
      <Label
        style={
          iconName === undefined ? undefined : {paddingLeft: theme.spacing * 8}
        }>
        {label}
      </Label>
      <Input {...restProps} />
      {iconName === undefined ? null : (
        <Icon active name={iconName} type="MaterialCommunityIcons" />
      )}
    </Item>
  );
}

interface StandardTextFieldProps extends NativeBase.Input, WithTheme {
  label: string;
  iconName?: string;
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row-reverse',
  },
});

export default withTheme<StandardTextFieldProps>()(StandardTextField);