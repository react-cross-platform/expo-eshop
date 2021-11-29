import { gql, useQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { FlatList, SafeAreaView, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RootStackParamList } from "../../navigation";
// import { ICategory } from "@src/modules/product/model";

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

const HomeView = (props: Props) => {
  const { route, navigation } = props;

  const { loading, error, data } = useQuery(CATEGORIES_QUERY);
  if (loading) return <Text>Loading...</Text>;
  if (error) {
    console.error(error);
    return <Text>Error :(</Text>;
  }

  const { categories } = data;
  const startCats = [];
  const childrenMap = {};
  for (const cat of categories!) {
    if (cat.parent) {
      const key = cat.parent.id;
      if (!(key in childrenMap)) {
        childrenMap[key] = [];
      }
      childrenMap[key].push(cat);
    } else {
      startCats.push(cat);
    }
  }

  const prev = {
    products: [1, 2, 3, 4, 5],
  };

  const newResult = {
    products: [6, 7, 8, 9, 10],
  };

  const result = {
    products: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  };

  console.log("result", result);

  return (
    <SafeAreaView>
      <Text onPress={() => navigation.navigate("Cart", {})}>Cart</Text>
      <FlatList
        data={startCats}
        renderItem={({ item, index }) => {
          return (
            <View style={{ flexDirection: "row" }} key={item.id}>
              <Text
                style={{
                  color: "red",
                  marginBottom: "10px",
                }}
              >
                {item.name}
              </Text>
              {childrenMap[item.id].map((el) => {
                return (
                  <TouchableOpacity
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                    onPress={() =>
                      navigation.navigate("Category", { categoryId: el.id })
                    }
                    key={el.id}
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
                          source={{ uri: el.image.src }}
                        />
                      </View>
                      <View>
                        <Text
                          style={{
                            width: 75,
                            textAlign: "center",
                          }}
                        >
                          {el.name}
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
