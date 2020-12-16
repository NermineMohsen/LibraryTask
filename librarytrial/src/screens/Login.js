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
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";

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
            console.log(responseData.error);
            if (responseData.error != null) {

              Alert.alert("Error! incorrect info")
            }
            else {
              var type = responseData.type;
              User = responseData
              if (type == "0") {
                fetch('https://fierce-chamber-08145.herokuapp.com/Requests', {
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

                      this.props.navigation.navigate('AdminHome')


                    }

                  }).catch();
              }
              else {//client
                // if validation fails, value will be null
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

                  }).catch(console.log(""));

              }



            }

          }).catch(console.log(""));
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
                    <EvilIconsIcon
                      name="user"
                      style={styles.icon22}
                    ></EvilIconsIcon>
                    <TextInput
                      placeholder="Email"
                      placeholderTextColor="rgba(255,255,255,1)"
                      secureTextEntry={false}
                      onChangeText={this.handleEmail}

                      style={styles.usernameInput}
                    ></TextInput>
                  </View>
                  <View style={styles.password}>
                    <EvilIconsIcon
                      name="lock"
                      style={styles.icon2}
                    ></EvilIconsIcon>
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
                <Text style={styles.needHelp}>New? sign up know</Text>
              </TouchableOpacity>

            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }
}
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
    fontSize: 96,
    marginBottom: 4
  },
  rect7: {
    height: 8,
    backgroundColor: "#25cdec",
    marginRight: 4
  },
  text3Column: {
    marginBottom: 6,
    marginLeft: 2,
    marginRight: -1
  },
  form: {
    height: 230,
    marginTop: 88
  },
  username: {
    height: 59,
    backgroundColor: "rgba(251,247,247,0.25)",
    borderRadius: 5,
    flexDirection: "row"
  },
  icon22: {
    color: "rgba(255,255,255,1)",
    fontSize: 30,
    marginLeft: 20,
    alignSelf: "center"
  },
  usernameInput: {
    height: 30,
    color: "rgba(255,255,255,1)",
    flex: 1,
    marginRight: 11,
    marginLeft: 11,
    marginTop: 14
  },
  password: {
    height: 59,
    backgroundColor: "rgba(253,251,251,0.25)",
    borderRadius: 5,
    flexDirection: "row",
    marginTop: 27
  },
  icon2: {
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    marginLeft: 20,
    alignSelf: "center"
  },
  passwordInput: {
    height: 30,
    color: "rgba(255,255,255,1)",
    flex: 1,
    marginRight: 17,
    marginLeft: 8,
    marginTop: 14
  },
  usernameColumn: {},
  usernameColumnFiller: {
    flex: 1
  },
  button: {
    height: 59,
    backgroundColor: "rgba(0,0,0,1)",
    borderRadius: 5,
    justifyContent: "center"
  },
  text2: {
    color: "rgba(255,255,255,1)",
    alignSelf: "center"
  },
  logoColumn: {
    marginTop: 130,
    marginLeft: 41,
    marginRight: 41
  },
  logoColumnFiller: {
    flex: 1
  },
  footerTexts: {
    height: 14,
    flexDirection: "row",
    marginBottom: 36,
    marginLeft: 37,
    marginRight: 36
  },
  button2: {
    width: 104,
    height: 14,
    alignSelf: "flex-end"
  },
  createAccountFiller: {
    flex: 1
  },
  createAccount: {
    color: "rgba(255,255,255,0.5)"
  },
  button2Filler: {
    flex: 1,
    flexDirection: "row"
  },
  needHelp: {
    color: "rgba(255,255,255,0.5)",
    alignSelf: "flex-end",
    marginRight: -1
  }
});

export default Login;
