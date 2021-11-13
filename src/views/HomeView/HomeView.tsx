import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";
import { RootStackParamList } from "../../navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const CATEGORY_ID = 123;

const HomeView = ({ route, navigation }: Props) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        onPress={() => {
          navigation.navigate("Category", { categoryId: CATEGORY_ID });
        }}
      >
        Go to category #{CATEGORY_ID}
      </Text>
    </View>
  );
};

export default HomeView;
