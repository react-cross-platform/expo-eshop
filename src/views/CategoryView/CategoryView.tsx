import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";
import { RootStackParamList } from "../../navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Category">;

const CategoryView = ({ navigation, route }: Props) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>It's category #{route.params.categoryId}</Text>
    </View>
  );
};

export default CategoryView;
