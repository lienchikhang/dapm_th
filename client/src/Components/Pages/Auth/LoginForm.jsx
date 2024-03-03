import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../reducers/userReducer";
import { message } from "antd";
import TextField from "@mui/material/TextField";
import "../../../css/loginForm.css";
import Noti from "../../Noti";
import { ToastContainer, toast } from "react-toastify";

const LoginForm = () => {
  const { error } = useSelector((state) => state.noti);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => dispatch(login(data));

  return (
    <React.Fragment>
      <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          className="input__wrapper"
          name="username"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Username"
              variant="outlined"
              error={!!fieldState.error}
              helperText={
                fieldState.error ? (
                  <p className="warning-text">
                    {"Tài khoản không được bỏ trống!"}
                  </p>
                ) : null
              }
            />
          )}
        />

        <Controller
          className="input__wrapper"
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Password"
              type="password"
              variant="outlined"
              error={!!fieldState.error}
              helperText={
                fieldState.error ? (
                  <p className="warning-text">
                    {"Mật khẩu không được bỏ trống!"}
                  </p>
                ) : null
              }
            />
          )}
        />
        <input type="submit" className="loginBtn" />
      </form>
    </React.Fragment>
  );
};

export default LoginForm;
