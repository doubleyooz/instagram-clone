const Login = () => {
  return (
    <div className="flex-page justify-center">
      <div className="card">
        <div className="box">
          <div className="wordmark wordmark-m wordmark-d" />

          <div className="form-container">
            <form className="flex flex-col" action="">
              <div className="field">
                <label>
                  <span>Phone number, username, or email</span>
                  <input
                  type="text"
                  name="email"
                  id="email"                 
                />
                </label>
              
              </div>
              <div className="field">
                <label>
                  <span>Password</span>
                  <input
                  type="text"
                  name="email"
                  id="email"                 
                />
                </label>
              
              </div>

              <div className="submit">
                <button
                  type="submit"
                  className="button bg-[#0031f6] text-[#ffffff] w-auto"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
