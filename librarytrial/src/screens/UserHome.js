import React, { Component } from "react";
import { Alert, TouchableOpacity, BackHandler, StyleSheet, FlatList, View, Image, Text, StatusBar, ScrollView } from "react-native";
import HeaderX from "../components/HeaderX";
import { NavigationEvents } from "react-navigation";
import { TextInput } from "react-native-gesture-handler";


class UserHome extends Component {

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      filteredDataSource: all.Books,
    }

  }

  setFilteredDataSource = (text) => {
    this.setState({ filteredDataSource: text });
  };

  viewBook(book) {
    current = book;
    this.props.navigation.navigate('UserViewBook');
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

        }).catch(console.log("fui"));

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
    //  this.props.navigation.goBack(null);
    Alert.alert(
      'Log out?',
      'Do you want to log out?',
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
  render() {

    console.log("all " + JSON.stringify(User))

    console.log("all " + all.Books)

    search = ""
    masterDataSource = all.Books;
    const searchFilterFunction = (text) => {
      // Check if searched text is not blank
      if (text) {
        // Inserted text is not blank
        // Filter the masterDataSource
        // Update FilteredDataSource
        const newData = masterDataSource.filter(function (item) {
          const itemData = item.title
            ? item.title.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        this.setFilteredDataSource(newData);
        search = text;

      } else {
        // Inserted text is blank
        // Update FilteredDataSource with masterDataSource
        this.setFilteredDataSource(masterDataSource);
        search = text;
      }
      console.log("filtered: " + JSON.stringify(this.state.filteredDataSource))
    };
    const ItemSeparatorView = () => {
      return (
        // Flat List Item Separator
        <View
          style={{
            height: 3,
            width: '100%',
            backgroundColor: 'white',
          }}
        />
      );
    };
    const ItemView = ({ item }) => {
      //  console.log("itemsss" + JSON.stringify(this.state.filteredDataSource))
      console.log("current book" + JSON.stringify(item))
      return (
        <TouchableOpacity
          onPress={this.viewBook.bind(this, item)}
          style={styles.bookclick}
        >
          <View style={styles.scrollViewEntry} >
            <View style={[styles.rect2, this.props.style]}>
              <Image
                source={{ uri: item.imagePath }} resizeMode="contain"
                style={styles.image}

              ></Image>
              <Text style={styles.text4}>{item.title}</Text>
            </View>

          </View>

        </TouchableOpacity>
      );
    };

    var admin;
    if (User.type == "0") {//admin
      admin = true;


    }
    else {
      admin = null;
    }
    return (

      <View style={styles.root}>
        <NavigationEvents
          onWillFocus={() => {
            console.log("current focus requests" + JSON.stringify(all))

            this.setFilteredDataSource(all.Books);
          }}
        />
        <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0)" />
        <HeaderX
          icon2Family="Feather"
          icon2Name="search"
          style={styles.headerX}
        ></HeaderX>
        <View style={styles.body}>
          <View style={styles.tabs}>
            <TextInput
              round
              onChangeText={(text) => searchFilterFunction(text)}
              onClear={(text) => searchFilterFunction('')}
              style={styles.cupertinoSearchBarBasic}
              placeholder="Search"
            />
          </View>
          <View style={styles.scrollArea}>
            <FlatList
              horizontal={false}
              data={this.state.filteredDataSource}
              keyExtractor={(item) => item._id}
              renderItem={ItemView}
              ItemSeparatorComponent={ItemSeparatorView}
              contentContainerStyle={styles.scrollArea_contentContainerStyle}
            />

          </View>
          <TouchableOpacity
            onPress={() => this.viewall()}
            style={styles.button1}
          >
            <View style={{ justifyContent: 'center', width: "100%", height: "100%" }}>

              <Text style={styles.lend}>View Requests</Text>
            </View>
          </TouchableOpacity>
          {(admin) &&
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("AddBook")}
              style={styles.button3}
            >
              <View style={{ justifyContent: 'center', width: "100%", height: "100%" }}>

                <Text style={styles.text2}>Add Book</Text>
              </View>
            </TouchableOpacity>}

        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  bookclick: {
    height: 'auto',
    flex: 0,
  },
  root: {
    flex: 1,
    flexDirection: "column",
  },
  headerX: {
    height: 77,
    elevation: 15,
    shadowOffset: {
      height: 7,
      width: 1
    },
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignSelf: "stretch"
  },
  body: {
    flex: 1,
    justifyContent: "center",
  },
  tabs: {
    width: "100%",
    height: 40,
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    elevation: 0,
    shadowOffset: {
      height: 0,
      width: 0
    },
    shadowColor: "rgba(0,0,0,1)",
    shadowRadius: 0,
    alignSelf: "stretch"
  },
  rect2: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    alignSelf: "center",
  },
  image: {
    width: 80,
    height: "100%"
  },
  text4: {
    // height: 14,
    color: "#121212",
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,

    marginHorizontal: "2%"

  },
  cupertinoSearchBarBasic: {
    color: "white",
    borderRadius: 50,
    width: "100%",
    marginHorizontal: "2%",
    backgroundColor: "#3d3d3d",
    flex: 1,
    paddingLeft: 10
  },
  scrollArea: {
    flex: 1,
  },
  scrollArea_contentContainerStyle: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "flex-start",

  },
  scrollViewEntry: {
    paddingHorizontal: 5,
    width: "100%",
    alignSelf: "center",
  },
  container: {
    width: '100%',
    shadowOpacity: 0.01,
    alignSelf: "stretch",
    marginBottom: 0,
    marginLeft: 0,

  }, button1: {
    height: 55,
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
    fontSize: 15,
    fontWeight: "bold",


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
  }
});

export default UserHome;
