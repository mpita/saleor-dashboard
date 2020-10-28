import AppHeader from "@saleor/components/AppHeader";
import CardSpacer from "@saleor/components/CardSpacer";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import Container from "@saleor/components/Container";
import Form from "@saleor/components/Form";
import Grid from "@saleor/components/Grid";
import PageHeader from "@saleor/components/PageHeader";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
import SeoForm from "@saleor/components/SeoForm";
import VisibilityCard from "@saleor/components/VisibilityCard";
import { PageErrorFragment } from "@saleor/fragments/types/PageErrorFragment";
import { PageTypeFragment } from "@saleor/fragments/types/PageTypeFragment";
import useDateLocalize from "@saleor/hooks/useDateLocalize";
import useStateFromProps from "@saleor/hooks/useStateFromProps";
import { sectionNames } from "@saleor/intl";
import { createPageTypeSelectHandler } from "@saleor/pages/utils/handlers";
import { FetchMoreProps } from "@saleor/types";
import {
  ContentState,
  convertFromRaw,
  convertToRaw,
  RawDraftContentState
} from "draft-js";
import React from "react";
import { useIntl } from "react-intl";

import { maybe } from "../../../misc";
import { PageDetails_page } from "../../types/PageDetails";
import PageInfo from "../PageInfo";
import PageOrganizeContent from "../PageOrganizeContent";

export interface FormData {
  content: RawDraftContentState;
  isPublished: boolean;
  publicationDate: string;
  seoDescription: string;
  seoTitle: string;
  slug: string;
  title: string;
  pageType: string;
}

export interface PageDetailsPageProps {
  disabled: boolean;
  errors: PageErrorFragment[];
  page: PageDetails_page;
  pageTypes?: PageTypeFragment[];
  allowEmptySlug?: boolean;
  saveButtonBarState: ConfirmButtonTransitionState;
  onBack: () => void;
  onRemove: () => void;
  onSubmit: (data: FormData) => void;
  fetchPageTypes?: (data: string) => void;
  fetchMorePageTypes?: FetchMoreProps;
}

const PageDetailsPage: React.FC<PageDetailsPageProps> = ({
  disabled,
  errors,
  page,
  pageTypes,
  saveButtonBarState,
  onBack,
  onRemove,
  onSubmit,
  fetchPageTypes,
  fetchMorePageTypes
}) => {
  const intl = useIntl();
  const localizeDate = useDateLocalize();
  const pageExists = page !== null;

  const initialForm: FormData = {
    content: maybe(
      () => JSON.parse(page.contentJson),
      convertToRaw(ContentState.createFromText(""))
    ),
    isPublished: maybe(() => page.isPublished, false),
    pageType: page?.pageType.id || "",
    publicationDate: maybe(() => page.publicationDate, ""),
    seoDescription: maybe(() => page.seoDescription || "", ""),
    seoTitle: maybe(() => page.seoTitle || "", ""),
    slug: maybe(() => page.slug, ""),
    title: maybe(() => page.title, "")
  };

  const [pageType, setPageType] = useStateFromProps<PageTypeFragment>(
    page?.pageType || null
  );

  const handleSubmit = (data: FormData) => onSubmit(getParsedData(data));

  const getParsedData = (data: FormData) => ({
    ...data,
    isPublished: data.isPublished || !!data.publicationDate
  });

  return (
    <Form initial={initialForm} onSubmit={handleSubmit}>
      {({ change, data, hasChanged, submit }) => {
        const handlePageTypeSelect = createPageTypeSelectHandler(
          change,
          setPageType,
          pageTypes
        );

        return (
          <Container>
            <AppHeader onBack={onBack}>
              {intl.formatMessage(sectionNames.pages)}
            </AppHeader>
            <PageHeader
              title={
                !pageExists
                  ? intl.formatMessage({
                      defaultMessage: "Create Page",
                      description: "page header"
                    })
                  : maybe(() => page.title)
              }
            />
            <Grid>
              <div>
                <PageInfo
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  page={page}
                  onChange={change}
                />
                <CardSpacer />
                <SeoForm
                  errors={errors}
                  allowEmptySlug={!pageExists}
                  description={data.seoDescription}
                  disabled={disabled}
                  descriptionPlaceholder={maybe(
                    () =>
                      convertFromRaw(data.content)
                        .getPlainText()
                        .slice(0, 300),
                    ""
                  )}
                  onChange={change}
                  slug={data.slug}
                  slugPlaceholder={data.title}
                  title={data.seoTitle}
                  titlePlaceholder={data.title}
                  helperText={intl.formatMessage({
                    defaultMessage:
                      "Add search engine title and description to make this page easier to find"
                  })}
                />
              </div>
              <div>
                <VisibilityCard
                  data={data}
                  errors={errors}
                  disabled={disabled}
                  messages={{
                    hiddenLabel: intl.formatMessage({
                      defaultMessage: "Hidden",
                      description: "page label"
                    }),
                    hiddenSecondLabel: intl.formatMessage(
                      {
                        defaultMessage: "will be visible from {date}",
                        description: "page"
                      },
                      {
                        date: localizeDate(data.publicationDate, "L")
                      }
                    ),
                    visibleLabel: intl.formatMessage({
                      defaultMessage: "Visible",
                      description: "page label"
                    })
                  }}
                  onChange={change}
                />
                <CardSpacer />
                <PageOrganizeContent
                  data={data}
                  errors={errors}
                  disabled={disabled}
                  pageTypes={pageTypes}
                  pageType={pageType}
                  pageTypeInputDisplayValue={pageType?.name || ""}
                  onPageTypeChange={handlePageTypeSelect}
                  fetchPageTypes={fetchPageTypes}
                  fetchMorePageTypes={fetchMorePageTypes}
                  canChangeType={!page?.pageType}
                />
              </div>
            </Grid>
            <SaveButtonBar
              disabled={disabled || !hasChanged}
              state={saveButtonBarState}
              onCancel={onBack}
              onDelete={page === null ? undefined : onRemove}
              onSave={submit}
            />
          </Container>
        );
      }}
    </Form>
  );
};
PageDetailsPage.displayName = "PageDetailsPage";
export default PageDetailsPage;
