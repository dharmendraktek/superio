"use client";

import { getReq, patchReq, postApiReq } from "@/utils/apiHandlers";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BtnBeatLoader from "./BtnBeatLoader";
import SelectWithSearch from "./SelectWithSearch";
import DatePickerCustom from "./DatePickerCustom";
import UsersListDropdown from "./UsersListDropdown";

const initialState = {
  meeting_ref: "",
  task: "",
  timeline: "",
  action_taken: "",
  result: "",
  ownership: [],
  head_ownership: [],
  status: "",
};

const AddMomAction = ({
  handleGetMom,
  momActionDetails,
  setMomActionDetails,
  momItem,
  setMomItem,
}) => {
  const [momActionData, setMomActionData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  // const [momActionDetails, setMomActionDetails] = useState("");
  const [momList, setMomList] = useState([]);
  const [error, setError] = useState({
    meeting_ref: "",
    task: "",
    timeline: "",
    action_taken: "",
    result: "",
    ownership: [],
    head_ownership: [],
    status:"",
  });
  const [momStatusList, setMomStatusList] = useState([]);
  const [selectedUsersIds, setSelectedUsersIds] = useState([]);
  const [selectedOwnesrship, setSelectedOwnership] = useState([]);
  
  useEffect(() => {
    if (momItem) {
      setMomActionData((prev) => ({ ...prev, meeting_ref: momItem.id }));
    }
    if (momActionDetails) {
      setSelectedUsersIds(momActionDetails.head_ownership)
      setSelectedOwnership(momActionDetails.ownership)
      setMomActionData((prev) => ({
        ...prev,
        task: momActionDetails.task,
        timeline: momActionDetails.timeline,
        action_taken: momActionDetails.action_taken,
        result: momActionDetails.result,
        ownership: momActionDetails.ownership,
        head_ownership: momActionDetails.head_ownership,
        status: momActionDetails.status,
      }));
    }
  }, [momItem, momActionDetails]);

  const handleGetMomStatusList = async () => {
    const response = await getReq("/meeting-status/");
    if (response.status) {
      setMomStatusList(response.data);
    }
  };

  useEffect(() => {
    handleGetMomStatusList();
    getMomList();
  }, []);

  const handleValidation = () => {
    setError((prev) => ({
      ...prev,
      meeting_ref: "",
      task: "",
      timeline: "",
      action_taken: "",
      result: "",
      ownership: "",
      head_ownership: "",
      status: "",
    }));

    if (!momActionData.meeting_ref) {
      setError((prev) => ({ ...prev, meeting_ref: "This field is required" }));
    }
    if (!momActionData.task) {
      setError((prev) => ({ ...prev, task: "This field is required" }));
    }
    if (!momActionData.timeline) {
      setError((prev) => ({ ...prev, timeline: "This field is required" }));
    }
    // if (!momActionData.action_taken) {
    //   setError((prev) => ({ ...prev, action_taken: "This field is required" }));
    // }

    let { meeting_ref, task, timeline, action_taken } = momActionData;
    if (meeting_ref && task && timeline ) {
      return true;
    } else {
      return false;
    }
  };

  const getMomList = async () => {
    const response = await getReq("/meeting-minutes/");
    if (response.status) {
      setMomList(response.data);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMomActionData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateMomAction = async () => {
    momActionData["ownership"] = selectedOwnesrship;
    momActionData["head_ownership"] = selectedUsersIds;
    if (!handleValidation()) {
      return;
    }
    try {
      setLoading(true);
      const response = await postApiReq(
        "/meeting-action-items/",
        momActionData
      );
      if (response.status) {
        setMomActionData(initialState);
        handleGetMom();
        const closeBtn = document.getElementById("closeBtnMomAction");
        closeBtn.click();
        setLoading(false);
        toast.success("Action has been successfully created");
        handleGetClientContactManagers();
      }
      if (!response.status) {
        setLoading(response.error.message);
      }
    } catch (err) {
      setLoading(false);
      // toast.error(err.response || "Something went wrong!....");
    }
  };

  const handleUpdateMomAction = async (id) => {
    momActionData["ownership"] = selectedOwnesrship;
    momActionData["head_ownership"] = selectedUsersIds;
    try {
      setLoading(true);
      const response = await patchReq(
        `/meeting-action-items/${id}/`,
        momActionData
      );
      setLoading(false);
      if (response.status) {
        handleGetClientContactManagers();
        handleGetMom();
        const closeBtn = document.getElementById("closeBtnMomAction");
        closeBtn.click();
        setLoading(false);
        toast.success("Client contact has been updated successfully!");
      }
    } catch (err) {
      setLoading(false);
      // toast.error(err.response || "Something went wrong!");
    }
  };

  const handleClear = () => {
    setSelectedOwnership([]);
    setSelectedUsersIds([]);
    setMomActionDetails("");
    setMomActionData(initialState);
    setMomItem("");
  }
  console.log("-----------mom action detial ", momActionDetails);

  return (
    <div
      style={{ width: "800px !important" }}
      className="offcanvas offcanvas-start"
      tabindex="-1"
      id="addMomActionModal"
      aria-labelledby="offcanvasLeftLabel"
    >
      <div className="offcanvas-header">
        <h5 id="offcanvasLeftLabel">Add MOM Action</h5>
        <div className="d-flex justify-content-end">
          {/* <button className="theme-btn btn-style-one small">New</button>
            <button className="theme-btn btn-style-two mx-2 small">Save</button> */}
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            id="closeBtnMomAction"
            onClick={handleClear}
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
              setMomActionData(initialState);
              setMomActionDetails("");
            }}
          >
            New
          </button>
          <button
            className="theme-btn btn-style-one mx-2 small"
            onClick={() => {
              if (momActionDetails) {
                handleUpdateMomAction(momActionDetails.id);
              } else {
                handleCreateMomAction();
              }
            }}
            disabled={loading}
          >
            {loading ? (
              <BtnBeatLoader />
            ) : momActionDetails?.id ? (
              "Update"
            ) : (
              "Save"
            )}
          </button>
        </div>
        <div className="row">
          <div className="col-6 my-1">
            <p>
              Meeting <strong className="text-danger">*</strong>
            </p>
            <select
              value={momActionData.meeting_ref}
              className="client-form-input"
              name="meeting_ref"
              onChange={handleChange}
              disabled={momActionDetails}
            >
              <option>Select</option>
              {momList?.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.subject}
                  </option>
                );
              })}
            </select>
            <span className="text-danger">{error.meeting_ref}</span>
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
                      momList?.find((_item) => _item.id == form.client)
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
                    {momList.map((item, index) => {
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
            <p>
              Timeline <strong className="text-danger">*</strong>
            </p>
            <DatePickerCustom
              date={momActionData.timeline}
              handleDate={(date) =>
                setMomActionData((prev) => ({ ...prev, timeline: date }))
              }
            />
            <span className="text-danger">{error.timeline}</span>
          </div>
          <div className="col-12 my-1">
            <p>
              Task <strong className="text-danger">*</strong>
            </p>
            <input
              name="task"
              value={momActionData.task}
              onChange={handleChange}
              className="client-form-input"
              type="text"
            />
            <span className="text-danger">{error.task}</span>
          </div>
          {momActionDetails &&
          <>
          <div className="col-12 my-1">
            <p>Action <strong className="text-danger">*</strong></p>
            <input
              name="action_taken"
              value={momActionData.action_taken}
              onChange={handleChange}
              className="client-form-input"
              type="text"
            />
            <span className="text-danger">{error.action_taken}</span>
          </div>
          <div className="col-12 my-1">
            <p>Result</p>
            <input
              name="result"
              value={momActionData.result}
              onChange={handleChange}
              className="client-form-input"
              type="text"
            />
          </div>
          </>
          }
          <div className="col-6 my-1">
            <p>Head Ownership</p>
            {/* <SelectWithSearch
              setForm={setMomActionData}
              form={momActionData}
              name="head_ownership"
              email={false}
            /> */}
            <UsersListDropdown
              key={momItem ? momItem.id : "new"} 
              selectedUsersIds={selectedUsersIds}
              setSelectedUsersIds={setSelectedUsersIds}
              showUsersbelow={false}
              showUsersAbove={true}
            />
          </div>
          <div className="col-6 my-1">
            <p>Task Owner</p>
            <UsersListDropdown
              key={momItem ? momItem.id : "new"} 
              selectedUsersIds={selectedOwnesrship}
              setSelectedUsersIds={setSelectedOwnership}
              showUsersbelow={false}
              showUsersAbove={true}
            />
          </div>
          {momActionDetails &&
          <div className="col-6 my-1">
            <p>Status</p>
            <select
              value={momActionData.status}
              className="client-form-input"
              name="status"
              onChange={handleChange}
            >
              <option value="">Select</option>
              {momStatusList.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          }
        </div>
      </div>
    </div>
  );
};

export default AddMomAction;
