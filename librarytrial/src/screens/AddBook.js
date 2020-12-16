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

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { BackHandler } from 'react-native';


export default class AddBook extends Component {

  state = {
    image: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
      setSelected: false,
      title: '',
      description: '',

    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

  }


  componentDidMount() {
    this.getPermissionAsync();
    this.props.navigation.addListener(
      'didFocus',
      payload => {
        this.setState({ image: result });

        this.handleDecription("")
        this.handleName("")
      }
    );
  }

  componentWillUnmount() { }
  onAdd() {
    var title = this.state.title;
    var description = this.state.description;
    var image = this.state.image;
    if (!image) {



      image = "https://www.allianceplast.com/wp-content/uploads/2017/11/no-image.png"



    }

    if (title && description && image) { //missing data!!!!

      fetch('https://fierce-chamber-08145.herokuapp.com/Books/new', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "imagePath": image.uri,
          "title": title,
          "description": description,
        }),
      })
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.error != null) {
            //       this.props.navigate('MainApp') //// till we fi

            Alert.alert("Error occured");
          }
          else {
            // Alert.alert("Added Successfully!");
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
                  all = responseData;
                  this.props.navigation.navigate('AdminHome')


                }

              }).catch();
            ///   this.props.navigate('MainApp')
          }

        }).catch(() => { });

    }
    else {
      Alert.alert("Missing data!");

    }
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    };
  };
  handleName = (text) => {
    this.setState({ title: text });
  };
  handleDecription = (text) => {
    this.setState({ description: text });
  };
  viewall() {
    if (User.type == "0") {//admin
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

        }).catch(console.log(""));

    }
    else {
      fetch('https://fierce-chamber-08145.herokuapp.com/allrequests/' + User._id, {
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
            all = responseData

            this.props.navigation.navigate('AdminHome')


          }

        }).catch(console.log(""));
    }
  } componentWillMount() {
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
  render() {
    const { image } = this.state
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
              <Text style={styles.text3}>Add Book</Text>
              <View style={styles.form}>
                <View style={styles.name}>
                  <FontAwesomeIcon
                    name="book"
                    style={styles.icon5}
                  ></FontAwesomeIcon>
                  <TextInput
                    placeholder="Name"
                    placeholderTextColor="rgba(255,255,255,1)"
                    secureTextEntry={false}
                    style={styles.nameInput}
                    onChangeText={this.handleName}

                  ></TextInput>
                </View>
                <View style={styles.email}>
                  <EntypoIcon name="open-book" style={styles.icon6}></EntypoIcon>
                  <TextInput
                    placeholder="Description"
                    placeholderTextColor="rgba(255,255,255,1)"
                    secureTextEntry={false}
                    onChangeText={this.handleDecription}
                    numberOfLines={8}
                    style={styles.emailInput}
                  ></TextInput>
                </View>
              </View>
              <View style={styles.group}>
                {/* <Image
                  source={require("../assets/images/no-image-icon-6.png")}
                  resizeMode="contain"
                  style={styles.image}
                ></Image> */}
                {image && <Image resizeMode="contain" source={{ uri: image.uri }} style={styles.image} />}

                <TouchableOpacity
                  onPress={this._pickImage}
                  style={styles.button1}
                >
                  <Text style={styles.addImage}>Add image</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => this.onAdd()}
                style={styles.button}
              >
                <Text style={styles.add8}>Add</Text>
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
    fontSize: 24,
    textAlign: "center",
    marginRight: 20,
    marginLeft: 20
  },
  form: {
    height: 151,
    alignSelf: "stretch",
    marginRight: 20,
    marginLeft: 20,
    justifyContent: "space-between"
  },
  name: {
    height: 59,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 5,
    alignSelf: "stretch",
    flexDirection: "row"
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
