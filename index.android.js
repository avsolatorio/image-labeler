/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  Button,
} from 'react-native';
import { StackNavigator } from 'react-navigation';


class ImageLabelerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUri: "",
      imageLabel: "",
      prevImageUri: "",
      prevImageLabel: "",
      nextImageUri: "",
      nextImageLabel: "",
    };
  }

  static navigationOptions = {
    title: 'Image Labeler',
  };

  componentDidMount() {
    this.fetchImage();
  }

  notCar(that) {
    if (this.state.nextImageUri !== ""){
        that.setState({
            imageUri: this.state.nextImageUri,
            imageLabel: this.state.nextImageLabel,
            nextImageUri: "",
            nextImageLabel: "",
        });
    }
    else{
        this.fetchImage();
    }
  }

  isCar(that) {
    if (this.state.nextImageUri !== ""){
        that.setState({
            imageUri: this.state.nextImageUri,
            imageLabel: this.state.nextImageLabel,
            nextImageUri: "",
            nextImageLabel: "",
        });
    }
    else{
        this.fetchImage();
    }
  }

  reviewDecision(that) {
    that.setState({
        imageUri: this.state.prevImageUri,
        imageLabel: this.state.prevImageLabel,
        nextImageUri: (this.state.imageUri === this.state.prevImageUri) ? this.state.nextImageUri : this.state.imageUri,
        nextImageLabel: (this.state.imageLabel === this.state.prevImageLabel) ? this.state.nextImageLabel : this.state.imageLabel,
    });
  }

  fetchImage() {
    var url = 'http://192.168.1.25:5000';
    fetch(url)
      .then( response => response.json() )
      .then( jsonData => {
        this.setState({
          prevImageUri: this.state.imageUri,
          prevImageLabel: this.state.imageLabel,
          imageUri: 'http://192.168.1.25:8800/' + jsonData.img_name,
          imageLabel: jsonData.car_model
        });
      })
    .catch( error => console.log('Error fetching: ' + error) );
  }

  render() {
      return (
          <View style={styles.thumb}>
            <Image
              source={{uri:this.state.imageUri}}
              resizeMode="cover"
              style={styles.img} />
            <Text style={styles.txt}>Car model: {this.state.imageLabel}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                <Button color="red" onPress={() => {this.notCar(this)}} title="Not car"/>
                <Button color="blue" onPress={() => {this.reviewDecision(this)}} title="Undo"/>
                <Button color="green" onPress={() => {this.isCar(this)}} title="  Car  "/>
            </View>
          </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
  },
  thumb: {
    backgroundColor: '#ffffff',
    marginBottom: 5,
    marginTop: 5,
    elevation: 1
  },
  img: {
    height: 300
  },
  txt: {
    margin: 10,
    fontSize: 16,
    textAlign: 'left'
  },
});


const ImageLabeler = StackNavigator({
  Home: { screen: ImageLabelerScreen },
});

AppRegistry.registerComponent('ImageLabeler', () => ImageLabeler);

// AppRegistry.registerComponent('ImageLabeler', () => ImageLabeler);
