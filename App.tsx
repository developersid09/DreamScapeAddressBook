
import React from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./src/store";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { enableScreens } from 'react-native-screens';
import Icon from "react-native-vector-icons/Ionicons";

import LoginScreen from "./src/screens/LoginScreen";
import AddressBookScreen from "./src/screens/AddressBookScreen";
import FavouritesScreen from "./src/screens/FavouritesScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
enableScreens();

const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size, focused }) => {
        let iconName: string = "";

        if (route.name === "AddressBook") {
          iconName = focused ? "book" : "book-outline";
        } else if (route.name === "Favourites") {
          iconName = focused ? "heart" : "heart-outline";
        } else if (route.name === "Profile") {
          iconName = focused ? "person" : "person-outline";
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#00bbffff",
      tabBarInactiveTintColor: "gray",
      headerShown: false,
    })}>
    <Tab.Screen name="AddressBook" component={AddressBookScreen} options={{ title: "Address Book" }} />
    <Tab.Screen name="Favourites" component={FavouritesScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
