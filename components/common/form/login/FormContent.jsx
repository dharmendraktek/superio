"use client";
import Link from "next/link";
import LoginWithSocial from "./LoginWithSocial";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { BASE_URL } from "@/utils/endpoints";
import { useDispatch } from "react-redux";
import { login } from "@/features/employer/employerSlice";

const FormContent = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    emailErr: "",
    passErr: "",
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    if (!form.email) {
      setError((prev) => ({ ...prev, emailErr: "This field is required." }));
      return;
    } else if (!form.password) {
      setError((prev) => ({ ...prev, passErr: "This field is required." }));
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(BASE_URL + "/login/", form);
      if (response.status) {
        localStorage.setItem("is_user_token", response.data.access);
        toast.success("You are logged in successfully");
        setLoading(false);
        window.location.href = "/employers-dashboard/dashboard";
        dispatch(login(response.data));
      }
    } catch (err) {
      setLoading(false);
      toast.error(
        err.response.data.non_field_errors[0] || "Something went wrong"
      );
    }
  };

  return (
    <div className="form-inner">
      <h3>Login to Superio</h3>

      {/* <!--Login Form--> */}
      {/* <form > */}
      <div className="form-group">
        <label>Email</label>
        <input
          type="text"
          name="email"
          onChange={handleChange}
          placeholder="Email"
          onKeyDown={(e) => {
            setError((prev) => ({ ...prev, emailErr: "" }));
            if (e.code == "Enter") {
              handleLogin();
            }
          }}
          required
        />
        <span className="text-danger">{error.emailErr}</span>
      </div>
      {/* name */}

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          onKeyDown={(e) => {
            setError((prev) => ({ ...prev, passErr: "" }));
            if (e.code == "Enter") {
              handleLogin();
            }
          }}
          required
        />
        <span className="text-danger">{error.passErr}</span>
      </div>
      {/* password */}

      <div className="form-group">
        <div className="field-outer">
          <div className="input-group checkboxes square">
            <input type="checkbox" name="remember-me" id="remember" />
            <label htmlFor="remember" className="remember">
              <span className="custom-checkbox"></span> Remember me
            </label>
          </div>
          <a href="#" className="pwd">
            Forgot password?
          </a>
        </div>
      </div>
      {/* forgot password */}

      <div className="form-group">
        <button
          className="theme-btn btn-style-one"
          onClick={handleLogin}
          disabled={loading}
          // type="submit"
          // name="log-in"
        >
          {loading ? (
            <BeatLoader color={"#ffffff"} loading={loading} size={15} />
          ) : (
            "Log In"
          )}
        </button>
      </div>
      {/* login */}
      {/* </form> */}
      {/* End form */}

      <div className="bottom-box">
        <div className="text">
          Don&apos;t have an account?{" "}
          <Link
            href="#"
            className="call-modal signup"
            data-bs-toggle="modal"
            data-bs-target="#registerModal"
          >
            Signup
          </Link>
        </div>

        {/* <div className="divider">
          <span>or</span>
        </div> */}

        {/* <LoginWithSocial /> */}
      </div>
      {/* End bottom-box LoginWithSocial */}
    </div>
  );
};

export default FormContent;
