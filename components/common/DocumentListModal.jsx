'use client'
import { useEffect, useState } from "react"
import { documentsList } from "../dashboard-pages/employers-dashboard/addjob/components/constant"


const DocumentListModal = ({applicantCheck}) => {
    const [docList, setDocList] = useState();
  

  useEffect(() =>{
    if(applicantCheck.subtype_taxterm){
        let filteredList = documentsList.find((item)=> item.source == applicantCheck.subtype_taxterm);
        setDocList(filteredList);
    }
  }, [applicantCheck])



    return(
        <div className="modal fade" id="documentListModal" tabindex="-1" aria-labelledby="documentListModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header border border-bottom-primary">
              <h5 className="modal-title" id="documentListModalLabel">Mandatory Documents List</h5>
              <button type="button" className="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div>
                <ul>
                {docList && docList?.list?.map((item, index) => {
                  return(
                      <li className="border border-primary rounded-1 my-2 px-2 py-1 text-black" key={index}>{item.name}</li>
                  )
                })
                }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default DocumentListModal;