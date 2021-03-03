/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { fontFamily, fontSize, gray2 } from "./styles/Styles";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { SearchPage } from "./pages/SearchPage";
import { SignInPage } from "./pages/SignInPage";
import { NotFoundPage } from "./components/NotFoundPage";
import { QuestionPage } from "./pages/QuestionPage";
import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";

import { Provider } from "react-redux";
import { configureStore } from "./Store";

import { lazy, Suspense } from "react";
const AskPage = lazy(() => import("./pages/AskPage"));

const store = configureStore();
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div
          css={css`
            font-family: ${fontFamily};
            font-size: ${fontSize};
            color: ${gray2};
          `}
        >
          <Header />
          <Routes>
            <Route path="/">
              <HomePage />
            </Route>
            <Route path="/search">
              <SearchPage />
            </Route>
            <Route path="/ask">
              <Suspense
                fallback={
                  <div
                    css={css`
                      margin-top: 100px;
                      text-align: center;
                    `}
                  >
                    Loading...
                  </div>
                }
              >
                <AskPage />
              </Suspense>
            </Route>
            <Route path="/SignIn">
              <SignInPage />
            </Route>
            <Route path="/questions/:questionId">
              <QuestionPage />
            </Route>
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
