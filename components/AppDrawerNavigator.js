import React from 'React';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './AppTabNavigator'
import CustomsSideBarMenu from './CustomSideBarMenu';
import SettingsScreen from '../screens/SettingsScreen';

export const AppDrawerNavigator = creatDrawerNavigator({
    Home : {
        screen : AppTabNavigator
    },
    Setting : {
        screen : SettingsScreen
    },
},
{
    ContentComponent:CustomSideBarMenu
},
{
    initialRouteName : 'Home'
})