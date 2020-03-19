export const orderAdd = order => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('orders')
      .add({
        ...order,
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        dispatch({ type: 'ADD_ORDER', order });
      })
      .catch(err => {
        dispatch({ type: 'ADD_ORDER_ERRPR', err });
      });
  };
};

export const productAdd = product => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('products')
      .add({
        ...product,
      })
      .then(() => {
        dispatch({ type: 'ADD_PRODUCT', product });
      })
      .catch(err => dispatch({ type: 'ADD_PRODUCT_ERRPR', err }));
  };
};

export const productUpdate = (product, id) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('products')
      .doc(id)
      .update(product)
      .then(() => {
        dispatch({ type: 'UPDATE_PRODUCT', product });
      })
      .catch(err => console.log(err));
  };
};

export const deleteElement = (type, id, col) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection(col)
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: type, id });
      })
      .catch({});
  };
};

export const updateElement = (type, id, col, content) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection(col)
      .doc(id)
      .update(content)
      .then(() => {
        dispatch({ type: type, content });
      })
      .catch(err => console.log(err));
  };
};

export const addClient = client => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('client')
      .add({ ...client })
      .then(() => {
        dispatch({ type: 'ADD_CLIENT', client });
      })
      .catch(err => {
        console.log('dont add client', err);
      });
  };
};
export const clientUpdate = (client, id) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('clients')
      .doc(id)
      .update(client)
      .then(() => {
        dispatch({ type: 'UPDATE_CLIENT', client });
      })
      .catch(err => console.log(err));
  };
};

export const clientAdd = client => {
  return (dispatch, getState, { getFirestore }) => {
    console.log(client);
    const firestore = getFirestore();
    firestore
      .collection('clients')
      .add({ ...client })
      .then(() => {
        dispatch({ type: 'ADD_CLIENT', client });
      })
      .catch(err => console.log(err));
  };
};

export const employeesAdd = employee => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('users')
      .add({ ...employee, createdAt: firestore.FieldValue.serverTimestamp() })
      .then(() => {
        dispatch({
          type: 'ADD_EMPLOYEE',
          employee,
        });
      })
      .catch(err => console.log(err));
  };
};

export const employeesUpdate = (employee, id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();

    firestore
      .collection('users')
      .doc(id)
      .update({
        IdCard: employee.IdCard,
        address: employee.address,
        city: employee.city,
        email: employee.email,
        fullName: employee.fullName,
        gender: employee.gender,
        permission: employee.permission,
        personalID: employee.personalID,
        salary: employee.salary,
        zipCode: employee.zipCode,
      })
      .then(() => {
        console.log('update');
      })
      .catch(function(error) {
        // An error happened.
      });
  };
};

export const signIn = credentials => {
  console.log(credentials.email);

  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: 'LOGIN_SUCCESS' });
      })
      .catch(err => {
        dispatch({ type: 'LOGIN_ERROR', err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: 'SIGNOUT_SUCCESS' });
      });
  };
};

export const signUp = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(resp => {
        return firestore
          .collection('users')
          .doc(resp.user.uid)
          .set({
            fullName: newUser.fullName,
            personalID: newUser.personalID,
            address: newUser.address,
            IdCard: newUser.IdCard,
            city: newUser.city,
            zipCode: newUser.zipCode,
            salary: newUser.salary,
            permission: newUser.permission,
            gender: newUser.gender,
            email: newUser.email,
            createdAt: firestore.FieldValue.serverTimestamp(),
          });
      })
      .then(() => {
        dispatch({ type: 'SIGNUP_SUCCESS' });
      })
      .catch(err => {
        dispatch({ type: 'SIGNUP_ERROR', err });
      });
  };
};

export const addInvoice = content => {
  const invoice = {
    fullName: content.fullName,
    companyName: content.companyName,
    company: content.company,
    idClient: content.idClient,
    orderId: content.id,

    product: content.product.map(item => ({
      idProduct: item.id,
      nameCar: `${item.brand}  ${item.model}`,
      year: item.year,
      price: item.price,
      netPrice: Math.round(item.price / 1.23),
      mileage: item.mileage,
    })),
  };
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    console.log(content);
    firestore
      .collection('invoices')
      .add({ ...invoice })
      .then(() => dispatch({ type: 'ADD_INVOICE', content }));
  };
};
