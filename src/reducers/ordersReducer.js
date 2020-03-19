const initState = {};

const ordersReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_ORDER':
      console.log('created orders!', action.order);
      return state;
    case 'ADD_ORDER_ERROR':
      console.log('create project error', action.err);
      return state;
    case 'DELETE_ORDER':
      console.log('delete order', action.id);
      return state;
    case 'UPDATE_ORDER':
      console.log('UPDATE order', action.content);
      return state;
    default:
      return state;
  }
};

export default ordersReducer;
