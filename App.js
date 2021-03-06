import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';
import PlaceList from './src/components/PlaceList/PlaceList';
import PlaceInput from './src/components/PlaceInput/PlaceInput';
import {connect} from 'react-redux';
import {addPlace, deletePlace, selectPlace, deselectPlace} from './src/store/actions/index';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
class App extends Component<Props> {
  
  //add places
  placeAddedHandler=placeName=>{
    this.props.onAddPlace(placeName);
  };

  placeSelectedHandler=key=>{
    this.props.onSelectPlace(key);
  };
  placeDeletedHandler=()=>{
    this.props.onDeletePlace();
  }
  modalClosedHandler=()=>{
    this.props.onDeselectPlace();
  }
  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail 
          selectedPlace={this.props.selectedPlace} 
          onItemDeleted={ this.placeDeletedHandler} 
          onModalClosed={this.modalClosedHandler}
        />
        <PlaceInput onPlaceAdded={this.placeAddedHandler} />
        <PlaceList places={this.props.places} onItemSelected={this.placeSelectedHandler}/>

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
const mapStateToProps=state=>{
  return{
    places:state.places.places,
    selectedPlace:state.places.selectedPlace
  };
};
const mapDispatchToProps=dispatch=>{
  return{
    onAddPlace:(name)=>dispatch(addPlace(name)),
    onDeletePlace:()=>dispatch(deletePlace()),
    onSelectPlace:(key)=>dispatch(selectPlace(key)),
    onDeselectPlace:()=>dispatch(deselectPlace())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
