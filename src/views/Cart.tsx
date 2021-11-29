import { useQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import gql from "graphql-tag";
import React from "react";
import { Text, View } from "react-native";
import { RootStackParamList } from "../../navigation";

const CART_QUERY = gql`
  query cart {
    cart {
      id
      phone
      email
      firstName
      lastName
      city
      address
      comment
      items {
        id
        amount
        price
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

type Props = NativeStackScreenProps<RootStackParamList, "Cart">;

const Cart = (props: Props) => {
  const { navigation, route } = props;

  const { loading, error, data } = useQuery(CART_QUERY);

  console.log("cart", data);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text>{route.params.categoryId}</Text>
    </View>
  );
};

export default Cart;
