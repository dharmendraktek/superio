'use client'
import HtmlEditor from "@/components/common/HtmlEditor";
import { postApiReq } from "@/utils/apiHandlers";
import { useState } from "react";
import ManualCreation from "./ManualCreation";
import { toast } from "react-toastify";
import BtnBeatLoader from "@/components/common/BtnBeatLoader";

const JobParse = ({setTab, tab}) => {
  const [form, setForm] = useState({
    description:''
  });
  const [descriptionData, setDescriptionData] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [jobData, setJobData]  = useState();
  const [isLoading, setIsLoading] = useState(false);
  const handleStartParse = async() => {
    try{
      setIsLoading(true)
      const response = await postApiReq('/copy-paste-parse/', {job_description:descriptionData})
      setIsLoading(false);
      let data = response.data.fields
      data['description'] = response.data.description;
      setJobData(data);
    }catch(err){
      setIsLoading(false);
      toast.error(err.response || 'Something went wrong')
    }
  }


  return (
    <>
    {jobData ?
     <ManualCreation name='parse' setTab={setTab} tab={tab} jobData={jobData} />
    :
    <div className="px-5 py-2">
      <div className="shadow rounded-1" style={{height:'700px'}}>
        <div className="w-100">
          <div className="d-flex justify-content-between p-2 rounded-top-1" style={{background:'var(--theme-color-first)'}}>
            <h3 className="text-white">Parse Job Details</h3>
            <div>
            <button onClick={handleStartParse} className="theme-btn small btn-style-two fw-medium fs-6 text-black mx-2">
              {isLoading ? 
                <BtnBeatLoader />
               :'Start Parsing'
              }
            </button>
            <button className="theme-btn small btn-style-four text-black" onClick={() => setTab(null)}>Cancel</button>
            </div>
          </div>
          <HtmlEditor 
            setDescriptionData={setDescriptionData}
            form={form}
            wrapperStyle={{
              // border: "1px solid lightgray",
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
