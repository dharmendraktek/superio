"use client";

import { reactIcons } from "@/utils/icons";
import { useEffect, useState } from "react";

const AddMultipleCity = ({ selectedState, setSelectedState, selectCity, setSelectCity }) => {
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  const handleSaveLocation = () => {
    if(selectedState.length > 0){
        let location = city + "," + state;
        setSelectCity((prev) => ([...prev, location]))
        setCity('');
    }else{ 
      setError("Please Select the state");
    }
    // setState('');
  }

  useEffect(() => {
    if(selectedState.length > 0){
        setState(selectedState[0].name || selectedState[0])
        setError('');
    }else{
        setError("Please Select the state");
    }
    
  }, [selectedState])

  const handleClose = (targetIndex) => {
      let update = [...selectCity];
      let newArray = update.filter((item, index) => index !== targetIndex);
      setSelectCity(newArray)
  }
  

  return (
    <div className="w-100">
      <div className="dropdown w-100">
        <button
          type="button"
          className="w-100 d-flex justify-content-between client-form-input position-relative"
          data-bs-toggle="dropdown"
        >
        <div className="d-flex gap-2 flex-wrap">
        {selectCity?.length >0  && selectCity?.map((item, index) => {
            return(
                <div key={index} className="d-flex gap-2 px-1 rounded-1" style={{background: "var(--primary-2nd-color)"}}>
                    <span>{item}</span>
                    <span onClick={() => handleClose(index)}>{reactIcons.close}</span>
                </div>
            )
        })
        }
        </div>
          <span onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} className="text-primary fs-5">{reactIcons.addcircle}</span>
          {/* {open &&
          <div className="postion-absolute">
            <span>Add Multiple Location</span>
          </div>
          } */}
        </button>
        <ul className="dropdown-menu w-100 px-3" 
              style={{
                minHeight: "60px",
                maxHeight: "200px",
                overflow: "auto",
        }}>
        <div>
            <select className="client-form-input" onChange={(e) => setState(e.target.value)}>
                { selectedState?.map((item, index) => {
                    return(
                        <option key={index} value={item.name || item} >{item.name || item}</option>
                    )
                })
                }
            </select>
            <span className="text-danger">{error}</span>
        </div>     
        <div className="d-flex my-2 gap-2">
            <input type="text" value={city} onChange={(e) => setCity(e.target.value) } placeholder="City" className="client-form-input" />
            <button className="theme-btn btn-style-one small" onClick={handleSaveLocation}>Save</button>
            <button className="theme-btn btn-style-three small" onClick={() => setCity('')}>Cancel</button>
        </div>
        </ul>
      </div>
    </div>
  );
};

export default  AddMultipleCity;
