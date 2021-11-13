import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import CategoryView from "./views/CategoryView/CategoryView";
import HomeView from "./views/HomeView/HomeView";

export type RootStackParamList = {
  Home: undefined;
  Category: { categoryId: number };
};

const RootStack = createStackNavigator<RootStackParamList>();

export const Router = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen name="Home" component={HomeView} />
        <RootStack.Screen name="Category" component={CategoryView} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
