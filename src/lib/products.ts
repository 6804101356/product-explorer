import type { Product, ProductDraft } from "@/app/lib/products";

const initialProducts: Product[] = [
  { id: 1, title: "300 Touring", price: 28999.99, stock: 54, category: "vehicle" },
  { id: 2, title: "Amazon Echo Plus", price: 99.99, stock: 61, category: "mobile-accessories" },
  { id: 3, title: "American Football", price: 19.99, stock: 53, category: "sports-accessories" },
  { id: 4, title: "Annibale Colombo Bed", price: 18999.99, stock: 88, category: "furniture" },
  { id: 5, title: "Annibale Colombo Sofa", price: 2499.99, stock: 60, category: "furniture" },
  { id: 6, title: "Apple", price: 1.99, stock: 8, category: "groceries" },
  { id: 7, title: "Apple Airpods", price: 129.99, stock: 25, category: "mobile-accessories" },
];

declare global {
  // eslint-disable-next-line no-var
  var demoProducts: Product[] | undefined;
}

const products = globalThis.demoProducts ?? structuredClone(initialProducts);

if (process.env.NODE_ENV !== "production") {
  globalThis.demoProducts = products;
}

export function getProducts() {
  return products;
}

export function getProduct(id: number) {
  return products.find((product) => product.id === id);
}

export function updateProduct(id: number, values: ProductDraft) {
  const product = getProduct(id);
  if (!product) {
    throw new Error("Product not found");
  }
  Object.assign(product, values);
}

export function deleteProduct(id: number) {
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) {
    throw new Error("Product not found");
  }
  products.splice(index, 1);
}
