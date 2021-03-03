/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  gray3,
  gray6,
  Fieldset,
  FieldContainer,
  FieldLabel,
  FieldTextArea,
  FormButtonContainer,
  PrimaryButton,
  FieldError,
  SubmissionSuccess,
} from "../styles/Styles";
import { useParams } from "react-router-dom";
import { Page } from "../components/Page";
import { getQuestion, postAnswer } from "../Mocks/QuestionData";
import { Fragment, useEffect, useState } from "react";
import { AnswerList } from "../components/AnswerList";
import { useForm } from "react-hook-form";

import { useSelector, useDispatch } from "react-redux";
import { AppState, gettingQuestionAction, gotQuestionAction } from "../Store";

type FormData = {
  content: string;
};

export const QuestionPage = () => {
  const dispatch = useDispatch();

  const question = useSelector((state: AppState) => state.questions.viewing);

  const [successfullySubmitted, setSuccessfullySubmitted] = useState(false);

  const { questionId } = useParams();
  useEffect(() => {
    const doGetQuestion = async (questionId: number) => {
      dispatch(gettingQuestionAction());
      const foundQuestion = await getQuestion(questionId);
      dispatch(gotQuestionAction(foundQuestion));
    };
    if (questionId) {
      doGetQuestion(Number(questionId));
    }
  }, [questionId, dispatch]);

  const { register, errors, handleSubmit, formState } = useForm<FormData>({
    mode: "onBlur",
  });

  const submitForm = async (data: FormData) => {
    const result = await postAnswer({
      questionId: question!.questionId,
      content: data.content,
      userName: "Fred",
      created: new Date(),
    });
    setSuccessfullySubmitted(result ? true : false);
  };

  return (
    <Page>
      <div
        css={css`
          background-color: white;
          padding: 15px 20px 20px 20px;
          border-radius: 4px;
          border: 1px solid ${gray6};
          box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
        `}
      >
        <div
          css={css`
            font-size: 19px;
            font-weight: bold;
            margin: 10px 0px 5px;
          `}
        >
          {question === null ? "" : question.title}
        </div>
        {question !== null && (
          <Fragment>
            <p
              css={css`
                margin-top: 0px;
                background-color: white;
              `}
            >
              {question.content}
            </p>
            <AnswerList data={question.answers} />
            <form
              onSubmit={handleSubmit(submitForm)}
              css={css`
                margin-top: 20px;
              `}
            >
              <Fieldset
                disabled={formState.isSubmitting || successfullySubmitted}
              >
                <FieldContainer>
                  <FieldLabel htmlFor="content">Your Answer</FieldLabel>
                  <FieldTextArea
                    id="content"
                    name="content"
                    ref={register({
                      required: true,
                      minLength: 50,
                    })}
                  />
                  {errors.content && errors.content.type === "required" && (
                    <FieldError>You must enter the answer</FieldError>
                  )}
                  {errors.content && errors.content.type === "minLength" && (
                    <FieldError>
                      The answer must be at least 50 characters
                    </FieldError>
                  )}
                </FieldContainer>
                <FormButtonContainer>
                  <PrimaryButton type="submit">
                    Submit Your Answer
                  </PrimaryButton>
                </FormButtonContainer>
              </Fieldset>
            </form>
          </Fragment>
        )}
      </div>
    </Page>
  );
};
