export const validate = {
  isNull: (value, name) => {
    if (!value) {
      document.querySelector(
        `span[data=${name}]`
      ).value = `Không được bỏ trống`;
      return true;
    }
    document.querySelector(`span[data=${name}]`).value = ``;
    return false;
  },
};
