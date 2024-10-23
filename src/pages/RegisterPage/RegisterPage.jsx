import React, { useState } from "react";
import { createNewUser } from "../../helpers/CreateNewUser";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import Lottie from "lottie-react";
import animationData from "../../assets/Animation - 1728213938956.json";
import AccountAlreadyExist from "../../components/AccountAlreadyExist";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [IsAccountExist, setIsAccuntExist] = useState(false);

  const handleToLogin = () => {
    navigate("/");
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    const newUser = createNewUser(e);
    const respons = await fetch(`http://localhost:3005/userData?email=${newUser.email}`)
    const isUserExist = await respons.json();
    if(isUserExist.length > 0) {
      setIsAccuntExist(true);
      e.target[2].value = "";
      return;
    }
    const result = await fetch("http://localhost:3005/userData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    e.target.reset();
    navigate("/");
  };

  return (
    <div className="RegisterContainer">
      <div className="RegisterPage">
        <div className="RegisterAnimationWrapper">
          <Lottie animationData={animationData} />
        </div>
        <div className="RegisterFormWrapper">
          <h3>Create an account</h3>
          <form onSubmit={handleSubmitRegister} className="RegisterForm">
            <input type="text" placeholder="First Name" required />
            <input type="text" placeholder="Last Name" required />
            <input type="text" placeholder="Email" required />
            <input type="text" placeholder="Age" required />
            <input type="text" placeholder="Gender" required />
            <input type="password" placeholder="Password" required />
            {IsAccountExist && <AccountAlreadyExist />}
            <button>Create an Account</button>
          </form>
          <button className="RegisterLogInLink" onClick={handleToLogin}>
            Already have an account?<span>{" "}Log In</span>
          </button>
        </div>
      </div>
    </div>
  );
}
