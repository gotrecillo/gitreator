import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import DevTools from 'mobx-react-devtools';
import { Provider } from 'mobx-react';

import Header from './layout/Header';
import Container from './layout/Container';
import UsersSearcher from './components/users/UsersSearcher';
import UsersStore from './stores/UsersStore';
import DetailsStore from './stores/DetailsStore';
import UserDetails from './components/users/UserDetails';
import ScrollTop from './components/ScrollTop';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6a0a9c'
    }
  }
});

const usersStore = new UsersStore();
const detailsStore = new DetailsStore();

const App = () => (
  <Provider usersStore={usersStore} detailsStore={detailsStore}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <DevTools />
      <Header />
      <Container>
        <UsersSearcher />
        <UserDetails />
      </Container>
      <ScrollTop />
    </MuiThemeProvider>
  </Provider>
);

export default App;
