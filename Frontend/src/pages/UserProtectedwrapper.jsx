/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import { useState } from "react";

const UserProtectedwrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { user, setUser } = useContext(UserDataContext);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/users/login");
    }
  }, [token, navigate]);
  axios
    .get(import.meta.env.VITE_BASE_URL + "/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        setUser(response.data.user);
        setisLoading(false);
      }
    })
    .catch((err) => {
      console.error("Error fetching driver data:", err);
      navigate("/users/login");
    });

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <div
          style={{
            border: "8px solid #f3f3f3",
            borderTop: "8px solid #3498db",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            animation: "spin 1s linear infinite",
          }}
        />
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
              `}
        </style>
      </div>
    );
  }

  return <>{token && children}</>;
};

export default UserProtectedwrapper;
