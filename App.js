/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  Image,
} from 'react-native';
import { useApi } from './src/service/api';
import Loader from './src/components/load';
import styles from './src/style';



const App = () => {
  const [load, setLoad] = useState(false);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const api = useApi();
  useEffect(() => {
    getInitial();
  }, [])
  const getInitial = async () => {
    setLoad(true);
    const info = await api.getImages(page);
    setLoad(false)
    if (Array.isArray(info)) {
      setPage(page + 1)
      setList(info)
    }
  }
  const fetchMoreData = () => {
    getInitial()
  }
  const renderItem = ({ item, index }) => (
    <Image source={{ uri: item.url }} style={styles.image} />
  )
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listView}
        onEndReachedThreshold={0.2}
        onEndReached={fetchMoreData}
      />
      <Loader visible={load} />
    </SafeAreaView>
  );
};


export default App;
