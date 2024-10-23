import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import { useLocation, useNavigate } from "react-router-dom";
import DefaultIcon from "../../images/icons/default_icon.png";

export default function ProfilePage() {
  const [userData, setUserData] = useState({});
  const [image, setImage] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state;

  useEffect(() => {
    if (userId) {
      const getUserData = async () => {
        const result = await fetch(`http://localhost:3005/userData/${userId}`);
        const userData = await result.json();
        setUserData(userData);
      };
      getUserData();
    }
  }, [userId]);

  const handleLogOut = async () => {
    const updateResult = await fetch(
      `http://localhost:3005/userData/${userData.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isAuth: false }),
      }
    );
    navigate("/");
  };

  const handleImageChange = (e) => {
    const newImage = e.target.files[0];
    if (newImage) {
      setImage(URL.createObjectURL(newImage));
    };
  };

  const handleDeleteAccount = async () => {
    const result = await fetch(
      `http://localhost:3005/userData/${userData.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    navigate("/");
  };

  return (
    <div className="ProfileContainer">
      <div className="UserInfoWrapper">
        <img src={image ? image : DefaultIcon} alt="User Photo" />
        <form>
          <input type="file" onChange={handleImageChange} />
        </form>
        <p className="userName">
          {userData.firstName} {userData.lastName}
        </p>
        <p>
          Email: <span>{userData.email}</span>
        </p>
        <p>
          Age: <span>{userData.age}</span>
        </p>
        <p>
          Gender: <span>{userData.gender}</span>
        </p>
        <p>
          Password: <span>{userData.password}</span>
        </p>
      </div>
      <div className="profileButtons">
        <button className="LogOutBtn" onClick={handleLogOut}>
          Log Out
        </button>
        <button className="DeleteBtn" onClick={handleDeleteAccount}>
          Delete
        </button>
      </div>
    </div>
  );
}
