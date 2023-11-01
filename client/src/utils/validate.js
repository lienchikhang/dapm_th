export const validate = {
  isNull: (value, name) => {
    if (!value) {
      return true;
    }
    return false;
  },
};
