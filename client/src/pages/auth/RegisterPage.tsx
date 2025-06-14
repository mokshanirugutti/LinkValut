import { RegisterUser } from "@/api";
import useAuthStore from "@/zustand/useAuthStore";
import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";


import { useNavigate } from "react-router";

const RegisterPage: React.FC = () => {
  const [form, setForm] = useState({
    
    username: "",
    email: "",
    password: "",
    
  });

  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors: Partial<typeof form> = {};
    if (!form.username.trim()) newErrors.username = "Username is required";
    if (!form.email.includes("@")) newErrors.email = "Valid email is required";
    if (form.password.length < 8) newErrors.password = "Password must be at least 8 characters";
   
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        
        const response = await RegisterUser(form);

        if(!response.success){
          toast.error(response.message);
          return;
        }
        toast.success(response.message);
        
        
        useAuthStore.getState().login(response.user, response.token);
        const setEmail = useAuthStore.getState().setEmail;
        setEmail(form.email);

  
        
        navigate(`/dashboard`); 
      } catch (error) {
        console.error('Registration failed', error);
        
      } finally {
        setLoading(false);
      }
    }
  };
  

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
   <Toaster
  position="top-right"
  reverseOrder={false}
/>
  <div className="flex flex-col justify-center w-full max-w-2xl px-10 pt-12 lg:px-20 mx-auto">
    <div className="mb-12">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
        Create your account
      </h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
        Start your journey with us – it only takes a minute.
      </p>
    </div>
    <button
  onClick={() => navigate("/")}
  className="absolute top-6 left-6 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:underline"
>
  LinkVault
</button>


    <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit} noValidate>
      
      <div className="col-span-full md:col-span-1">
        <label htmlFor="username" className="formLabel">Username</label>
        <input
          id="username"
          name="username"
          value={form.username}
          onChange={handleChange}
          className="formInput"
          placeholder="Harkirat Singh"
        />
          <div className="min-h-[1rem] mt-1">
    {errors.username && (
      <p className="text-sm text-red-500">{errors.username}</p>
    )}
  </div>
      </div>

      
      <div className="col-span-full md:col-span-1">
        <label htmlFor="email" className="formLabel">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="formInput" 
          placeholder="harkirat@gmail.com"
        />
        <div className="min-h-[1rem] mt-1">

        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email}</p>
        )}
        </div>
      </div>


      

      
      <div className="col-span-full md:col-span-1">
        <label htmlFor="password" className="formLabel">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="formInput"
          placeholder="********"
        />
        <div className="min-h-[1rem] mt-1">

        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password}</p>
        )}
        </div>
      </div>
      
      
      <div className="col-span-full pt-1">
        <button
          type="submit"
          className="w-full py-3 px-6 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition font-semibold"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </div>
    </form>

    
    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
      Already registered?{" "}
      <button
        type="button"
        onClick={() => navigate("/login")}
        className="text-blue-600 hover:underline dark:text-blue-400"
      >
        Login here
      </button>
    </p>
  </div>

  
  <div className="hidden lg:flex items-center justify-center w-full bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-800 dark:to-gray-900">
    
    <div className="max-w-sm text-center px-10">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
        Welcome aboard 🚀
      </h2>
      <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm">
        Join and save your favorite links for later.
      </p>
    </div>
  </div>
</div>

  );
};

export default RegisterPage;
