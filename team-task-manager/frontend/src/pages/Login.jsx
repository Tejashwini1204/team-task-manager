import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {

    e.preventDefault();
  
    if (
      !formData.email ||
      !formData.password
    ) {
  
      setErrorMessage("Please fill all fields");
  
      return;
    }
  
    try {
  
      const response = await API.post(
        "/login",
        formData
      );
  
      localStorage.setItem(
        "token",
        response.data.access_token
      );
  
      localStorage.setItem(
        "role",
        response.data.role
      );
      localStorage.setItem(
        "email",
        formData.email
      );
  
      setErrorMessage("");
  
      if (response.data.role === "admin") {

        navigate("/admin-dashboard");
      
      } else {
      
        navigate("/member-dashboard");
      }
  
    } catch (error) {
  
      console.log(error);
  
      setErrorMessage(
        error.response?.data?.detail ||
        "Invalid username or password"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 border rounded mb-4"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 border rounded mb-4"
          onChange={handleChange}
        />
        {
            errorMessage && (

                <p className="text-red-500 text-center mb-4 font-semibold">
                {errorMessage}
                </p>

            )
        }
        <button
          className="w-full bg-blue-500 text-white p-3 rounded"
        >
          Login
        </button>

        <p className="mt-4 text-center">
          Don't have account?
          <Link
            to="/signup"
            className="text-blue-500 ml-2"
          >
            Signup
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Login;