/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import { useApi } from './src/service/api';
import Loader from './src/components/load';



const App = () => {
  const [load, setLoad] = useState(false)
  const api = useApi();
  useEffect(()=>{
    getInitial();
  },[])
  const getInitial = async () => {
    setLoad(true);
    const info = await api.getImages();
    setLoad(false)
    console.log(info);
  }
  return (
    <SafeAreaView>
      <Loader visible={load}/>
    </SafeAreaView>
  );
};


export default App;
