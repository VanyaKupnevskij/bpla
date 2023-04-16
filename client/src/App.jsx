import './App.css';

import 'materialize-css';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/context';
import { ConfigContext } from './context/configContext';
import { store } from './store/index';
import { Provider } from 'react-redux';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import { Container, Paper } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';

const themeLight = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#eb9a2a',
    },
  },
});

const themeDark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  const [modeView, setModeView] = useState('light');
  const { token, login, logout, userId, ready } = useAuth(); // 435345234 - password
  const isAuthenticated = Boolean(token);
  const routes = useRoutes(isAuthenticated);

  if (ready === false) {
    return <Loader />;
  }

  return (
    <Provider store={store}>
      <ConfigContext.Provider value={{ modeView, setModeView }}>
        <AuthContext.Provider
          value={{
            token,
            login,
            logout,
            userId,
            isAuthenticated,
          }}>
          <ThemeProvider theme={modeView === 'light' ? themeLight : themeDark}>
            <Router>{routes}</Router>
          </ThemeProvider>
        </AuthContext.Provider>
      </ConfigContext.Provider>
    </Provider>
  );
}

export default App;
