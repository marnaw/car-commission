const employeesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_EMPLOYEES':
      console.log('Add employees to base', action.employees);
      return state;
    case 'UPDATE_EMPLOYEES':
      console.log('Update employee in base', action.employee);
      return state;
    case 'DELETE_EMPLOYEE':
      console.log('delete employee', action.id);
      return state;
    default:
      return state;
  }
};

export default employeesReducer;
