import { reactIcons } from "@/utils/icons";

const Stepper = () => {
  return (
    <div className=" border rounded-1   mt-2 mb-sm-4">
      <div className="steps">
        <div className="steps-header">
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: "28.5%" }}
              aria-valuenow="28.5"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>
      <div className="steps-body">
        <div className="step step-completed">
          {/* <span className="step-icon">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="feather feather-check-circle"
            >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            </span> */}
          <div>
          <span>Candidate Name</span>
          <p>Pipline</p>
          </div>
          <div>
            <span className="step-indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-check"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
          </div>
        </div>
        <div className="step step-completed">
          <span className="step-indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-check"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </span>
          {/* <span className="step-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-settings"
            >
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </span> */}
          <span>Recruiter Name</span>
          <p>Submission</p>
        </div>
        <div className="step step-active">
          {/* <span className="step-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-award"
            >
              <circle cx="12" cy="8" r="7"></circle>
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
            </svg>
          </span> */}
          <span>Contact No</span>
          <p>
          Client Submission
          </p>
        </div>
        <div className="step">
          {/* <span className="step-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-truck"
            >
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
          </span> */}
          Interview
        </div>
        <div className="step">
          {/* <span className="step-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-home"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </span> */}
          Confirmation
        </div>
        <div className="step">
          {/* <span className="step-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-home"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </span> */}
          Placement
        </div>
        <div className="step">
          {/* <span className="step-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-home"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </span> */}
          Not Joined
        </div>
      </div>

      <div className="d-sm-flex flex-wrap justify-content-between align-items-center text-center">
        {/* <div className="custom-control custom-checkbox mt-2 mr-3">
          <input
            className="custom-control-input"
            type="checkbox"
            id="notify-me"
            checked=""
          />
          <label className="custom-control-label" for="notify-me">
            Notify me when order is delivered
          </label>
        </div>
        <a
          className="btn btn-primary btn-sm mt-2"
          href="#order-details"
          data-toggle="modal"
        >
          View Order Details
        </a> */}
      </div>
    </div>
    // <div className="d-flex align-items-center">
    //    <div className="d-flex align-items-center">
    //    <div  style={{width:"142px", height:"3px", background:"blue"}}>
    //     </div>
    //     <div style={{width:"24px",height:"24px",borderRadius:"100%",background:"green"}}>
    //         {/* <span>{reactIcons.}</span> */}
    //     </div>
    //    </div>
    //    <div className="d-flex align-items-center">
    //    <div  style={{width:"142px", height:"3px", background:"blue"}}>
    //     </div>
    //     <div style={{width:"24px",height:"24px",borderRadius:"100%",background:"green"}}>
    //     </div>
    //    </div>
    //    <div className="d-flex align-items-center">
    //    <div  style={{width:"142px", height:"3px", background:"blue"}}>
    //     </div>
    //     <div style={{width:"24px",height:"24px",borderRadius:"100%",background:"green"}}>
    //     </div>
    //    </div>
    //    <div className="d-flex align-items-center">
    //    <div  style={{width:"142px", height:"3px", background:"blue"}}>
    //     </div>
    //     <div style={{width:"24px",height:"24px",borderRadius:"100%",background:"green"}}>
    //     </div>
    //    </div>
    //    <div className="d-flex align-items-center">
    //    <div  style={{width:"142px", height:"3px", background:"blue"}}>
    //     </div>
    //     <div style={{width:"24px",height:"24px",borderRadius:"100%",background:"green"}}>
    //     </div>
    //    </div>
    //    <div className="d-flex align-items-center">
    //    <div  style={{width:"142px", height:"3px", background:"blue"}}>
    //     </div>
    //     <div style={{width:"24px",height:"24px",borderRadius:"100%",background:"green"}}>
    //     </div>
    //    </div>
    //    <div className="d-flex align-items-center">
    //    <div  style={{width:"142px", height:"3px", background:"blue"}}>
    //     </div>
    //     <div style={{width:"24px",height:"24px",borderRadius:"100%",background:"green"}}>
    //     </div>
    //     <div  style={{width:"142px", height:"3px", background:"blue"}}>
    //     </div>
    //    </div>
    // </div>
  );
};
export default Stepper;
