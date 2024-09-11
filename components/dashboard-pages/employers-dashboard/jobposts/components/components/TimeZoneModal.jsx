
'use Client'

import { postApiReq } from "@/utils/apiHandlers"
import { countriesWithTimeZone } from "@/utils/countrieswithtimzone"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const TimeZoneModal = ({form, setForm}) => {
    const [name, setName] = useState('United States');
    const [timeZoneData, setTimeZoneData] = useState([]);
  

    
    useEffect(() => {
         if(name){
           let filtered = countriesWithTimeZone.find((item) => item.country == name)
           setTimeZoneData(filtered.timezones)
         }
    }, [name])

  
    return(
        <div className="modal fade" id="timeZoneModal" tabindex="-1" aria-labelledby="timeZoneModalLabel" aria-hidden="true" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="timeZoneModalLabel">Time Zone</h5>
              <button type="button" id="closeBtn" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="gap-4 px-2 my-2">
                <p className="fw-medium">Country</p>
                <select className="client-form-input" onChange={(e) => setName(e.target.value)}>
                    {countriesWithTimeZone.map((item, index) => {
                      return(
                        <option key={index} value={item.country} >{item.country}</option>
                      )
                    })
                    }
                </select>
              </div>
              <div className="gap-4 px-2 my-2">
                <p className="fw-medium">Time Zone</p>
                <select className="client-form-input" onChange={(e) => setForm((prev) => ({...prev, timezone:e.target.value}))}>
                    {timeZoneData?.map((item, index) => {
                      return(
                        <option key={index} value={item.name} >{item.name} </option>
                      )
                    })
                    }
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button  type="button" className="theme-btn btn-style-one small" data-bs-dismiss="modal">Save</button>
              <button type="button" className="theme-btn btn-style-four small" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default TimeZoneModal;