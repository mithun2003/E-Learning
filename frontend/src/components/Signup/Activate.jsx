import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { useNavigate, useParams } from "react-router-dom";
import "./Signup.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Container, CircularProgress } from "@mui/material";

const Activate = () => {
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const [activated, setActivated] = useState(false);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const activateAccount = async () => {
      try {
        await axios.post(
          "auth/users/activation/",
          { uid, token },
          { headers: { "Content-Type": "application/json" } }
        );
        setActivated(true);
      } catch (error) {
        console.error("Activation Error:", error);
      } finally {
        setLoading(false); // Update loading state regardless of success or error
      }
    };
    activateAccount();
  }, [uid, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="body">
      <Container component="main" maxWidth="lg">
        <Box sx={{ marginTop: 15 }}>
          <span className="verify">
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : activated ? (
              <>
                <h1>Account Activated</h1>
                <p>Your account has been successfully activated. You can now log in.</p>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Verify
                </Button>
              </>
            ) : (
              <>
                <h1>Activation Error</h1>
                <br />
                <p>There was an error activating your account. Please try again later.</p>
              </>
            )}
          </span>
        </Box>
      </Container>
    </div>
  );
};

export default Activate;
