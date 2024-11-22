'use client'
import { postApiReq } from "@/utils/apiHandlers";
import { useState } from "react";
import ManualCreation from "./ManualCreation";
import { toast } from "react-toastify";
import BtnBeatLoader from "@/components/common/BtnBeatLoader";
import MyCKEditor from "@/components/common/MyCkEditor";

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
     <ManualCreation name='parse' setTab={setTab} tab={tab} jobData={jobData}  />
    :
    <div className="py-2">
      <div className="shadow rounded-1" style={{height:'490px'}}>
        <div className="w-100">
          <div className="d-flex justify-content-between p-2 rounded-top-1" style={{background:'var(--theme-color-first)'}}>
            <h4 className="text-white">Parse Job Details</h4>
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
          <MyCKEditor 
            setDescriptionData={setDescriptionData}
            form={form}
            height="620px"
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
