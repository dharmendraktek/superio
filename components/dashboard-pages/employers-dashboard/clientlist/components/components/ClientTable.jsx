"use client";
import React, { useEffect, useState } from "react";
import {  clientTableField } from "./constant";
import { reactIcons } from "@/utils/icons";
import { toast } from "react-toastify";
import moment from "moment";
import Pagination from "@/components/common/Pagination";
import { getReq, patchReq,  } from "@/utils/apiHandlers";
import Loader from "@/components/common/Loader";
import AddClientModal from "@/components/common/AddClientModal";
import AddContactManagerModal from "@/components/common/AddContactManagerModal";

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



const ClientTable = () => {
  const [expand, setExpand] = useState(null);
  const [client, setClient] = useState();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState();
  const [clientData, setClientData] = useState([]);
  const [active, setActive] = useState(1);
  const [clientNameList, setClientNameList] = useState([]);
  const [contactDetails, setContactDetails] = useState();
  const [page, setPage] = useState(0);
  const [dataCount, setDataCount] = useState();
  const [isLoading, setIsLoading] = useState(false);




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

 

  useEffect(() => {
    if(search){
      setPage(0);
      getClientList(search);
    }else {
      getClientList();
    }
  }, [search, active, page]);


  const handleActiveClient = async (id) => {
    // const response = await patchReq(`/activate-client/${id}/`);
    const response = await patchReq(`/activate-client/${id}/`);

    if (response.status) {
      toast.success("Client status has been updated successfully !");
      getClientList();
    }
  };
  const handleInactiveClient = async (id) => {
    console;
    // const response = await patchReq(`/delete-client/${id}/`);
    const response = await patchReq(`/delete-client/${id}/`);

    if (response.status) {
      toast.success("Client status has been updated successfully !");
      getClientList();
    }
  };

  const getClientNameList = async () => {
    const response = await getReq("/clients-dropdown/");
    if (response.status) {
      setClientNameList(response.data);
    }
  };

 

  return (
    <>
      {isLoading && <Loader />}
      <AddClientModal handleGetClientNames={getClientNameList} client={client} setClient={setClient} />
      <AddContactManagerModal handleGetClientContactManagers={getClientNameList} contactDetails={contactDetails} setContactDetails={setContactDetails} />
      <div className="d-flex justify-content-between mt-3">
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
                  data-bs-target="#addClientModal"
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
                  data-bs-target="#addContactModal"
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
      <div className="table_div custom-scroll-sm">
        <table className="default-table">
          <thead className="">
            <tr>
              {clientTableField.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    {/* {item.title == "input" ? (
                      <th key={index} style={{ width: `${item.size}` }}>
                        <input type="checkbox" />
                      </th>
                    ) :
                     ( */}
                      <th  style={{ width: `${item.size}` }} key={index}>
                        {item.title}
                      </th>
                   {/* )} */}
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
                        {/* <input type="checkbox" /> */}
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
                      data-bs-target="#addClientModal"
                      aria-controls="offcanvasRight"
                      onClick={() => setClient(item)}
                    >
                      {item.client_name}
                    </td>
                    <td style={{width:"300px"}}>{item.client_email || 'N/A'}</td>
                    <td style={{width:"300px"}}>{item.client_cont || 'N/A'}</td>
                    <td style={{width:"300px"}}>{item.client_website || 'N/A'}</td>
                    <td style={{width:"150px"}}>{item.status || 'N/A'}</td>
                    {/* <td className="remaining">{item.category}</td> */}
                    <td style={{width:"200px"}}>{item.owner_name || 'N/A'}</td>
                    {/* <td className="status">{item.business_unit}</td> */}
                    {/* <td className="expiry">{item.job_posting}</td> */}
                    {/* <td className="" style={{ width: "200px" }}>
                      {item.created_by}
                    </td> */}
                    <td className="" style={{ width: "250px" }}>
                      {item.created_at ? moment(item.created_at).format("DD-MM-YYYY hh:mm A") : 'N/A'}
                    </td>
                    <td className="" style={{ width: "250px" }}>
                      {item.updated_at ? moment(item.updated_at).format("DD-MM-YYYY hh:mm A") : 'N/A'}
                    </td>
                    <td style={{width:"260px"}}>
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
                        <div className="mx-5 my-3 border rounded-1  inner-table shadow custom-scroll-2nd"  style={{ height:'400px', overflow:'auto' }}>
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
                                      data-bs-target="#addContactModal"
                                      aria-controls="offcanvasLeft"
                                      className="cursor-pointer fw-bold"
                                    >
                                      {contact.name || 'N/A'}
                                    </td>
                                    <td>{contact.email || 'N/A'}</td>
                                    <td>{contact.off_cont || 'N/A'}</td>
                                    <td>{contact.designation || 'N/A'}</td>
                                    <td>{contact.contact || 'N/A'}</td>
                                    {/* <td>Alaska</td> */}
                                    <td>{contact.ownership || 'N/A'}</td>
                                    <td>{contact.status || 'N/A'}</td>
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
