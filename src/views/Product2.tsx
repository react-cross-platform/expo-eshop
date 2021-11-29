// import { gql, useQuery, useMutation } from "@apollo/client";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import React from "react";
// import { Text, View, Image } from "react-native";
// import { RootStackParamList } from "../../navigation";

// const PRODUCT_QUERY = gql`
//   query product($id: Int) {
//     product(id: $id) {
//       id
//       name
//       shortDescription
//       description
//       brand {
//         id
//         name
//       }
//       category {
//         id
//         name
//       }
//       images(size: MD, withColorOnly: false) {
//         id
//         src
//         width
//         height
//         isTitle
//         attributeValue {
//           id
//           name
//           value
//         }
//       }
//       subProducts {
//         id
//         article
//         price
//         oldPrice
//         discount
//         attributes {
//           name
//           values {
//             id
//             name
//             value
//             description
//           }
//         }
//       }
//       attributes {
//         id
//         name
//         values {
//           name
//           description
//         }
//       }
//     }
//   }
// `;

// const Product = ({ route, navigation }) => {
//   console.log("route", route);
//   const variables = {
//     id: route.params.id,
//   } as any;

//   const { loading, error, data } = useQuery(PRODUCT_QUERY, {
//     variables,
//   });
//   console.log("data", data);

//   if (loading) return <Text>Loading...</Text>;
//   if (error) {
//     return <Text>Error :(</Text>;
//   }

//   return (
//     <View>
//       <Image
//         style={{ width: 75, height: 75 }}
//         source={{ uri: data.allProducts.products.images[0].src }}
//       />
//       <Text>{data.product.name}</Text>
//     </View>
//   );
// };

// export default Product;
