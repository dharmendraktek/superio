import { reactIcons } from "@/utils/icons";

const ratings = {
  dob: {
    type: "DL DOB is not matching with I94 DOB",
    flag: "Red",
  },
  visa: {
    type: "Visa expiry date is less than 6 month",
    flag: "Red",
  },
  relocation: {
    text: "candidate is not ready for relocation to Boston MA location and current location is . ",
    flag: "Red",
  },
  nationality: {
    text: "candidate nationality is MADG.",
  },
  linkedin_profile_picture: {
    text: "candidate linkedin profile picture is matched",
    flag: "Green",
  },
  applicant_linkedin_connections: {
    text: "candidate linkedin connections are above 500",
    flag: "Green",
  },
  vendor_linkedin_connections: {
    text: "Vendor linkedin followers are between 3k to 5K",
    flag: "Yellow",
  },
  vendor_employees_strength: {
    text: "Vendor employees are between 20 to 50",
    flag: "Yellow",
  },
  linkedin_age: {
    text: "candidate linkedIn age is between 7 to 10 years",
    flag: "Green",
  },
  Vendor_glassdor_review: {
    text: "Vendor Glassdor review is positive",
    flag: "Green",
  },
  skill_matrix: {
    text: "Skill matrixx mentioned",
    flag: "Green",
  },
  offer_letter: {
    text: "Candidate don't have any offer letter",
    flag: "Green",
  },
  technical_questionaire: {
    text: "Technical Questionaire validation done",
    flag: "Green",
  },
  Linkedin_matched_with_resume: {
    text: "Linkedin full profile matched with resume",
    flag: "Green",
  },
  reference: {
    text: "Reference check is validated",
    flag: "Green",
  },
  rating_count: 60,
};

