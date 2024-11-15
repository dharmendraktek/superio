"use client";
import Paper from "@/components/common/Paper";
import InnerLayout from "@/components/common/InnerLayout/InnerLayout";
import { postApiReq } from "@/utils/apiHandlers";
import { toast } from "react-toastify";

const Index = () => {
  
    const handleCheckedIn = async() => {
        const response = await postApiReq(``);
        if(response.status){
           toast.success('You have been successfully Checked In');
        }else if(!response.status){
            toast.error(response.error || "Somthing went worng");
        }
    }

  return (
    <InnerLayout>
    <section className="px-4">
    <Paper height={"85vh"}>
      <div className="text-center d-flex align-item-center justify-content-center" style={{height:'700px', width:"100%"}}>
         <div className="p-5">
           <button className="theme-btn btn-style-three large" onClick={handleCheckedIn} >Checked In</button> 
         </div>
      </div>
    </Paper>
    </section>
    </InnerLayout>
  );
};

export default Index;
