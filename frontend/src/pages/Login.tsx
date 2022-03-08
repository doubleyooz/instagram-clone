import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex-page justify-center mb-11">
      <div className="card">
        <div className="box">
          <div className="wordmark wordmark-m wordmark-d" />

          <form className="form-container" action="">
            <div className={email === "" ? "field" : "field float"}>
              <label>
                <span>Phone number, username, or email</span>
                <input
                  type="text"
                  name="email"
                  id="email"
                  onInput={(e) =>
                    setEmail((e.target as HTMLInputElement).value)
                  }
                />
              </label>
            </div>
            <div className={password === "" ? "field" : "field float"}>
              <label>
                <span>Password</span>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onInput={(e) =>
                    setPassword((e.target as HTMLInputElement).value)
                  }
                />
              </label>
            </div>

            <div className={password === "" ? "submit" : email === "" ? "submit" : "submit ready"}>
              <button
                type="submit"              
              >
                Log In
              </button>
            </div>

            <div className="delimiter">
              <div className="trace"></div>
              <div className="or">or</div>
              <div className="trace"></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
