export const ROUTES = {
  HOME: "",
  CHECKOUT: "checkout",
  PRODUCTS: "products",
  PRODUCT_DETAILS: (productId: string) => `products/${productId}`,
  COLLECTIONS: {
    PATTERNS: "collections/patterns",
  },
  ABOUT_US: "about-us",
};
