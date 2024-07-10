'use client'
import HtmlEditor from "@/components/common/HtmlEditor";
import { postApiReq } from "@/utils/apiHandlers";
import { useState } from "react";
import ManualCreation from "./ManualCreation";

const JobParse = ({setTab}) => {
  const [form, setForm] = useState({
    description:''
  });
  const [descriptionData, setDescriptionData] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [jobData, setJobData]  = useState();
  const handleStartParse = async() => {
    console.log("----------form ", form.description, descriptionData)
    const response = await postApiReq('/copy-paste-parse/', {job_description:descriptionData})
    console.log("--------------respne sfsd", response);
    setJobData(response.data.fields);
  }


  return (
    <>
    {jobData ?
     <ManualCreation name='create' jobData={jobData} />
    :
    <div className="p-5">
      <div className="shadow rounded-2" style={{height:'700px'}}>
        <div className="w-100">
          <div className="d-flex justify-content-between p-3">
            <h3>Parse Job Details</h3>
            <div>
            <button onClick={handleStartParse} className="theme-btn small btn-style-one mx-2">Start Parsing</button>
            <button className="theme-btn small btn-style-four" onClick={() => setTab(null)}>Cancel</button>
            </div>
          </div>
          <HtmlEditor 
            setDescriptionData={setDescriptionData}
            form={form}
            wrapperStyle={{
              border: "1px solid gray",
              minHeight: "620px",
              borderRadius: "3px",
            }}
          
          /> 
        </div>
      </div>
    </div>
    }
    </>
  );
};

export default JobParse;
