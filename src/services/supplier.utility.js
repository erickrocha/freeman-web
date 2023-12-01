export const manageEmployees = list => {
  const newEmployee = [{ id: '', person: {}, address: { province: {} } }];
  if (list && list.length > 0) {
    return newEmployee.concat(list);
  }
  return newEmployee;
};

export const expand = (list, empId) => {
  list.forEach(current => {
    if (current.id === empId) {
      current.expanded = true;
    } else {
      current.expanded = false;
    }
  });
  return [...list];
};
