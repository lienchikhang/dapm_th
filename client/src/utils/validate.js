export const validate = {
  isNotNull: (value, ref) => {
    console.log("rè", ref);
    if (value) {
      ref.innerText = "";
      return true;
    }
    ref.innerText = "* Không được bỏ trống";
    return false;
  },
  isCorrect: (pass, rePass, ref) => {
    if (pass == rePass) {
      ref.innerText = "";
      return true;
    }
    ref.innerText = "Mật khẩu không trùng khớp";
    return false;
  },
  validPass: (pass, ref) => {
    let regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (regex.test(pass)) {
      ref.innerText = "";
      return true;
    } else {
      ref.innerText =
        "* Mật khẩu phải chứa ít nhất 8 kí tự, tối thiểu 1 kí viết hoa, thường và đặc biệt";
      return false;
    }
  },
  validPhone: (phone, ref) => {
    let regex = /^(\+?\d{1,4}[\s-]?)?\d{10}$/;
    if (regex.test(phone)) {
      ref.innerText = "";
      return true;
    }
    ref.innerText = "* Số điện thoại phải chứa ít nhất 10 số";
    return false;
  },
};
