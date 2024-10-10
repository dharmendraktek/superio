'use client'

import { patchReq, postApiReq } from "@/utils/apiHandlers";
import { useState } from "react";


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

  
const AddContactManagerModal = ({handleGetClientContactManagers}) => {
    const [contactData, setContactData] = useState(initialStateContact);
    const [contLoading, setContLoading] = useState(false);


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
            toast.success("Client contact has been created successfully!");
            getClientList();
            setContactData(initialStateContact);
            handleGetClientContactManagers();
          }
          if (response.error) {
            setContLoading(false);
          }
        } catch (err) {
          setContLoading(false);
          toast.error(err.response || "Something went wrong!");
        }
      };
    
      const handleUpdateClientContact = async (id) => {
        try {
          setContLoading(true);
          const response = await patchReq(
            `/contact-manager/${id}/`,
            contactData
          );
          setContLoading(false);
          if (response.status) {
            const closeBtn = document.getElementById('closeBtnContact');
            closeBtn.click();
            setContLoading(false);
            toast.success("Client contact has been updated successfully!");
            // getClientList();
          }
        } catch (err) {
          setLoading(false);
          toast.error(err.response || "Something went wrong!");
        }
      };

    return(
        <div
        style={{ width: "800px !important" }}
        className="offcanvas offcanvas-end"
        tabindex="-1"
        id="addContactManagerModal"
        aria-labelledby="offcanvasRightLabel"
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
                      {item.user.first_name} {item.user.last_name} ({item.user.email})
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
    )
}

export default AddContactManagerModal;