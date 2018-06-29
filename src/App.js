import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import DevTools from 'mobx-react-devtools';
import { Provider } from 'mobx-react';

import Header from './layout/Header';
import Container from './layout/Container';
import Searcher from './Searcher';
import UsersStore from './stores/UsersStore';

const theme = createMuiTheme();

const usersStore = new UsersStore();

const App = () => (
  <Provider usersStore={usersStore}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <DevTools />
      <Header />
      <Container>
        <Searcher />
      </Container>
    </MuiThemeProvider>
  </Provider>
);

export default App;
