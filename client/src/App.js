import './App.css';
import 'materialize-css';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/context';
import Navbar from './components/Navbar';
import Loader from './components/Loader';

function App() {
  const { token, login, logout, userId, ready } = useAuth(); // 435345234 - password
  const isAuthenticated = Boolean(token);
  const routes = useRoutes(isAuthenticated);

  if (ready === false) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, userId, isAuthenticated }}>
      <Router>
        {isAuthenticated && <Navbar />}
        <div className="container">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
