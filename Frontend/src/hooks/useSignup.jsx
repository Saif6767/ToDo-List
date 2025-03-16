import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/helper.js";

const useSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { firstName, lastName, email, password, confirmPassword } = formData;

    // 🔹 Form Validations
    if (!firstName.trim() || !lastName.trim()) {
      setError("First Name and Last Name are required.");
      setLoading(false);
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:4001/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password,confirmPassword }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        setError(data.message || "Signup failed");

        // If user already exists, navigate to login page after delay
        if (data.message === "User already exists") {
          setTimeout(() => navigate("/"), 2000);
        }
        return;
      }

      //  Token Handling & Redirect
      if (data.token) {
        localStorage.setItem("token", data.token);  // Save the token
        navigate("/dashboard");
      } else {
        setError("Signup failed, please try again.");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return { formData, error, loading, handleChange, handleSignup };
};

export default useSignup;
