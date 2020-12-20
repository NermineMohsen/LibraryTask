import React, { useState } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import  AppLoading  from "expo-app-loading";
import * as Font from "expo-font";
import AddBook from "./src/screens/AddBook";
import AdminHome from "./src/screens/AdminHome";
import AdminViewBook from "./src/screens/AdminViewBook";
import Login from "./src/screens/Login";
import UserHome from "./src/screens/UserHome";
import UserViewBook from "./src/screens/UserViewBook";
import Signup from "./src/screens/Signup";
import EntypoIcon from "react-native-vector-icons/Entypo";

const DrawerNavigation = createDrawerNavigator({
    "Logout": Login,


});
EntypoIcon.loadFont();
const StackNavigation = createStackNavigator(
  {
    DrawerNavigation: {
      screen: DrawerNavigation
    },
    Login: Login,
    Signup: Signup,
    AdminHome: AdminHome,
    AddBook: AddBook,
    AdminViewBook: AdminViewBook,
    UserHome: UserHome,
    UserViewBook: UserViewBook,
  },
  {
    headerMode: "none"
  }, {
  initialRouteName: 'Login'
}
);

const AppContainer = createAppContainer(StackNavigation);

function App() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return isLoadingComplete ? <AppContainer /> : <AppLoading />;
  }
}
async function loadResourcesAsync() {
  await Promise.all([
    Font.loadAsync({
    })
  ]);
}
function handleLoadingError(error) {
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

export default App;
