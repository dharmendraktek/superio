  "use momItem";
  import { useEffect, useState } from "react";
  import BtnBeatLoader from "./BtnBeatLoader";
  import { toast } from "react-toastify";
  import SelectWithSearch from "./SelectWithSearch";
  import { getReq, patchReq, postApiReq } from "@/utils/apiHandlers";
  import UsersListDropdown from "./UsersListDropdown";
  import MyCKEditor from "./MyCkEditor";

  const initialState = {
    subject: "",
    description: "",
    status: "",
    participants: [],
  };

  const AddMomModal = ({ handleGetMom, momItem, setMomItem }) => {
    const [form, setForm] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
      subject: "",
    });
    const [momStatusList, setMomStatusList] = useState([]);
    const [selectedUsersIds, setSelectedUsersIds] = useState([]);
    const [descriptionData, setDescriptionData] = useState("");

    const handleGetMomStatusList = async () => {
      const response = await getReq("/meeting-status/");
      if (response.status) {
        setMomStatusList(response.data);
      }
    };

    useEffect(() => {
      handleGetMomStatusList();
    }, []);


    // useEffect(() => {
    //   if (momItem) {
    //     console.log("--------working ----", momItem);
    //     setSelectedUsersIds(momItem.participants);
    //     setDescriptionData(momItem.description);
    //     setForm((...prev) => ({
    //       ...prev,
    //       subject: momItem.subject,
    //       description: momItem.description,
    //       status: momItem.status,
    //       participants: momItem.participants,
    //     }));
    //   }
    //   console.log("---------selected users ids---", selectedUsersIds);
    // }, [momItem]);


    useEffect(() => {
      if (momItem) {
        // Set values for "update" mode
        setSelectedUsersIds(momItem.participants || []);
        setDescriptionData(momItem.description);
        setForm((prev) => ({
          ...prev,
          subject: momItem.subject,
          description: momItem.description,
          status: momItem.status,
          participants: momItem.participants,
        }));
      } else {
        // Reset values for "create" mode
        setSelectedUsersIds([]);
        setForm(initialState);
        setDescriptionData("");
      }
    }, [momItem]);

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
      if (!handleValidation()) {
        return;
      }
      try {
        setLoading(true);
        const response = await postApiReq("/meeting-minutes/", form);
        if (response.status) {
          const closeBtn = document.getElementById("closeBtnMom");
          closeBtn.click();
          setMomItem('')
          setLoading(false);
          setForm(initialState);
          setDescriptionData("");
          handleGetMom();
          toast.success("MOM has been successfully created");
        }
      } catch (err) {
        setLoading(false);
        toast.error(err.response || "Something went wrong!");
      }
    };

    const handleUpdateMom = async () => {
      form["participants"] = selectedUsersIds;
      try {
        setLoading(true);
        const response = await patchReq(`/meeting-minutes/${momItem.id}/`, form);
        if (response.status) {
          handleGetMom();
          setForm(initialState);
          setDescriptionData("");
          const closeBtn = document.getElementById("closeBtnMom");
          closeBtn.click();
          setLoading(false);
          toast.success("MOM has been successfully updated");
          // getClientList();
        }
      } catch (err) {
        setLoading(false);
        // toast.error(err.response || "Something went wrong!");
      }
    };

    const handleClear = () => {
      setSelectedUsersIds([]);
      setDescriptionData('');
      setForm(initialState)
      setMomItem(null);
    }

    return (
      <div
        style={{ width: "1200px !important" }}
        className="offcanvas offcanvas-end"
        tabindex="-1"
        id="addMomModal"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">Add Meetings of Minutes</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            id="closeBtnMom"
            onClick={handleClear}
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="d-flex justify-content-end">
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
                if (momItem?.id) {
                  handleUpdateMom(momItem.id);
                } else {
                  handleCreateMom();
                }
              }}
              disabled={loading}
            >
              {loading ? <BtnBeatLoader /> : momItem?.id ? "Update" : "Save"}
            </button>
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
            <div className="col-12 my-2">
              {momItem ? (
                <MyCKEditor
                  setDescriptionData={setDescriptionData}
                  form={form}
                  name={"update"}
                  height="400px"
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
                  height="400px"
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
      </div>
    );
  };

  export default AddMomModal;
