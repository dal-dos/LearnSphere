import React from "react";

function Login() {
  return (
    <div className="Login">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src="http://placehold.it/900x400"
              alt=""
            />
          </div>
          <div class="col-lg-5">
            <h1 class="font-weight-light">Login</h1>
            <form>
            <label>
              Username:
              <input type="text" name="name" />
            </label>
            <label>
              Password:
              <input type="text" name="name" />
            </label>
            <input type="submit" value="Submit" />
          </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;