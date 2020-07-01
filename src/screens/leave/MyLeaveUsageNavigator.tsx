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
import {Platform} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  DrawerActions,
  StackActions,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import MyLeaveEntitilementsAndUsage from 'screens/leave/MyLeaveUsage';
import MyLeave from 'screens/leave/MyLeave';
import ApplyLeave from 'screens/leave/ApplyLeave';
import PickLeaveRequestDaysCalendar from 'screens/leave/PickLeaveRequestDaysCalendar';
import {
  MY_LEAVE_ENTITLEMENT_AND_USAGE,
  MY_LEAVE,
  APPLY_LEAVE,
  PICK_LEAVE_REQUEST_DAYS_CALENDAR,
} from 'screens';
import IconButton from 'components/DefaultIconButton';

const Stack = createStackNavigator<MyLeaveUsageNavigatorParamList>();

class MyLeaveUsageNavigator extends React.Component<
  MyLeaveUsageNavigatorProps
> {
  render() {
    const {theme, navigation} = this.props;
    const header = {
      headerStyle: {
        backgroundColor: theme.palette.header,
      },
      headerTitleStyle: {
        fontSize: theme.typography.headerFontSize,
        color: theme.typography.secondaryColor,
        marginLeft: -theme.spacing * 2,
      },
    };
    const headerMenuIcon = {
      headerLeft: () => (
        <IconButton
          buttonProps={{
            onPress: () => {
              navigation.dispatch(DrawerActions.toggleDrawer());
            },
          }}
          iconProps={{
            name: 'menu',
            style: {
              fontSize: theme.typography.headerIconSize,
              color: theme.typography.secondaryColor,
            },
          }}
        />
      ),
    };
    const headerBackIcon = {
      headerLeft: () => (
        <IconButton
          buttonProps={{
            onPress: () => {
              navigation.dispatch(StackActions.pop());
            },
          }}
          iconProps={{
            name: Platform.OS === 'ios' ? 'ios-arrow-back' : 'arrow-back',
            type: Platform.OS === 'ios' ? 'Ionicons' : 'MaterialIcons',
            style: {
              fontSize: theme.typography.headerIconSize,
              color: theme.typography.secondaryColor,
            },
          }}
        />
      ),
    };

    return (
      <Stack.Navigator initialRouteName={MY_LEAVE_ENTITLEMENT_AND_USAGE}>
        <Stack.Screen
          name={MY_LEAVE_ENTITLEMENT_AND_USAGE}
          component={MyLeaveEntitilementsAndUsage}
          options={{
            title: 'My Leave Usage',
            ...header,
            ...headerMenuIcon,
          }}
        />
        <Stack.Screen
          name={MY_LEAVE}
          component={MyLeave}
          options={{
            title: 'My Leave',
            ...header,
            ...headerBackIcon,
          }}
        />
        <Stack.Screen
          name={APPLY_LEAVE}
          component={ApplyLeave}
          options={{
            title: 'Apply Leave',
            ...header,
            ...headerBackIcon,
          }}
        />
        <Stack.Screen
          name={PICK_LEAVE_REQUEST_DAYS_CALENDAR}
          component={PickLeaveRequestDaysCalendar}
          options={{
            title: 'Request Day(s)',
            ...header,
            ...headerBackIcon,
          }}
          initialParams={{parent: APPLY_LEAVE}}
        />
      </Stack.Navigator>
    );
  }
}

interface MyLeaveUsageNavigatorProps extends WithTheme {
  navigation: NavigationProp<ParamListBase>;
}

export type MyLeaveUsageNavigatorParamList = {
  [MY_LEAVE_ENTITLEMENT_AND_USAGE]: {};
  [MY_LEAVE]: {};
  [APPLY_LEAVE]: {};
  [PICK_LEAVE_REQUEST_DAYS_CALENDAR]: {
    parent: string;
  };
};

export default withTheme<MyLeaveUsageNavigatorProps>()(MyLeaveUsageNavigator);
