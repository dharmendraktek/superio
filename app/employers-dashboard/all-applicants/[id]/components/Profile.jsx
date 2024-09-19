import StarRating from "@/components/common/StarRating";
import { reactIcons } from "@/utils/icons";
import Link from "next/link";

const { default: Paper } = require("@/components/common/Paper");

const Profile = ({ setTab, applicantData, setApplicantData }) => {
  // let {jobs_associated} = applicantData;
  // let {applicant_rating} = jobs_associated  ;

  // console.log("-------------applicnat rating ", jobs_associated);

  return (
    <Paper>
      <div className="d-flex text-black justify-content-between">
        <div>
          <div className="d-flex algin-items-center gap-2">
            <div>
              <Link href="/employers-dashboard/all-applicants">
                <span className="fs-2">{reactIcons.backarrow}</span>
              </Link>
            </div>
            <div>
              <div>
                <div className="d-flex gap-2">
                  <h5>{applicantData?.applicant_code}</h5>
                  <h5>
                    {applicantData?.firstname || 'N/A'}  {applicantData?.middlename || ''}  {applicantData?.lastname || ''}
                  </h5>
                </div>
                <span>{applicantData?.job_title}</span>
              </div>
              <div className="d-flex my-2 gap-2">
                <div className="d-flex align-items-center gap-1">
                  <span className="fs-5">{reactIcons.location}</span>
                  <p>
                    {applicantData?.address ? applicantData?.address : "N/A"}
                    {/* {applicantData?.city ? applicantData?.city : ""},{" "}
                    {applicantData?.state ? applicantData?.state : ""}{" "}
                    {applicantData?.country ? applicantData?.country : ""},{" "} */}
                    {applicantData?.zipcode}{" "}
                  </p>{" "}
                  |
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <span className="fs-5">{reactIcons.phonecall}</span>
                  <p>{applicantData?.mobile}</p> |
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="fs-5">{reactIcons.mail}</span>
                  <p>{applicantData?.email}</p>
                </div>
              </div>
              <div className="d-flex gap-2">
                <button
                  onClick={() => setTab(2)}
                  className="theme-btn btn-style-four small"
                >
                  Edit Applicant
                </button>
                <button
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasQuickView"
                  aria-controls="offcanvasQuickView"
                  className="theme-btn btn-style-four small"
                  onClick={() =>
                    setApplicantData((prev) => ({ ...prev, view_resume: true }))
                  }
                >
                  View Resume
                </button>
                {/* <button className="theme-btn btn-style-four small">Create Resume Builder</button> */}
                {/* <button className="theme-btn btn-style-four small">More</button> */}
              </div>
            </div>
          </div>
          {/* <div className="my-3">
                <button className="theme-btn btn-style-one small">+ Add Tag</button>
               </div> */}
        </div>
        {/* <div className="my-2 px-2">
          <div className="d-flex justify-content-between gap-2">
            <div className="">
              <p>Technical Skills</p>
            </div>
            <StarRating initialRating={2} />
          </div>
          <div className="d-flex justify-content-between gap-2">
            <div className="">
              <p>Communication Skills</p>
            </div>
            <StarRating initialRating={2} />
          </div>
          <div className="d-flex justify-content-between gap-2">
            <div className="">
              <p>Profesionalism</p>
            </div>
            <StarRating initialRating={2} />
          </div>
          <div className="d-flex justify-content-between  gap-2">
            <div className="">
              <p>Overall Rating</p>
            </div>
            <StarRating initialRating={2} />
          </div>
        </div> */}
      </div>
    </Paper>
  );
};

export default Profile;
