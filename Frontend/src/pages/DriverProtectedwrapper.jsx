import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DriverDataContext } from "../context/DriverContext";

const DriverProtectedwrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("Drivertoken");
  const { setDriver } = useContext(DriverDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/drivers/login");
      return;
    }

    const fetchDriverProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/drivers/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200) {
          setDriver(response.data.driver);
        }
      } catch (error) {
        console.error("Error fetching driver data:", error);
        navigate("/drivers/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDriverProfile();
  }, [token, navigate, setDriver]);

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <div style={{
          border: "8px solid #f3f3f3",
          borderTop: "8px solid #3498db",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          animation: "spin 1s linear infinite"
        }} />
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

export default DriverProtectedwrapper;
