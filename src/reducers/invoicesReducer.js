const initialState = {};

const invoiceLIst = (state = { initialState }, action) => {
  switch (action.type) {
    case 'ADD_INVOICE':
      console.log('Add invoice to base', action.content);
      return state;
    case 'DELETE_INVOICE':
      console.log('Delete invoice with base', action.id);
      return state;
    default:
      return state;
  }
};