const ApplicantRatingModal = ({ aiCheckResult }) => {
  console.log("---------ai check reuslt ", aiCheckResult);

  const ratingsArray = Object.entries(ratings);

  const processedRatings = ratingsArray.map(([key, value]) => {
    return {
      key: key,
      type: value?.type || value.text || null,
      flag: value.flag || null,
    };
  });

  console.log("---------rating ", processedRatings);
  const {
    dob,
    visa,
    relocation,
    nationality,
    linkedin_profile_picture,
    applicant_linkedin_connections,
    vendor_linkedin_connections,
    vendor_employees_strength,
    linkedin_age,
    Vendor_glassdor_review,
    skill_matrix,
    offer_letter,
    technical_questionaire,
    Linkedin_matched_with_resume,
    reference,
    rating_count,
  } = aiCheckResult;

  return (
    <div
      className="modal fade"
      id="applicantRatingModal"
      tabindex="-1"
      aria-labelledby="applicantRatingModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header border border-bottom-primary">
            <h5 className="modal-title" id="applicantRatingModalLabel">
              Applicant Rating Based on Document
            </h5>
            <button
              type="button"
              className="btn-close text-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div>
              {/* {processedRatings.map((item, index) => {
                      return(
                        <div>
                            {item?.type &&
                                // <li key={index} className={`p-2 my-2 border border-secondary text-capitalize rounded-1 fw-medium fs-6 ${item.flag ? 'text-white' :''}`} style={{backgroundColor:`${item.flag == 'Red' ? 'red'  : item.flag == 'Green'? 'green' : ''}`}}>{item?.type}</li>  
                             <li key={index} className="border p-2 border-secondary text-capitalize fw-medium d-flex justify-content-between my-2">
                                <span>{item?.type}</span>
                                <span className="fs-4 text-success">{reactIcons.checked}</span>
                                </li>
                            }
                        </div>
                    )
                 })
                 } */}

              <li
                key={index}
                className="border p-2 border-secondary text-capitalize fw-medium d-flex justify-content-between my-2"
              >
                <span>{dob?.type}</span>
                <span className="fs-4 text-success">{reactIcons.checked}</span>
              </li>
              <li
                key={index}
                className="border p-2 border-secondary text-capitalize fw-medium d-flex justify-content-between my-2"
              >
                <span>{visa?.type}</span>
                <span className="fs-4 text-success">{reactIcons.checked}</span>
              </li>
              <li
                key={index}
                className="border p-2 border-secondary text-capitalize fw-medium d-flex justify-content-between my-2"
              >
                <span>{relocation?.type}</span>
                <span className="fs-4 text-success">{reactIcons.checked}</span>
              </li>
              <li
                key={index}
                className="border p-2 border-secondary text-capitalize fw-medium d-flex justify-content-between my-2"
              >
                <span>{nationality?.type}</span>
                <span className="fs-4 text-success">{reactIcons.checked}</span>
              </li>
              <li
                key={index}
                className="border p-2 border-secondary text-capitalize fw-medium d-flex justify-content-between my-2"
              >
                <span>{linkedin_profile_picture?.type}</span>
                <span className="fs-4 text-success">{reactIcons.checked}</span>
              </li>
              <li
                key={index}
                className="border p-2 border-secondary text-capitalize fw-medium d-flex justify-content-between my-2"
              >
                <span>{applicant_linkedin_connections?.type}</span>
                <span className="fs-4 text-success">{reactIcons.checked}</span>
              </li>
              <li
                key={index}
                className="border p-2 border-secondary text-capitalize fw-medium d-flex justify-content-between my-2"
              >
                <span>{vendor_linkedin_connections?.type}</span>
                <span className="fs-4 text-success">{reactIcons.checked}</span>
              </li>
              <li
                key={index}
                className="border p-2 border-secondary text-capitalize fw-medium d-flex justify-content-between my-2"
              >
                <span>{vendor_employees_strength?.type}</span>
                <span className="fs-4 text-success">{reactIcons.checked}</span>
              </li>
              <li
                key={index}
                className="border p-2 border-secondary text-capitalize fw-medium d-flex justify-content-between my-2"
              >
                <span>{linkedin_age?.type}</span>
                <span className="fs-4 text-success">{reactIcons.checked}</span>
              </li>
              <li
                key={index}
                className="border p-2 border-secondary text-capitalize fw-medium d-flex justify-content-between my-2"
              >
                <span>{Vendor_glassdor_review?.type}</span>
                <span className="fs-4 text-success">{reactIcons.checked}</span>
              </li>
              <li
                key={index}
                className="border p-2 border-secondary text-capitalize fw-medium d-flex justify-content-between my-2"
              >
                <span>{skill_matrix?.type}</span>
                <span className="fs-4 text-success">{reactIcons.checked}</span>
              </li>
              <li
                key={index}
                className="border p-2 border-secondary text-capitalize fw-medium d-flex justify-content-between my-2"
              >
                <span>{offer_letter?.type}</span>
                <span className="fs-4 text-success">{reactIcons.checked}</span>
              </li>
              <li
                key={index}
                className="border p-2 border-secondary text-capitalize fw-medium d-flex justify-content-between my-2"
              >
                <span>{technical_questionaire?.type}</span>
                <span className="fs-4 text-success">{reactIcons.checked}</span>
              </li>
              <li
                key={index}
                className="border p-2 border-secondary text-capitalize fw-medium d-flex justify-content-between my-2"
              >
                <span>{Linkedin_matched_with_resume?.type}</span>
                <span className="fs-4 text-success">{reactIcons.checked}</span>
              </li>
              <li
                key={index}
                className="border p-2 border-secondary text-capitalize fw-medium d-flex justify-content-between my-2"
              >
                <span>{reference?.type}</span>
                <span className="fs-4 text-success">{reactIcons.checked}</span>
              </li>
              <li
                key={index}
                className="border p-2 border-secondary text-capitalize fw-medium d-flex justify-content-between my-2"
              >
                <span>{rating_count?.type}</span>
                <span className="fs-4 text-success">{reactIcons.checked}</span>
              </li>
            </div>
            <div className="modal-footer">
              {/* <button  type="button" className="theme-btn btn-style-one small" data-bs-dismiss="modal" onClick={handleUpdateStatus} >Send</button>
              <button type="button" className="theme-btn btn-style-four small" data-bs-dismiss="modal">Cancel</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantRatingModal;
