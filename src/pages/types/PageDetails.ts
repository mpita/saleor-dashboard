/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PageDetails
// ====================================================

export interface PageDetails_page_pageType {
  __typename: "PageType";
  id: string;
  name: string;
}

export interface PageDetails_page {
  __typename: "Page";
  id: string;
  title: string;
  slug: string;
  isPublished: boolean;
  contentJson: any;
  seoTitle: string | null;
  seoDescription: string | null;
  publicationDate: any | null;
  pageType: PageDetails_page_pageType;
}

export interface PageDetails {
  page: PageDetails_page | null;
}

export interface PageDetailsVariables {
  id: string;
}
