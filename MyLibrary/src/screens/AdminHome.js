import React, { Component } from "react";
import { Alert, FlatList, TouchableOpacity, StyleSheet, View, StatusBar, ScrollView, Image, Text } from "react-native";
import HeaderX from "../components/HeaderX";
import { TextInput } from "react-native-gesture-handler";
import { NavigationEvents } from "react-navigation";
import { BackHandler } from 'react-native';
import Responsive from 'react-native-lightweight-responsive';

class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    this.state = {
      filteredDataSource: all.Requests,
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
  viewall() {
    fetch('https://fierce-chamber-08145.herokuapp.com/Books', {
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

          this.props.navigation.navigate('UserHome')


        }

      }).catch();
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
  viewRequest(item) {
    
    console.log("my clicked "+JSON.stringify(item))
    current = item;
    this.props.navigation.navigate('AdminViewBook');
  }
  setFilteredDataSource = (text) => {
    this.setState({ filteredDataSource: text });
  };

  render() {
    var admin;
    if (User.type == "0") {
      admin = true;
    }
    else {
      admin = null
    }
    search = ""
    masterDataSource = all.Requests;
    const searchFilterFunction = (text) => {
      // Check if searched text is not blank
      if (text) {
        // Inserted text is not blank
        // Filter the masterDataSource
        // Update FilteredDataSource
        const newData = masterDataSource.filter(function (item) {
          const itemData = item.book.title
            ? item.book.title.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        } ||
          function (item) {
            const itemData = item.user.username
              ? item.user.username.toUpperCase()
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
            height:  Responsive.height(3),
            width: '100%',
            backgroundColor: 'white',
          }}
        />
      );
    };
    const ItemView = ({ item }) => {
      //  console.log("itemsss" + JSON.stringify(this.state.filteredDataSource))
      console.log("current book" + JSON.stringify(item))
      var currentstatus;
      if (item.status == "0") {
        currentstatus = "Status: pending"
      }
      else if (item.status == "1") {
        currentstatus = "Status: approved"

      }
      else {
        currentstatus = "Status: rejected"

      }
      return (
        <TouchableOpacity
          onPress={this.viewRequest.bind(this, item)}
          style={styles.bookclick}
        >
          <View style={styles.scrollViewEntry} >
            <View style={[styles.rect2, this.props.style]}>
              <Image
                source={{ uri: item.book.imagePath }}
                resizeMode="contain"
                style={styles.image}
              ></Image>
              <Text style={styles.text4}>{item.book.title}{"\n"}{item.user.username}{"\n"}{currentstatus}</Text>
            </View>

          </View>

        </TouchableOpacity>
      );
    };
    return (
      <View style={styles.root}>
        <NavigationEvents
          onWillFocus={() => {
            if (all.message) { all = { Requests: [] } }
            console.log("current focus requests" + JSON.stringify(all))

            this.setFilteredDataSource(all.Requests);
            // update based on your requirements!
          }}
        />
        <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0)" />
        <HeaderX style={styles.headerX} navigation={this.props.navigation}></HeaderX>
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
          <Text style={styles.text3}>Requests</Text>
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

              <Text style={styles.lend}>View Books</Text>
            </View>
          </TouchableOpacity>
          {admin && <TouchableOpacity
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
Responsive.setOptions({width: 411.42857142857144, height: 830.8571428571429, enableOnlySmallSize: true});

const styles = StyleSheet.create({
  bookclick: {
    height: 'auto',
    flex: 0,
  },
  button1: {
    height: Responsive.height(55),
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
    fontSize: Responsive.font(15),
    fontWeight: "bold",


  }, text2: {
    color: "white",
    textAlign: "center",
    fontSize: Responsive.font(15),
    fontWeight: "bold",


  },
  button3: {
    height: Responsive.height(55),
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
  root: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "rgb(255,255,255)"
  },
  rect2: {
    width: "100%",
    height: Responsive.height(100),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    alignSelf: "center",
    margin: "2%"
  },
  image: {
    width: Responsive.width(55),
    height: Responsive.height(81)
  },
  text4: {
    // height: 14,
    color: "#121212",
    fontSize: Responsive.font(16),
    fontWeight: "bold",
    flexWrap: "wrap"
  },
  headerX: {
    height: Responsive.height(77),
    elevation: 15,
    shadowOffset: {
      height: Responsive.height(7),
      width: Responsive.width(1)
    },
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignSelf: "stretch"
  },
  body: {
    justifyContent: "center",
    flex: 1
  },
  scrollArea: {
    flex: 1,
  },
  scrollArea_contentContainerStyle: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-around",

  },
  scrollViewEntry: {

    width: "100%",
    alignSelf: "center",
  },
  container: {
    width: '100%',
    shadowOpacity: 0.01,
    alignSelf: "stretch",
    marginBottom: 0,
    marginLeft: 0,
    flexDirection: "column",

  },

  text3: {
    color: "rgba(255,255,255,1)",
    fontSize: Responsive.font(24),
    textAlign: "center",
    marginRight: Responsive.width(20),
    marginLeft:  Responsive.width(20)
  }, cupertinoSearchBarBasic: {
    color: "white",
    borderRadius: 50,
    width: "100%",
    marginHorizontal: "2%",
    backgroundColor: "#3d3d3d",
    flex: 1,
    paddingLeft:  Responsive.width(10)
  },
  tabs: {
    width: "100%",
    height:  Responsive.height(40),
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    elevation: 0,
    shadowOffset: {
      height: 0,
      width: 0
    },
    paddingBottom: Responsive.height(10),
    marginBottom: Responsive.height(10),
    shadowColor: "rgba(0,0,0,1)",
    shadowRadius: 0,
    alignSelf: "stretch"
  },
});

export default AdminHome;
