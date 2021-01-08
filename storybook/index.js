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

import {AppRegistry} from 'react-native';
import {name as appName} from '../app.json';
import {getStorybookUI, configure, addDecorator} from '@storybook/react-native';
import {withKnobs} from '@storybook/addon-knobs';

import './config/rn-addons';

// enables knobs for all stories
addDecorator(withKnobs);

// import stories
configure(() => {
  require('./stories');
}, module);

const StorybookUIRoot = getStorybookUI({
  // https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#react-native-async-storage
  asyncStorage: require('@react-native-async-storage/async-storage').default,
});

AppRegistry.registerComponent(appName, () => StorybookUIRoot);

export default StorybookUIRoot;
