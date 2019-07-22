//*********/ Builded only for simulate work with DB //*********/
import products from "../data/products.json";
import uuidv1 from "uuid/v1";
export interface Product {
  id: string;
  categoryId: string;
  name: string;
  itemInStock: number;
}
export async function getProducts(): Promise<Product[]> {
  return Promise.resolve(products);
}

export async function getProductsByCategoryId(
  categoryId: string
): Promise<Product[]> {
  const categoriesSelectedProducts = products.filter(
    p => p.categoryId.localeCompare(categoryId) === 0
  );
  return Promise.resolve(categoriesSelectedProducts);
}

export async function addProduct(newProduct: Product): Promise<Product> {
  newProduct.id = uuidv1();
  console.log(newProduct);
  products.push(newProduct);
  return Promise.resolve(newProduct);
}

export async function findProductById(
  id: string
): Promise<Product | undefined> {
  const index = products.findIndex(p => p.id.localeCompare(id) === 0);
  const product = products[index];
  return Promise.resolve(product);
}

export async function updateProduct(
  id: string,
  updatedProduct: Product
): Promise<Product | undefined> {
  const index = products.findIndex(p => p.id.localeCompare(id) === 0);
  if (index !== -1) {
    products[index] = updatedProduct;
    return Promise.resolve(updatedProduct);
  } else {
    return Promise.resolve(undefined);
  }
}

export async function removeProduct(id: string): Promise<boolean> {
  const index = products.findIndex(p => p.id.localeCompare(id) === 0);
  if (index !== -1) {
    products.splice(index, 1);
    return Promise.resolve(true);
  } else {
    return Promise.resolve(false);
  }
}

export { products };
