import React, { Component } from "react";
import {
    StyleSheet,
    View,
    StatusBar,
    ImageBackground,
    Text,
    TextInput,
    Image,
    Picker,
    Alert,
    TouchableOpacity
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import EntypoIcon from "react-native-vector-icons/Entypo";
import Responsive from 'react-native-lightweight-responsive';
import { BackHandler } from 'react-native';



export default class AddBook extends Component {

    componentDidMount() {

        this.props.navigation.addListener(
            'didFocus',
            payload => {

                this.state = {
                    isSelected: false,
                    setSelected: false,
                    email: "",
                    password: "",
                    conpassword: "",
                    username: "",
                    code: ""
                };
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
    //  this.props.navigation.goBack(null);
    Alert.alert(
      'Exit sign up?',
      'Any data that you already filled will be gone, do you wanna proceed to login page?',
      [
        {
          text: 'Yes',
          onPress: () => this.props.navigation.navigate("Login")
        },
        {
          text: 'No',
        },
      ],
      { cancelable: false },
    );
    return true;
  }
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

        this.state = {
            isSelected: false,
            setSelected: false,
            email: "",
            password: "",
            conpassword: "",
            username: "",
            code: ""
        };
    }



    componentWillUnmount() { }
    SignUp() {

        var username = this.state.username;
        var email = this.state.email;
        var password = this.state.password;
        var conpassword = this.state.conpassword;
        var code = this.state.code;
        //   console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) === false) {
            Alert.alert("Email is incorrect");
        }
        else {
            if (code == "Admin") {
                var type = 0

            }
            else {
                var type = 1;
            }
            if (password == conpassword && email && password && username) {
                fetch('https://fierce-chamber-08145.herokuapp.com/signup', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'username': username,
                        'email': email,
                        'password': password,
                        'type': type
                    }),
                })
                    .then((response) => response.json())
                    .then((responseData) => {
                        if (responseData.error != null || responseData.Requests.error) {

                            Alert.alert("Error! unable to create the account (email might already exist)")
                        }

                        else if (responseData.User.type == "0") {
                            User = responseData.User;

                            all = responseData;
                            this.props.navigation.navigate('AdminHome')

                        }
                        else {
                            User = responseData.User;

                            all = responseData;
                            this.props.navigation.navigate('UserHome')
                        }

                    }).catch(() => { });
            }
            else {
                this.setState({
                    err: "password dosen't match"
                })
                Alert.alert("Missing data");
            }
        }
    }
    handleConpassword = (text) => {
        this.setState({ conpassword: text });
    };
    handleCode = (text) => {
        this.setState({ code: text });
    };
    handleName = (text) => {
        this.setState({ username: text });
    };
    handlePassword = (text) => {
        this.setState({ password: text });
    };

    handleEmail = (text) => {
        this.setState({ email: text });
    };

    render() {
        return (
            <View style={styles.root}>
                <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0)" />
                <View style={styles.background}>
                    <ImageBackground
                        style={styles.rect2}
                        imageStyle={styles.rect2_imageStyle}
                        source={require("../assets/images/Gradient_FpV13fX.png")}
                    >
                        <View style={styles.group2}>
                            <Text style={styles.text3}>Sign Up</Text>
                            <View style={styles.form}>
                                <View style={styles.name}>
                                    <FontAwesomeIcon
                                        name="user"
                                        style={styles.icon5}
                                    ></FontAwesomeIcon>
                                    <TextInput
                                        placeholder="Username"
                                        placeholderTextColor="rgba(255,255,255,1)"
                                        secureTextEntry={false}
                                        style={styles.nameInput}
                                        onChangeText={this.handleName}

                                    ></TextInput>
                                </View>
                                <View style={styles.name}>
                                    <EntypoIcon name="email" style={styles.icon6}></EntypoIcon>
                                    <TextInput
                                        placeholder="Email"
                                        placeholderTextColor="rgba(255,255,255,1)"
                                        secureTextEntry={false}
                                        onChangeText={this.handleEmail}

                                        style={styles.emailInput}
                                    ></TextInput>
                                </View>
                                <View style={styles.name}>
                                    <EntypoIcon name="lock" style={styles.icon6}></EntypoIcon>
                                    <TextInput
                                        placeholder="Password"
                                        placeholderTextColor="rgba(255,255,255,1)"
                                        secureTextEntry={true}
                                        onChangeText={this.handlePassword}

                                        style={styles.emailInput}
                                    ></TextInput>
                                </View>
                                <View style={styles.name}>
                                    <EntypoIcon name="lock" style={styles.icon6}></EntypoIcon>
                                    <TextInput
                                        placeholder="Repeat password"
                                        placeholderTextColor="rgba(255,255,255,1)"
                                        secureTextEntry={true}
                                        onChangeText={this.handleConpassword}

                                        style={styles.emailInput}
                                    ></TextInput>
                                </View>
                                <View style={styles.name}>
                                    <FontAwesomeIcon name="gears" style={styles.icon6}></FontAwesomeIcon>
                                    <TextInput
                                        placeholder="AdminCode"
                                        placeholderTextColor="rgba(255,255,255,1)"
                                        secureTextEntry={false}
                                        onChangeText={this.handleCode}

                                        style={styles.emailInput}
                                    ></TextInput>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => this.SignUp()}
                                style={styles.button}
                            >
                                <Text style={styles.add8}>Sign up</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
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
    background: {
        flex: 1
    },
    rect2: {
        flex: 1
    },
    rect2_imageStyle: {},
    group2: {
        alignItems: "center",
        justifyContent: "space-around",
        flex: 1
    },
    text3: {
        color: "rgba(255,255,255,1)",
        fontSize: Responsive.font(32),
        textAlign: "center",
        marginRight: Responsive.width(20),
        marginLeft: Responsive.width(20),
        marginTop: Responsive.height(15)
    },
    form: {
        flex: 1,
        alignSelf: "stretch",
        marginRight: Responsive.width(20),
        marginLeft: Responsive.width(20),
        justifyContent: "center"
    },
    name: {
        height: Responsive.height(59),
        backgroundColor: "rgba(255,255,255,0.25)",
        borderRadius: 5,
        alignSelf: "stretch",
        flexDirection: "row",
        marginTop: Responsive.height(14)
    },
    icon5: {
        color: "rgba(255,255,255,1)",
        fontSize: Responsive.font(33),
        width: Responsive.width(33),
        height: Responsive.height(33),
        marginLeft: Responsive.width(19),
        alignSelf: "center"
    },
    nameInput: {
        height: Responsive.height(30),
        color: "rgba(255,255,255,1)",
        flex: 1,
        marginRight: Responsive.width(17),
        marginLeft: Responsive.width(9),
        marginTop: Responsive.height(14)
    },
    email: {
        backgroundColor: "rgba(255,255,255,0.25)",
        borderRadius: 5,
        alignSelf: "stretch",
        flexDirection: "row",
        marginTop: Responsive.height(14)
    },
    icon6: {
        color: "rgba(255,255,255,1)",
        fontSize: Responsive.font(33),
        marginLeft: Responsive.width(15),
        alignSelf: "center"
    },
    emailInput: {
        color: "rgba(255,255,255,1)",
        flex: 1,
        marginRight: Responsive.width(17),
        marginLeft: Responsive.width(13),
        marginTop: Responsive.height(14)
    },
    group: {
        height: Responsive.height(119),
        flexDirection: "row",
        justifyContent: "space-around",
        alignSelf: "stretch",
        marginRight: Responsive.width(20),
        marginLeft: Responsive.width(20)
    },
    image: {
        width: Responsive.width(119),
        height: Responsive.height(119)
    },
    button1: {
        height: Responsive.height(37),
        backgroundColor: "rgba(0,0,0,1)",
        borderRadius: 100,
        alignSelf: "center",
        width: Responsive.width(148),
        justifyContent: "center"
    },
    addImage: {
        color: "rgba(255,255,255,1)",
        alignSelf: "center"
    },
    button: {
        height: Responsive.height(55),
        backgroundColor: "rgba(247,247,247,0)",
        borderRadius: 5,
        borderColor: "rgba(255,255,255,1)",
        borderWidth: 1,
        alignSelf: "stretch",
        marginRight: Responsive.width(20),
        marginLeft: Responsive.width(20),
        paddingBottom: 0,
        marginBottom: Responsive.height(48),
        justifyContent: "center"
    },
    add8: {
        width: Responsive.width(66),
        color: "rgba(255,255,255,1)",
        textAlign: "center",
        alignSelf: "center"
    }
});
