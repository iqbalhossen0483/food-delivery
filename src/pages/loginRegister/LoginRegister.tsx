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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [logIn, setLogIn] = useState<boolean>(true);
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as State;
  let from = state?.from?.pathname || "/";

  function onSubmit(data: UserInfo): void {
    setLoading(true);
    if (logIn) {
      auth
        ?.loginWithEmail(data.email, data.password)
        .then((result) => {
          if (result.user) {
            navigate(from);
          }
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => setLoading(false));
    } else {
      auth
        ?.singUpWithEmail(data.email, data.password, data.name)
        .then(async (result) => {
          if (result.user) {
            await auth.addUserName(result.user, data.name);
            auth.makeUser(result.user);
            navigate(from);
          }
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => setLoading(false));
    }
  }

  function googleLogin() {
    auth
      ?.loginWithGoogle()
      .then(async (result) => {
        if (result.user) {
          await auth.makeUser(result.user);
          navigate(from);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  function toggle() {
    if (logIn) return setLogIn(false);
    else setLogIn(true);
  }

  return (
    <form
      className='login-conainer mx-5 lg:w-[350px] lg:mx-auto'
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

      <p className='text-red-400'>{error}</p>

      <div className='col-span-3 text-center text-xl mt-4'>
        <p>------------OR------------</p>
        <button type='button' className='google-btn' onClick={googleLogin}>
          <i
            className='fa fa-google text-xl text-blue-400'
            aria-hidden='true'
          />
          <span>oogle</span>
        </button>
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
        disabled={loading}
      >
        Submit
      </button>
    </form>
  );
};

export default LoginRegister;
