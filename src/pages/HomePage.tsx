/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Page } from "../components/Page";
import { PageTitle } from "../components/PageTitle";
import { QuestionList } from "../components/QuestionList";
import { getUnansweredQuestions } from "../Mocks/QuestionData";
import { PrimaryButton } from "../styles/Styles";

import {
  gettingUnansweredQuestionsAction,
  gotUnansweredQuestionsAction,
  AppState,
} from "../Store";
import { useSelector, useDispatch } from "react-redux";

export const HomePage = () => {
  const dispatch = useDispatch();

  const questions = useSelector(
    (state: AppState) => state.questions.unanswered
  );
  const questionsLoading = useSelector(
    (state: AppState) => state.questions.loading
  );

  useEffect(() => {
    const doGetUnansweredQuestions = async () => {
      dispatch(gettingUnansweredQuestionsAction());
      const unansweredQuestions = await getUnansweredQuestions();
      dispatch(gotUnansweredQuestionsAction(unansweredQuestions));
    };
    doGetUnansweredQuestions();
  }, [dispatch]);

  const navigate = useNavigate();

  const handleAskQuestionClick = () => {
    navigate("/ask");
  };

  return (
    <Page>
      <div>
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
          `}
        >
          <PageTitle>Unanswered Questions</PageTitle>
          <PrimaryButton onClick={() => handleAskQuestionClick()}>
            Ask a question
          </PrimaryButton>
        </div>
        {questionsLoading ? (
          <div>Loading...</div>
        ) : (
          <QuestionList data={questions || []} />
        )}
      </div>
    </Page>
  );
};
