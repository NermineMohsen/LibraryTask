import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  Text,
  TouchableOpacity,
  Alert
} from "react-native";
import HeaderX from "../components/HeaderX";
import { BackHandler } from 'react-native';

class UserViewBook extends Component {
  state = {
    del: null,
  };
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

  }
  viewall() {
    fetch('https://fierce-chamber-08145.herokuapp.com/Books', {
      method: 'GET',

      headers: JSON.stringify({
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData.error);
        if (responseData.error != null) {
          if (responseData.error.message == "no product exist") {
            Alert.alert("No products yet in that category!")
          }

        }
        else {
          console.log(JSON.stringify(responseData));
          all = responseData

          this.props.navigation.navigate('UserHome')


        }

      }).catch(console.log("error"));
  }
  borrow() {
    fetch('https://fierce-chamber-08145.herokuapp.com/Request/new', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        book: current,
        user: User,
        status: "0"
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData.error);
        if (responseData.error != null) {
          if (responseData.error.message == "no product exist") {
            Alert.alert("error occured!")
          }

        }
        else {
          console.log(JSON.stringify(responseData));
          all = responseData
          Alert.alert("request submitted")
          //this.props.navigation.navigate('UserHome')


        }

      }).catch(console.log("error"));
  }
  componentDidMount() {

    this.props.navigation.addListener(
      'didFocus',
      payload => {
        this.forceUpdate();
      }
    );

  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    this.viewall();
    return true;
  }
  delete() {
    fetch('https://fierce-chamber-08145.herokuapp.com/Books/delete', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: current._id
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData.error);
        if (responseData.error != null) {
          if (responseData.error.message == "no product exist") {
            Alert.alert("error occured!")
          }

        }
        else {
          all = responseData
          Alert.alert(
            'Success',
            'Book was deleted successfully',
            [
              {
                text: 'Ok',
                onPress: this.viewall()
              },

            ],
            { cancelable: false },
          );          //this.props.navigation.navigate('UserHome')


        }

      }).catch();
  }
  render() {
    var del, borr;
    if (User.type == "0") {//admin
      del = true;
      borr = false;
      //    this.setState({ del: true });
      //this.setState({ borr: null });

    }
    else {
      del = false;
      borr = true;
    }


    return (
      <View style={styles.root}>
        <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0)" />
        <HeaderX icon2Name="power" style={styles.headerX}></HeaderX>
        <View style={styles.body}>
          <View style={styles.contain}>
            <Image
              source={{ uri: current.imagePath }}
              resizeMode="contain"
              style={styles.avatar}
            ></Image>
            <Text style={styles.userName}>{current.title}</Text>
          </View>
          <Text style={styles.userDummy}>{current.description} </Text>


        </View>
        {(borr) && <TouchableOpacity
          onPress={() => this.borrow()}
          style={styles.button1}
        >
          <View style={{ justifyContent: 'center', width: "100%", height: "100%" }}>

            <Text style={styles.lend}>Borrow</Text>
          </View>
        </TouchableOpacity>}

        {(del) && <TouchableOpacity
          onPress={() => this.delete()}
          style={styles.button1}
        >
          <View style={{ justifyContent: 'center', width: "100%", height: "100%" }}>

            <Text style={styles.lend}>Delete</Text>
          </View>
        </TouchableOpacity>}
        {(del) &&
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("AddBook")}
            style={styles.button3}
          >
            <View style={{ justifyContent: 'center', width: "100%", height: "100%" }}>

              <Text style={styles.text2}>Add Book</Text>
            </View>
          </TouchableOpacity>}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgb(255,255,255)"
  },
  contain: {
    margin: "3%",
    flexDirection: "row",
    height: "50%"
  },
  headerX: {
    height: 80,
    elevation: 15,
    shadowOffset: {
      height: 7,
      width: 1
    },
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.1,
    shadowRadius: 5
  },
  body: {
    backgroundColor: "white",
    flexDirection: "column",
    flex: 1,
    alignContent: "space-between",


  },
  avatar: {
    width: "40%",
    height: "100%",
    resizeMode: 'stretch'
  },
  userName: {
    color: "#580438",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    flex: 1,
    flexWrap: 'wrap'
  }, text2: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",


  },
  button3: {
    height: 55,
    borderRadius: 80,
    backgroundColor: "rgba(88,4,56,1)",
    borderRadius: 5,
    borderColor: "rgba(0,0,0,1)",
    borderWidth: 1,
    alignSelf: "center",
    justifyContent: "flex-end",
    width: "80%",
    marginBottom: "3%"
  },
  button1: {
    height: 55,
    borderRadius: 80,
    backgroundColor: "rgba(88,4,56,1)",
    borderRadius: 5,
    borderColor: "rgba(0,0,0,1)",
    borderWidth: 1,
    alignSelf: "center",
    justifyContent: "flex-end",
    width: "80%",
    marginBottom: "3%"
  },
  lend: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",


  },
  userDummy: {
    fontFamily: "roboto-regular",
    color: "#121212",
    width: "100%",
    fontSize: 14,
    textAlign: "center",
    marginTop: "5%",
    justifyContent: "center",
    alignSelf: "center"
  },

});

export default UserViewBook;
