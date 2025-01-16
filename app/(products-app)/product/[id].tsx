import ProductImages from "@/presentation/products/components/ProductImages";
import { useProduct } from "@/presentation/products/hooks/useProduct";
import ThemedActivityIndicator from "@/presentation/theme/components/ThemedActivityIndicator";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedButtonGroup from "@/presentation/theme/components/ThemedButtonGroup";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import { ThemedView } from "@/presentation/theme/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useLocalSearchParams, Redirect } from "expo-router";
import { useEffect } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

const ProductScreen = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const { productQuery } = useProduct(`${id}`);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Ionicons name="camera-outline" size={25} />,
    });
  }, []);

  useEffect(() => {
    if (productQuery.data) {
      navigation.setOptions({
        title: productQuery.data.title,
      });
    }
  }, [productQuery.data]);

  if (productQuery.isLoading) {
    return <ThemedActivityIndicator />;
  }

  if (!productQuery.data) {
    return <Redirect href="/(products-app)/(home)" />;
  }

  const product = productQuery.data!;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView>
        <ProductImages images={product.images} />

        <ThemedView style={{ marginHorizontal: 10, marginTop: 10 }}>
          <ThemedTextInput placeholder="Título" style={{ marginVertical: 5 }} />
          <ThemedTextInput placeholder="Slug" style={{ marginVertical: 5 }} />
          <ThemedTextInput
            placeholder="Descripción"
            multiline
            numberOfLines={5}
            style={{ marginVertical: 5 }}
          />
        </ThemedView>
        <ThemedView
          style={{
            marginHorizontal: 10,
            marginVertical: 5,
            flexDirection: "row",
            gap: 10,
          }}
        >
          <ThemedTextInput placeholder="Precio" style={{ flex: 1 }} />
          <ThemedTextInput placeholder="Inventario" style={{ flex: 1 }} />
        </ThemedView>

        <ThemedView style={{ marginHorizontal: 10 }}>
          <ThemedButtonGroup
            options={["XS", "S", "M", "L", "XL", "XXL", "XXXL"]}
            selectedOption={product.sizes}
            onSelect={(options) => {
              console.log(options);
            }}
          />

          <ThemedButtonGroup
            options={["kid", "men", "women", "unisex"]}
            selectedOption={[product.gender]}
            onSelect={(options) => {
              console.log(options);
            }}
          />

          <View
            style={{
              marginHorizontal: 10,
              marginBottom: 50,
              marginTop: 20,
            }}
          >
            <ThemedButton
              icon="save-outline"
              onPress={() => console.log("Guardar")}
            >
              Guardar
            </ThemedButton>
          </View>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProductScreen;
