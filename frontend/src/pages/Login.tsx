const Login = () => {
  return (
    <div className="bg-teal-200 mt-4 mx-auto py-8 px-6 shadow flex justify-center flex-col w-96 h-[567px]">
      <div className="text-center bg-icon bg-title bg-no-repeat mt-6 mb-3 mx-auto overflow-hidden indent-28 w-[175px] h-[51px]">
      </div>
      <form className="flex flex-col" action="">
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Phone number, username, or email"
        />
        <input type="text" name="email" id="email" placeholder="Password" />
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-button hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
