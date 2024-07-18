const { default: Paper } = require("@/components/common/Paper")


const ApplicantDetails = () => {
    return(
        <Paper>
            <div>
               <div className="px-2">
                <h5 className="py-2">Applicant Details</h5>
                <div className="my-2">
                <p>Created By & On</p>
                <span>Dharmendra patel On 07/15/24 05:59:24</span>
                </div>
                <div className="my-2">
                    <p>Ownership</p>
                    <span>Dharmendra patel</span>
                </div>
                <div className="my-2">
                    <p>Applicant Status</p>
                    <span>New Lead</span>
                </div>
                <div className="my-2">
                    <p>Applicant Group</p>
                    <span></span>
                </div>
                <div className="my-2">
                    <p>Source</p>
                    <span>Dice</span>
                </div>
                <div className="my-2">
                    <p>Work Authorization</p>
                    <span>-</span>
                </div>
                <div className="my-2">
                    <p>Work Authorization Expiry</p>
                    <span>-</span>
                </div>
                <div className="my-2">
                    <p>Home Phone Number</p>
                    <span>-</span>
                </div >
                <div className="my-2">
                    <p>Skype ID</p>
                    <span>-</span>
                </div>
                <div className="my-2">
                    <p>Skills</p>
                    <span>-</span>
                </div>
                <div className="my-2">
                    <p>Experience</p>
                    <span>-</span>
                </div>
                <div className="my-2">
                    <p>Expected Pay</p>
                    <span>-</span>
                </div>
                <div className="my-2">
                    <p>Current CTC</p>
                    <span>-</span>
                </div>
                <div className="my-2">
                    <p>Notice Period</p>
                    <span>-</span>
                </div>
                <div className="my-2">
                    <p>Date of Birth</p>
                    <span>-</span>
                </div>
                <div className="my-2">
                    <p>Relocation</p>
                    <span>-</span>
                </div>
                <div className="my-2">
                    <p>Tax Terms</p>
                    <span>-</span>
                </div>
                <hr></hr>
                <div>
                    <h3>User Defined Fields</h3>
                </div>
               </div>
            </div>
        </Paper>
    )
}

export default ApplicantDetails;