/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useSearchParams } from "react-router-dom";
import { Page } from "../components/Page";
import { QuestionList } from "../components/QuestionList";
import { searchQuestions } from "../Mocks/QuestionData";
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  AppState,
  searchingQuestionsAction,
  searchedQuestionsAction,
} from "../Store";

export const SearchPage = () => {
  const dispatch = useDispatch();

  const questions = useSelector((state: AppState) => state.questions.searched);

  const [searchParams] = useSearchParams();

  const search = searchParams.get("criteria") || "";
  useEffect(() => {
    const doSearch = async (criteria: string) => {
      dispatch(searchingQuestionsAction());
      const foundResults = await searchQuestions(criteria);
      dispatch(searchedQuestionsAction(foundResults));
    };
    doSearch(search);
  }, [search]);

  return (
    <Page title="Search Results">
      {search && (
        <p
          css={css`
            font-size: 16px;
            font-style: italic;
            margin-top: 0px;
          `}
        >
          for "{search}"
        </p>
      )}
      <QuestionList data={questions} />
    </Page>
  );
};
