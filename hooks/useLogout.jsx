import { deleteCookie } from 'cookies-next';

const useLogout = (push) => {
  deleteCookie('token');
  deleteCookie('user');
  deleteCookie('userName');
  deleteCookie('role');
  localStorage.removeItem('userPermission');
  push('/dashboard/login');
};

export default useLogout;
