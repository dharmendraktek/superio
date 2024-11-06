"use client";

import { getReq, patchReq, postApiReq } from "@/utils/apiHandlers";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BtnBeatLoader from "./BtnBeatLoader";
import SelectWithSearch from "./SelectWithSearch";

const initialStateContact = {
  name: "",
  designation: "",
  client_ref: "",
  contact: "",
  off_cont: "",
  email: "",
  ownership: "",
  status: "active",
  is_active: 1,
};

const AddLobModal = ({ handleGetClientContactManagers, contactDetails, setContactDetails }) => {
  const [contactData, setContactData] = useState(initialStateContact);
  const [contLoading, setContLoading] = useState(false);
  // const [contactDetails, setContactDetails] = useState("");
  const [clientNameList, setClientNameList] = useState([]);
  const [error, setError] = useState({
    name: "",
    designation: "",
    client_ref: "",
    contact: "",
    off_cont: "",
    email: "",
    ownership: "",
    status: "Active",
  });

  useEffect(() => {
    getClientNameList();
  }, []);

  const handleValidation = () => {
    setError((prev) => ({
      ...prev,
      name: "",
      designation: "",
      client_ref: "",
      contact: "",
      off_cont: "",
      email: "",
      ownership: "",
      status: "",
      is_active: 1,
    }));

    if (!contactData.name) {
      setError((prev) => ({ ...prev, name: "This field is required" }));
    }
    if (!contactData.client_ref) {
      setError((prev) => ({ ...prev, client_ref: "This field is required" }));
    }
    if (!contactData.contact) {
      setError((prev) => ({ ...prev, contact: "This field is required" }));
    }
    if (!contactData.email) {
      setError((prev) => ({ ...prev, email: "This field is required" }));
    }

    let { name, client_ref, contact, email } = contactData;
    if (name && client_ref && contact && email) {
      return true;
    } else {
      return false;
    }
  };

  const getClientNameList = async () => {
    const response = await getReq("/clients-dropdown/");
    if (response.status) {
      setClientNameList(response.data);
    }
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateClientContact = async () => {
    if(!handleValidation()){
      return;
    }
    try {
      setContLoading(true);
      const response = await postApiReq("/contact-manager/", contactData);
      if (response.status) {
        setContactData(initialStateContact);  
        const closeBtn = document.getElementById("closeBtnContact");
        closeBtn.click();
        setContLoading(false);
        toast.success("Client contact has been created successfully!");
        handleGetClientContactManagers();
      }
      if (response.error) {
        setContLoading(false);
      }
    } catch (err) {
      console.log("=---------------error s", err);
      setContLoading(false);
      toast.error(err.response || "Something went wrong!");
    }
  };


  useEffect(() => {
    // getClientNameList();
    if (contactDetails) {
      setContactData((...prev) => ({
        ...prev,
        name: contactDetails.name,
        email: contactDetails.email,
        contact: contactDetails.contact,
        ownership: contactDetails.ownership,
        // is_client_active: 1,
        status: contactDetails.status,
        designation: contactDetails.designation,
        client_ref: contactDetails.client_ref,
        off_cont: contactDetails.off_cont,
        is_active: 1,
      }));
    }
  }, [contactDetails]);

  
  const handleUpdateClientContact = async (id) => {
    try {
      setContLoading(true);
      const response = await patchReq(
        `/contact-manager/${id}/`,
        contactData
      );
      setContLoading(false);
      if (response.status) {
        handleGetClientContactManagers();
        const closeBtn = document.getElementById('closeBtnContact');
        closeBtn.click();
        setContLoading(false);
        toast.success("Client contact has been updated successfully!");
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.response || "Something went wrong!");
    }
  };




  return (
    <div
      style={{ width: "800px !important" }}
      className="offcanvas offcanvas-start"
      tabindex="-1"
      id="addLobModal"
      aria-labelledby="offcanvasLeftLabel"
    >
      <div className="offcanvas-header">
        <h5 id="offcanvasLeftLabel">LOB Info</h5>
        <div className="d-flex justify-content-end">
          {/* <button className="theme-btn btn-style-one small">New</button>
            <button className="theme-btn btn-style-two mx-2 small">Save</button> */}
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            id="closeBtnContact"
            // onClick={() => {
            //   setContactDetails("");
            //   setContactData(initialStateContact);
            // }}
          >
            {/* Cancel */}
          </button>
        </div>
      </div>
      <div className="offcanvas-body">
        <div className="d-flex justify-content-end">
          <button
            className="theme-btn btn-style-two small"
            onClick={() => {
              setContactData(initialStateContact);
              setContactDetails("");
            }}
          >
            New
          </button>
          <button
              className="theme-btn btn-style-one mx-2 small"
              onClick={() => {
                if (contactDetails) {
                  handleUpdateClientContact(contactDetails.id);
                } else {
                  handleCreateClientContact();
                }
              }}
              disabled={contLoading}
            >
              {contLoading ? (
                <BtnBeatLoader />
              ) : (
                "Save"
              )}
            </button>
        </div>
        <div className="row">
          <div className="col-6 my-1">
            <p>Client <strong className="text-danger">*</strong></p>
            <select
              value={contactData.client_ref}
              className="client-form-input"
              name="client_ref"
              onChange={handleContactChange}
              disabled={contactDetails}
            >
              <option>Select</option>
              {clientNameList?.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.client_name}
                  </option>
                );
              })}
            </select>
            <span className="text-danger">{error.client_ref}</span>
          </div>
          {/* <div className="col-6 my-1">
              <p>
                Client <strong className="text-danger">*</strong>
              </p>
              <div
                className="position-relative cursor-pointer"
                onMouseLeave={() => setOpenLang(false)}
              >
                <div
                  className="client-form-input d-flex justify-content-between"
                  onClick={() => {
                    setClientSearch("");
                    setOpenLang(!openLang);
                  }}
                  style={{ minHeight: "36px", maxHeight: "fit-content" }}
                >
                  <div className="d-flex flex-wrap gap-2">
                    {form.client &&
                      clientNameList?.find((_item) => _item.id == form.client)
                        ?.client_name}
                  </div>
                  <span className=" float-end">{reactIcons.downarrow}</span>
                </div>
                {openLang && (
                  <div
                    className="position-absolute bg-white border border-1 table_div_custom w-100 px-2 custom-scroll-sm "
                    style={{ top: "33px", zIndex: 10000, height: "350px" }}
                    onMouseLeave={() => setOpenLang(false)}
                  >
                    <div>
                      <input
                        type="text"
                        className="border border-primary w-100 rounded-1 px-2"
                        placeholder="Search here..."
                        onChange={(e) => setClientSearch(e.target.value)}
                      />
                    </div>
                    {clientNameList.map((item, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            setOpenLang(false);
                            setForm((prev) => ({ ...prev, client: item.id }));
                            setClientSearch("");
                          }}
                          className="hover-bg-change"
                        >
                          <span className="mx-2">{item.client_name}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <span className="text-danger">{error.clientErr}</span>
            </div> */}
          <div className="col-6 my-1">
            <p>Contact Name <strong className="text-danger">*</strong></p>
            <input
              name="name"
              value={contactData.name}
              onChange={handleContactChange}
              className="client-form-input"
              type="text"
            />
            <span className="text-danger">{error.name}</span>
          </div>
          <div className="col-6 my-1">
            <p>Email <strong className="text-danger">*</strong></p>
            <input
              name="email"
              value={contactData.email}
              onChange={handleContactChange}
              className="client-form-input"
              type="text"
            />
            <span className="text-danger">{error.email}</span>
          </div>
          <div className="col-6 my-1">
            <p>Ownership</p>
            {/* <select
                value={contactData.ownership}
                className="client-form-input"
                name="ownership "
                onChange={(e) =>
                  setContactData((prev) => ({
                    ...prev,
                    ownership: e.target.value,
                  }))
                }
              >
                <option>Select</option>
                {ownerList.map((item, index) => {
                  return (
                    <option key={index}  value={item.user.id}>
                      {item.user.first_name} {item.user.last_name} ({item.user.email})
                    </option>
                  );
                })}
              </select> */}
            <SelectWithSearch
              setForm={setContactData}
              form={contactData}
              name="ownership"
              email={false}
            />
          </div>
          <div className="col-6 my-1">
            <p>Designation</p>
            <input
              name="designation"
              value={contactData.designation}
              onChange={handleContactChange}
              className="client-form-input"
              type="text"
            />
          </div>
          <div className="col-6 my-1">
            <p>Office Number</p>
            <input
              name="off_cont"
              value={contactData.off_cont}
              onChange={handleContactChange}
              className="client-form-input"
              type="number"
            />
          </div>
          <div className="col-6 my-1">
            <p>Mobile Number <strong className="text-danger">*</strong></p>
            <input
              name="contact"
              value={contactData.contact}
              onChange={handleContactChange}
              className="client-form-input"
              type="number"
            />
            <span className="text-danger">{error.contact}</span>
          </div>
          {/* <div className="col-6 my-1">
            <p>Status</p>
            <select
              value={contactData.status}
              className="client-form-input"
              name="status"
              onChange={handleContactChange}
            >
              <option value="">Select</option>

              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AddLobModal;
