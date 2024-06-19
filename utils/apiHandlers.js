// import { useAuth } from '@hooks';
import axios from 'axios';
// import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { BASE_URL } from './endpoints';

// const { logout } = useAuth(); // eslint-disable-line
// const isDevelopment = NODE_ENV !== 'production';
// const isProductionApp = APP_ENV === 'production';

// export const setToken = (token) => {
//   if (isDevelopment) {
//     localStorage.setItem('is_user_token', token);
//   }
// };

// const authorize = () => {
//   return `Bearer ${localStorage.getItem('is_user_token')}`;
// };
// const handleLogout = async () => {
//   const response = await postReq('/auth/logout');
//   if (response.status) {
//     removeAuthCookie();
//     localStorage.removeItem('is_user_token');
//     window.location = '/';
//     return true;
//   }
// };

// let header = isDevelopment
//   ? {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('is_user_token')}`,
//       },
//     }
//   : { withCredentials: true };

// export const setAuthCookie = () => {
//   return Cookies.set(
//     isDevelopment
//       ? 'test__user__isLoggedIn'
//       : isProductionApp
//         ? '__user__isLoggedIn'
//         : `${APP_ENV}__user__isLoggedIn`,
//     'true',
//     { expires: 1 },
//   );
// };

// export const removeAuthCookie = () => {
//   return Cookies.remove(
//     isDevelopment
//       ? 'test__user__isLoggedIn'
//       : isProductionApp
//         ? '__user__isLoggedIn'
//         : `${APP_ENV}__user__isLoggedIn`,
//     'true',
//     { expires: 1 },
//   );
// };

// export const isLoggedIn = () => {
//   return Boolean(
//     Cookies.get(
//       isDevelopment
//         ? 'test__user__isLoggedIn'
//         : isProductionApp
//           ? '__user__isLoggedIn'
//           : `${APP_ENV}__user__isLoggedIn`,
//     ),
//   );
// };
// export const isLoggedIn = () => {
//   return Boolean(
//     Cookies.get(
//       isDevelopment || isProductionApp
//         ? '__user__isLoggedIn'
//         : `${APP_ENV}__user__isLoggedIn`,
//     ),
//   );
// };

export const showErrorMessage = (message) => {
  if (message instanceof Array) {
    message.forEach((msg) => toast.error(msg));
  } else {
    toast.error(message);
  }
};

const responseFormatter = (status, data, error) => {
  return { status, data: data || null, error };
};

const handleApiError = (err) => {
  return responseFormatter(false, null, err.response.data);
};

export const postApiReq = async (endpoint, data) => {
  const url = BASE_URL + endpoint;

  return await axios
    .post(url, data, header)
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((err) => {
      if (err.response.data.status == 401) {
        // handleLogout();
        removeAuthCookie();
        localStorage.removeItem('is_user_token');
        // window.location = '/';
        return handleApiError(err);
      } else {
        return handleApiError(err);
      }
    });
};

export const postReq = async (endpoint, data) => {
  const url = BASE_URL + endpoint;

  return await axios
    .post(url, data, header)
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((err) => {
      if (err.response.data.status == 401) {
        // handleLogout();
        removeAuthCookie();
        localStorage.removeItem('is_user_token');
        window.location = '/';
      } else {
        return handleApiError(err);
      }
    });
};

export const patchReq = async (endpoint, data) => {
  const url = BASE_URL + endpoint;

  return await axios
    .patch(url, data, header)
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((err) => {
      if (err.response.data.status == 401) {
        // handleLogout();
        removeAuthCookie();
        localStorage.removeItem('is_user_token');
        window.location = '/';
      } else {
        return handleApiError(err);
      }
    });
};

export const getReq = async(endpoint) => {
  const url = BASE_URL + endpoint;
  console.log("---------end point ", url);

  const response = await axios.get(url);
    // .then((response) => {
      console.log("------get response ", response);
    // })
    
};