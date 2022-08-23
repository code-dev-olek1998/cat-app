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
  View,
  TouchableOpacity,
} from 'react-native';
import Lightbox from 'react-native-lightbox';
import SelectDropdown from 'react-native-select-dropdown'
import { useApi } from './src/service/api';
import Loader from './src/components/load';
import RenderContent from './src/components/renderContent';
import styles from './src/style';



const App = () => {
  const [load, setLoad] = useState(false);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [breeds, setBreeds] = useState([]);
  const [breed, setBreed] = useState(null);
  const api = useApi();
  useEffect(() => {
    getInitial();
  }, [])
  const getInitial = async () => {
    setLoad(true);
    const info = await api.getImages(page);
    const result = await api.getBreeds();
    console.log(result)
    setLoad(false)
    if (Array.isArray(info)) {
      setPage(page + 1)
      setList(info)
    }
    if (Array.isArray(result)) {
      setBreeds(result);
    }

  }
  const renderBreed = async (id) => {
    setLoad(true);
    const info = await api.getBreed(id);
    console.log(info)
    setLoad(false)
    if (Array.isArray(info)) {
      // setPage(page + 1)
      // setList(info)
    }

  }
  const fetchMoreData = () => {
    getInitial()
  }
  const renderItem = ({ item, index }) => (
    <Lightbox underlayColor="white" renderContent={() => <RenderContent url={item.url} />}>
      <Image source={{ uri: item.url }} style={styles.image} />
    </Lightbox>
  )
  const renderHeader = () => (
    <View style={styles.header}>
      <SelectDropdown
        data={breeds}
        onSelect={(selectedItem, index) => {
          setBreed(selectedItem.image.url)
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem.id
        }}
        rowTextForSelection={(item, index) => {
          return item.id
        }}
        dropdownStyle={styles.dropdown}
      />
    </View>
  )
  return (
    <SafeAreaView style={styles.container}>
      {breed ?
        <TouchableOpacity onPress={() => setBreed(null)}>
          <Image source={{ uri: breed }} style={styles.breed} />
        </TouchableOpacity>
        :
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listView}
          onEndReachedThreshold={0.2}
          onEndReached={fetchMoreData}
          ListHeaderComponent={renderHeader}
          numColumns={2}
        />}
      <Loader visible={load} />
    </SafeAreaView>
  );
};


export default App;
