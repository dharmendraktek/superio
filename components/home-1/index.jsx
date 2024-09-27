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
import { postReq } from "@/utils/apiHandlers";
import { toast } from "react-toastify";
import BtnBeatLoader from "../common/BtnBeatLoader";
import Image from "next/image";
import { reactIcons } from "@/utils/icons";

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

  const router = useRouter();
  const dispatch = useDispatch();

  let token = Cookies.get("is_user_token");
 useEffect(() => {
   if (token) {
     window.location.href = "/employers-dashboard/dashboard";
   }
 }, [token])

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

    if (rememberMe) {
      localStorage.setItem("email", form.email);
      localStorage.setItem("password", form.password);
      localStorage.setItem('rememberMe', rememberMe);
    }else{
      localStorage.setItem("email", '');
      localStorage.setItem("password", '');
      localStorage.setItem('rememberKey', rememberMe);
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
      if (response.error) {
        toast.error(response.error.detail[0] || "Something went wrong");
      }
    } catch (err) {
      setLoading(false);
      toast.error(
        err.response.data.non_field_errors[0] || "Something went wrong"
      );
    }
  };

  useEffect(() => {
    let email = localStorage.getItem("email");
    let password = localStorage.getItem("password");
    let rememberMe = localStorage.getItem('rememberKey');
    if (email && password) {
      setForm((prev) => ({ ...prev, email: email, password: password }));
      setRememberMe(rememberMe);
    }
  }, []);

  return (
    <>
      <LoginPopup />
      {/* End Login Popup Modal */}

      <DefaulHeader2 />
      {/* End Header with upload cv btn */}

      <MobileMenu />
      {/* End MobileMenu */}
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
              <div className="my-2">
                <h3
                  style={{
                    color:
                      "linear-gradient(0deg, rgba(34,193,195,1) 36%, rgba(45,253,251,1) 67%)",
                  }}
                >
                  Login to KatalixAI <sub className="fs-6 fw-bold">ATS</sub>
                </h3>

                {/* <!--Login Form--> */}
                {/* <form > */}
                <div className="my-2">
                  <p>Email</p>
                  <input
                    type="text"
                    name="email"
                    value={form.email}
                    className="client-form-input"
                    onChange={handleChange}
                    // placeholder="Email"
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

                <div className="position-relative">
                  <p>Password</p>
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="client-form-input"
                    // placeholder="Password"
                    onKeyDown={(e) => {
                      setError((prev) => ({ ...prev, passErr: "" }));
                      if (e.code == "Enter") {
                        handleLogin();
                      }
                    }}
                    required
                  />
                  <span
                    className="cursor-pointer position-absolute fs-5"
                    style={{right:'10px'}}
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    {isPasswordVisible ? reactIcons.view : reactIcons.eyeOff}{" "}
                  </span>
                  <span className="text-danger">{error.passErr}</span>
                </div>
                {/* password */}

                <div className="form-group mt-3">
                  <div className="field-outer">
                    <div className="input-group checkboxes square">
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
                    {/* <a href="#" className="pwd">
                      Forgot password?
                    </a> */}
                  </div>
                </div>
                {/* forgot password */}

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
                {/* login */}
                {/* </form> */}
                {/* End form */}

                <div className="bottom-box">
                  {/* <div className="text">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="#"
                      className="call-modal signup"
                      data-bs-toggle="modal"
                      data-bs-target="#registerModal"
                    >
                      Signup
                    </Link>
                  </div> */}

                  {/* <div className="divider">
          <span>or</span>
        </div> */}

                  {/* <LoginWithSocial /> */}
                </div>
                {/* End bottom-box LoginWithSocial */}
              </div>
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
