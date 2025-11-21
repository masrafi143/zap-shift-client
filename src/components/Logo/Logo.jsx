import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to='/'>
      <div className="flex items-end">
        <img src={logo} alt="" />
        <h3 className="text-3xl -ms-3 font-bold">zapShift</h3>
      </div>
    </Link>
  );
};

export default Logo;
