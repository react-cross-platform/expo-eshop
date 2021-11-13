import { gql, useQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { RootStackParamList } from "../../navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const CATEGORY_ID = 123;

const CATEGORIES_QUERY = gql`
  query categories {
    categories {
      id
      name
      alias
      parent {
        id
      }
      image {
        src
      }
    }
  }
`;

const HomeView = ({ route, navigation }: Props) => {
  const { loading, error, data } = useQuery(CATEGORIES_QUERY);
  if (loading) return <Text>Loading...</Text>;
  if (error) {
    console.error(error);
    return <Text>Error :(</Text>;
  }
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <FlatList
        data={data.categories}
        renderItem={({ item, index }) => {
          return (
            <Text
              onPress={() =>
                navigation.navigate("Category", { categoryId: item.id })
              }
            >
              {item.name}
            </Text>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default HomeView;
