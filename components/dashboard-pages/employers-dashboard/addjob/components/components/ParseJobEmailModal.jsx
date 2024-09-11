

const ParseJobEmailModal = ({setTab}) => {
    return(
        <div className="modal fade" id="parseJobEmailModal" tabindex="-1" aria-labelledby="parseJobEmailModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="parseJobEmailModalLabel">Parse Job Email</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <p className="text-black">If you want to receive updates on the latest job postings, please forward your email to this email address.<strong className="text-primary">aman.gour@ktekresourcing.com</strong> </p>
            </div>
            <div className="modal-footer">
              <p>If you want to see pending jobs, please click the 'Continue' button.</p>
              <button type="button" onClick={() => setTab(3)} className="theme-btn btn-style-one small" data-bs-dismiss="modal">Continue</button>
              <button type="button" className="theme-btn btn-style-four small" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default ParseJobEmailModal;