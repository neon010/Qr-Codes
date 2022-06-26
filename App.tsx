import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigation } from './src/navigation/StackNavigation';
import { SafeAreaProvider} from 'react-native-safe-area-context';

import MobileAds, {
  AdEventType,
  AdsConsent,
  AdsConsentDebugGeography,
  AppOpenAd,
  InterstitialAd,
  TestIds,
  BannerAd,
  BannerAdSize,
  RewardedAd,
  RewardedAdEventType,
  useInterstitialAd,
  useAppOpenAd,
  useRewardedAd,
  GAMInterstitialAd,
  GAMAdEventType,
  GAMBannerAd,
  RewardedInterstitialAd,
  useRewardedInterstitialAd,
} from 'react-native-google-mobile-ads';




const App = () => {




  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StackNavigation/>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};



export default App;
