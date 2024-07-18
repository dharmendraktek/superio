import Paper from "@/components/common/Paper";
import UploadSingleDocument from "@/components/common/UploadSingleDocument";
import Image from "next/image";


const Documents = () => {

    const handleFileUpload = (e) => {

    }
    return(
        <Paper>

        <div>
            <div className="d-flex justify-content-between">
                <h4>Documents</h4>
                <div>
                    <button className="theme-btn btn-style-one small"> Add</button>
                </div>
            </div>
            <div className="row mt-4    ">
                <div className="col-8">
                   <div className="d-flex flex-fill gap-5 ">
                    <div className="w-50">
                        <p className="py-2">Document Type</p>
                        <select className="client-form-input">
                            <option>Driving Licence</option>
                        </select>
                    </div>
                    <div className="w-50">
                        <p className="py-2">Document Title</p>
                        <input type="text" className="client-form-input" />
                    </div>
                   </div>
                   <div className="my-2">
                    <p className="py-2">Description</p>
                    <textarea  className="border w-100 p-2"/>
                   </div>
                </div>
                <div className="col-4">
                   <p className="mb-2">Upload Document</p>
                  <UploadSingleDocument handleFileUpload={handleFileUpload} />
                </div>
            </div>
            <div className="d-flex gap-2"> 
                <button className="theme-btn btn-style-one small">Save</button>
                <button className="theme-btn btn-style-four small">Cancel</button>
            </div>
        </div>
        </Paper>
    )
}

export default Documents;