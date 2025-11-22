import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../socialLogin/SocialLogin";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  console.log('in the register page: ', location);
  const navigate = useNavigate();
  const handleRegistration = (data) => {
    console.log("after register", data.photo[0]);
    const profilImg = data.photo[0];
    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        // 1. store the image in form data
        const formData = new FormData();
        formData.append("image", profilImg);
        // 2. send the photo to store and get the url
        const image_API_URL = `https://api.imgbb.com/1/upload?expiration=600&key=${
          import.meta.env.VITE_IMAGE_HOST_KEY
        }`;

        axios.post(image_API_URL, formData).then((res) => {
          console.log("after iamge upload", res.data.data.url);
          // update user profile
          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };
          updateUserProfile(userProfile)
            .then((result) => {
              console.log("user profile updated succesfully!", result.user);
              navigate(location?.state || "/");
            })
            .catch((error) => console.log(error));
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleRegistration)}>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <fieldset className="fieldset">
              {/* name-field */}
              <label className="label">Name</label>
              <input
                type="name"
                {...register("name", {
                  required: true,
                })}
                className="input"
                placeholder="Name"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">Name is required.</p>
              )}
              {/* photo-field */}
              <label className="label">Image</label>
              <input
                type="file"
                {...register("photo", {
                  required: true,
                })}
                className="file-input"
                placeholder="Photo"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Image is required.</p>
              )}
              {/* email-field */}
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: true,
                })}
                className="input"
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Email is required.</p>
              )}

              {/* password-field */}
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                })}
                className="input"
                placeholder="Password"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is required.</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  Password must be 6 character orlonger.
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500">
                  Password must have one upper-case, one lower-case, one special
                  character and one number.
                </p>
              )}
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Login</button>
            </fieldset>
            <p>
              Already have an account{" "}
              <Link
                state={location.state}
                className="text-blue-400 underline"
                to="/login"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </form>
      <SocialLogin />
    </div>
  );
};

export default Register;
