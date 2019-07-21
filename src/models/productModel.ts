//*********/ Builded only for simulate work with DB //*********/

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  itemInStock: number;
}

const products = [
  {
    name: "Pork - Kidney",
    id: "15a4d130-aae0-11e9-bccc-474d277300b2",
    categoryId: "15a4f840-aae0-11e9-bccc-474d277300b2",
    itemInStock: 4
  },
  {
    name: "Sobe - Green Tea",
    id: "15a4f841-aae0-11e9-bccc-474d277300b2",
    categoryId: "15a4f842-aae0-11e9-bccc-474d277300b2",
    itemInStock: 3
  },
  {
    name: "Ham - Cooked",
    id: "15a4f843-aae0-11e9-bccc-474d277300b2",
    categoryId: "15a4f844-aae0-11e9-bccc-474d277300b2",
    itemInStock: 1
  },
  {
    name: "Cornflakes",
    id: "15a4f845-aae0-11e9-bccc-474d277300b2",
    categoryId: "15a4f846-aae0-11e9-bccc-474d277300b2",
    itemInStock: 20
  }
] as Product[];

export async function getProducts(): Promise<Product[]> {
  return Promise.resolve(products);
}

export async function addProducts(newProduct: Product): Promise<Product> {
  products.push(newProduct);
  return Promise.resolve(newProduct);
}

export async function findProductById(
  id: string
): Promise<Product | undefined> {
  console.log(products);
  const index = products.findIndex(p => p.id.localeCompare(id) === 0);
  const product = products[index];
  console.log(index);
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
