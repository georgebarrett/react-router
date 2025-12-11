import { redirect, type ParamParseKey, type Params } from "react-router-dom";
import { deleteProduct } from "../../utils/fake-api";

const path = 'dashboard/products/:productId/destroy';

export async function action({
    params: { productId },
}: {
    params: Params<ParamParseKey<typeof path>>;
}) {
    if (!productId) {
        throw new Error('product not found');
    }

    await deleteProduct(productId);

    return redirect(`/dashboard/products`);
}
