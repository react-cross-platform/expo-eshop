import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Cart from "./views/Cart";
import CategoryView from "./views/CategoryView/CategoryView";
import HomeView from "./views/HomeView/HomeView";
import ProductView from "./views/ProductView/ProductView";
// import Bag from "./views/Bag";

export type RootStackParamList = {
  Home: undefined;
  Category: { categoryId: number };
  Cart: {};
  Product: {
    id: number;
  };
};

const RootStack = createStackNavigator<RootStackParamList>();

export const Router = () => {
  return (
    <NavigationContainer linking={{ enabled: true, prefixes: [''] }}>
      {/* <RootStack.Navigator initialRouteName="Product"> */}
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen name="Home" component={HomeView} />
        <RootStack.Screen name="Cart" component={Cart} />
        <RootStack.Screen name="Category" component={CategoryView} />
        <RootStack.Screen name="Product" component={ProductView} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
