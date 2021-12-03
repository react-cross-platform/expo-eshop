import { gql, useQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { FlatList, SafeAreaView, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RootStackParamList } from "../../navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

type Category = {
  id: string;
  name: string;
  alias: string;
  parent: {
    id: string;
  };
  image: {
    src: string;
  };
};

type CategoriesData = {
  categories: Category[];
};

type CategoriesVars = {};

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

const HomeView = (props: Props) => {
  const { navigation } = props;

  const { loading, error, data } = useQuery<CategoriesData, CategoriesVars>(
    CATEGORIES_QUERY
  );
  if (loading) return <Text>Loading...</Text>;
  if (error) {
    console.error(error);
    return <Text>Error :(</Text>;
  }

  const rootCategories: Category[] = [];
  const childrenCategories: { [id: Category["id"]]: Category[] } = {};
  const { categories } = data!;
  categories.forEach((category) => {
    if (category.parent) {
      const rootCategoryId = category.parent.id;
      if (!(rootCategoryId in childrenCategories)) {
        childrenCategories[rootCategoryId] = [];
      }
      childrenCategories[rootCategoryId].push(category);
    } else {
      rootCategories.push(category);
    }
  });

  return (
    <SafeAreaView>
      <FlatList
        data={rootCategories}
        renderItem={({ item, index }) => {
          return (
            <View style={{ flexDirection: "row" }} key={item.id}>
              <Text
                style={{
                  color: "red",
                  marginBottom: 10,
                }}
              >
                {item.name}
              </Text>
              {childrenCategories[item.id].map((category) => {
                return (
                  <TouchableOpacity
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                    onPress={() =>
                      navigation.navigate("Category", {
                        categoryId: category.id,
                      })
                    }
                    key={category.id}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        backgroundColor: "gray",
                      }}
                    >
                      <View>
                        <Image
                          style={{ width: 75, height: 75 }}
                          source={{ uri: category.image.src }}
                        />
                      </View>
                      <View>
                        <Text
                          style={{
                            width: 75,
                            textAlign: "center",
                          }}
                        >
                          {category.name}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default HomeView;
