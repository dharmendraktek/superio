"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getReq, patchReq, postApiReq } from "@/utils/apiHandlers";
import BtnBeatLoader from "@/components/common/BtnBeatLoader";
import UsersListDropdown from "@/components/common/UsersListDropdown";
import MyCKEditor from "@/components/common/MyCkEditor";
import Paper from "@/components/common/Paper";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MultiSelectClient from "@/components/common/MultiSelectClient";

const initialState = {
  subject: "",
  description: "",
  status: "",
  participants: [],
};

const AddMom = ({ momItem, setMomItem }) => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    subject: "",
  });
  const [momStatusList, setMomStatusList] = useState([]);
  const [selectedUsersIds, setSelectedUsersIds] = useState([]);
  const [descriptionData, setDescriptionData] = useState("");
  const [selectedClientIds, setSelectedClientIds] = useState([]);
  const router = useRouter();

  const handleGetMomStatusList = async () => {
    const response = await getReq("/meeting-status/");
    if (response.status) {
      setMomStatusList(response.data);
      let defaultStatusId = response.data.find((item) => item.value == "open")
      setForm((prev) => ({...prev, status:defaultStatusId.id}));
    }
  };

  useEffect(() => {
    handleGetMomStatusList();
  }, []);

  useEffect(() => {
    if (descriptionData) {
      setForm((prev) => ({ ...prev, description: descriptionData }));
    }
  }, [descriptionData]);

  const handleValidation = () => {
    setError((prev) => ({
      ...prev,
      subject: "",
    }));

    if (!form.subject) {
      setError((prev) => ({ ...prev, subject: "This field is required" }));
    }

    let { subject } = form;
    if (subject) {
      return true;
    } else {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateMom = async () => {
    // setForm((prev) => ({ ...prev, participants: selectedUsersIds }));
    form["participants"] = selectedUsersIds;
    form["client"] = selectedClientIds;
    if (!handleValidation()) {
      return;
    }
    try {
      setLoading(true);
      const response = await postApiReq("/meeting-minutes/", form);
      if (response.status) {
        router.push("/employers-dashboard/mom");
        toast.success("MOM has been successfully created");
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.response || "Something went wrong!");
    }
  };

  return (
    <Paper>
      <div>
        <div className="d-flex justify-content-between my-2">
          <div>
            <Link href="/employers-dashboard/mom">
              <button className="theme-btn btn-style-three small">Back</button>
            </Link>
          </div>
          <div>
            <h4>Add MOM (Meetings of minutes)</h4>
          </div>
          <div>
            <button
              className="theme-btn btn-style-two mx-2 small"
              onClick={() => {
                setForm(initialState);
                setMomItem("");
              }}
            >
              Reset
            </button>
            <button
              className="theme-btn btn-style-one small"
              onClick={() => {
                handleCreateMom();
              }}
              disabled={loading}
            >
              {loading ? <BtnBeatLoader /> : momItem?.id ? "Update" : "Save"}
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-6 my-1">
            <p>
              Subject <strong className="text-danger">*</strong>
            </p>
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="client-form-input"
              type="text"
              autoComplete="off"
            />
            <span className="text-danger">{error.subject}</span>
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
              {momStatusList.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-12 my-1">
            <p>Participants</p>
            <UsersListDropdown
              key={momItem ? momItem.id : "new"}
              selectedUsersIds={selectedUsersIds}
              setSelectedUsersIds={setSelectedUsersIds}
              showUsersbelow={false}
              showUsersAbove={true}
              withEmail={false}
            />
          </div>
          <div className="col-6 my-2">
             <p>Client</p>
             <MultiSelectClient 
               selectedClientIds={selectedClientIds}
               setSelectedClientIds={setSelectedClientIds}
               showUsersAbove={true}
             />
          </div>
          <div className="col-6 my-2">
            <p>Guests Participants</p>
            <textarea
              placeholder="Enter Names with comma separator"
              className="client-form-input"
              type="text"
              style={{
                height: "60px",
              }}
              name="external_participants"
              value={form.guest_email}
              onChange={(e) => {
                setForm((prev) => ({
                  ...prev,
                  external_participants: e.target.value.split(","),
                }));
              }}
            />
          </div>
          <div className="col-12 my-2">
            {momItem ? (
              <MyCKEditor
                setDescriptionData={setDescriptionData}
                form={form}
                name={"update"}
                height="450px"
                wrapperStyle={{
                  border: "1px solid gray",
                  minHeight: "300px",
                  borderRadius: "3px",
                }}
              />
            ) : (
              <MyCKEditor
                setDescriptionData={setDescriptionData}
                form={form}
                name={"create"}
                height="450px"
                wrapperStyle={{
                  border: "1px solid gray",
                  minHeight: "300px",
                  borderRadius: "3px",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default AddMom;
