import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../context/userContext';
import { toastConfig } from '../constants/toast.constant';
import { toast } from 'react-toastify';
import { getToken } from '../service/axios.service';
const AdminAuth = (props) => {
  let token = getToken();
  const navigate = useNavigate();
  const ROLE_ID = window.localStorage.getItem('role_id');
  const { isLoggedIn } = useAuth();
  const checkUserToken = () => {
    if (!token) {
      return navigate('/login');
    }
    if (Number(ROLE_ID) !== 3) {
      if (isLoggedIn) {
        toast.error('You Are Not Allowed!', toastConfig);
      }
      return navigate('/');
    }
  };
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn, token, ROLE_ID]);
  return <React.Fragment>{isLoggedIn ? props.children : null}</React.Fragment>;
};
export default AdminAuth;
