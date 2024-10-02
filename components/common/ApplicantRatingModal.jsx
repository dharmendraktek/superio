import { reactIcons } from "@/utils/icons";

const ApplicantRatingModal = ({ aiCheckResult }) => {

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
              <div className="my-2 d-flex gap-2">
                <h5 className="fw-medium">
                  Total Rating : {aiCheckResult?.rating_count}/100
                </h5>
                {/* <span></span> */}
              </div>
              <div className="table_div_custom custom-scroll-sm" style={{height:"600px"}}>
                {Object.values(aiCheckResult)
                  ?.slice(0, Object.values(aiCheckResult).length - 1)
                  .map((item, index) => {
                    return (
                      <div>
                      {item.text &&
                      <li
                        className={`border px-2 py-1 rounded-1 border-secondary ${
                          item.flag == "Red"
                            ? "border-danger text-danger"
                            : item.flag == "Green"
                            ? "border-success text-success"
                            : ""
                        } text-capitalize fw-medium d-flex justify-content-between my-2`}
                      >
                        <span>{item.text}</span>
                        <span
                          className={`fs-4 ${
                            item.flag == "Red"
                              ? "text-danger"
                              : item.flag == "Green"
                              ? "text-success"
                              : ""
                          }`}
                        >
                          {item.flag == "Red"
                            ? reactIcons.close
                            : item.flag == "Green"
                            ? reactIcons.checked
                            : ""}
                        </span>
                      </li>
                      }
                      </div>
                    );
                  })}
              </div>
            </div>
            {/* <div>
              {dob && (
                <li className="border p-2 border-secondary text-capitalize fw-medium d-flex justify-content-between my-2">
                  <span>{dob?.text}</span>
                  <span className={`fs-4 ${dob.flag == 'Red' ? 'text-danger' : dob.flag == 'Green' ? 'text-success' : ''}`}>
                    {dob.flag == 'Red' ? reactIcons.close : dob.flag == 'Green' ? reactIcons.checked : ''} 
                  </span>
                </li>
              )}
              {visa && (
                <li className="border p-2 border-secondary text-capitalize fw-medium d-flex justify-content-between my-2">
                  <span>{visa?.text}</span>
                  <span className="fs-4 text-success">
                  {visa.flag == 'Red' ? reactIcons.close : visa.flag == 'Green' ? reactIcons.checked : ''}
                  </span>
                </li>
              )}
              {relocation && (
                <li className="border p-2 border-secondary text-capitalize fw-medium d-flex justify-content-between my-2">
                  <span>{relocation?.text}</span>
                  <span className="fs-4 text-success">
                  {relocation.flag == 'Red' ? reactIcons.close : relocation.flag == 'Green' ? reactIcons.checked : ''}
                  </span>
                </li>
              )}
              {nationality && (
                <li className="border p-2 border-secondary text-capitalize fw-medium d-flex justify-content-between my-2">
                  <span>{nationality?.text}</span>
                  <span className="fs-4 text-success">
                  {nationality.flag == 'Red' ? reactIcons.close : nationality.flag == 'Green' ? reactIcons.checked : ''}
                  </span>
                </li>
              )}
              {linkedin_profile_picture && (
                <li className="border p-2 border-secondary text-capitalize fw-medium d-flex justify-content-between my-2">
                  <span>{linkedin_profile_picture?.text}</span>
                  <span className="fs-4 text-success">
                  {linkedin_profile_picture.flag == 'Red' ? reactIcons.close : linkedin_profile_picture.flag == 'Green' ? reactIcons.checked : ''}
                  </span>
                </li>
              )}
              {applicant_linkedin_connections && (
                <li className="border p-2 border-secondary text-capitalize fw-medium d-flex justify-content-between my-2">
                  <span>{applicant_linkedin_connections?.text}</span>
                  <span className="fs-4 text-success">
                  {applicant_linkedin_connections.flag == 'Red' ? reactIcons.close : applicant_linkedin_connections.flag == 'Green' ? reactIcons.checked : ''}
                  </span>
                </li>
              )}

              {vendor_linkedin_connections && (
                <li className="border p-2 border-secondary text-capitalize fw-medium d-flex justify-content-between my-2">
                  <span>{vendor_linkedin_connections?.text}</span>
                  <span className="fs-4 text-success">
                  {vendor_linkedin_connections.flag == 'Red' ? reactIcons.close : vendor_linkedin_connections.flag == 'Green' ? reactIcons.checked : ''}
                  </span>
                </li>
              )}
              {vendor_employees_strength && (
                <li className="border p-2 border-secondary text-capitalize fw-medium d-flex justify-content-between my-2">
                  <span>{vendor_employees_strength?.text}</span>
                  <span className="fs-4 text-success">
                  {vendor_employees_strength.flag == 'Red' ? reactIcons.close : vendor_employees_strength.flag == 'Green' ? reactIcons.checked : ''}
                  </span>
                </li>
              )}
              {linkedin_age && (
                <li className="border p-2 border-secondary text-capitalize fw-medium d-flex justify-content-between my-2">
                  <span>{linkedin_age?.text}</span>
                  <span className="fs-4 text-success">
                  {linkedin_age.flag == 'Red' ? reactIcons.close : linkedin_age.flag == 'Green' ? reactIcons.checked : ''}
                  </span>
                </li>
              )}
              {vendor_glassdor_review && (
                <li className="border p-2 border-secondary text-capitalize fw-medium d-flex justify-content-between my-2">
                  <span>{vendor_glassdor_review?.text}</span>
                  <span className="fs-4 text-success">
                  {vendor_glassdor_review.flag == 'Red' ? reactIcons.close : vendor_glassdor_review.flag == 'Green' ? reactIcons.checked : ''}
                  </span>
                </li>
              )}
              {skill_matrix && (
                <li className="border p-2 border-secondary text-capitalize fw-medium d-flex justify-content-between my-2">
                  <span>{skill_matrix?.text}</span>
                  <span className="fs-4 text-success">
                  {skill_matrix.flag == 'Red' ? reactIcons.close : skill_matrix.flag == 'Green' ? reactIcons.checked : ''}
                  </span>
                </li>
              )}
              {offer_letter && (
                <li className="border p-2 border-secondary text-capitalize fw-medium d-flex justify-content-between my-2">
                  <span>{offer_letter?.text}</span>
                  <span className="fs-4 text-success">
                  {offer_letter.flag == 'Red' ? reactIcons.close : offer_letter.flag == 'Green' ? reactIcons.checked : ''}
                  </span>
                </li>
              )}
              {technical_questionaire && (
                <li className="border p-2 border-secondary text-capitalize fw-medium d-flex justify-content-between my-2">
                  <span>{technical_questionaire?.text}</span>
                  <span className="fs-4 text-success">
                  {technical_questionaire.flag == 'Red' ? reactIcons.close : technical_questionaire.flag == 'Green' ? reactIcons.checked : ''}
                  </span>
                </li>
              )}
              {linkedin_matched_with_resume && (
                <li className="border p-2 border-secondary text-capitalize fw-medium d-flex justify-content-between my-2">
                  <span>{linkedin_matched_with_resume?.text}</span>
                  <span className="fs-4 text-success">
                  {linkedin_matched_with_resume.flag == 'Red' ? reactIcons.close : linkedin_matched_with_resume.flag == 'Green' ? reactIcons.checked : ''}
                  </span>
                </li>
              )}
              {reference && (
                <li className="border p-2 border-secondary text-capitalize fw-medium d-flex justify-content-between my-2">
                  <span>{reference?.text}</span>
                  <span className="fs-4 text-success">
                  {reference.flag == 'Red' ? reactIcons.close : reference.flag == 'Green' ? reactIcons.checked : ''}
                  </span>
                </li>
              )}
              {rating_count && (
                <li className="border p-2 border-secondary text-capitalize fw-medium d-flex justify-content-between my-2">
                  <span>{rating_count?.text}</span>
                  <span className="fs-4 text-success">
                  {rating_count.flag == 'Red' ? reactIcons.close : rating_count.flag == 'Green' ? reactIcons.checked : ''}
                  </span>
                </li>
              )}
            </div> */}
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
