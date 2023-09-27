import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { message } from "antd";
export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const [buttonClicked, setButtonClicked] = useState(false);
  useEffect(() => {
    if (buttonClicked) {
      axios({
        url: "http://localhost:5000/api/user/register",
        method: "POST",
        data: user,
      }).then((res) => {
        if (res.data.success) {
          message.success("dang ky thanh cong");
          setUsername("");
          setPassword("");
          setTimeout(() => {
            window.location = "/auth/login";
          }, 1000);
        }
      });
    }
  }, [buttonClicked, user]);
  return (
    <div className="container p-4">
      <div
        style={{
          width: "40%",
          backgroundColor: "blue",
          margin: "0 auto",
          borderRadius: "10px",
          background: "rgba( 255, 255, 255, 0.45 )",
          boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
          backdropFilter: "blur( 5.5px )",
          webkitBackdropFilter: "blur( 5.5px )",
          border: "1px solid rgba( 255, 255, 255, 0.18 )",
          padding: "16px",
        }}
      >
        <h1 className="text-center display-3">LOGO</h1>
        <form action="">
          <div className="form-group">
            <label htmlFor />
            <input
              type="text"
              className="form-control"
              name
              id
              aria-describedby="helpId"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor />
            <input
              type="password"
              className="form-control"
              name
              id
              aria-describedby="helpId"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button
            type="button"
            className="btn"
            onClick={(e) => {
              setUser({ username, password });
              setButtonClicked(true);
            }}
            style={{
              backgroundColor: "black",
              color: "white",
              width: "55%",
              margin: "0 auto",
            }}
          >
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
}
