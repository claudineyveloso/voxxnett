import axios from 'axios';

const baseURL = 'http://localhost:3001/';

export const apiURL = baseURL;

export const api = axios.create({
  baseURL: baseURL,
  headers: { 'Content-Type': 'application/json' }
});

export const createSession = async (email, password, user_name, user_type) => {
  return await api
    .post('/signup', {
      user: {
        email: email,
        password: password,
        user_name: user_name,
        user_type: user_type
      }
    })
    .then((response) => {
      return response;
    })
    .catch(function (err) {
      console.log('Erro ao criar uma sessão', err);
      return err;
    });
};

export const login = async (email, password) => {
  return await api
    .post('/login', { user: { email: email, password: password } })
    .then((response) => {
      return response;
    })
    .catch(function (err) {
      console.log('Erro ao executar o login', err);
      return err;
    });
};

//************************************************************************************************
// Endpoint Users
//************************************************************************************************

export const getUsers = async (searchUser) => {
  return await api
    .get(`/api/v1/users/${searchUser}`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log('Erro ao carregar todos os usuário', err);
      return err;
    });
};

export const deleteUser = async (id) => {
  return await api
    .delete(`/api/v1/users/${id}`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log('Erro ao deletar um usuário', err);
      return err;
    });
};

export const createUser = async (objectUser, token) => {
  return await api
    .post(`/api/v1/users/custom_create`, JSON.stringify(objectUser), {
      Authorization: `Bearer ${token}`
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log('Erro ao criar um usuário', err);
      return err;
    });
};
//api/v1/users/40/edit

export const editUser = async (id, token) => {
  return await api
    .get(`/api/v1/users/${id}/edit`, {
      Authorization: `Bearer ${token}`
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log('Erro ao editar um usuário', err);
      return err;
    });
};

export const updateUser = async (id, objectUser, token) => {
  return await api
    .put(`/api/v1/users/${id}`, JSON.stringify(objectUser), {
      Authorization: `Bearer ${token}`
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log('Erro ao atulizar um usuário', err);
      return err;
    });
};

//************************************************************************************************
// Endpoint Customers
//************************************************************************************************

export const getCustomers = async (searchCustomer) => {
  return await api
    .get(`/api/v1/customers/${searchCustomer}`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log('Erro ao carregar todos os clientes', err);
      return err;
    });
};

export const deleteCustomer = async (id) => {
  return await api
    .delete(`/api/v1/customers/${id}`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log('Erro ao deletar um usuário', err);
      return err;
    });
};

export const createCustomer = async (objectUser, token) => {
  return await api
    .post(`/api/v1/customers/custom_create`, JSON.stringify(objectUser), {
      Authorization: `Bearer ${token}`
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log('Erro ao criar um cliente', err);
      return err;
    });
};
//api/v1/users/40/edit

export const editCustomer = async (id, token) => {
  return await api
    .get(`/api/v1/customers/${id}/edit`, {
      Authorization: `Bearer ${token}`
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log('Erro ao editar um cliente', err);
      return err;
    });
};

export const updateCustomer = async (id, objectUser, token) => {
  return await api
    .put(`/api/v1/customers /${id}`, JSON.stringify(objectUser), {
      Authorization: `Bearer ${token}`
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log('Erro ao atulizar um cliente', err);
      return err;
    });
};

// const response = await axios.post(`${apiUrl}/login`, { "user": { "email": email, "password": password }  })
//  .then((response) => {
//   const token = response.data.token
//   setInfoUser({
//     email: response.data.status.data.user.email,
//     user_name: response.data.status.data.user.user_name
//   })
//   localStorage.setItem('voxxNettUseToken', JSON.stringify(token));
//   api.defaults.headers.Authorization = `Bearer ${token}`;
//   console.log('Valor de response em AuthContext.js', response.data)
//   router.push('/');
//  }).catch(function(err) {
//   console.log('Apresentação do erro', err);
//   return err;
//  })
