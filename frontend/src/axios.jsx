// import axios from "axios";

// const instance = axios.create({
//   baseURL: 'http://localhost:8000',
//   headers: {
//     Authorization: localStorage.getItem('access') ? `Bearer ${localStorage.getItem('access')}` : null,
//     'Content-Type': 'application/json',
//     Accept: 'application/json'
//   }
// });

// if (!/auth\/jwt/.test(Request.url)) {
//   instance.interceptors.request.use(
//     config => {
//       const access = localStorage.getItem('access');
//       if (access) {
//         config.headers.Authorization = `Bearer ${access}`;
//       }
//       return config;
//     },
//     error => {
//       return Promise.reject(error);
//     }
//   );
// instance.interceptors.response.use(
//   response => response,
//   error => {
//     const originalRequest = error.config;
//     console.log(error);
//     if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
//       console.log(error);
//       const refresh = localStorage.getItem('refresh');
//       const admin_refresh = localStorage.getItem('admin-refresh');
//       console.log(refresh);
//       console.log(admin_refresh);
//       if (refresh && !/\/auth\/users\//.test(originalRequest.url)) {
//         return instance
//           .post('/auth/jwt/refresh/', { refresh: refresh })
//           .then((response) => {
//             localStorage.setItem('access', response.data.access);

//             instance.defaults.headers['Authorization'] = `Bearer ${response.data.access}`;
//             originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;

//             return instance(originalRequest);
//           })
//           .catch(err => {
//             console.log(err);
//             // Handle the error accordingly
//           });
//       } else if (admin_refresh && !/\/auth\/users\//.test(originalRequest.url)) {
//         return instance
//           .post('/auth/jwt/refresh/', { refresh: admin_refresh })
//           .then((response) => {
//             console.log(response.data);
//             localStorage.setItem('admin-access', response.data.access);

//             instance.defaults.headers['Authorization'] = `Bearer ${response.data.access}`;
//             originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;

//             return instance(originalRequest);
//           })
//           .catch(err => {
//             console.log(err);
//             // Handle the error accordingly
//           });
//       }
//     }
//     return Promise.reject(error);
//   }
// );
// }
// export default instance;














import axios from "axios";

const instance = axios.create({
//   baseURL: 'http://localhost:8000',
  baseURL: 'https://www.studypoint.shop',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

instance.interceptors.request.use(
  config => {
    const access = localStorage.getItem('access');
    if (access && !config.url.includes('/auth/user/login') && !config.url.includes('/auth/users') && !config.url.includes('/auth/users/admin/login/')) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
      const refresh = localStorage.getItem('refresh');
      const admin_refresh = localStorage.getItem('admin-refresh');
      if (refresh && !originalRequest.url.includes('/auth/user/login/') && !originalRequest.url.includes('/auth/users') && !originalRequest.url.includes('/auth/users/admin/login/')) {
        return instance
          .post('/auth/jwt/refresh/', { refresh: refresh })
          .then((response) => {
            localStorage.setItem('access', response.data.access);
            instance.defaults.headers['Authorization'] = `Bearer ${response.data.access}`;
            originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
            return instance(originalRequest);
          })
          .catch(err => {
            console.log(err);
            // Handle the error accordingly
          });
      } else if (admin_refresh && !originalRequest.url.includes('/auth/user/login') && !originalRequest.url.includes('/auth/users') && !originalRequest.url.includes('/auth/users/admin/login/')) {
        return instance
          .post('/auth/jwt/refresh/', { refresh: admin_refresh })
          .then((response) => {
            localStorage.setItem('admin-access', response.data.access);
            instance.defaults.headers['Authorization'] = `Bearer ${response.data.access}`;
            originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
            return instance(originalRequest);
          })
          .catch(err => {
            console.log(err);
            // Handle the error accordingly
          });
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
