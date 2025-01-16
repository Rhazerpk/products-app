import { getProductById } from "@/core/products/actions/get-product-by-id.action";
import { useQuery } from "@tanstack/react-query"

export const useProduct = (productId: string) => {
  
    const productQuery = useQuery({
        queryKey: ['product', productId],
        queryFn: () => getProductById(productId),
        staleTime: 1000 * 60 * 5,
    });

    return{
        productQuery
    }
}
