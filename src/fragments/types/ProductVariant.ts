/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductVariant
// ====================================================

export interface ProductVariant_attributes_attribute_values {
  __typename: "AttributeValue";
  id: string;
  name: string | null;
  slug: string | null;
}

export interface ProductVariant_attributes_attribute {
  __typename: "Attribute";
  id: string;
  name: string | null;
  slug: string | null;
  valueRequired: boolean;
  values: (ProductVariant_attributes_attribute_values | null)[] | null;
}

export interface ProductVariant_attributes_values {
  __typename: "AttributeValue";
  id: string;
  name: string | null;
  slug: string | null;
}

export interface ProductVariant_attributes {
  __typename: "SelectedAttribute";
  attribute: ProductVariant_attributes_attribute;
  values: (ProductVariant_attributes_values | null)[];
}

export interface ProductVariant_images {
  __typename: "ProductImage";
  id: string;
  url: string;
}

export interface ProductVariant_product_images {
  __typename: "ProductImage";
  id: string;
  alt: string;
  sortOrder: number | null;
  url: string;
}

export interface ProductVariant_product_thumbnail {
  __typename: "Image";
  url: string;
}

export interface ProductVariant_product_channelListing_channel {
  __typename: "Channel";
  id: string;
  name: string;
  currencyCode: string;
}

export interface ProductVariant_product_channelListing_discountedPrice {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductVariant_product_channelListing {
  __typename: "ProductChannelListing";
  channel: ProductVariant_product_channelListing_channel;
  discountedPrice: ProductVariant_product_channelListing_discountedPrice | null;
}

export interface ProductVariant_product_variants_images {
  __typename: "ProductImage";
  id: string;
  url: string;
}

export interface ProductVariant_product_variants {
  __typename: "ProductVariant";
  id: string;
  name: string;
  sku: string;
  images: (ProductVariant_product_variants_images | null)[] | null;
}

export interface ProductVariant_product {
  __typename: "Product";
  id: string;
  images: (ProductVariant_product_images | null)[] | null;
  name: string;
  thumbnail: ProductVariant_product_thumbnail | null;
  channelListing: ProductVariant_product_channelListing[] | null;
  variants: (ProductVariant_product_variants | null)[] | null;
}

export interface ProductVariant_channelListing_channel {
  __typename: "Channel";
  id: string;
  name: string;
  currencyCode: string;
}

export interface ProductVariant_channelListing_price {
  __typename: "Money";
  amount: number;
  currency: string;
}

export interface ProductVariant_channelListing {
  __typename: "ProductVariantChannelListing";
  channel: ProductVariant_channelListing_channel;
  price: ProductVariant_channelListing_price | null;
}

export interface ProductVariant_stocks_warehouse {
  __typename: "Warehouse";
  id: string;
  name: string;
}

export interface ProductVariant_stocks {
  __typename: "Stock";
  id: string;
  quantity: number;
  quantityAllocated: number;
  warehouse: ProductVariant_stocks_warehouse;
}

export interface ProductVariant {
  __typename: "ProductVariant";
  id: string;
  attributes: ProductVariant_attributes[];
  images: (ProductVariant_images | null)[] | null;
  name: string;
  product: ProductVariant_product;
  channelListing: ProductVariant_channelListing[] | null;
  sku: string;
  stocks: (ProductVariant_stocks | null)[] | null;
  trackInventory: boolean;
}
