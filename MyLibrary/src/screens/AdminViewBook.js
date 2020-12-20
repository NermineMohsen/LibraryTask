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
import Responsive from 'react-native-lightweight-responsive';

class AdminViewBook extends Component {

  constructor(props) {
    super(props);

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);



  }
  viewall() {
    if (User.type == "0") {//admin
      fetch('https://fierce-chamber-08145.herokuapp.com/Requests', {
        method: 'GET',

        headers: JSON.stringify({
        }),
      })
        .then((response) => response.json())
        .then((responseData) => {
          
          if (responseData.error != null) {
            if (responseData.error.message == "no product exist") {
              Alert.alert("No products yet in that category!")
            }

          }
          else {
            
            all = responseData

            this.props.navigation.navigate('AdminHome')


          }

        }).catch();

    }
    else {
      fetch('https://fierce-chamber-08145.herokuapp.com/allrequests/' + User._id, {
        method: 'GET',

        headers: JSON.stringify({
        }),
      })
        .then((response) => response.json())
        .then((responseData) => {
          
          if (responseData.error != null) {
            if (responseData.error.message == "no product exist") {
              Alert.alert("No products yet in that category!")
            }

          }
          else {
            all = responseData

            this.props.navigation.navigate('AdminHome')


          }

        }).catch();
    }
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
  componentDidMount() {

    this.props.navigation.addListener(
      'didFocus',
      payload => {
        this.forceUpdate();
      }
    );

  }
  lend() {
    fetch('https://fierce-chamber-08145.herokuapp.com/Request/status', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: current._id,
        status: "1"
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        
        if (responseData.error != null) {
          if (responseData.error.message == "no product exist") {
            Alert.alert("error occured!")
          }

        }
        else {
          
          all = responseData
          Alert.alert("request approved")
          //this.props.navigation.navigate('UserHome')


        }

      }).catch();
  }
  deleterequest() {
    fetch('https://fierce-chamber-08145.herokuapp.com/Request/delete', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: current._id,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        
        if (responseData.error != null) {
          if (responseData.error.message == "no product exist") {
            Alert.alert("error occured!")
          }

        }
        else {
          
          all = responseData
          Alert.alert("request deleted")
        }

      }).catch();
  }
  disaprove() {
    fetch('https://fierce-chamber-08145.herokuapp.com/Request/status', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: current._id,
        status: "1"
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        
        if (responseData.error != null) {
          if (responseData.error.message == "no product exist") {
            Alert.alert("error occured!")
          }

        }
        else {
          
          all = responseData
          Alert.alert("request disapproved")
          //this.props.navigation.navigate('UserHome')


        }

      }).catch();
  }
  render() {
    var user;

    var admin;
    if (User.type == "0") {//admin
      admin = true;
      user = null;

    }
    else {
      admin = null;
      user = true;
    }
    var view;
    var currentstatus;
    if (current.status == "0") {
      view = true;

      currentstatus = "Status: pending"
    }
    else if (current.status == "1") {
      currentstatus = "Status: approved"
      view = null;
    }
    else {
      currentstatus = "Status: rejected"
      view = null;


    }
    return (
      <View style={styles.root}>
        <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0)" />
        <HeaderX icon2Name="power" style={styles.headerX}></HeaderX>
        <View style={styles.body}>
          <View style={styles.contain}>
            <Image
              source={{ uri: current.book.imagePath }}
              resizeMode="contain"
              style={styles.avatar}
            ></Image>
            <Text style={styles.userName}>{current.book.title}</Text>
          </View>
          <Text style={styles.userDummy}>User Name:{current.user.username}{"\n"}{currentstatus} </Text>
        </View>
        {admin && view && <TouchableOpacity
          onPress={() => this.lend()}
          style={styles.button1}
        >
          <View style={{ justifyContent: 'center', width: "100%", height: "100%" }}>

            <Text style={styles.lend}>Lend</Text>
          </View>
        </TouchableOpacity>}
        {admin && view && <TouchableOpacity
          onPress={() => this.disaprove()}
          style={styles.button2}
        >
          <View style={{ justifyContent: 'center', width: "100%", height: "100%" }}>

            <Text style={styles.text2}>Reject request</Text>
          </View>
        </TouchableOpacity>
        }{admin && <TouchableOpacity
          onPress={() => this.props.navigation.navigate("AddBook")}
          style={styles.button3}
        >
          <View style={{ justifyContent: 'center', width: "100%", height: "100%" }}>

            <Text style={styles.text2}>Add Book</Text>
          </View>
        </TouchableOpacity>}
        {user && <TouchableOpacity
          onPress={() => this.deleterequest()}
          style={styles.button3}
        >
          <View style={{ justifyContent: 'center', width: "100%", height: "100%" }}>

            <Text style={styles.text2}>Delete Request</Text>
          </View>
        </TouchableOpacity>}

      </View>
    );
  }
}
Responsive.setOptions({ width: 411.42857142857144, height: 830.8571428571429, enableOnlySmallSize: true });

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
    height: Responsive.height(80),
    elevation: 15,
    shadowOffset: {
      height: Responsive.height(7) ,
      width: Responsive.width(1) 
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
    fontSize: Responsive.font(22) ,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    flex: 1,
    flexWrap: 'wrap'
  },
  button3: {
    height: Responsive.height(55) ,
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
  button2: {
    height: Responsive.height(55) ,
    borderRadius: 80,
    backgroundColor: "black",
    borderRadius: 5,
    borderColor: "rgba(0,0,0,1)",
    borderWidth: 1,
    alignSelf: "center",
    justifyContent: "flex-end",
    width: "80%",
    marginBottom: "3%"
  },
  button1: {
    height: Responsive.height(55) ,
    borderRadius: 80,
    borderColor: "rgba(88,4,56,1)",
    borderRadius: 5,
    backgroundColor: "white",
    borderWidth: 1,
    alignSelf: "center",
    justifyContent: "flex-end",
    width: "80%",
    marginBottom: "3%"
  },
  lend: {
    color: "black",
    textAlign: "center",
    fontSize: Responsive.font(15) ,
    fontWeight: "bold",


  }, text2: {
    color: "white",
    textAlign: "center",
    fontSize: Responsive.font(15) ,
    fontWeight: "bold",


  },
  userDummy: {
    color: "#121212",
    width: "100%",
    fontSize: Responsive.font(15),
    textAlign: "center",
    marginTop: "5%",
    justifyContent: "center",
    alignSelf: "center"
  },

});

export default AdminViewBook;
