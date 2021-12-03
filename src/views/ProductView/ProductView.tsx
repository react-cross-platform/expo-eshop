import { gql, useQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  Text,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Check,
  CheckCircle,
  CheckCircleFilled,
  CircleEmpty,
  CircleFilled,
} from "../../components/Icons";
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
  attributes: [IAttribute];
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
  attributes: IAttribute[];
}

export interface IAttribute {
  name: string;
  values: [IAttributeValue];
}

export interface IAttributeValue {
  id: number;
  name: string;
  value: string;
  description: string;
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
  id: string;
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
    id: route.params.id, // product.id
  };

  const { loading, error, data } = useQuery<ProductData, ProductVars>(
    PRODUCT_QUERY,
    {
      variables,
    }
  );

  const [activeSubProductId, setActiveSubProductId] = useState<string>(
    data?.product.subProducts[0].id!
  );

  useEffect(() => {
    if (!!data) {
      setActiveSubProductId(data!.product.subProducts[0].id);
    }
  }, [data]);

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
    attributes,
    images,
    subProducts,
  } = product;

  const activeSubProduct = getActiveSubProduct(
    subProducts,
    activeSubProductId!
  );

  const activeImage =
    activeSubProduct.id === activeSubProductId && activeAttributeValueIds > [0]
      ? images.filter((image) => {
          return (
            image.attributeValue && // check that image is not empty
            activeAttributeValueIds.includes(image.attributeValue.id) // and that we have this image.id in the listIds
          );
        })[0]
      : images.filter((image) => image.isTitle === true)[0]; // or main image

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        style={{ width: 275, height: 475 }}
        source={{ uri: activeImage.src }}
      />

      <Text>{product.name}</Text>
      <Text>{activeSubProduct.article}</Text>

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
              <CheckCircleFilled fill={image.attributeValue?.value} />
            ) : (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  setActiveAttributeValueIds([image.attributeValue!.id]);
                }}
              >
                <CircleFilled fill={image.attributeValue?.value} />
              </TouchableOpacity>
            )
          )}
      </View>
      <View>
        {subProducts.map((subProduct, i) =>
          activeSubProductId == subProduct.id ? (
            <View
              key={i}
              style={{
                width: 250,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <CheckCircleFilled fill={"orange"} />
              <Text style={{ backgroundColor: "red" }}>
                {subProduct.article}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  width: 65,
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ backgroundColor: "yellow" }}>
                  {subProduct.price}
                </Text>
                <Text>грн</Text>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              key={i}
              style={{
                justifyContent: "space-between",
                flexDirection: "column",
                display: "flex",
              }}
              onPress={() => setActiveSubProductId(subProduct.id)}
            >
              <View
                key={i}
                style={{
                  width: 250,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <CircleEmpty fill="grey" />
                <Text>{subProduct.article}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    width: 65,
                    justifyContent: "space-between",
                  }}
                >
                  <Text>{subProduct.price}</Text>
                  <Text>грн</Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        )}
      </View>
    </ScrollView>
  );
};

export default ProductView;
