import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../socialLogin/SocialLogin";

const Register = () => {
  const { register, handleSubmit, formState: {errors}  } = useForm();
  const {registerUser}= useAuth();
  const handleRegistration = (data) => {
    registerUser(data.email, data.password)
    .then(result=>console.log(result.user))
    .catch(err=>console.log(err))
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleRegistration)}>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <fieldset className="fieldset">
              {/* email-field */}
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", {
                    required: true
                })}
                className="input"
                placeholder="Email"
              />
              {errors.email?.type === 'required' && <p className="text-red-500">Email is required.</p>}

              {/* password-field */}
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/

                })}
                className="input"
                placeholder="Password"
              />
              {
                errors.password?.type==='required' && <p className="text-red-500">Password is required.</p>
              }
              {
                errors.password?.type==='minLength' && <p className="text-red-500">Password must be 6 character orlonger.</p>
              }
              {
                errors.password?.type==='pattern' && <p className="text-red-500">Password must have one upper-case, one lower-case, one special character and one number.</p>
              }
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Login</button>
            </fieldset>
          </div>
        </div>
      </form>
      <SocialLogin/>
    </div>
  );
};

export default Register;
