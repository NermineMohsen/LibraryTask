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

    constructor(props) {
        super(props);
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
                        console.log(responseData);

                        if (responseData.error != null || responseData.Requests.error) {

                            Alert.alert("Error! unable to create the account (email might already exist)")
                        }

                        else if (type == "0") {
                            User = responseData.Requests
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
                            User = responseData.Requests
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

                                }).catch();

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
                                        name="book"
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
                                    <EntypoIcon name="open-book" style={styles.icon6}></EntypoIcon>
                                    <TextInput
                                        placeholder="Email"
                                        placeholderTextColor="rgba(255,255,255,1)"
                                        secureTextEntry={false}
                                        onChangeText={this.handleEmail}

                                        style={styles.emailInput}
                                    ></TextInput>
                                </View>
                                <View style={styles.name}>
                                    <EntypoIcon name="open-book" style={styles.icon6}></EntypoIcon>
                                    <TextInput
                                        placeholder="Password"
                                        placeholderTextColor="rgba(255,255,255,1)"
                                        secureTextEntry={true}
                                        onChangeText={this.handlePassword}

                                        style={styles.emailInput}
                                    ></TextInput>
                                </View>
                                <View style={styles.name}>
                                    <EntypoIcon name="open-book" style={styles.icon6}></EntypoIcon>
                                    <TextInput
                                        placeholder="Repeat password"
                                        placeholderTextColor="rgba(255,255,255,1)"
                                        secureTextEntry={true}
                                        onChangeText={this.handleConpassword}

                                        style={styles.emailInput}
                                    ></TextInput>
                                </View>
                                <View style={styles.name}>
                                    <EntypoIcon name="open-book" style={styles.icon6}></EntypoIcon>
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
        fontSize: 32,
        textAlign: "center",
        marginRight: 20,
        marginLeft: 20,
        marginTop: 15
    },
    form: {
        flex: 1,
        alignSelf: "stretch",
        marginRight: 20,
        marginLeft: 20,
        justifyContent: "center"
    },
    name: {
        height: 59,
        backgroundColor: "rgba(255,255,255,0.25)",
        borderRadius: 5,
        alignSelf: "stretch",
        flexDirection: "row",
        marginTop: 14
    },
    icon5: {
        color: "rgba(255,255,255,1)",
        fontSize: 33,
        width: 33,
        height: 33,
        marginLeft: 19,
        alignSelf: "center"
    },
    nameInput: {
        height: 30,
        color: "rgba(255,255,255,1)",
        fontSize: 14,
        flex: 1,
        marginRight: 17,
        marginLeft: 9,
        marginTop: 14
    },
    email: {
        backgroundColor: "rgba(255,255,255,0.25)",
        borderRadius: 5,
        alignSelf: "stretch",
        flexDirection: "row",
        marginTop: 14
    },
    icon6: {
        color: "rgba(255,255,255,1)",
        fontSize: 33,
        marginLeft: 15,
        alignSelf: "center"
    },
    emailInput: {
        color: "rgba(255,255,255,1)",
        flex: 1,
        marginRight: 17,
        marginLeft: 13,
        marginTop: 14
    },
    group: {
        height: 119,
        flexDirection: "row",
        justifyContent: "space-around",
        alignSelf: "stretch",
        marginRight: 20,
        marginLeft: 20
    },
    image: {
        width: 119,
        height: 119
    },
    button1: {
        height: 37,
        backgroundColor: "rgba(0,0,0,1)",
        borderRadius: 100,
        alignSelf: "center",
        width: 148,
        justifyContent: "center"
    },
    addImage: {
        color: "rgba(255,255,255,1)",
        alignSelf: "center"
    },
    button: {
        height: 55,
        backgroundColor: "rgba(247,247,247,0)",
        borderRadius: 5,
        borderColor: "rgba(255,255,255,1)",
        borderWidth: 1,
        alignSelf: "stretch",
        marginRight: 20,
        marginLeft: 20,
        paddingBottom: 0,
        marginBottom: 48,
        justifyContent: "center"
    },
    add8: {
        width: 66,
        color: "rgba(255,255,255,1)",
        textAlign: "center",
        alignSelf: "center"
    }
});
