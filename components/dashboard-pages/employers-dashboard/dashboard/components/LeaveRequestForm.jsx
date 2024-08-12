
import DatePickerCustom from "@/components/common/DatePickerCustom";


const LeaveRequestForm = ({setOpenForm}) => {
    return(
        <div>
            <div>
                <h4>Leave Request</h4>
            </div>
            <div className="row mt-2">
                <div className="col-4 my-1">
                   <p>Application No</p>
                   <input className="client-form-input" type="text" />
                </div>
                <div className="col-4 my-1">
                   <p>Applied Date</p>
                   <input className="client-form-input" type="text" />
                </div>
                <div className="col-4 my-1">
                   <p>Employee Name</p>
                   <input className="client-form-input" type="text" />
                </div>
                <div className="col-4 my-1">
                   <p>Employee Code</p>
                   <input className="client-form-input" type="text" />
                </div>
                <div className="col-4 my-1">
                   <p>Nature of Leave</p>
                   <select className="client-form-input">
                    <option>Select</option>
                    <option>Scheduled</option>
                    <option>Unscheduled</option>
                   </select>
                </div>
                <div className="col-4 my-1">
                   <p>Leave Types</p>
                   <select className="client-form-input">
                    <option>Select</option>
                    <option>LOP</option>
                    <option>SL/PL</option>
                    <option>Optional</option>
                    <option>Maternity</option>
                    <option>Paternity</option>
                   </select>
                </div>
                <div className="col-4 my-1">
                  <p>From Date</p>
                  <DatePickerCustom />
                </div>
                <div className="col-4 my-1">
                  <p>To Date</p>
                  <DatePickerCustom />
                </div>
                <div className="col-4 my-1">
                    <p>Actual Leave Balance</p>
                    <input className="client-form-input" type='text' />
                </div>
                <div className="col-4 my-2">
                   <p>Upload Document</p>
                   <input type="file" />
                </div>
            </div>
            <div className="d-flex gap-2 justify-content-end">
                <button className="theme-btn btn-style-one small">Save</button>
                <button className="theme-btn btn-style-two small">Reset</button>
                <button className="theme-btn btn-style-four small" onClick={() => setOpenForm(false)}>Cancel</button>
            </div>
        </div>
    )
}

export default LeaveRequestForm;