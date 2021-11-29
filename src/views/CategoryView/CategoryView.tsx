import { gql, useQuery, useMutation } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Text, View, Image, Button, Dimensions } from "react-native";
import { RootStackParamList } from "../../navigation";
import { TouchableOpacity } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const ADD_CART_ITEM_MUTATION = gql`
  mutation addCartItem($subProductId: Int!, $attributeValueIds: [Int]) {
    addCartItem(
      subProductId: $subProductId
      attributeValueIds: $attributeValueIds
    ) {
      cartItem {
        cart {
          id
          phone
          email
          firstName
          lastName
          city
          address
          comment
        }
        id
        price
        amount
        attributeValues {
          id
          name
          value
        }
        subProduct {
          id
          article
          price
          oldPrice
          product {
            id
            name
            brand {
              id
              name
            }
            images(size: SM, withColorOnly: true) {
              id
              src
              width
              height
              isTitle
              attributeValue {
                id
                name
                value
              }
            }
          }
        }
      }
    }
  }
`;

const PRODUCTS_QUERY = gql`
  query allProducts(
    $categoryId: Int
    $withDiscountOnly: Boolean
    $filters: String
    $sorting: String
    $offset: Int
    $first: Int
  ) {
    allProducts(
      categoryId: $categoryId
      withDiscountOnly: $withDiscountOnly
      filters: $filters
      sorting: $sorting
      offset: $offset
      first: $first
    ) {
      found
      total
      sorting {
        icon
        name
        value
        isSelected
      }
      filters {
        id
        name
        isColor
        hasChecked
        help
        type
        icon
        iconColor
        resetUrl
        values {
          id
          name
          isChecked
          filterValue
          help
          count
          url
          value
        }
      }
      products {
        id
        name
        shortDescription
        brand {
          id
          name
        }
        category {
          id
          name
        }
        images(size: SM, withColorOnly: true, first: 5) {
          id
          src
          width
          height
          isTitle
          attributeValue {
            id
            name
            value
          }
        }
        subProducts {
          id
          article
          price
          oldPrice
          discount
        }
      }
    }
  }
`;

export const LIMIT = 5;

type Props = NativeStackScreenProps<RootStackParamList, "Category">;

const CategoryView = ({ navigation, route }: Props) => {
  const [state, setState] = useState(false);

  const variables = {
    categoryId: route.params.categoryId,
    first: LIMIT,
    withDiscountOnly: false,
    offset: 0,
  } as any;

  const { loading, data, fetchMore } = useQuery(PRODUCTS_QUERY, {
    variables,
  });
  // console.log("data", data);

  const [addProduct] = useMutation(ADD_CART_ITEM_MUTATION);

  const addProductToCart = async (item) => {
    const variables = {
      subProductId: parseInt(item.subProducts[0].id),
      attributeValueIds: [item.images[0].attributeValue.id],
    };

    const result = await addProduct({
      variables: {
        subProductId: item.subProducts[0].id,
        attributeValueIds: [item.images[0].attributeValue.id],
      },
    });

    console.log("result", result);
  };

  const productToPage = (el) => {
    navigation.navigate("Product", { id: el.id });
  };

  if (loading) return <Text>Loading...</Text>;
  // if (error) {
  //   return <Text>Error :(</Text>;
  // }

  const fetchMoreProducts = async () => {
    setState(true);
    const res = await fetchMore({
      variables: {
        offset: data.allProducts.products.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        // return Object.assign({}, prev, {
        //   feed: [...prev.feed, ...fetchMoreResult.feed]
        // });

        console.log("prev", prev);
        console.log("fetchMoreResult", fetchMoreResult);
        console.log(
          "mergedAllProducts",
          Object.assign({}, prev, {
            allProducts: {
              ...fetchMoreResult.allProducts,
              products: [
                ...prev.allProducts.products,
                ...fetchMoreResult.allProducts.products,
              ],
            },
          })
        );
        return Object.assign({}, prev, {
          allProducts: {
            ...fetchMoreResult.allProducts,
            products: [
              ...prev.allProducts.products,
              ...fetchMoreResult.allProducts.products,
            ],
          },
        });
      },
    });
    setState(false);
  };
  console.log("state", state);
  // console.log("data.allProducts", data.allProducts.products);
  console.log("data", data.allProducts.products);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button onPress={fetchMoreProducts} title="Fetch more" />

      {data.allProducts.products.map((el) => {
        console.log("e", el.images[0].src);

        return (
          <TouchableOpacity key={el.id} onPress={() => productToPage(el)}>
            <View>
              <Image
                style={{ width: 75, height: 75 }}
                // source={{ uri: data.allProducts.products.images[0].src }}
                source={{ uri: el.images[0].src }}
              />
              <Text>{el.name}</Text>
              <Text>Код товара: {el.id}</Text>
            </View>
          </TouchableOpacity>
        );
      })}

      {state && (
        <View
          style={{
            width,
            height,
            position: "absolute",
            // opacity: 0.4,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 48, fontWeight: "900" }}>Loading</Text>
        </View>
      )}
    </View>
  );
};

export default CategoryView;
