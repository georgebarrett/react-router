import { Product, EditProductDto, ProductDto } from "../types";

// fake network request
async function fakeNetworkRequest() {
    return new Promise((resolve) => {
        setTimeout(resolve, Math.random() * 700);
    });
}
