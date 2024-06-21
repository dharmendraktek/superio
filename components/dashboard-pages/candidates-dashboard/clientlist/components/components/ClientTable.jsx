"use client";
// import UserUpdateModal from "./UserUpdateModal";
// import UserDeleteModal from "./components/UserDeleteModal";

import { useEffect, useState } from "react";
import ClientUpdateModal from "../ClientUpdateModal";
import ClientDeleteModal from "./ClientDeleteModal";
import { clientData, clientTableField } from "./constant";
import axios from "axios";
import { BASE_URL } from "@/utils/endpoints";
import { reactIcons } from "@/utils/icons";
import { Country, State, City } from "country-state-city";
import { toast } from "react-toastify";
import moment from "moment";
import { BeatLoader } from "react-spinners";
import Pagination from "@/components/common/Pagination";

const tabsName = [
  { id: 1, name: "ACTIVE USERS" },
  { id: 2, name: "INACTIVE USERS" },
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

  const getClientList = async (search) => {
    const response = await axios.get(
      BASE_URL +
        `/clients-list/?active=${active == 1 ? true : false}${
          search ? `&search=${search}` : ""
        }`
    );
    if (response.status) {
      setClientData(response.data.results);
    }
  };

  const getOwnerList = async () => {
    const response = await axios.get(BASE_URL + "/operations-users/");
    setOwnerList(response.data);
  };
  useEffect(() => {
    getOwnerList();
  }, []);

  useEffect(() => {
    getClientList(search);
  }, [search, active]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateClient = async () => {
    try {
      setLoading(true);
      const response = await axios.post(BASE_URL + "/create-client/", form);
      if (response.status) {
        setLoading(false);
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
      const response = await axios.patch(
        BASE_URL + `/update-client/${client.id}/`,
        form
      );
      if (response.status) {
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
    const response = await axios.patch(BASE_URL + `/activate-client/${id}/`);
    if (response.status) {
      toast.success("Client status updated successfully !");
      getClientList();
    }
  };
  const handleInactiveClient = async (id) => {
    const response = await axios.patch(BASE_URL + `/delete-client/${id}/`);
    if (response.status) {
      toast.success("Client status updated successfully !");
      getClientList();
    }
  };

  return (
    <>
      <ClientDeleteModal />
      <ClientUpdateModal />
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
                  onClick={() => setClient(initialState)}
                >
                  Client
                </li>
                <li
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasLeft"
                  aria-controls="offcanvasLeft"
                  className="cursor-pointer  text-black hover-bg-gray px-2"
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
            >
              {/* Cancel */}
            </button>
          </div>
        </div>
        <div className="offcanvas-body">
          <div className="d-flex justify-content-end">
            <button className="theme-btn btn-style-one small">New</button>
            <button className="theme-btn btn-style-two mx-2 small">
              {loading ? (
                <BeatLoader color={"#ffffff"} loading={loading} size={10} />
              ) : (
                "Save"
              )}
            </button>
          </div>
          <div className="row">
            <div className="col-6 my-1">
              <p>Contact Name</p>
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
              <input
                name="client_owner"
                value={form.client_owner}
                onChange={handleChange}
                className="client-form-input"
                type="text"
              />
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
                if (client) {
                  handleUpdateClient(client.id);
                } else {
                  handleCreateClient();
                }
              }}
              disabled={loading}
            >
              {loading ? (
                <BeatLoader color={"#ffffff"} loading={loading} size={10} />
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
                      {item.user.username}
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
      <div className="table_div">
        <table className="default-table">
          <thead className="">
            <tr>
              {clientTableField.map((item, index) => {
                return (
                  <>
                    {item.title == "input" ? (
                      <th>
                        <input type="checkbox" />
                      </th>
                    ) : (
                      <th key={index}>{item.title}</th>
                    )}
                  </>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {clientData.map((item, index) => {
              return (
                <>
                  <tr key={index} className="">
                    {
                      <td className="d-flex mt-3 ">
                        <input type="checkbox" />
                        <div
                          onClick={() => {
                            if (expand) {
                              setExpand(null);
                            } else {
                              setExpand(item.id);
                            }
                          }}
                          className="mx-2 px-2 text-primary fw-bold fs-6"
                        >
                          <span className="">
                            {item.id == expand ? "-" : "+"}
                          </span>
                        </div>
                        <div
                          className="bg-primary text-white mt-1 px-2 ml-2"
                          style={{
                            width: "24px",
                            height: "24px",
                            fontSize: "12px",
                            borderRadius: "3px",
                          }}
                        >
                          3
                        </div>
                      </td>
                    }
                    <td>{item.id}</td>
                    {/* <td className="trans-id">{item.empcode}</td>   */}
                    <td
                      className="package hover-overlay cursor-pointer"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasRight"
                      aria-controls="offcanvasRight"
                      onClick={() => setClient(item)}
                    >
                      {item.client_name}
                      {/* <a href="#">Super CV Pack</a> */}
                    </td>
                    <td>{item.client_email}</td>
                    <td className="expiry">{item.client_cont}</td>
                    <td>{item.client_website}</td>
                    {/* <td className="total-jobs">{item.industry}</td> */}
                    <td className="used">{item.status}</td>
                    {/* <td className="remaining">{item.category}</td> */}
                    <td className="status">{item.client_owner}</td>
                    {/* <td className="status">{item.business_unit}</td> */}
                    {/* <td className="expiry">{item.job_posting}</td> */}
                    {/* <td className="" style={{ width: "200px" }}>
                      {item.created_by}
                    </td> */}
                    <td className="" style={{ width: "200px" }}>
                      {moment(item.created_at).format("DD-MM-YYYY hh:mm A")}
                    </td>
                    <td className="" style={{ width: "200px" }}>
                      {moment(item.updated_at).format("DD-MM-YYYY hh:mm A")}
                    </td>
                    <td>
                      <div className="option-box">
                        <ul className="option-list">
                          <li>
                            <button
                              className="package cursor-pointer"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#offcanvasRight"
                              aria-controls="offcanvasRight"
                              onClick={() => setClient(item)}
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
                        <div className="mx-5" style={{ width: "500px" }}>
                          <table>
                            <thead>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Office number</th>
                              <th>Designation</th>
                              <th>Mobile Number</th>
                              <th>Location</th>
                              <th>OwnerShip</th>
                              <th>Status</th>
                              <th>Created By</th>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Fleck</td>
                                <td>fleckjoy@gmail.com</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>Alaska</td>
                                <td>Dharmendra</td>
                                <td>-</td>
                                <td>-</td>
                              </tr>
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
        <div className="d-flex  justify-content-end">
        <Pagination 
         page={1}
        //  setPage={}
         dataCount={40}
         pageSize={10}
        //  setPageSize={setPageSize}
        />
        </div>
      </div>
    </>
  );
};

export default ClientTable;
