import './App.css';

import React, { useEffect, lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllQuotes } from './store/actions-thunk';

import LoadingSpinner from './components/UI/loading-spinner/loading-spinner.ui';
import Card from './components/UI/card/card.ui';
import Layout from './components/layout/layout';

const AllQuote = lazy(() => import('./pages/all-quotes'));
const NewQuote = lazy(() => import('./pages/new-quote'));
const QuoteDetail = lazy(() => import('./pages/quote-detail'));
const NotFound = lazy(() => import('./pages/not-found'));



function App() {
  const { loaded } = useSelector((state) => state.quotes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loaded) {
      dispatch(getAllQuotes());
    }
  }, [loaded, dispatch]);

  return (
    <div className="app">
      <Layout>
        <Suspense
          fallback={
            <Card>
              <LoadingSpinner />
            </Card>
          }>
          <Switch>
            <Route path="/" exact render={() => <Redirect to="/quotes" />} />
            <Route path="/quotes/:quoteId" component={QuoteDetail} />
            <Route path="/quotes" component={AllQuote} />
            <Route path="/new-quote" component={NewQuote} />
            <Route path="*" render={() => <NotFound />} />
          </Switch>
        </Suspense>
      </Layout>
    </div>
  );
}

export default App;
