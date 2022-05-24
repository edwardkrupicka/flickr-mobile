import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import { SearchBar, Button, Icon } from 'react-native-elements';
import { useState, useEffect } from 'react';
import { fetchData } from './api';
import ImageCard from './ImageCard';

export default function App() {
  const[count, setCount] = useState(0);
  const[data, setData] = useState(false);
  const[loaded, setLoaded] = useState(false)
  const[searchBarValue, setSearchBarValue] = useState('')
  const[currentSearch, setCurrentSearch] = useState('')

  const handlePress = () => {
    setCount(count + 1)
  }

  useEffect(() => {
    fetchData(
      `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=90520be9485600ef093684ca8edc1d59&format=json&nojsoncallback=1&safe_search=1&text=${currentSearch}`, 
      setData, setLoaded)
  }, [currentSearch])

  const handleClick = (e) => {
    setCurrentSearch(searchBarValue)
  }

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar 
        placeholder="Type Here..."
        value={searchBarValue}
        onChangeText={setSearchBarValue}
        platform="ios"
      />
      <Button 
        title="Search"
        type="outline"
        onPress={handleClick}
        loading={!data}
        icon={
          <Icon 
          name='search'
          color='lightblue'
          />
        }
      />
      {!loaded ? null :
      <FlatList
        numColumns={2}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={( {item} ) => (<ImageCard element={item} />) }
      ></FlatList>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
