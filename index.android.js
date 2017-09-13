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
  TouchableHighlight
} from 'react-native';

class ImageLabeler extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      moviesData: ds.cloneWithRows([]),
      imageUri: "https://image.tmdb.org/t/p/w500_and_h281_bestv2/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg",
      imageLabel: "Pfft"
    };
  }

  componentDidMount() {
    this.fetchMoviesData();
  }

  _handlePress(that) {
    that.setState((prevState) => {
        return {
            imageUri: 'https://image.tmdb.org/t/p/w500_and_h281_bestv2/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg',
            imageLabel: "Hello!"
        };
    });
    console.log('Pressed!');
  }

  renderRow(rowData){
    return (
      <View style={styles.thumb}>
        <Image
          source={{uri:'https://image.tmdb.org/t/p/w500_and_h281_bestv2/'+rowData.poster_path}}
          resizeMode="cover"
          style={styles.img} />
        <Button onPress={this._handlePress} title="Positive">"Hello!"</Button>
        <Text style={styles.txt}>{rowData.title} (Rating: {Math.round( rowData.vote_average * 10 ) / 10})</Text>
      </View>
    );
  }

  fetchMoviesData() {
    var url = 'http://api.themoviedb.org/3/movie/now_playing?api_key=17e62b78e65bd6b35f038505c1eec409';
    fetch(url)
      .then( response => response.json() )
      .then( jsonData => {
        this.setState({
          moviesData: this.state.moviesData.cloneWithRows(jsonData.results),
        });
      })
    .catch( error => console.log('Error fetching: ' + error) );
  }

//  render() {
//    return (
//      <ListView
//        dataSource={this.state.moviesData}
//        renderRow={this.renderRow}
//        style={styles.container}
//      />
//    );
//  }

  render() {
      return (
          <View style={styles.thumb}>
            <Image
              source={{uri:this.state.imageUri}}
              resizeMode="cover"
              style={styles.img} />
            <Button onPress={() => {this._handlePress(this)}} title="Positive">"Hello!"</Button>
            <Text style={styles.txt}>Spider-Man: {this.state.imageLabel} (Rating: 10)</Text>
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
    elevation: 1
  },
  img: {
    height: 300
  },
  txt: {
    margin: 10,
    fontSize: 16,
    textAlign: 'left'
  }
});

AppRegistry.registerComponent('ImageLabeler', () => ImageLabeler);

