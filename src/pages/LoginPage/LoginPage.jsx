import React, { useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import animationData from "../../assets/customer-review.json";
import Lottie from "lottie-react";
import AccountNotFound from "../../components/AccountNotFound";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isPasswordIncorrect, setIsPasswordIncorrect] = useState(false);

  const handleToRegister = () => {
    navigate("/register");
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      const result = await fetch(
        `http://localhost:3005/userData?email=${email}`
      );
      const [user] = await result.json();
      if(!user){
        setIsPasswordIncorrect(true);
      }
      if (user.password === password) {
        const updateResult = await fetch(
          `http://localhost:3005/userData/${user.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ isAuth: true }),
          }
        );
        navigate("/profile", { state: user.id });
      } else {
        setIsPasswordIncorrect(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="LoginContainer">
      <div className="LoginPage">
        <div className="AnimationWrapper">
          <Lottie animationData={animationData} />
        </div>
        <div className="LoginFormWrapper">
            <h3 className="LogIn">Hello! Log In here</h3>
          <form onSubmit={handleSubmitLogin} className="LoginFrom">
            <input type="text" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            {isPasswordIncorrect && <AccountNotFound />}
            <button type="submit">Log In</button>
          </form>
          <button className="RegisterLinkBtn" onClick={handleToRegister} type="button">
            Not registered yet? <span>Register</span>
          </button>
        </div>
      </div>
    </div>
  );
}
