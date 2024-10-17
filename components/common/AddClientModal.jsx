'use client'
import { getReq, postApiReq } from "@/utils/apiHandlers";
import { Country, State } from "country-state-city";
import { useEffect, useState } from "react";
import BtnBeatLoader from "./BtnBeatLoader";
import { toast } from "react-toastify";
import SelectWithSearch from "./SelectWithSearch";

const initialState = {
    client_name: "",
    client_email: "",
    client_cont: "",
    client_website: "",
    client_address: "",
    client_owner: "",
    is_client_active: 1,
    status: "",
    client_country: "United States",
    client_state: "",
    client_city: "",
  };

const AddClientModal = ({handleGetClientNames}) => {
    const [form, setForm] = useState(initialState);
    const [loading, setLoading] = useState(false)
    const [ownerList, setOwnerList] = useState([]);
    const [countryCode, setCountryCode] = useState("AF");
    const countryList = Country.getAllCountries();
    const stateList = State.getStatesOfCountry(countryCode); 
    const [error, setError] = useState({
      client_name: "",
      client_email: "",
      client_cont: "",
      client_website: "",
      client_address: "",
      client_owner: "",
      is_client_active: "",
      status: "Active",
      client_country: "",
      client_state: "",
      client_city: "",
    });
    


    
  const handleValidation = () => {
    setError((prev) => ({
      ...prev,
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
    }));

    if (!form.client_name) {
      setError((prev) => ({ ...prev, client_name: "This field is required" }));
    }
    // if (!form.client_email) {
    //   setError((prev) => ({ ...prev, client_email: "This field is required" }));
    // }
    // if (!form.client_cont) {
    //   setError((prev) => ({ ...prev, client_cont: "This field is required" }));
    // }
  

    let {
       client_name,
      //  client_email,
      //  client_cont
     
    } = form;
    if (
      client_name
      // client_email &&
      // client_cont 
    ) {
      return true;
    } else {
      return false;
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
        if (form.client_country) {
          let country = countryList.find(
            (item) => item.name == form.client_country
          );
          setCountryCode(country?.isoCode);
        }
      }, [form.client_country]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
      };

    const handleCreateClient = async () => {
      if (!handleValidation()) {
        return;
      }
      console.log("----------this is working ", handleValidation());
        try {
          setLoading(true);
          const response = await postApiReq("/create-client/", form);
          if (response.status) {
            const closeBtn = document.getElementById('closeBtnClient');
            closeBtn.click();
            setLoading(false);
            setForm(initialState);
            toast.success("Client has been created successfully!");
            handleGetClientNames();
          }
        } catch (err) {
          setLoading(false);
          toast.error(err.response || "Something went wrong!");
        }
      };
    




return(
    <div
    style={{ width: "1200px !important" }}
    className="offcanvas offcanvas-end"
    tabindex="-1"
    id="addClientModal"
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
          Reset
        </button>
        <button
          className="theme-btn btn-style-one small"
          onClick={() => {
            // if (client.client_name) {
            // //   handleUpdateClient(client.id);
            // } else {
              handleCreateClient();
            // }
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
          <p>Client Name <strong className="text-danger">*</strong></p>
          <input
            name="client_name"
            value={form.client_name}
            onChange={handleChange}
            className="client-form-input"
            type="text"
          />
          <span className="text-danger">{error.client_name}</span>
        </div>
        <div className="col-6 my-1">
          <p>Email <strong className="text-danger">*</strong></p>
          <input
            name="client_email"
            value={form.client_email}
            onChange={handleChange}
            className="client-form-input"
            type="text"
          />
          <span className="text-danger">{error.client_email}</span>
        </div>
        <div className="col-6 my-1">
          <p>Contact <strong className="text-danger">*</strong></p>
          <input
            name="client_cont"
            value={form.client_cont}
            onChange={handleChange}
            className="client-form-input"
            type="number"
          />
          <span className="text-danger">{error.client_cont}</span>
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
          {/* <select
            value={form.client_owner}
            className="client-form-input"
            name="client_owner"
            onChange={handleChange}
          >
            <option>Select</option>
            {ownerList.map((item, index) => {
              return (
                <option key={index} value={item.user.id}>
                  {item.user.first_name} {item.user.last_name} ({item.user.email})
                </option>
              );
            })}
          </select> */}
          <SelectWithSearch 
            setForm={setForm}
            form={form}
            name="client_owner"
            email={false}
          />
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
)
}

export default AddClientModal;