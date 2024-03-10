import { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useMutation } from "@apollo/client";
import { FcGoogle } from "react-icons/fc";
import { SIGN_UP_GOOGLE } from "../services/authenticationServices";

function Login() {
  const [signUpGoogle, { data, loading, error }] = useMutation(SIGN_UP_GOOGLE);

  useEffect(() => {
    if (data && !error) {
      // Redirect or perform any action after successful login
      // Store the access token and refresh token in session storage
      sessionStorage.setItem("accessToken", data.signUpGoogle.accessToken);
      sessionStorage.setItem("refreshToken", data.signUpGooglerefreshToken);

    }
  }, [data, error]);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (response) => {
      console.log(response);
      
      // Trigger the mutation to sign up with Google
      signUpGoogle({ variables: { accessToken: response.access_token } });
    },
    onError: (error) => {
      console.log("Error logging in with Google:", error);
    },
  });

  return (
    <>
      <FcGoogle
        onClick={handleGoogleLogin}
        style={{ fontSize: "3rem", border: "1px solid #fff", padding: "1rem" }}
      />
    </>
  );
}

export default Login;
