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
      imagePath: "",
      prevImageUri: "",
      prevImageLabel: "",
      prevImagePath: "",
      nextImageUri: "",
      nextImageLabel: "",
      nextImagePath: "",
    };
  }

  static navigationOptions = {
    title: 'Car Image Labeler',
  };

  componentDidMount() {
    this.fetchImage();
  }

  notCar(that) {
    this.postLabel(0);
    if (this.state.nextImageUri !== ""){
        that.setState({
            imageUri: this.state.nextImageUri,
            imageLabel: this.state.nextImageLabel,
            imagePath: this.state.nextImagePath,
            nextImageUri: "",
            nextImageLabel: "",
            nextImagePath: "",
        });
    }
    else{
        this.fetchImage();
    }
  }

  isCar(that) {
    this.postLabel(1);
    if (this.state.nextImageUri !== ""){
        that.setState({
            imageUri: this.state.nextImageUri,
            imageLabel: this.state.nextImageLabel,
            imagePath: this.state.nextImagePath,
            nextImageUri: "",
            nextImageLabel: "",
            nextImagePath: "",
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
        imagePath: this.state.prevImagePath,
        nextImageUri: (this.state.imageUri === this.state.prevImageUri) ? this.state.nextImageUri : this.state.imageUri,
        nextImageLabel: (this.state.imageLabel === this.state.prevImageLabel) ? this.state.nextImageLabel : this.state.imageLabel,
        nextImagePath: (this.state.imagePath === this.state.prevImagePath) ? this.state.nextImagePath : this.state.imagePath,
    });
  }

  postLabel(label) {
    fetch('http://192.168.1.25:5000', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        img_path: this.state.imagePath,
        label: label,
      })
    })
  }

  fetchImage() {
    var url = 'http://192.168.1.25:5000';
    fetch(url)
      .then( response => response.json() )
      .then( jsonData => {
        this.setState({
          prevImageUri: this.state.imageUri,
          prevImageLabel: this.state.imageLabel,
          prevImagePath: this.state.imagePath,
          imageUri: 'http://192.168.1.25:8800/' + jsonData.img_name,
          imageLabel: jsonData.car_model,
          imagePath: jsonData.img_path
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
                <Button color="tomato" onPress={() => {this.notCar(this)}} title="Not car"/>
                <Button color="grey" onPress={() => {this.reviewDecision(this)}} title="Undo"/>
                <Button onPress={() => {this.isCar(this)}} title="  Car  "/>
            </View>
          </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',  // '#f2f2f2',
  },
  thumb: {
    backgroundColor: '#ffffff',
    marginBottom: 5,
    marginTop: 50,
    elevation: 5
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
