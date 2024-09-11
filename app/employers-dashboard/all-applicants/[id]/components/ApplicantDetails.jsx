import { currencyJson } from "@/utils/currency";
import moment from "moment";

const { default: Paper } = require("@/components/common/Paper");

const ApplicantDetails = ({ applicantData }) => {
  return (
    <Paper>
      <div>
        <div className="px-2 app-detail">
          <h4 className="py-2  text-primary">Applicant Details</h4>
          <div className="my-2 ">
            <p>Created By & On</p>
            <span>{applicantData?.created_by?.first_name + " " + applicantData?.created_by?.last_name} On {moment(applicantData.created_at).format('DD-MM-YYYY hh:mm A')}</span>
          </div>
          <div className="my-2">
            <p>Ownership</p>
            <div className="d-flex flex-wrap gap-2">
              {applicantData?.ownership_details?.map((item) => {
                return (
                  <span key={item.id}>
                    {item.first_name + " " + item.last_name} 
                  </span>
                );
              })}
              {applicantData?.ownership_details?.length == 0 && "N/A"}
            </div>
          </div>
          <div className="my-2">
            <p>Applicant Status</p>
            <span>{applicantData?.status ? applicantData?.status : 'N/A'}</span>
          </div>
          {/* <div className="my-2">
            <p>Applicant Group</p>
            <span>-</span>
          </div> */}
          <div className="my-2">
            <p>Source</p>
            <span>{applicantData?.source ? applicantData?.source : "N/A"}</span>
          </div>
          <div className="my-2">
            <p>Work Authorization</p>
            <span>{applicantData?.authorization ? applicantData?.authorization : 'N/A' }</span>
          </div>
          <div className="my-2">
            <p>Work Authorization Expiry</p>
            <span>
              {applicantData?.authorization_expiry
                ? moment(applicantData?.authorization_expiry).format(
                    "DD/MM/YYYY"
                  )
                : "N/A"}
            </span>
          </div>
          {/* <div className="my-2">
            <p>Home Phone Number</p>
            <span>-</span>
          </div> */}
          <div className="my-2">
            <p>Skype ID</p>
            <span>
              {applicantData?.skype_id ? applicantData?.skype_id : "N/A"}
            </span>
          </div>
          <div className="my-2">
            <p>Skills</p>
            <div className="d-flex flex-wrap gap-2">
              {applicantData?.primary_skills?.map((item) => {
                return (
                  <div key={item.id} className="border rounded-1 px-2 border-primary">
                   <span className="fw-medium">{item.name}</span> 
                  </div>
                );
              })}
            </div>
          </div>
          <div className="my-2">
            <p>Experience</p>
            <span>
              {applicantData?.experience ? applicantData?.experience : "N/A"}
            </span>
          </div>
          <div className="my-2">
            <p>Expected Pay</p>
            <span>
              {applicantData?.expect_currency
                ? currencyJson.find(
                    (item) => item.code == applicantData?.expect_currency
                  )?.symbol
                : "N/A"}{" "}
              {applicantData?.expect_amount
                ? applicantData?.expect_amount
                : "N/A"}{" "}
              /{" "}
              {applicantData?.expect_payment_frequency
                ? applicantData?.expect_payment_frequency
                : "N/A"}{" "}
              /{" "}
              {applicantData?.expect_job_type
                ? applicantData?.expect_job_type
                : "N/A"}
            </span>
          </div>
          <div className="my-2">
            <p>Current CTC</p>
            <span>
              {applicantData?.currency
                ? currencyJson.find(
                    (item) => item.code == applicantData?.current_currency
                  )?.symbol
                : "N/A"}{" "}
              {applicantData?.current_amount
                ? applicantData?.current_amount
                : "N/A"}{" "}
              /{" "}
              {applicantData?.current_payment_frequency
                ? applicantData?.current_payment_frequency
                : "N/A"}{" "}
              /{" "}
              {applicantData?.current_job_type
                ? applicantData?.current_job_type
                : "N/A"}
            </span>
          </div>
          <div className="my-2">
            <p>Notice Period</p>
            <span>
              {applicantData?.notice_period
                ? applicantData?.notice_period
                : "N/A"}
            </span>
          </div>
          <div className="my-2">
            <p>Date of Birth</p>
            <span>
              {applicantData?.dob
                ? moment(applicantData?.dob).format("DD-MM-YYYY")
                : "N/A"}
            </span>
          </div>
          <div className="my-2">
            <p>Relocation</p>
            <span>
              {applicantData?.relocation ? 'Yes' : "No"}
            </span>
          </div>
          <div className="my-2">
            <p>Tax Terms</p>
            <span>
              {applicantData?.tax_terms ? applicantData?.tax_terms : "N/A"}
            </span>
          </div>
          <hr></hr>
          {/* <div>
            <h3>User Defined Fields</h3>
          </div> */}
        </div>
      </div>
    </Paper>
  );
};

export default ApplicantDetails;
