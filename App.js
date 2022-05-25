import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator, Image, Keyboard } from 'react-native';
import { SearchBar, Button, Icon } from 'react-native-elements';
import { useState, useEffect } from 'react';
import { fetchData } from './api';
import ImageCard from './ImageCard';
import logo from './logo.svg';

export default function App() {
  const[count, setCount] = useState(0);
  const[data, setData] = useState([]);
  const [isAPIbusy, setAPIBusy] = useState(false);
  const[searchBarValue, setSearchBarValue] = useState('');
  const[currentSearch, setCurrentSearch] = useState('');
  const[page, setPage] = useState(1)

  const executeFetch = async () => {
    const fetchedData = await fetchData(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=90520be9485600ef093684ca8edc1d59&format=json&nojsoncallback=1&safe_search=1&text=${currentSearch}&page=${page}`);

    setData(fetchedData);
  }

  useEffect(() => {
    if(currentSearch) {
      setAPIBusy(true)
      setTimeout(() => {
              executeFetch().then(() => {
        setAPIBusy(false)
      })
      }, 3000)
    }
  }, [currentSearch])

  useEffect(() => {
    const executeNewFetch = async () => {
      const fetchedData = await fetchData(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=90520be9485600ef093684ca8edc1d59&format=json&nojsoncallback=1&safe_search=1&text=${currentSearch}&page=${page}`);
      const combinedData = await data.concat(fetchedData)
      setData(combinedData);
    } 
    if(page > 1) {
      executeNewFetch()
    }
  }, [page])


  const handleClick =  async () => {
    setCurrentSearch(searchBarValue)
    Keyboard.dismiss()
  }

  const fetchMoreData = async () => {
    setPage(page + 1)
  }

  const clearSearch = () => {
    setData([])
  }

  return (
    <SafeAreaView style={styles.container}>
        <Image 
				style={{ width: 50, height: 50, margin: 5 }} 
				source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
				/>
        <Text
        style={styles.titleText}
        >Flickr Search</Text>
      <SearchBar 
        placeholder="Type Here..."
        value={searchBarValue}
        onChangeText={setSearchBarValue}
        platform="ios"
        onClear={clearSearch}
      />
      <Button 
        title="Search"
        type="outline"
        onPress={handleClick}
      />
      {!isAPIbusy ? 
      <FlatList
        numColumns={ 2 }
        data={ data }
        keyExtractor={ (item, index) => index.toString() }
        renderItem={ ({item}) => (<ImageCard element={item} />) }
        onEndReachedThreshold={0}
        onEndReached={fetchMoreData}
      ></FlatList>
      : <ActivityIndicator />
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    margin: 2,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  }
});
