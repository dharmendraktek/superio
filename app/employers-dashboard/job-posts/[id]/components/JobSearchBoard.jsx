import Link from "next/link";


const JobSearchBoard = ({searchString}) => {


    return(
        <div className="shadow p-3"> 
          <div className="mb-3">
            <h5>Search Criteria</h5>
          </div>
          <div className="">
             <textarea type='text' value={searchString} className="border px-2 rounded-1 border-secondary"   style={{height:'90px', width:'100%'}}/>
             <div>
                <p className="py-2">JOB TITLE</p>
                <input type="text" className="client-form-input" />
             </div>
             <div className="d-flex gap-2 py-2">
                <input type='checkbox' />
                <p>Recent Job Title</p>
             </div>
             <div>
                <h6 className="py-2">FILTERS</h6>
                <p>Total Experience</p>
                <p>Years Experience</p>
                <input type="text" />
             </div>
             <div >
                <p className="my-1">Educational Details</p>
                <select className="client-form-input">
                    <option></option>
                </select>
                <p className="my-1">Work Authorization</p>
                <select className="client-form-input">
                    <option></option>
                </select>
                <p className="my-1">Employer</p>
                <input type="text" className="client-form-input" /> 
             </div>
             <div className="d-flex gap-1 py-2">
                <input type="checkbox" />
                <p>Most Recent Employer</p>
             </div>
             <div className="d-flex gap-2 my-1">
                <p>Willing to Relocate</p>
                <div className="d-flex gap-1">
                    <input type="checkbox" />
                    <label>Yes</label>
                </div>
                <div className="d-flex gap-1">
                    <input type="checkbox" />
                    <label>No</label>
                </div>
             </div>
             <div className="d-flex gap-2 my-1">
                <p>Clearance</p>
                <div className="d-flex gap-1">
                    <input type="checkbox" />
                    <label>Yes</label>
                </div>
                <div className="d-flex gap-1">
                    <input type="checkbox" />
                    <label>No</label>
                </div>
             </div>
             <div>
                <div className="d-flex gap-2 my-3">
                    <button className="theme-btn btn-style-one small">Save</button>
                    <Link href='/employers-dashboard/candidate-advanced-search' target="_blank">
                    <button className="theme-btn btn-style-four small">Save and Search</button>
                    </Link>
                    <button className="theme-btn btn-style-four small">Search job Boards</button>
                </div>
             </div>
          </div>
        </div>
    )
}

export default JobSearchBoard;