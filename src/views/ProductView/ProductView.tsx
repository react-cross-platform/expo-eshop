import { gql, useQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { RootStackParamList } from "../../navigation";

const PRODUCT_QUERY = gql`
  query product($id: Int) {
    product(id: $id) {
      id
      name
      shortDescription
      description
      brand {
        id
        name
      }
      category {
        id
        name
      }
      images(size: MD, withColorOnly: false) {
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
        attributes {
          name
          values {
            id
            name
            value
            description
          }
        }
      }
      attributes {
        id
        name
        values {
          name
          description
        }
      }
    }
  }
`;

export interface ISubProduct {
  id: string;
  article: string;
  price: number;
  oldPrice: number;
  discount: number;
  // attributes: [IAttribute];
}

export interface IImage {
  id: string;
  src: string;
  width: number;
  height: number;
  isTitle: boolean;
  // colorValue: string;
  // colorName: string;
  attributeValue?: IAttributeValue;
}

export interface IAttributeValue {
  id: number;
  name: string;
  value: string;
  description: string;
}

export interface IProduct {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  // brand: IBrand;
  category: ICategory;
  images: IImage[];
  imagesWithColor: IImage[];
  subProducts: ISubProduct[];
  // attributes: IAttribute[];
}

export interface ICategory {
  id: string;
  name: string;
  alias: string;
  products: [IProduct];
  parent: IParentCategory;
  image: IImage;
}

export interface IParentCategory {
  id: string;
  name: string;
}

const productId = "7726";

export const getImagesWithColor = (images: IImage[]): IImage[] => {
  return images.filter(
    (image) => image.attributeValue && image.attributeValue.value !== ""
  );
}; // retutn list of images where image.attributeValue (id, name, value, description) !== "";

const getActiveSubProduct = (
  subProducts: ISubProduct[],
  activeSubProductId: string
): ISubProduct => {
  return (
    subProducts.filter((sp) => sp.id === activeSubProductId)[0] ||
    subProducts[0]
  );
}; // return activeSubProduct or first in list of subProducts

interface ProductData {
  product: IProduct;
}

interface ProductVars {
  id: number;
}

type Props = NativeStackScreenProps<RootStackParamList, "Product">;

const ProductView = ({ navigation, route }: Props) => {
  /**
   * Selected values of "color" filter from CategoryView
   * or selected color in ProductView
   */
  const [activeAttributeValueIds, setActiveAttributeValueIds] = useState<
    number[]
  >([]);

  const variables = {
    // id: subProductId,
    id: route.params.id,
  };

  const { loading, error, data } = useQuery<ProductData, ProductVars>(
    PRODUCT_QUERY,
    {
      variables,
    }
  );

  if (loading) return <Text>Loading...</Text>;
  if (error) {
    return <Text>Error :(</Text>;
  }

  const { product } = data!;
  const imagesWithColor = getImagesWithColor(product.images);
  const {
    id,
    //  brand,
    description,
    // attributes,
    images,
    subProducts,
  } = product;

  // console.log("subProducts", subProducts);
  // console.log("subProductId", productId);

  const activeSubProduct = getActiveSubProduct(subProducts, productId!);
  console.log("activeSubProduct", activeSubProduct);

  // console.log("subProducts", subProducts); // [{id: '37415'}, {...}, {...}, {...}, {...}]

  const subProductId = data!.product.subProducts[0].id;
  const activeImage =
    activeSubProduct.id === subProductId && // {id: 37415} === {id: 7726} ?
    activeAttributeValueIds > [0]
      ? images.filter((image) => {
          return (
            image.attributeValue && // check that image is not empty
            activeAttributeValueIds.includes(image.attributeValue.id) // and that we have this image.id in the listIds
          );
        })[0]
      : images.filter((image) => image.isTitle === true)[0]; // or main image

  // console.log("images", images); // Objects list with [{attributeValue: {id, name, value}, height, id, isTitle, src, width }]
  // console.log("activeSubProduct.id", activeSubProduct.id); // 37415
  // console.log("subProductId", subProductId); // 7726
  // console.log("activeImage", activeImage); // Object { id: 56264}
  // console.log("data", data); // {product: {…}}
  // console.log("imagesWithColor", imagesWithColor); // Object list with colors

  console.log("activeImage", activeImage);

  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        style={{ width: 275, height: 475 }}
        // source={{ uri: product.images[0].src }}
        source={{ uri: activeImage.src }}
      />

      <Text>{product.name}</Text>

      <View
        style={{
          flex: 1,
          height: 100,
          width: "100%",
          flexDirection: "row",
        }}
      >
        {imagesWithColor.length > 0 &&
          imagesWithColor.map((image, i) =>
            activeAttributeValueIds.includes(image.attributeValue!.id) ? (
              <View
                key={i}
                style={{
                  backgroundColor: image.attributeValue!.value,
                  width: 50,
                  height: 50,
                }}
              >
                <Text key={i}>OK</Text>
              </View>
            ) : (
              <TouchableOpacity
                key={i}
                style={{
                  backgroundColor: image!.attributeValue!.value,
                  borderRadius: 1,
                  width: 50,
                  height: 50,
                }}
                onPress={() => {
                  console.log("particular_image", image);
                  setActiveAttributeValueIds([image.attributeValue!.id]);
                }}
              >
                <Text
                  style={{
                    backgroundColor: image.attributeValue!.value,
                  }}
                />
              </TouchableOpacity>
            )
          )}
      </View>
    </View>
  );
};

export default ProductView;
