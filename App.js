import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SetRepo from "./screens/SetRepo";
import SetUser from "./screens/SetUser";
import Home from "./screens/Home";

import { Provider } from "react-redux";
import { createStore } from "redux";
import { combineReducers } from "redux";
import DataReducer from "./redux/DataReducer";

const Stack = createStackNavigator();

const rootReducer = combineReducers({
  data: DataReducer,
});

const myStore = createStore(rootReducer);

export default function App({ route, navigation }) {
  return (
    <Provider store={myStore}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name='Home' component={Home}></Stack.Screen>
          <Stack.Screen name='USER' component={SetUser}></Stack.Screen>
          <Stack.Screen name='REPOSITORY' component={SetRepo}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
