const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
// //
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send('Hello from Firebase!');
// // });
// const createInvoice = invoice => {
//   return admin
//     .firestore()
//     .collection('invoices')
//     .add(invoice)
//     .then(doc => console.log('dodano fakture', doc));
// };

const totalCountInvoices = id => {
  return admin
    .firestore()
    .collection('invoices')
    .get()
    .then(snap => {
      updateItem('invoices', id, {
        idInvoice: snap.docs.length + '/' + new Date().getUTCFullYear(),
      });
    });
};
exports.invoiceCreated = functions.firestore.document('invoices/{invoiceId}').onCreate(doc => {
  return totalCountInvoices(doc.id);
});
// exports.orderCreated = functions.firestore.document('orders/{orderId}').onCreate(doc => {
//   const order = doc.data();
//   const product = order.product;
//   const invoice = {
//     fullName: order.fullName,
//     companyName: order.companyName,
//     company: order.company,
//     orderId: doc.id,
//     idClient: order.idClient,

//     product: product.map(item => ({
//       idProduct: item.id,
//       nameCar: `${item.brand}  ${item.model}`,
//       year: item.year,
//       price: item.price,
//       netPrice: Math.round(item.price / 1.23),
//       mileage: item.mileage,
//     })),
//   };
//   return createInvoice(invoice);
// });

const sumPrice = item => {
  return item.reduce(function(a, b) {
    return a + b.price;
  }, 0);
};

const updateItem = (col, doc, content) => {
  return admin
    .firestore()
    .collection(col)
    .doc(doc)
    .update(content)
    .then(doc => console.log('edit ', doc));
};

exports.updateOrder = functions.firestore
  .document('/orders/{orderId}')
  .onWrite((change, context) => {
    const afterData = change.after.data(); // data after the write
    const productData = afterData.product;
    const id = change.after.ref.path.split('/')[1];
    return updateItem('orders', id, { totalPrice: sumPrice(productData) });
  });

exports.employeeDelete = functions.firestore.document('users/{userId}').onDelete(doc => {
  return admin
    .auth()
    .deleteUser(doc.id)
    .then(function() {
      console.log('Successfully deleted user');
    })
    .catch(function(error) {
      console.log('Error deleting user:', error);
    });
});

exports.updateProfile = functions.firestore
  .document('/users/{userId}')
  .onWrite((change, context) => {
    const afterData = change.after.data(); // data after the write
    const email = afterData.email;
    const permission = afterData.permission;
    const id = change.after.ref.path.split('/')[1];
    return updateProfileAdmin('users', id, { email, permission });
  });

const updateProfileAdmin = (col, id, content) => {
  let permisson = content.permission === 'pracownik' ? false : true;
  return admin.auth().updateUser(id, {
    email: content.email,
  });
};
