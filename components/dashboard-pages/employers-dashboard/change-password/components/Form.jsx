"use client";
import BtnBeatLoader from "@/components/common/BtnBeatLoader";
import { postApiReq } from "@/utils/apiHandlers";
import { reactIcons } from "@/utils/icons";
import { useState } from "react";
import { toast } from "react-toastify";

const initialState = {
  old_password: "",
  new_password: "",
  confirm_password: "",
}

const Form = () => {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState({
    newPassErr: "",
    oldPassErr: "",
    confPassErr: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfPasswordVisible, setIsConfPasswordVisible] = useState(false);
  const [isOldPassVisible, setIsOldPassVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePassword = async () => {
    if (!form.old_password) {
      setError((prev) => ({ ...prev, oldPassErr: "This Field is required" }));
      return;
    } else if (!form.new_password) {
      setError((prev) => ({ ...prev, newPassErr: "This Field is required" }));
      return;
    } else if (form.new_password.length < 5) {
      setError((prev) => ({
        ...prev,
        newPassErr: "Minimum password length must be 6 digit",
      }));
      return;
    } else if (!(form.confirm_password === form.new_password)) {
      setError((prev) => ({ ...prev, confPassErr: "Password is not matched" }));
      return;
    }

    try {
      setIsLoading(true);
      const response = await postApiReq("/change-password/", form);
      setIsLoading(false);
      if (response.status) {
        toast.success("Password has been changed successfully");
        setForm(initialState)
      }
    } catch (err) {
      console.log("-----------error ", err);
      setIsLoading(false);
      toast.error(err.response.data.error || "Something went wrong");
    }
  };

  return (
    // <form className="default-form" onSubmit={handleChangePassword}>
    <div className="row">
      {/* <!-- Input --> */}
      <div className="form-group col-lg-7 col-md-12 my-3">
      <div className="position-relative">
          <p className="fw-700 fs-6">Old Password</p>
          <input
            type={isOldPassVisible ? "text" : "password"}
            name="old_password"
            value={form.old_password}
            onChange={handleChange}
            className="client-form-input"
            onKeyDown={(e) => {
              setError((prev) => ({ ...prev, oldPassErr: "" }));
              // if (e.code == "Enter") {
              //   handleLogin();
              // }
            }}
            required
          />
          <span
            className="cursor-pointer text-primary position-absolute fs-5"
            style={{ right: "10px" }}
            onClick={() => setIsOldPassVisible(!isOldPassVisible)}
          >
            {isPasswordVisible ? reactIcons.view : reactIcons.eyeOff}
          </span>
        <span className="text-danger">{error.oldPassErr}</span>
        </div>
      </div>

      {/* <!-- Input --> */}
      <div className="form-group col-lg-7 col-md-12 my-2">
        <div className="position-relative">
          <p className="fw-700 fs-6">New Password</p>
          <input
            type={isPasswordVisible ? "text" : "password"}
            name="new_password"
            value={form.new_password}
            onChange={handleChange}
            className="client-form-input"
            onKeyDown={(e) => {
              setError((prev) => ({ ...prev, newPassErr: "" }));
              // if (e.code == "Enter") {
              //   handleLogin();
              // }
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
          <span className="text-danger">{error.newPassErr}</span>
        </div>
      </div>

      {/* <!-- Input --> */}
      <div className="form-group col-lg-7 col-md-12 my-2">
        <div className="position-relative my-2">
          <p className="fw-700 fs-6">Confirm Password</p>
          <input
            type={isConfPasswordVisible ? "text" : "password"}
            name="confirm_password"
            value={form.confirm_password}
            onChange={handleChange}
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
            onClick={() => setIsConfPasswordVisible(!isConfPasswordVisible)}
          >
            {isConfPasswordVisible ? reactIcons.view : reactIcons.eyeOff}
          </span>
          <span className="text-danger">{error.confPassErr}</span>
        </div>
      </div>

      {/* <!-- Input --> */}
      <div className="form-group col-lg-6 col-md-12">
        <button
          type="submit"
          className="theme-btn btn-style-one small"
          onClick={handleChangePassword}
          disabled={isLoading}
        >
          {isLoading ? <BtnBeatLoader /> : "Update"}
        </button>
      </div>
    </div>
    // </form>
  );
};

export default Form;
