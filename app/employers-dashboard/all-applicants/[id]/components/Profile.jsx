import { reactIcons } from "@/utils/icons";

const { default: Paper } = require("@/components/common/Paper")

const Profile = () => {
    return(
        <Paper>
            <div className="d-flex text-black justify-content-between">
            <div>
               <div>
               <div className="d-flex gap-2">
                <h5>Applicant Id</h5>
                <h5>Applicant Name</h5>
               </div>
               <span>Senior Guidewire Consultant</span>
               </div>
               <div className="d-flex my-2">
                <div className="d-flex align-items-center gap-1">
                <span className="fs-5">{reactIcons.location}</span>
                <p>Orange park, florida, United States, 23003 </p> | 
                </div>
                <div className="d-flex align-items-center gap-1">
                <span className="fs-5">{reactIcons.phonecall}</span>
                <p>+508 784 611</p> | 
                </div>
                <div className="d-flex align-items-center gap-1">
                <span className="fs-5">{reactIcons.mail}</span>
                <p>girishguidedeveloper@gmail.com</p>
                </div>
               </div>
               <div className="d-flex gap-2">
                <button className="theme-btn btn-style-four small">Edit Applicant</button>
                <button className="theme-btn btn-style-four small">View Resume</button>
                <button className="theme-btn btn-style-four small">Create Resume Builder</button>
                <button className="theme-btn btn-style-four small">More</button>
               </div>
               <div className="my-3">
                <button className="theme-btn btn-style-one small">+ Add Tag</button>
               </div>
            </div>
            <div>
                
            </div>
            </div>
        </Paper>
    )
}

export default Profile;