import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AppTabNavigator from './AppTabNavigator';

import SplashScreen from '../splashscreen/SplashScreen';
import Login from '../login/login';
import SignupStep01 from '../signup/SignupStep01';
import FindEmailStep01 from '../signup/FindEmailStep01';
import FindPwdStep01 from '../signup/FindPwdStep01';
import {
  ReviewDetail,
  FreetalktalkDetail,
  WriteReview,
  WriteReview2,
  WriteFreetalktalk,
  PhotoPreview,
} from '../screens/Anapatalk';
import NewPasswordScreen from '../splashscreen/NewPasswordScreen';
import MyFavorite2 from '../screens/MyFavorite/MyFavorite2';
import { Note, NoteDetail, ReceiptPreview } from '../screens/Note';
import searchResult from '../screens/searchResult';
import Detail from '../screens/Detail';
import DetailReservation from '../screens/DetailReservation';
import EventView from '../components/Events/EventView';
import EventRegistration from '../components/Events/EventRegistration';
import EventRegistrationDone from '../components/Events/EventRegistrationDone';
import MyPage from '../screens/MyPage/MyPage';
import ProfileModification from '../screens/MyPage/ProfileModification';
import MyAssets from '../screens/MyPage/MyAssets/MyAssets';
import TokenTransferView from '../screens/MyPage/MyAssets/TokenTransferView';
import PointTransferView from '../screens/MyPage/MyAssets/PointTransferView';
import MyReview from '../screens/MyPage/MyReview/MyReview';
import MyEvents from '../screens/MyPage/MyEvents/MyEvents';
import SavedPost from '../screens/MyPage/SavedPost/SavedPost';
import Settings from '../screens/MyPage/Settings';
import TermsPage from '../screens/MyPage/TermsPage';
import RatingPage from '../screens/MyPage/RatingPage';
import MyHospitals from '../screens/MyPage/MyHospitals/MyHospitals';
import Test from '../screens/MyPage/Test';
import UsageTermsPage from '../screens/MyPage/UsageTermsPage';
import ThirdPartyTermsPage from '../screens/MyPage/ThirdPartyTermsPage';

import { MainHeader } from '../components';

const Screens = {
  WriteReview: WriteReview,
  WriteReview2: WriteReview2,
  WriteFreetalktalk,
  ReviewDetail: ReviewDetail,
  FreetalktalkDetail: FreetalktalkDetail,
  PhotoPreview: PhotoPreview,
  MyFavorite: MyFavorite2,
  Note: Note,
  NoteDetail: NoteDetail,
  ReceiptPreview: ReceiptPreview,
  SearchResult: searchResult,
  Detail: Detail,
  DetailReservation: DetailReservation,
  EventView: EventView,
  EventRegistration: EventRegistration,
  EventRegistrationDone: EventRegistrationDone,
  MyPage: MyPage,
  ProfileModification: ProfileModification,
  MyAssets: MyAssets,
  TokenTransfer: TokenTransferView,
  PointTransfer: PointTransferView,
  MyReview: MyReview,
  MyEvents: MyEvents,
  Settings: Settings,
  TermsPage: TermsPage,
  RatingPage: RatingPage,
  MyHospitals: MyHospitals,
  Test: Test,
  SavedPost: SavedPost,
  UsageTerms: UsageTermsPage,
  ThirdPartyTerms: ThirdPartyTermsPage,
};

const MainStack = createStackNavigator(
  {
    MainTab: {
      screen: AppTabNavigator,
      navigationOptions: {
        header: ({ navigation }) => <MainHeader navigation={navigation} />,
      },
    },
    ...Screens,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
    mode: 'card',
    headerMode: 'screen',
    initialRouterName: 'MainTab',
  }
);

const AppSwitchNavigator = createSwitchNavigator(
  {
    SplashScreen: { screen: SplashScreen },
    NewPasswordScreen: { screen: NewPasswordScreen },
    Login: { screen: Login },
    SignupStep01: { screen: SignupStep01 },
    FindEmailStep01: { screen: FindEmailStep01 },
    FindPwdStep01: { screen: FindPwdStep01 },
    Main: MainStack,
  },
  {
    mode: 'card',
    headerMode: 'none',
    initialRouteName: 'Login',
  }
);

export default createAppContainer(AppSwitchNavigator);
