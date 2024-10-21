// import { useAuth } from '@hooks';
import axios from 'axios';
// import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { BASE_URL } from './endpoints';
import Cookies from 'js-cookie';

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

let header =  {
  headers: {
    Authorization: `Bearer ${Cookies.get('is_user_token')}`,
  },
}

let refreshToken = Cookies.get('is_user_refresh')

let  refreshTokenData = {
  refresh:refreshToken
}


const handleGenerateToken = async () => {
  const response = await postReq('/api/token/refresh/', refreshTokenData);
  if (response.status) {
    Cookies.set('is_user_token', response.data.access);
    window.location.reload();
  }
};
 

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

export const postApiReq = async (endpoint ,data) => {
  const url = BASE_URL + endpoint;

  return await axios
    .post(url, data, header)
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((err) => {
      if (err.response.status == 401) {
        // handleLogout();
        // removeAuthCookie();
        localStorage.removeItem('is_user_token');
        window.location.href = '/';
        return handleApiError(err);
      } else {
        return handleApiError(err);
      }
    });
};

export const postReq = async (endpoint, data) => {
  const url = BASE_URL + endpoint;

  return await axios
    .post(url, data)
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((err) => {
      console.log("----------------erro ", err);
      if (err.response.status == 401) {
        // handleGenerateToken();
        toast.error(err.response.data.non_field_errors[0])
        return handleApiError(err);
      } else {
        return handleApiError(err);
      }
    });
};

export const patchReq = async (endpoint, data) => {
  const url = BASE_URL + endpoint;

  return await axios.patch(url,data, header)
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((err) => {
      if (err.response.status == 401) {
        handleGenerateToken();
        window.location.href = '/';
      } else {
        return handleApiError(err);
      }
    });
};

export const getReq = async(endpoint) => {
  const url = BASE_URL + endpoint;

  return await axios
    .get(url, header)
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((err) => {
      if (err?.response?.status == 401) {
        handleGenerateToken();
        window.location.href ='/';
      } else {
        return handleApiError(err);
      }
    });
    
};

export const deleteReq = async(endpoint) => {
  const url = BASE_URL + endpoint;

  return await axios
    .delete(url, header)
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((err) => {
      if (err.response.status == 401) {
        handleGenerateToken();
      } else {
        return handleApiError(err);
      }
    });
    
};