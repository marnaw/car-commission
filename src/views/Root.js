import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainTemplate from 'templates/MainTemplate';
import { routes } from 'routes';
import { Provider } from 'react-redux';
import store from 'store';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import { useSelector } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';
import fbConfig from 'config/fbConfig';
import firebase from 'firebase/app';
import Home from 'views/Home';
import Orders from 'views/Orders';
import OrdersAdd from 'views/OrdersAdd';
import Products from 'views/Products';
import ProductAdd from 'views/ProductsAdd';
import ProductDetail from 'views/ProductDetails';
import Clients from 'views/Clients';
import ClientsAction from 'views/ClientsAction';
import Employees from 'views/Employees';
import EmployeesAdd from 'views/EmployeesAdd';
import InvoiceList from 'views/invoiceList';
import DetailsPage from 'views/DetailsPage';
import Login from 'views/Login';

const rrfProps = {
  firebase,
  config: {
    userProfile: 'users',
    useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB},
  },
  dispatch: store.dispatch,
  createFirestoreInstance,
};

const AuthIsLoaded = ({ children }) => {
  const auth = useSelector(state => state.firebase.auth);
  if (!isLoaded(auth)) return <div>splash screen...</div>;
  return children;
};

const Root = () => (
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded>
        <MainTemplate>
          <BrowserRouter>
            <Switch>
              <Route exact path={routes.login} component={Login} />
              <Route exact path={routes.home} component={Home} />
              <Route exact path={routes.orders} component={Orders} />
              <Route exact path={routes.ordersAdd} component={OrdersAdd} />
              <Route exact path={routes.ordersWithClient} component={OrdersAdd} />
              <Route path={routes.orderID} component={DetailsPage} />
              <Route exact path={routes.invoice} component={InvoiceList} />
              <Route exact path={routes.products} component={Products} />
              <Route exact path={routes.productsAdd} component={ProductAdd} />
              <Route exact path={routes.productsID} component={ProductAdd} />
              <Route exact path={routes.ProductDetail} component={ProductDetail} />
              <Route exact path={routes.clients} component={Clients} />
              <Route exact path={routes.clientsAdd} component={ClientsAction} />
              <Route path={routes.clientID} component={ClientsAction} />
              <Route exact path={routes.employees} component={Employees} />
              <Route exact path={routes.employeesAdd} component={EmployeesAdd} />
              <Route path={routes.employeesID} component={EmployeesAdd} />
              <Route path={routes.invoices} component={InvoiceList} />
            </Switch>
          </BrowserRouter>
        </MainTemplate>
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>
);

export default Root;
