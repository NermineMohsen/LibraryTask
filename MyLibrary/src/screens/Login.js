import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert
} from "react-native";
import { EvilIcons } from '@expo/vector-icons'; 
import Responsive from 'react-native-lightweight-responsive';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }    //this.onChoice = this.onChoice.bind(this);

  }
  componentDidMount() {

    this.props.navigation.addListener(
      'didFocus',
      payload => {
        this.handleEmail("")
        this.handlePassword("")
      }
    );

  }
  handleEmail = (text) => {
    this.setState({ email: text });
  };

  handlePassword = (text) => {
    this.setState({ password: text });
  };
  loader() {
    var email = this.state.email;
    var password = this.state.password;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      //this.props.navigate('MainApp')
      Alert.alert("Email is incorrect");
    }
    else {
      if (email && password) {
        // if validation fails, value will be null
        fetch('https://fierce-chamber-08145.herokuapp.com/login', {
          method: 'POST',
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password
          }),
        })
          .then((response) => response.json())
          .then((responseData) => {
            if (responseData.error != null) {

              Alert.alert("Error! incorrect info")
            }
            else {
              var type = responseData.User.type;
              User = responseData.User;
              
              if (type == "0") {
                all=responseData;
                console.log("books"+JSON.stringify(all))
                this.props.navigation.navigate('AdminHome')

              }
              else {
                all=responseData;
                this.props.navigation.navigate('UserHome')
              }



            }

          }).catch();
      }
    }

  }
  render() {
    return (
      <View style={styles.root}>
        <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0)" />
        <View style={styles.background}>
          <ImageBackground
            style={styles.rect}
            imageStyle={styles.rect_imageStyle}
            source={require("../assets/images/Gradient_LTnU3oJ.png")}
          >
            <View style={styles.logoColumn}>
              <View style={styles.logo}>
                <Image
                  source={require("../assets/images/logo2.png")}
                  resizeMode="contain"
                  style={styles.image}
                ></Image>
              </View>
              <View style={styles.form}>
                <View style={styles.usernameColumn}>
                  <View style={styles.username}>
                    <EvilIcons
                      name="user"
                      style={styles.icon22}
                    ></EvilIcons>
                    <TextInput
                      placeholder="Email"
                      placeholderTextColor="rgba(255,255,255,1)"
                      secureTextEntry={false}
                      onChangeText={this.handleEmail}

                      style={styles.usernameInput}
                    ></TextInput>
                  </View>
                  <View style={styles.password}>
                    <EvilIcons
                      name="lock"
                      style={styles.icon2}
                    ></EvilIcons>
                    <TextInput
                      placeholder="Password"
                      placeholderTextColor="rgba(255,255,255,1)"
                      secureTextEntry={true}
                      style={styles.passwordInput}
                      onChangeText={this.handlePassword}

                    ></TextInput>
                  </View>
                </View>
                <View style={styles.usernameColumnFiller}></View>
                <TouchableOpacity
                  onPress={() => this.loader()}
                  style={styles.button}
                >
                  <Text style={styles.text2}>Get Started</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.logoColumnFiller}></View>
            <View style={styles.footerTexts}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Signup")}
                style={styles.button2}
              >
                <View style={styles.button2Filler}></View>
                <Text style={styles.needHelp}>New? sign up now</Text>
              </TouchableOpacity>

            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }
}
Responsive.setOptions({width: 411.42857142857144, height: 830.8571428571429, enableOnlySmallSize: true});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgb(255,255,255)"
  },
  background: {
    flex: 1
  },
  image: {
    height: "100%",
    width: "100%",
    alignItems: 'center',
    justifyContent: "center",
    alignSelf: "center"
  },
  rect: {
    flex: 1
  },
  rect_imageStyle: {},
  logo: {
    width: "100%",
    height: "40%",
    alignSelf: "center",

  },
  endWrapperFiller: {
    flex: 1
  },
  text3: {
    color: "rgba(255,255,255,1)",
    fontSize: Responsive.font(96),
    marginBottom: Responsive.height(4)
  },
  rect7: {
    height: Responsive.height(8),
    backgroundColor: "#25cdec",
    marginRight: Responsive.width(4)
  },
  text3Column: {
    marginBottom: Responsive.height(6),
    marginLeft: Responsive.width(2),
    marginRight: Responsive.width(-1)
  },
  form: {
    height: Responsive.height(230),
    marginTop: Responsive.height(88)
  },
  username: {
    height: Responsive.height(59),
    backgroundColor: "rgba(251,247,247,0.25)",
    borderRadius: 5,
    flexDirection: "row"
  },
  icon22: {  
    color: "rgba(255,255,255,1)",
    fontSize: Responsive.font(33),
    marginLeft: Responsive.width(20),
    alignSelf: "center"
  },
  usernameInput: {
    height: Responsive.height(30),
    color: "rgba(255,255,255,1)",
    flex: 1,
    marginRight: Responsive.width(11),
    marginLeft: Responsive.width(11),
    marginTop: Responsive.height(14)
  },
  password: {
    height: Responsive.height(59),
    backgroundColor: "rgba(253,251,251,0.25)",
    borderRadius: 5,
    flexDirection: "row",
    marginTop: Responsive.height(27)
  },
  icon2: {
    color: "rgba(255,255,255,1)",
    fontSize: Responsive.font(33),
    marginLeft: Responsive.width(20),
    alignSelf: "center"
  },
  passwordInput: {
    height: Responsive.height(30),
    color: "rgba(255,255,255,1)",
    flex: 1,
    marginRight: Responsive.width(17),
    marginLeft: Responsive.width(8),
    marginTop: Responsive.height(14)
  },
  usernameColumn: {},
  usernameColumnFiller: {
    flex: 1
  },
  button: {
    height: Responsive.height(59),
    backgroundColor: "rgba(0,0,0,1)",
    borderRadius: 5,
    justifyContent: "center"
  },
  text2: {
    color: "rgba(255,255,255,1)",
    alignSelf: "center"
  },
  logoColumn: {
    marginTop: Responsive.height(130),
    marginLeft: Responsive.width(41),
    marginRight: Responsive.width(41)
  },
  logoColumnFiller: {
    flex: 1
  },
  footerTexts: {
    height: Responsive.height(14),
    flexDirection: "row",
    marginBottom: Responsive.height(36),
    marginLeft: Responsive.width(37),
    marginRight: Responsive.width(36)
  },
  button2: {
    width: 104,
    alignSelf: "flex-start",
    bottom: Responsive.height(20)

  },
  createAccountFiller: {
    flex: 1
  }, 
  createAccount: {
    color: "rgba(255,255,255,0.5)"
  },
  button2Filler: {
    flex: 1,
    flexDirection: "row",


  },
  needHelp: {
    color: "rgba(255,255,255,0.5)",
    alignSelf: "flex-end",
    marginLeft: Responsive.width(4),
  }
});

export default Login;
