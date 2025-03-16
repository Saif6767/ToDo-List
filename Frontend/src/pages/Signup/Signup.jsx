import React from "react";
import Navbar from "../../components/Navbar";
import { Link,useNavigate } from "react-router-dom";
import useSignup from "../../hooks/useSignup";
import InputField from "../../components/InputField";
import { auth } from "../../firebase/firsebase";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth"

function Signup() {
  const navigate = useNavigate();
  const { formData, error, loading, handleChange, handleSignup } = useSignup();

  // Google Auth
  async function googleLogin() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User Signed Up:", result.user);

      if (result.user) {
        alert("User logged in Successfully");
        navigate("/dashboard"); 
      }
    } catch (error) {
      console.error("Google Signup Error:", error.message);
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 ">
        <div className="bg-white p-6 sm:p-8 shadow-lg rounded-md w-full max-w-sm sm:max-w-md">
          <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">
            Signup
          </h2>

          <form onSubmit={handleSignup} className="flex flex-col">
            {/*  Input Fields */}
            <InputField type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
            <InputField type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
            <InputField type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <InputField type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            <InputField type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />

            {/*  Error Message */}
            {error && <p className="text-red-500 text-xs pb-1 text-center">{error}</p>}

            {/*  Signup Button */}
            <button type="submit" className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition" disabled={loading}>
              {loading ? "Signing up..." : "Signup"}
            </button>

            {/*  Login Link */}
            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>

            {/* Google Login Button */}
            <button type="button" 
            onClick={googleLogin}
            className="bg-white text-blue-600 border border-blue-600 py-2 rounded-md mt-3 hover:bg-blue-100 transition">
              Signup with Google
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
