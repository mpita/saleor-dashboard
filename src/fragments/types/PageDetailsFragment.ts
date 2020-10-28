/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PageDetailsFragment
// ====================================================

export interface PageDetailsFragment_pageType {
  __typename: "PageType";
  id: string;
  name: string;
}

export interface PageDetailsFragment {
  __typename: "Page";
  id: string;
  title: string;
  slug: string;
  isPublished: boolean;
  contentJson: any;
  seoTitle: string | null;
  seoDescription: string | null;
  publicationDate: any | null;
  pageType: PageDetailsFragment_pageType;
}
