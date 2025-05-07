import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}
// This component checks if a user is authenticated by looking for a token in localStorage.
// If the token exists, it renders the children components (the protected routes).
// If the token does not exist, it redirects the user to the login page using the Navigate component from react-router-dom.