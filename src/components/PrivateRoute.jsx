import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthService from '../services/AuthService';

const PrivateRoute = ({ children }) => {
  const user = AuthService.getCurrentUser();

  return user ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
