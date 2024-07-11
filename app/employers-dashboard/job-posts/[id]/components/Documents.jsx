"use client";

import { BASE_URL } from "@/utils/endpoints";
import { reactIcons } from "@/utils/icons";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

const Documents = ({jobId}) => {
  const [open, setOpen] = useState(false);
  const [documents, setDocuments] = useState([]);

  const handleFileUpload = (e) => {
      let file = e.target.files
      Object.values(file).forEach((item) => {
        setDocuments((prev) => [...prev, item])
      })
  };

  const handleSaveDocuments = async() => {
    const formData = new FormData();
    documents.forEach((file, index) => {
      console.log("----file ", file);
      formData.append('files', file);
  });
    formData.append('job', jobId);
    const response = await axios.post(BASE_URL + `/documents/`, formData)
    if(response.status){
      toast.success('Documents added sucessfully')
    }
  }

  const handleCloseDoc = (index) => {
     let update = [...documents]
     let filtered = update.filter((item, ind) => ind !== index)

     setDocuments(filtered);
  }

  return (
    <div className="shadow h-50 py-2">
      <div className="d-flex justify-content-between px-4 py-4">
        <h4>Documents</h4>
        {!open && (
          <button
            onClick={() => setOpen(!open)}
            className="theme-btn btn-style-one small"
          >
            Add
          </button>
        )}
      </div>
      <div className="p-2">
        {documents.map((item, index) =>{
          return(
              <div className="d-flex justify-content-between align-items-center rounded-1 my-2 px-2 bg-secondary"  style={{width:'100%', height:'50px'}} key={index}>
                 <p>{item?.name}</p>
                 <p></p>
                 <span onClick={() => handleCloseDoc(index) } className="text-danger cursor-pointer">{reactIcons.close}</span>
              </div>
          )
        } )
        }
      </div>
      {open ? (
        <div>
          <div className="d-flex px-5 justify-content-between">
            <div>
              <label >
              <div htmlFor="#upload" className="border border-black rounded-1 p-2" style={{ width: "60px", height: "60px" }}>
                <Image
                  width={90}
                  height={10}
                  src="/images/upload.png"
                  alt="brand"
                />
              </div>
                <input type="file" id="upload" onChange={(e) => handleFileUpload(e)} className="d-none" multiple />
              </label>
            </div>
            <div className="d-flex gap-3">
              <div className="">
                <button onClick={handleSaveDocuments} className="theme-btn btn-style-one small">Save</button>
                <button
                  onClick={() => setOpen(!open)}
                  className="theme-btn btn-style-one small mx-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">No documents available</div>
      )}
    </div>
  );
};

export default Documents;
