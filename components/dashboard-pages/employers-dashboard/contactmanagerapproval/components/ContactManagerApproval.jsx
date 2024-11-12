"use client";
import React, { useEffect, useState } from "react";
import { reactIcons } from "@/utils/icons";
import { toast } from "react-toastify";
import moment from "moment";
import Pagination from "@/components/common/Pagination";
import { deleteReq, getReq, patchReq } from "@/utils/apiHandlers";
import Loader from "@/components/common/Loader";
import AddClientModal from "@/components/common/AddClientModal";
import AddContactManagerModal from "@/components/common/AddContactManagerModal";
import { clientTableField } from "../../clientlist/components/components/constant";
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

const ContactManagerApproval = () => {
  const [expand, setExpand] = useState(null);
  const [client, setClient] = useState();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState();
  const [contactData, setContactData] = useState([]);
  const [active, setActive] = useState(1);
  const [clientNameList, setClientNameList] = useState([]);
  const [contactDetails, setContactDetails] = useState();
  const [page, setPage] = useState(0);
  const [dataCount, setDataCount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rejLoading, setRejLoading] = useState(false);
  const [contactId, setContactId] = useState(null);
  const [delLoading, setDelLoading] = useState(false);

  const getContactManagerList = async (search) => {
    setIsLoading(true);
    const response = await getReq(
      `/contact-manager/?pending-approval=true&page=${page + 1}${
        search ? `&search=${search}` : ""
      }`
    );
    setIsLoading(false);
    if (response.status) {
      setContactData(response.data.results || response.data);
      setDataCount(response.data.count);
    }
  };

  useEffect(() => {
    if (search) {
      setPage(0);
      getContactManagerList(search);
    } else {
      getContactManagerList();
    }
  }, [search, active, page]);

  const getClientNameList = async () => {
    const response = await getReq("/clients-dropdown/");
    if (response.status) {
      setClientNameList(response.data);
    }
  };

  const handleApproval = async (id, action) => {
    let data = {
      action: action,
    };
    try {
      setContactId(id);
      if (action == "approve") {
        setLoading(true);
      } else {
        setRejLoading(true);
      }
      const response = await patchReq(`/contact-manager/${id}/`, data);
      setRejLoading(false);
      setLoading(false);
      if (response.status) {
        getContactManagerList();
        if (action == "approve") {
          toast.success("Client has been successfully approved");
        } else {
          toast.success("Client has been successfully rejected");
        }
      }
    } catch (err) {
      setRejLoading(false);
      setLoading(false);
    }
  };

  const handleDeleteContactManager = async (id) => {
    try {
      setDelLoading(true);
      const response = await deleteReq(`/contact-manager/${id}/`);
      setDelLoading(false);
      if (response.status) {
        toast.success("Client has been successfully deleted");
      }
    } catch (err) {
      toast.error(err.response || "Something went wrong");
      setDelLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="table_div custom-scroll-sm">
        <table className="default-table">
          <thead className="">
            <tr>
              <th style={{width:'200px'}}>Name</th>
              <th style={{width:'250px'}}>Email</th>
              <th style={{width:'200px'}}>Office number</th>
              <th style={{width:'200px'}}>Designation</th>
              <th style={{width:'200px'}}>Mobile Number</th>
              {/* <th>Location</th> */}
              <th style={{width:'200px'}}>OwnerShip</th>
              <th style={{width:'150px'}}>Status</th>
              {/* <th>Created By</th> */}
              <th style={{width:'300px'}}>Action</th>
            </tr>
          </thead>
          <tbody
            className="custom-scroll-sm"
            style={{ height: "300px", overflow: "scroll" }}
          >
            {contactData?.map((contact, index) => {
              return (
                <>
                  <tr key={index} className="">
                    <td style={{width:'200px'}}>{contact.name || "N/A"}</td>
                    <td style={{width:'250px'}}>{contact.email || "N/A"}</td>
                    <td style={{width:'200px'}}>{contact.off_cont || "N/A"}</td>
                    <td style={{width:'200px'}}>{contact.designation || "N/A"}</td>
                    <td style={{width:'200px'}}>{contact.contact || "N/A"}</td>
                    {/* <td>Alaska</td> */}
                    <td style={{width:'200px'}}>{contact.ownership || "N/A"}</td>
                    <td style={{width:'150px'}}>{contact.status || "N/A"}</td>
                    {/* <td>{contact.createdBy}</td> */}
                    <td style={{ width: "300px" }}>
                      <div className="d-flex gap-1">
                        <button
                          className="theme-btn btn-style-four small"
                          onClick={() => handleApproval(contact.id, "approve")}
                        >
                          {loading && contact.id == contactId ? (
                            <BtnBeatLoader />
                          ) : (
                            "APPROVE"
                          )}
                        </button>
                        <button
                          className="theme-btn btn-style-four small"
                          onClick={() => handleApproval(contact.id, "disapprove")}
                        >
                          {rejLoading && contact.id == contactId ? (
                            <BtnBeatLoader />
                          ) : (
                            "REJECT"
                          )}
                        </button>
                        <button
                          className="theme-btn btn-style-four small"
                          onClick={() => handleDeleteContactManager(contact.id)}
                        >
                          {rejLoading && contact.id == contactId ? (
                            <BtnBeatLoader />
                          ) : (
                            "DELETE"
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                </>
              );
            })}
            {contactData.length == 0 && (
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

export default ContactManagerApproval;
