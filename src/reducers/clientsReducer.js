const clientsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_CLIENT':
      return state;

    case 'UPDATE_CLIENT':
      console.log('update client');
      return state;
    case 'ADD_CLIENT_ID':
      return {
        idClient: action.id,
      };
    default:
      return state;
  }
};

export default clientsReducer;
