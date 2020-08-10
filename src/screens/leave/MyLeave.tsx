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
import {FlatList, View, RefreshControl} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import SafeAreaLayout from 'layouts/SafeAreaLayout';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import {selectLeaveRequests} from 'store/leave/leave-usage/selectors';
import {selectEntitlement} from 'store/leave/leave-usage/selectors';
import {
  fetchMyLeaveRequests,
  fetchMyLeaveEntitlements,
} from 'store/leave/leave-usage/actions';
import {LeaveRequest} from 'store/leave/leave-usage/types';
import Divider from 'components/DefaultDivider';
import MyLeaveListItem from 'screens/leave/components/MyLeaveListItem';
import {MY_LEAVE_DETAILS, MY_LEAVE} from 'screens';
import {navigate} from 'lib/helpers/navigation';
import {MyLeaveDetailsParam} from 'screens/leave/navigators/MyLeaveUsageNavigator';
import {selectCurrentRoute} from 'store/globals/selectors';

class MyLeave extends React.Component<MyLeaveProps> {
  constructor(props: MyLeaveProps) {
    super(props);
    if (this.props.leaveRequests === undefined) {
      this.props.fetchMyLeaveRequests();
    }
    this.updateEntitlements();
  }

  componentDidUpdate(prevProps: MyLeaveProps) {
    if (
      prevProps.currentRoute !== this.props.currentRoute &&
      this.props.currentRoute === MY_LEAVE &&
      this.props.leaveRequests === undefined
    ) {
      // update my leave list and leave entitlements,
      // once perform action on my leave list item
      this.onRefresh();
    }
  }

  onRefresh = () => {
    this.props.fetchMyLeaveEntitlements();
    this.props.fetchMyLeaveRequests();
  };

  updateEntitlements = () => {
    if (this.props.entitlements === undefined) {
      this.props.fetchMyLeaveEntitlements();
    }
  };

  onPressLeave = (leaveRequest: LeaveRequest) => () => {
    navigate<MyLeaveDetailsParam>(MY_LEAVE_DETAILS, {leaveRequest});
  };

  render() {
    const {theme, leaveRequests} = this.props;
    return (
      <SafeAreaLayout>
        <FlatList
          data={leaveRequests}
          renderItem={({item}) => (
            <MyLeaveListItem
              leaveRequest={item}
              onPress={this.onPressLeave(item)}
            />
          )}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => {
            return (
              <View style={{paddingHorizontal: theme.spacing}}>
                <Divider />
              </View>
            );
          }}
          ListFooterComponent={
            <View
              style={{
                paddingHorizontal: theme.spacing,
                paddingBottom: theme.spacing * 4,
              }}>
              <Divider />
            </View>
          }
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={this.onRefresh} />
          }
        />
      </SafeAreaLayout>
    );
  }
}

interface MyLeaveProps extends WithTheme, ConnectedProps<typeof connector> {
  navigation: NavigationProp<ParamListBase>;
}

const mapStateToProps = (state: RootState) => ({
  leaveRequests: selectLeaveRequests(state),
  entitlements: selectEntitlement(state),
  currentRoute: selectCurrentRoute(state),
});

const mapDispatchToProps = {
  fetchMyLeaveRequests: fetchMyLeaveRequests,
  fetchMyLeaveEntitlements: fetchMyLeaveEntitlements,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const MyLeaveWithTheme = withTheme<MyLeaveProps>()(MyLeave);

export default connector(MyLeaveWithTheme);
