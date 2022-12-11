import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

interface UserInfo {
  name: string;
  email: string;
  password: string;
}
interface State {
  from: From;
}
interface From {
  pathname: string;
}

const LoginRegister = () => {
  const { register, handleSubmit } = useForm<UserInfo>();
  const [logIn, setLogIn] = useState<boolean>(true);
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as State;
  let from = state?.from?.pathname || "/";

  function onSubmit(data: UserInfo): void {
    if (logIn) {
      auth
        ?.loginWithEmail(data.email, data.password)
        .then((result) => {
          if (result.user) {
            navigate(from);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      auth
        ?.singUpWithEmail(data.email, data.password, data.name)
        .then((result) => {
          if (result.user) {
            auth.addUserName(data.name);
            navigate(from);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function googleLogin() {
    auth
      ?.loginWithGoogle()
      .then((result) => {
        if (result.user) {
          navigate(from);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function toggle() {
    if (logIn) return setLogIn(false);
    else setLogIn(true);
  }

  console.log(auth?.loading);
  return (
    <form
      className='login-conainer mx-5 lg:w-2/5 lg:mx-auto'
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2>{logIn ? "Login" : "Register"}</h2>

      {!logIn && (
        <>
          <label htmlFor='name'>Name:</label>
          <input
            {...register("name", { required: true })}
            type='text'
            placeholder='Enter name'
          />
        </>
      )}

      <label htmlFor='email'>Email:</label>
      <input
        {...register("email", { required: true })}
        type='text'
        placeholder='Enter email'
      />

      <label htmlFor='password'>Password:</label>
      <input
        {...register("password", { required: true })}
        type='password'
        placeholder='Enter password'
      />

      <div className='col-span-3 text-center text-xl mt-4'>
        <p>------------OR------------</p>
        <i
          onClick={googleLogin}
          className='fa fa-google text-3xl text-blue-400'
          aria-hidden='true'
        />
      </div>

      <p className='col-span-3 text-center mt-3'>
        {logIn ? "New to here?" : "Already have a account?"}
        <span onClick={toggle} className='text-primary cursor-pointer ml-1'>
          {logIn ? "Create a account" : "Login here"}
        </span>
      </p>

      <button
        className='w-32 py-1 mx-auto col-span-3 mt-3 bg-primary'
        type='submit'
        disabled={auth?.loading}
      >
        Submit
      </button>
    </form>
  );
};

export default LoginRegister;
