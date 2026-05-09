import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Signup() {

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "member"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {

    e.preventDefault();
  
    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
  
      setErrorMessage("Please fill all fields");
  
      return;
    }
  
    try {
  
      await API.post("/signup", formData);
  
      setErrorMessage("");
  
      navigate("/");
  
    } catch (error) {
  
      console.log(error);
  
      setErrorMessage(
        error.response?.data?.detail ||
        "Signup Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Signup
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-3 border rounded mb-4"
          onChange={handleChange}
        />

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

        <select
          name="role"
          className="w-full p-3 border rounded mb-4"
          onChange={handleChange}
        >
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>
        {
            errorMessage && (

                <p className="text-red-500 text-center mb-4 font-semibold">
                {errorMessage}
                </p>

            )
        }
        <button
          className="w-full bg-green-500 text-white p-3 rounded"
        >
          Signup
        </button>

        <p className="mt-4 text-center">
          Already have account?
          <Link
            to="/"
            className="text-blue-500 ml-2"
          >
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Signup;