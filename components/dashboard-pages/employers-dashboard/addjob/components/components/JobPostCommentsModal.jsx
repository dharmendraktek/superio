import BtnBeatLoader from "@/components/common/BtnBeatLoader";

const JobPostCommentsModal = ({
  commentsErr,
  setComments,
  comments,
  setCommentsErr,
  handleSubmit,
  isLoading,
}) => {
  return (
    <div
      className="modal fade"
      id="commentsModal"
      tabindex="-1"
      aria-labelledby="commentsModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="commentsModalLabel">
              Job Posting Modification
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="d-flex gap-3">
              <label>Comments</label>
              <div className="w-100">
                <textarea
                  value={comments}
                  onChange={(e) => {
                    setComments(e.target.value);
                    setCommentsErr("");
                  }}
                  style={{
                    height: "60px",
                    width: "100%",
                    padding: "4px",
                    borderRadius: "3px",
                    border: "1px solid black",
                  }}
                />
                <p className="text-danger">{commentsErr}</p>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="theme-btn btn-style-one small"
              onClick={handleSubmit}
            >
              {isLoading ? (
                <BtnBeatLoader />
              ) : (
                "Submit"
              )}
            </button>
            <button
              type="button"
              className="theme-btn btn-style-one small"
              data-bs-dismiss="modal"
              id="commentModalClose"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostCommentsModal;
