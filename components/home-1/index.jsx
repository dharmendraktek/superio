"use client";
import Link from "next/link";
import About from "../about/About";
import AppSection from "../app-section/AppSection";
import Blog from "../blog/Blog";
import CallToAction from "../call-to-action/CallToAction";
import LoginPopup from "../common/form/login/LoginPopup";
import Partner from "../common/partner/Partner";
import FooterDefault from "../footer/common-footer";
import Funfact from "../fun-fact-counter/Funfact";
import DefaulHeader2 from "../header/DefaulHeader2";
import MobileMenu from "../header/MobileMenu";
import Hero1 from "../hero/hero-1";
import JobCategorie1 from "../job-categories/JobCategorie1";
import JobFeatured1 from "../job-featured/JobFeatured1";
import Testimonial from "../testimonial/Testimonial";
import Cookies from "js-cookie";
import FormContent from "../common/form/login/FormContent";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { postApiReq, postReq } from "@/utils/apiHandlers";
import { toast } from "react-toastify";
import BtnBeatLoader from "../common/BtnBeatLoader";
import Image from "next/image";
import { reactIcons } from "@/utils/icons";
import axios from "axios";
import moment from "moment";

const index = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    emailErr: "",
    passErr: "",
  });
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfPasswordVisible, setIsConfPasswordVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [resetForm, setResetForm] = useState({
    email: "",
    otp: "",
    new_password: "",
    confirm_password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [verificationResponse, setVerificationResponse] = useState();
  const [resendTimer, setResendTimer] = useState();

  const router = useRouter();
  const dispatch = useDispatch();

  let token = Cookies.get("is_user_token");
  useEffect(() => {
    if (token) {
      window.location.href = "/employers-dashboard/dashboard";
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetChange = (e) => {
    const { name, value } = e.target;
    setResetForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    if (!form.email) {
      setError((prev) => ({ ...prev, emailErr: "This field is required." }));
      return;
    } else if (!form.password) {
      setError((prev) => ({ ...prev, passErr: "This field is required." }));
      return;
    }

    if (rememberMe) {
      localStorage.setItem("email", form.email);
      localStorage.setItem("password", form.password);
      localStorage.setItem("rememberMe", rememberMe);
    } else {
      localStorage.setItem("email", "");
      localStorage.setItem("password", "");
      localStorage.setItem("rememberKey", rememberMe);
    }

    try {
      setLoading(true);
      const response = await postReq("/login/", form);
      setLoading(false);
      if (response.status) {
        Cookies.set("is_user_token", response.data.access, { expires: 1 });
        Cookies.set("is_user_refresh", response.data.refresh, { expires: 1 }); // expires in 1 day
        // localStorage.setItem("is_user_token", response.data.access);
        // localStorage.setItem("is_user_rfesh_token", response.data.refresh);
        let closeBtn = document.getElementById("loginModal");
        closeBtn.click();
        toast.success("You are logged in successfully");
        dispatch(login(response.data));
        // router.push('/employers-dashboard/dashboard');
        window.location.href = "/employers-dashboard/dashboard";
      }
      if (!response.status) {
        toast.error(response.error.message[0] || "Something went wrong");
      }
    } catch (err) {
      setLoading(false);
      if(err.response){
        toast.error(
          err.response.message[0] || "Something went wrong"
        );
      }
    }
  };

  useEffect(() => {
    let email = localStorage.getItem("email");
    let password = localStorage.getItem("password");
    let rememberMe = localStorage.getItem("rememberKey");
    if (email && password) {
      setForm((prev) => ({ ...prev, email: email, password: password }));
      setRememberMe(rememberMe);
    }
  }, []);

  const handleSendOtp = async () => {
    let data  = {
      email:resetForm.email
    }
    if (!resetForm.email) {
      setError((prev) => ({ ...prev, emailErr: "This field is required" }));
      return;
    }

    try {
      setIsLoading(true);
      const response = await postReq("/send-otp/",
        data
      );
      setIsLoading(false);
      if (response.data) {
        setVerificationResponse(response.data);
        setResetPassword(true);
        toast.success("OTP has been sent on email successfully");
      }
      if(!response.status){
          toast.error(response.error.email[0] || "Something went wrong")
      }
    } catch (err) {
      setIsLoading(false);
    
    }
  };

  const handleSubmit = async () => {
  
    if (resetPassword) {
      if (!resetForm.otp) {
        setError((prev) => ({ ...prev, otpErr: "This field is required." }));
        return;
      } else if (!resetForm.new_password) {
        setError((prev) => ({ ...prev, passErr: "This field is required." }));
        return;
      }else if(resetForm.new_password.length < 6){
        setError((prev) => ({ ...prev, passErr: "Minimum password length must be 6 digit" }));
        return;
      }
       else if (!(resetForm.confirm_password === resetForm.new_password)) {
        setError((prev) => ({
          ...prev,
          confPassErr: "Password is not matched.",
        }));
        return;
      }
    }

    try {
      setIsLoading(true);
      const response = await postReq(
        "/verify-otp/",
        resetForm
      );
      setIsLoading(false);

      if (resetPassword && response.data) {
        setResetPassword(false);
        setResendTimer(null);
        setOpen(false);
        setResetForm((prev) =>({...prev, otp:'', new_password:'', confirm_password:'', email:''}))
        toast.success("Password has been reset successfully");
      }
    } catch (err) {
      setIsLoading(false);
      if (err.response.status == 400) {
        toast.error(err.response.data.error || "Something went wrong");
      }
    }
  };

  useEffect(() => {
    let resendCodeInterval;
    if (verificationResponse) {
      // Calculate the expiration time as a timestamp
      const expirationTime = moment(verificationResponse.expired_otp_time);

      resendCodeInterval = setInterval(() => {
        const currentTime = moment();

        // Calculate the difference in seconds between expiration and current time
        let totalSeconds = expirationTime.diff(currentTime, "seconds");

        // If time is still left before expiration
        if (totalSeconds >= 0) {
          const minutes = Math.floor(totalSeconds / 60);
          const seconds = totalSeconds % 60;

          // Set the formatted time remaining
          setResendTimer(
            `${minutes < 10 ? `0${minutes}` : minutes}:${
              seconds < 10 ? `0${seconds}` : seconds
            }`
          );
        } else {
          // Timer expired, clear the timer and allow resend
          setResendTimer(null);
          clearInterval(resendCodeInterval);
        }
      }, 1000);
    }

    if (!resetPassword && verificationResponse) {
      setVerificationResponse(null);
      if (resendCodeInterval) clearInterval(resendCodeInterval);
    }

    // Clear interval on unmount or when dependencies change
    return () => {
      if (resendCodeInterval) {
        clearInterval(resendCodeInterval);
      }
    };
  }, [resetPassword, verificationResponse]);

  return (
    <>
      <DefaulHeader2 />
      <div className="row">
        <div className="col-6">
          <div
            className="d-flex justify-content-center  align-items-center"
            style={{ width: "100%", height: "100vh" }}
          >
            <Image
              width={1000}
              height={800}
              src="/images/home4.png"
              alt="brand"
            />
          </div>
        </div>
        <div className="col-6">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "500px" }}
          >
            <div className="w-50">
              {!open && (
                <div className="my-2">
                  <h3
                    style={{
                      color:
                        "linear-gradient(0deg, rgba(34,193,195,1) 36%, rgba(45,253,251,1) 67%)",
                    }}
                  >
                    Login to KatalixAI{" "}
                    <sub className="fs-6 fw-bold my-2">ATS</sub>
                  </h3>
                  <div className="my-3">
                    <p className="fw-700 fs-6">Email</p>
                    <input
                      type="text"
                      name="email"
                      value={form.email}
                      className="client-form-input"
                      onChange={handleChange}
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
                  <div className="position-relative my-2">
                    <p className="fw-700 fs-6">Password</p>
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      className="client-form-input"
                      onKeyDown={(e) => {
                        setError((prev) => ({ ...prev, passErr: "" }));
                        if (e.code == "Enter") {
                          handleLogin();
                        }
                      }}
                      required
                    />
                    <span
                      className="cursor-pointer text-primary position-absolute fs-5"
                      style={{ right: "10px" }}
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                      {isPasswordVisible ? reactIcons.view : reactIcons.eyeOff}
                    </span>
                    <span className="text-danger">{error.passErr}</span>
                  </div>
                  <div className="form-group mt-3">
                    <div className="field-outer d-flex justify-content-between">
                      <div
                        className="input-group checkboxes square"
                        style={{ width: "60%" }}
                      >
                        <input
                          type="checkbox"
                          name="remember-me"
                          checked={rememberMe}
                          id="remember"
                        />
                        <label
                          onClick={() => setRememberMe(!rememberMe)}
                          htmlFor="remember"
                          className="remember"
                        >
                          <span className="custom-checkbox"></span> Remember me
                        </label>
                      </div>
                      <div>
                        <div
                          className="cursor-pointer"
                          onClick={() => setOpen(true)}
                        >
                          <span className="cursor-pointer">
                            Forgot password?
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex  my-3">
                    <button
                      className="theme-btn btn-style-one small"
                      onClick={handleLogin}
                      disabled={loading}
                      // type="submit"
                      // name="log-in"
                    >
                      {loading ? <BtnBeatLoader /> : "Log In"}
                    </button>
                  </div>
                </div>
              )}
              {open && (
                <div>
                  <h3
                    style={{
                      color:
                        "linear-gradient(0deg, rgba(34,193,195,1) 36%, rgba(45,253,251,1) 67%)",
                    }}
                  >
                    {resetPassword ? "Reset Password" : "Forgot Password"}
                  </h3>
                  {!resetPassword ? (
                    <div className="my-2">
                      <p className="fw-700 fs-6">Email</p>
                      <input
                        type="text"
                        name="email"
                        value={resetForm.email}
                        className="client-form-input"
                        onChange={handleResetChange}
                        onKeyDown={(e) => {
                          setError((prev) => ({ ...prev, emailErr: "" }));
                          if (e.code == "Enter") {
                             handleSendOtp();
                          }
                        }}
                        required
                      />
                      <span className="text-danger">{error.emailErr}</span>
                    </div>
                  ) : (
                    <div>
                      <div className="my-2">
                        <p className="fw-700 fs-6">OTP</p>
                        <input
                          type="number"
                          name="otp"
                          value={form.otp}
                          className="client-form-input"
                          onChange={handleResetChange}
                          onKeyDown={(e) => {
                            setError((prev) => ({ ...prev, otpErr: "" }));
                            // if (e.code == "Enter") {
                            //   handleLogin();
                            // }
                          }}
                          required
                        />
                        <div className="d-flex justify-content-end">
                          <span
                            onClick={() => {
                              if (!resendTimer) {
                                handleSendOtp()
                              }
                            }}
                            className={`${
                              resendTimer
                                ? "text-danger"
                                : "text-primary cursor-pointer"
                            }`}
                          >
                            {resendTimer
                              ? `Time left ${resendTimer}`
                              : "Resend Otp ?"}{" "}
                          </span>
                        </div>
                        <span className="text-danger">{error.otpErr}</span>
                      </div>
                      <div className="position-relative">
                        <p className="fw-700 fs-6">New Password</p>
                        <input
                          type={isPasswordVisible ? "text" : "password"}
                          name="new_password"
                          value={resetForm.new_password}
                          onChange={handleResetChange}
                          className="client-form-input"
                          onKeyDown={(e) => {
                            setError((prev) => ({ ...prev, passErr: "" }));
                            // if (e.code == "Enter") {
                            //   handleLogin();
                            // }
                          }}
                          required
                        />
                        <span
                          className="cursor-pointer text-primary position-absolute fs-5"
                          style={{ right: "10px" }}
                          onClick={() =>
                            setIsPasswordVisible(!isPasswordVisible)
                          }
                        >
                          {isPasswordVisible
                            ? reactIcons.view
                            : reactIcons.eyeOff}
                        </span>
                        <span className="text-danger">{error.passErr}</span>
                      </div>
                      <div className="position-relative my-2">
                        <p className="fw-700 fs-6">Confirm Password</p>
                        <input
                          type={isConfPasswordVisible ? "text" : "password"}
                          name="confirm_password"
                          value={resetForm.confirm_password}
                          onChange={handleResetChange}
                          className="client-form-input"
                          onKeyDown={(e) => {
                            setError((prev) => ({ ...prev, confPassErr: "" }));
                            // if (e.code == "Enter") {
                            //   handleLogin();
                            // }
                          }}
                          required
                        />
                        <span
                          className="cursor-pointer text-primary position-absolute fs-5"
                          style={{ right: "10px" }}
                          onClick={() =>
                            setIsConfPasswordVisible(!isConfPasswordVisible)
                          }
                        >
                          {isConfPasswordVisible
                            ? reactIcons.view
                            : reactIcons.eyeOff}
                        </span>
                        <span className="text-danger">{error.confPassErr}</span>
                      </div>
                    </div>
                  )}
                  <div className="d-flex justify-content-between  my-3">
                    <button
                      className="theme-btn btn-style-one small"
                      onClick={!resendTimer ? handleSendOtp :  handleSubmit}
                      disabled={isLoading}
                    >
                      {isLoading ? <BtnBeatLoader /> : "Submit"}
                    </button>
                    <button
                      className="theme-btn btn-style-three small"
                      onClick={() => {
                        setOpen(false);
                        setResetPassword(false);
                        setResetForm({});
                      }}
                    >
                      Back
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <Hero1 /> */}
      {/* End Hero Section */}

      {/* <section className="job-categories ui-job-categories">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>Popular Job Categories</h2>
            <div className="text">2020 jobs live - 293 added today.</div>
          </div>

          <div
            className="row "
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            <JobCategorie1 />
          </div>
        </div>
      </section> */}
      {/* End Job Categorie Section */}

      {/* <section className="job-section">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>Featured Jobs</h2>
            <div className="text">
              Know your worth and find the job that qualify your life
            </div>
          </div>

          <div className="row " data-aos="fade-up">
            <JobFeatured1 />
          </div>

          <div className="btn-box">
            <Link
              href="/job-list-v1"
              className="theme-btn btn-style-one bg-blue"
            >
              <span className="btn-title">Load More Listing</span>
            </Link>
          </div>
        </div>
      </section> */}
      {/* End Job Featured Section */}

      {/* <section className="testimonial-section">
        <div className="container-fluid">
          <div className="sec-title text-center">
            <h2>Testimonials From Our Customers</h2>
            <div className="text">
              Lorem ipsum dolor sit amet elit, sed do eiusmod tempor
            </div>
          </div>
        </div>
        <div className="carousel-outer" data-aos="fade-up">
          <div className="testimonial-carousel gap-x25 center-item-active slick-list-visible">
            <Testimonial />
          </div>
        </div>
      </section> */}
      {/* <!-- End Testimonial Section --> */}

      {/* <section className="clients-section">
        <div className="sponsors-outer" data-aos="fade">
          <ul className="sponsors-carousel">
            <Partner />
          </ul>
        </div>
      </section> */}
      {/* <!-- End Clients Section--> */}

      {/* <section className="about-section">
        <div className="auto-container">
          <div className="row">
            <About />
          </div>

          <div className="fun-fact-section">
            <div className="row">
              <Funfact />
            </div>
          </div>
        </div>
      </section> */}

      {/* <section className="news-section">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>Recent News Articles</h2>
            <div className="text">
              Fresh job related news content posted each day.
            </div>
          </div>
          <div className="row" data-aos="fade-up">
            <Blog />
          </div>
        </div>
      </section> */}
      {/* <!-- End News Section --> */}

      {/* <section className="app-section">
        <div className="auto-container">
          <AppSection />
        </div>
      </section> */}
      {/* <!-- End App Section --> */}

      {/* <CallToAction /> */}
      {/* <!-- End Call To Action --> */}

      {/* <FooterDefault /> */}
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;
