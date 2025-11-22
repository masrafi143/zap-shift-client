import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../socialLogin/SocialLogin";

const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {signInUser} = useAuth();
    const handleLogin = (data) => {
        console.log(data);
        signInUser(data.email, data.password)
        .then(data=>{
            console.log(data);
        })
        .catch(error=>{
            console.log(error);
        })
    }
  return (
    <div>
      <h2>This is login form</h2>
      <form onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" {...register('email', {
            required: true,
          })} className="input" placeholder="Email" />
          {
            errors.email?.type === 'required' && <p className="text-red-500">Email is required</p>
          }
          <label className="label">Password</label>
          <input type="password" {...register('password', {
            required: true,
            minLength: 6
          })} className="input" placeholder="Password" />
            {
                errors.password?.type === 'required' && <p className="text-red-500">Password is required.</p>
            }
            {
                errors.password?.type ==='minLength' && <p className="text-red-500">Password must be atleast 6 character</p>
            }
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
      </form>
      <SocialLogin/>
    </div>
  );
};

export default Login;
