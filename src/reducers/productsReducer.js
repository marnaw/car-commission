const productsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      console.log('Add product to base', action.product);
      return state;

    case 'UPDATE_PRODUCT':
      console.log('Update product to base', action.product);
      return state;

    case 'DELETE_PRODUCT':
      console.log('delete product from base', action.id);

      return state;
    default:
      return state;
  }
};

export default productsReducer;
