import { getProductById } from "@/core/products/actions/get-product-by-id.action";
import { Product } from "@/core/products/interfaces/product.interface";
import { useMutation, useQuery } from "@tanstack/react-query"
import { Alert } from "react-native";

export const useProduct = (productId: string) => {

    const productQuery = useQuery({
        queryKey: ['product', productId],
        queryFn: () => getProductById(productId),
        staleTime: 1000 * 60 * 5,
    });

    // Mutation
    const productMutation = useMutation({
        mutationFn: async (data: Product) => {
            //TODO: Dispatch action
            console.log(data)

            return data;
        },

        onSuccess(data: Product) {
            //TODO: Invalidate query

            Alert.alert('Producto guardado', `${data.title} ha sido guardado correctamente`)
        }
    })

    return {
        productQuery,
        productMutation
    }
}
