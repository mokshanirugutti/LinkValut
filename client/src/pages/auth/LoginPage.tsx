import React, { useState } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "@/zustand/useAuthStore";
import { LoginUser } from "@/api";
import type { AuthState } from "@/zustand/useAuthStore";
import { toast, Toaster } from "react-hot-toast";

const LoginPage: React.FC = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = useAuthStore((state: AuthState) => state.login);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors: Partial<typeof form> = {};
    if (!form.username ) newErrors.username = "Valid username is required";
    if (form.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const res = await LoginUser(form.username, form.password);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
      login(res.user, res.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 relative">
      <Toaster
  position="top-right"
  reverseOrder={false}
/>


      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:underline"
      >
        LinkVault
      </button>

      
      <div className="flex flex-col justify-center w-full max-w-2xl px-10 py-16 lg:px-20 mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Sign in to your account
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
            Welcome back! Please enter your credentials.
          </p>
        </div>

        <form className="grid grid-cols-1 gap-6 w-full lg:w-md mx-auto"   onSubmit={handleSubmit} noValidate>
      
          <div>
            <label htmlFor="username" className="formLabel">
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="formInput"
              placeholder="harkirat"
            />
            {errors.username && (
              <p className="text-sm text-red-500 mt-1">{errors.username}</p>
            )}
          </div>

      
          <div>
            <label htmlFor="password" className="formLabel">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="formInput"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

      
          <div className="pt-2">
          <button type="submit" className="w-full py-3 px-6 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition font-semibold">
          {loading ? "Logging in..." : "Login"}
        </button>
          </div>
        </form>

      
        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Create one
          </button>
        </p>
      </div>

      
      <div className="hidden lg:flex items-center justify-center w-full bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-sm text-center px-10">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Welcome back 👋
          </h2>
          <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm">
            We're glad to have you. Let's get you signed in and started.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
