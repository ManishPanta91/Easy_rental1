import { useState } from "react";

import {
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
} from "react-icons/fi";

import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Demo login credentials
    const sampleEmail = "demo@gmail.com";
    const samplePassword = "123456";

    // Check email and password
    if (email === sampleEmail && password === samplePassword) {
      // Save login status
      localStorage.setItem("isLoggedIn", "true");

      toast.success("Welcome back to EasyRental!");

      // Redirect to home page
      navigate("/");
    } else {
      toast.error("Invalid email or password!");
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f7f3] px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_70px_rgba(30,35,31,0.12)] lg:grid-cols-[0.9fr_1.1fr]">

        {/* ================= LEFT SIDE ================= */}
        <div className="relative hidden min-h-[650px] overflow-hidden bg-[#1f3029] lg:block">

          <img
            src="https://images.91wheels.com/assets/b_images/gallery/royalenfield/hunter-350/royalenfield-hunter-350-0-1768629127.png?w=1000&q=75"
            alt="Motorcycle ready for a journey"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#15221d] via-[#15221d]/25 to-transparent" />

          <div className="relative flex h-full flex-col justify-between p-10 text-white xl:p-14">

            {/* Logo / Brand */}
            <div>
              <span className="inline-flex rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                EasyRental
              </span>
            </div>

            {/* Text */}
            <div className="max-w-sm">

              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">
                Your next road starts here
              </p>

              <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
                Pick a ride. Make a memory.
              </h1>

              <p className="mt-5 text-base leading-7 text-white/75">
                Return to your dashboard and keep every journey within reach.
              </p>

            </div>

          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex items-center px-6 py-10 sm:px-12 lg:px-16 xl:px-20">

          <div className="mx-auto w-full max-w-md">

            {/* Header */}
            <div className="mb-10">

              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-orange-500">
                Welcome back
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-[#1f3029] sm:text-4xl">
                Sign in to ride
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Enter your details to continue your EasyRental journey.
              </p>

            </div>

            {/* ================= LOGIN FORM ================= */}
            <form
              className="space-y-5"
              onSubmit={handleSubmit}
            >

              {/* EMAIL */}
              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Email address
                </label>

                <div className="relative">

                  <FiMail
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    aria-hidden="true"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-[#fbfbf9] py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                  />

                </div>

              </div>

              {/* PASSWORD */}
              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-semibold text-orange-500 transition hover:text-orange-600"
                  >
                    Forgot password?
                  </button>

                </div>

                <div className="relative">

                  <FiLock
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    aria-hidden="true"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-[#fbfbf9] py-3.5 pl-11 pr-12 text-sm text-gray-900 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                  />

                  {/* Show / Hide Password */}
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((visible) => !visible)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <FiEyeOff aria-hidden="true" />
                    ) : (
                      <FiEye aria-hidden="true" />
                    )}
                  </button>

                </div>

              </div>

              {/* KEEP ME SIGNED IN */}
              <label className="flex items-center gap-3 text-sm text-gray-500">

                <input
                  type="checkbox"
                  className="h-4 w-4 accent-orange-500"
                />

                Keep me signed in

              </label>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-500/20"
              >
                Sign in

                <FiArrowRight aria-hidden="true" />

              </button>

            </form>

            {/* CREATE ACCOUNT */}
            <p className="mt-8 text-center text-sm text-gray-500">

              New to EasyRental?{" "}

              <Link
                to="/"
                className="font-bold text-orange-500 hover:text-orange-600"
              >
                Create an account
              </Link>

            </p>

          </div>
        </div>

      </section>
    </main>
  );
};

export default login;