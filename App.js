import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';
import PlaceList from './src/components/PlaceList/PlaceList';
import PlaceInput from './src/components/PlaceInput/PlaceInput';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  state={
    places:[],//array to hold the places 
    selectedPlace:null
  }
  //add places
  placeAddedHandler=placeName=>{
    this.setState(prevState=>{
      return {
        places:prevState.places.concat({
          key: Math.random().toString(), 
          name:placeName,
          image:{
            uri:"https://previews.123rf.com/images/mapichai/mapichai1802/mapichai180200058/96965351-cherry-blossom-trees-on-hillside-with-pathway-nature-scene-landscape-background.jpg"
          }
        })
      };
    });
  };

  placeSelectedHandler=key=>{
    this.setState(prevState=>{
      return {
        selectedPlace:prevState.places.find(place=>{
          return place.key===key;
        })
      };
    });
    
  };
  placeDeletedHandler=()=>{
    this.setState(prevState=>{
      return {
        places:prevState.places.filter(place=>{
          return place.key!==prevState.selectedPlace.key;
        }),
        selectedPlace:null
      };
    });
  }
  modalClosedHandler=()=>{
    this.setState({
      selectedPlace:null
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail 
          selectedPlace={this.state.selectedPlace} 
          onItemDeleted={ this.placeDeletedHandler} 
          onModalClosed={this.modalClosedHandler}
        />
        <PlaceInput onPlaceAdded={this.placeAddedHandler} />
        <PlaceList places={this.state.places} onItemSelected={this.placeSelectedHandler}/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  }
});
