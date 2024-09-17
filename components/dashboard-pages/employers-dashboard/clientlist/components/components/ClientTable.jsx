"use client";
import React, { useEffect, useState } from "react";
import {  clientTableField } from "./constant";
import { reactIcons } from "@/utils/icons";
import { Country, State, City } from "country-state-city";
import { toast } from "react-toastify";
import moment from "moment";
import Pagination from "@/components/common/Pagination";
import { getReq, patchReq, postApiReq } from "@/utils/apiHandlers";
import Loader from "@/components/common/Loader";
import BtnBeatLoader from "@/components/common/BtnBeatLoader";

const tabsName = [
  { id: 1, name: "ACTIVE CLIENT" },
  { id: 2, name: "INACTIVE CLIENT" },
];

const initialState = {
  client_name: "",
  client_email: "",
  client_cont: "",
  client_website: "",
  client_address: "",
  client_owner: "",
  is_client_active: 1,
  status: "",
  client_country: "",
  client_state: "",
  client_city: "",
};

const initialStateContact = {
  name: "",
  designation: "",
  client_ref: "",
  contact: "",
  off_cont: "",
  email: "",
  ownership: "",
  status: "",
  is_active: 1,
};

const ClientTable = () => {
  const [expand, setExpand] = useState(null);
  const [form, setForm] = useState(initialState);
  const [client, setClient] = useState();
  const [open, setOpen] = useState(false);
  const [countryCode, setCountryCode] = useState("AF");
  const countryList = Country.getAllCountries();
  const stateList = State.getStatesOfCountry(countryCode);
  const [search, setSearch] = useState();
  const [loading, setLoading] = useState(false);
  const [ownerList, setOwnerList] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [active, setActive] = useState(1);
  const [clientNameList, setClientNameList] = useState([]);
  const [contactData, setContactData] = useState(initialStateContact);
  const [contactDetails, setContactDetails] = useState();
  const [contLoading, setContLoading] = useState(false);
  const [contactSearch, setContactSearch] = useState();
  const [page, setPage] = useState(0);
  const [dataCount, setDataCount] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (client) {
      setForm((...prev) => ({
        ...prev,
        client_name: client.client_name,
        client_email: client.client_email,
        client_cont: client.client_cont,
        client_website: client.client_website,
        client_address: client.client_address,
        client_owner: client.client_owner,
        is_client_active: 1,
        status: client.status,
        client_country: client.client_country,
        client_state: client.client_state,
        client_city: client.client_city,
      }));
    }
  }, [client]);

  useEffect(() => {
    getClientNameList();
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

  const getClientList = async (search) => {
    setIsLoading(true);
    const response = await getReq(
      `/clients-list/?active=${active == 1 ? true : false}&page=${page + 1}${
        search ? `&search=${search}` : ""
      }`
    );
    setIsLoading(false);
    if (response.status) {
      setClientData(response.data.results);
      setDataCount(response.data.count);
    }
  };

  const getOwnerList = async () => {
    const response = await getReq("/operations-users/");
    setOwnerList(response.data ? response.data : []);
  };

  useEffect(() => {
    getOwnerList();
  }, []);

  useEffect(() => {
    if(search){
      setPage(0);
      getClientList(search);
    }else {
      getClientList();
    }
  }, [search, active, page]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateClient = async () => {
    try {
      setLoading(true);
      const response = await postApiReq("/create-client/", form);
      if (response.status) {
        const closeBtn = document.getElementById('closeBtnClient');
        closeBtn.click();
        setLoading(false);
        setForm(initialState);
        toast.success("You have been created client successfully!");
        getClientList();
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.response || "Something went wrong!");
    }
  };

  const handleUpdateClient = async () => {
    try {
      setLoading(true);
      const response = await patchReq(`/update-client/${client.id}/`, form);
      if (response.status) {
        const closeBtn = document.getElementById('closeBtnClient');
        closeBtn.click();
        setLoading(false);
        toast.success("You have been updated client successfylly!");
        getClientList();
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.response || "Something went wrong!");
    }
  };

  useEffect(() => {
    if (form.client_country) {
      let country = countryList.find(
        (item) => item.name == form.client_country
      );
      setCountryCode(country?.isoCode);
    }
  }, [form.client_country]);

  const handleActiveClient = async (id) => {
    // const response = await patchReq(`/activate-client/${id}/`);
    const response = await patchReq(`/activate-client/${id}/`);

    if (response.status) {
      toast.success("Client status updated successfully !");
      getClientList();
    }
  };
  const handleInactiveClient = async (id) => {
    console;
    // const response = await patchReq(`/delete-client/${id}/`);
    const response = await patchReq(`/delete-client/${id}/`);

    if (response.status) {
      toast.success("Client status updated successfully !");
      getClientList();
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
    try {
      setContLoading(true);
      const response = await postApiReq("/contact-manager/", contactData);
      if (response.status) {
        const closeBtn = document.getElementById('closeBtnContact');
        closeBtn.click();
        setContLoading(false);
        toast.success("You have been created client contact successfully!");
        getClientList();
        setContactData(initialStateContact);
      }
      if (response.error) {
        setContLoading(false);
      }
    } catch (err) {
      setContLoading(false);
      toast.error(err.response || "Something went wrong!");
    }
  };

  const handleUpdateClientContact = async () => {
    try {
      setContLoading(true);
      const response = await patchReq(
        `/contact-manager/${contactData.client_ref}/`,
        contactData
      );
      setContLoading(false);
      if (response.status) {
        const closeBtn = document.getElementById('closeBtnContact');
        closeBtn.click();
        setContLoading(false);
        toast.success("You have been updated client contact successfylly!");
        getClientList();
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.response || "Something went wrong!");
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <div
            className="d-flex me-2 border border-primary rounded-1  "
            style={{ width: "300px", height: "30px" }}
          >
            {tabsName.map((item, index) => {
              return (
                <div
                  style={{ width: "150px" }}
                  className={`text-center rounded-1   cursor-pointer ${
                    active == item.id
                      ? "bg-primary text-white "
                      : "bg-white text-black"
                  }`}
                  key={index}
                >
                  <li onClick={() => setActive(item.id)}>{item.name}</li>
                </div>
              );
            })}
          </div>
          <div className="position-relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "350px" }}
              className="border border-primary px-4 rounded-1"
              placeholder="Search anything..."
            />
            <span
              className="position-absolute fs-4 text-primary"
              style={{ left: "2px" }}
            >
              {reactIcons.search}
            </span>
            {search && (
              <span
                onClick={() => setSearch("")}
                className="position-absolute cursor-pointer	  text-primary fs-5"
                style={{ right: "8px" }}
              >
                {reactIcons.close}
              </span>
            )}
            {/* <div>
                  <button>Upload File</button>
                </div> */}
          </div>
        </div>
        <div>
          <div className="position-relative mb-3">
            <button
              onClick={() => setOpen(!open)}
              className="border px-2 rounded-1"
            >
              <span className="fs-6">New</span>
              <span className="fs-6">{reactIcons.downarrow}</span>
            </button>
            {open && (
              <div
                className="position-absolute rounded-1 py-1 text-black"
                style={{
                  width: "160px",
                  height: "70px",
                  right: "0px",
                  top: "35px",
                  zIndex: 1000,
                  border: "1px solid #f9f9f9",
                  background: "#f9f9f9",
                }}
              >
                <li
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight"
                  className="cursor-pointer text-black hover-bg-gray px-2"
                  onClick={() => {
                    setOpen(!open);
                    setClient(initialState);
                  }}
                >
                  Client
                </li>
                <li
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasLeft"
                  aria-controls="offcanvasLeft"
                  className="cursor-pointer  text-black hover-bg-gray px-2"
                  onClick={() => setOpen(!open)}
                >
                  Contact
                </li>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        style={{ width: "800px !important", background: "light-gray" }}
        className="offcanvas offcanvas-start"
        tabindex="-1"
        id="offcanvasLeft"
        aria-labelledby="offcanvasLeftLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasLeftLabel">Contact Info</h5>
          <div className="d-flex justify-content-end">
            {/* <button className="theme-btn btn-style-one small">New</button>
            <button className="theme-btn btn-style-two mx-2 small">Save</button> */}
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              id="closeBtnContact"
              onClick={() => {
                setContactDetails("");
                setContactData(initialStateContact);
              }}
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
              <p>Client</p>
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
            </div>
            <div className="col-6 my-1">
              <p>Contact Name</p>
              <input
                name="name"
                value={contactData.name}
                onChange={handleContactChange}
                className="client-form-input"
                type="text"
              />
            </div>
            <div className="col-6 my-1">
              <p>Email</p>
              <input
                name="email"
                value={contactData.email}
                onChange={handleContactChange}
                className="client-form-input"
                type="text"
              />
            </div>
            <div className="col-6 my-1">
              <p>Ownership</p>
              <select
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
                      {item.user.first_name} {item.user.last_name} {item.user.email}
                    </option>
                  );
                })}
              </select>
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
              <p>Mobile Number</p>
              <input
                name="contact"
                value={contactData.contact}
                onChange={handleContactChange}
                className="client-form-input"
                type="number"
              />
            </div>
            <div className="col-6 my-1">
              <p>Status</p>
              <select
                value={contactData.status}
                className="client-form-input"
                name="status"
                onChange={handleContactChange}
              >
                <option>Select</option>

                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{ width: "800px !important" }}
        className="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">Client Info</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            id="closeBtnClient"
            onClick={() => setForm(initialState)}
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="d-flex justify-content-end">
            <button
              className="theme-btn btn-style-two mx-2 small"
              onClick={() => {
                setForm(initialState);
                setClient("");
              }}
            >
              New
            </button>
            <button
              className="theme-btn btn-style-one small"
              onClick={() => {
                if (client.client_name) {
                  handleUpdateClient(client.id);
                } else {
                  handleCreateClient();
                }
              }}
              disabled={loading}
            >
              {loading ? (
                <BtnBeatLoader />
              ) : (
                "Save"
              )}
            </button>
          </div>

          <div className="row">
            <div className="col-6 my-1">
              <p>Client Name</p>
              <input
                name="client_name"
                value={form.client_name}
                onChange={handleChange}
                className="client-form-input"
                type="text"
              />
            </div>
            <div className="col-6 my-1">
              <p>Email</p>
              <input
                name="client_email"
                value={form.client_email}
                onChange={handleChange}
                className="client-form-input"
                type="text"
              />
            </div>
            <div className="col-6 my-1">
              <p>Contact</p>
              <input
                name="client_cont"
                value={form.client_cont}
                onChange={handleChange}
                className="client-form-input"
                type="text"
              />
            </div>
            <div className="col-6 my-1">
              <p>Website</p>
              <input
                name="client_website"
                value={form.client_website}
                onChange={handleChange}
                className="client-form-input"
                type="text"
              />
            </div>
            <div className="col-6 my-1">
              <p>Address</p>
              <input
                name="client_address"
                value={form.client_address}
                onChange={handleChange}
                className="client-form-input"
                type="text"
              />
            </div>
            <div className="col-6 my-1">
              <p>Ownership</p>
              <select
                value={form.client_owner}
                className="client-form-input"
                name="client_owner"
                onChange={handleChange}
              >
                <option>Select</option>
                {ownerList.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.user.first_name} {item.user.last_name} {item.user.email}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-6 my-1">
              <p>Status</p>
              <select
                value={form.status}
                className="client-form-input"
                name="status"
                onChange={handleChange}
              >
                <option>Select</option>

                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="col-6 my-1">
              <p>Country</p>

              <select
                className="client-form-input"
                name="client_country"
                onChange={handleChange}
                value={form.client_country}
              >
                <option>Select</option>

                {countryList.map((item, index) => {
                  return (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-6 my-1">
              <p>State</p>
              <select
                className="client-form-input"
                name="client_state"
                onChange={handleChange}
                value={form.client_state}
              >
                <option>Select</option>
                {stateList.length > 0 ? (
                  stateList.map((item, index) => {
                    return (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    );
                  })
                ) : (
                  <option value={form.client_country}>
                    {form.client_country}
                  </option>
                )}
              </select>
            </div>
            <div className="col-6 my-1">
              <p>City</p>
              <input
                name="client_city"
                value={form.client_city}
                onChange={handleChange}
                className="client-form-input"
                type="text"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="table_div custom-scroll-sm">
        <table className="default-table">
          <thead className="">
            <tr>
              {clientTableField.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    {item.title == "input" ? (
                      <th key={index} style={{ width: `${item.size}` }}>
                        <input type="checkbox" />
                      </th>
                    ) : (
                      <th  style={{ width: `${item.size}` }} key={index}>
                        {item.title}
                      </th>
                    )}
                  </React.Fragment>
                );
              })}
            </tr>
          </thead>

          <tbody className="custom-scroll-sm" style={{height:'300px', overflow:'scroll'}}>
            {clientData?.map((item, index) => {
              return (
                <>
                  <tr key={index} className="">
                    {
                      <td className="d-flex align-items-center justify-content-between" style={{width:"130px"}}>
                        <input type="checkbox" />
                        {item.contact_manager.length > 0 && (
                          <>
                            <div
                              onClick={() => {
                                if (expand == item.id) {
                                  setExpand(null);
                                  setClientData((prev) => {
                                    const update = [...prev];
                                    update[index]["open"] = false;
                                    return update;
                                  });
                                } else {
                                  setExpand(item.id);
                                  setClientData((prev) => {
                                    const update = [...prev];
                                    update[index]["open"] = true;
                                    return update;
                                  });
                                }
                              }}
                              className="mx-2 px-1 d-flex gap-1 justify-content-center align-items-center text-white  rounded-1 cursor-pointer fw-bold fs-6"
                              style={{background:'var(--primary-2nd-color)'}}
                            >
                            <div
                              className="text-white "
                              style={{
                                width: "24px",
                                height: "24px",
                                fontSize: "12px",
                                borderRadius: "3px",
                                background:'var(--primary-2nd-color)'
                              }}
                            >
                              <p className="text-white fw-medium" style={{fontSize:'15px'}}>

                              {item.contact_manager.length}
                              </p>

                            </div>
                            <span className="cursor-pointer text-white fs-4">
                                {item.id == expand ? reactIcons.arrowfillup : reactIcons.arrowfilldown}
                              </span>
                            </div>
                          </>
                        )}
                      </td>
                    }
                    <td style={{width:"150px"}}>{item.id}</td>
                    <td
                     style={{width:"250px"}}
                      className=" hover-overlay cursor-pointer text-primary"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasRight"
                      aria-controls="offcanvasRight"
                      onClick={() => setClient(item)}
                    >
                      {item.client_name}
                    </td>
                    <td style={{width:"300px"}}>{item.client_email}</td>
                    <td style={{width:"300px"}}>{item.client_cont}</td>
                    <td style={{width:"300px"}}>{item.client_website}</td>
                    <td style={{width:"150px"}}>{item.status}</td>
                    {/* <td className="remaining">{item.category}</td> */}
                    <td style={{width:"200px"}}>{item.owner_name}</td>
                    {/* <td className="status">{item.business_unit}</td> */}
                    {/* <td className="expiry">{item.job_posting}</td> */}
                    {/* <td className="" style={{ width: "200px" }}>
                      {item.created_by}
                    </td> */}
                    <td className="" style={{ width: "250px" }}>
                      {moment(item.created_at).format("DD-MM-YYYY hh:mm A")}
                    </td>
                    <td className="" style={{ width: "250px" }}>
                      {moment(item.updated_at).format("DD-MM-YYYY hh:mm A")}
                    </td>
                    <td style={{width:"150px"}}>
                      <div className="option-box">
                        <ul className="d-flex justify-content-start option-list">
                          <li>
                            <button
                              className="package cursor-pointer"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#offcanvasRight"
                              aria-controls="offcanvasRight"
                              onClick={() => setClient(item)}
                              data-text="Update client"
                            >
                              {/* <a
                            href="#"
                            className="theme-btn btn-style-three call-modal"
                            data-bs-toggle="modal"
                            data-bs-target="#userUpdateModal"
                          > */}
                              <span className="las la-edit"></span>
                              {/* </a> */}
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={
                                () => {
                                  if (active == 1) {
                                    handleInactiveClient(item.id);
                                  } else {
                                    handleActiveClient(item.id);
                                  }
                                }
                                // setUserId(item.id)
                              }
                              // data-bs-toggle="modal"
                              //     data-bs-target="#userDeleteModal"

                              data-text={`${
                                active == 1 ? "Inactive User" : "Active User"
                              }`}
                            >
                              <span
                                className={`${
                                  active == 1
                                    ? "las la-times-circle"
                                    : "las la-check-square"
                                }`}
                              ></span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  {item.id == expand && (
                    <tr style={{ background: "white" }}>
                      <td colSpan={7}>
                        <div className="mx-5 my-3 border rounded-1  inner-table shadow custom-scroll-2nd"  style={{ width: "1500px", height:'400px', overflow:'auto' }}>
                          <div></div>
                          <table>
                            <thead className="table-inner-thead">
                              <th>Name</th>
                              <th>Email</th>
                              <th>Office number</th>
                              <th>Designation</th>
                              <th>Mobile Number</th>
                              {/* <th>Location</th> */}
                              <th>OwnerShip</th>
                              <th>Status</th>
                              {/* <th>Created By</th> */}
                            </thead>
                            <tbody style={{height:'400px !important', overflow:'auto'}}>
                              {/* <tr>
                                <td
                                  className="cursor-pointer"
                                  data-bs-toggle="offcanvas"
                                  data-bs-target="#offcanvasLeft"
                                  aria-controls="offcanvasLeft"
                                  onClick={() => setContactDetails()}
                                >
                                  flex
                                </td>
                                <td>flex@mail.com</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>Alaska</td>
                                <td>Dharmendra patel</td>
                                <td>-</td>
                                <td>-</td>
                              </tr> */}
                              {item.contact_manager.map((contact, _index) => {
                                return (
                                  <tr key={_index}>
                                    <td
                                      onClick={() => setContactDetails(contact)}
                                      data-bs-toggle="offcanvas"
                                      data-bs-target="#offcanvasLeft"
                                      aria-controls="offcanvasLeft"
                                      className="cursor-pointer fw-bold"
                                    >
                                      {contact.name}
                                    </td>
                                    <td>{contact.email}</td>
                                    <td>{contact.off_cont}</td>
                                    <td>{contact.designation}</td>
                                    <td>{contact.contact}</td>
                                    {/* <td>Alaska</td> */}
                                    <td>{contact.ownership}</td>
                                    <td>{contact.status}</td>
                                    {/* <td>{contact.createdBy}</td> */}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
            {clientData.length == 0 && (
              <tr className="text-center mt-5">
                <td colSpan={11}>No data found</td>
              </tr>
            )}
            {/* End tr */}
          </tbody>
        </table>
      </div>
      {dataCount > 25 && (
        <Pagination
          page={page}
          setPage={setPage}
          dataCount={dataCount}
          pageSize={25}
          //  setPageSize={setPageSize}
        />
      )}
    </>
  );
};

export default ClientTable;
