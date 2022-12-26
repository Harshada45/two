import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./user.css";

function User() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState(
    JSON.parse(localStorage.getItem("loginData"))
  );

  const [passwordTxt, setPasswordTxt] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  const savePassword = () => {
    let obj = {
      username: loginData.username,
      password: passwordTxt
    };
    setLoginData(obj);
    localStorage.setItem("loginData", JSON.stringify(obj));
    setChangingPassword(false);
  };

  return (
    <div className="container-fluid">
      <div className="row my-3">
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-8">
              <div className="my-2">
                UserName:-&nbsp;{loginData?.username} <br></br>
                Password:-&nbsp;
                {changingPassword ? (
                  <input
                    type="password"
                    name="title"
                    className="form-control"
                    value={passwordTxt}
                    onChange={(e) => {
                      setPasswordTxt(e.target.value);
                    }}
                  />
                ) : (
                  "*******"
                )}
              </div>
              {changingPassword ? (
                <button
                  className="btn btn-sm btn-outline-primary m-2"
                  onClick={savePassword}
                >
                  Save Password
                </button>
              ) : (
                <button
                  className="btn btn-sm btn-outline-primary m-2"
                  onClick={() => {
                    setChangingPassword(true);
                    setPasswordTxt(loginData?.password);
                  }}
                >
                  Change Password
                </button>
              )}
              <button
                className="btn btn-sm btn-outline-danger m-2"
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
              >
                LogOut
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
