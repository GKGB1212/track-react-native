import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';

import Map from '../components/Map';

const TrackCreateScreen = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
      }, []);

      let text = 'Waiting..';
      if (errorMsg) {
        text = errorMsg;
      } else if (location) {
        text = JSON.stringify(location);
      }
    

    return (
        <SafeAreaView>
            <Text h1>Create a Track</Text>
            <Map />
            <Text>{text}</Text>
            {/* {errorMsg?<Text>{errorMsg}</Text>:<Text>{location}</Text>} */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({});

export default TrackCreateScreen;