
'use Client'

import { postApiReq } from "@/utils/apiHandlers"
import { useState } from "react"
import { toast } from "react-toastify"

const LanguageModal = () => {
    const [name, setName] = useState('');
    const  handleAddLang = async() => {
        const response = await postApiReq('/language/', {name:name})
        if(response.status){
            toast.success('Language added sucessfully!')
            setName('');
        }
    }
    return(
        <div className="modal fade" id="languageModal" tabindex="-1" aria-labelledby="languageModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="languageModalLabel">Add Language</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="d-flex gap-2 px-3">
                <label>Language</label>
                <input type="text" onChange={(e) => setName(e.target.value)} className="client-form-input" />
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={handleAddLang} type="button" className="theme-btn btn-style-one small">Save</button>
              <button type="button" className="theme-btn btn-style-four small" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default LanguageModal;