import MyCKEditor from "@/components/common/MyCkEditor";

const EmailPreviewModal = () => {
    return(
        <div className="modal fade" id="emailPreviewModal" tabindex="-1" aria-labelledby="emailPreviewModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header border border-bottom-primary">
              <h5 className="modal-title" id="emailPreviewModalLabel">Email Preview</h5>
              <button type="button" className="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
               <div className="row">
                   <div className="col-3">
                    <p>Notify User</p>
                   </div>
                   <div className="col-9">
                    <input type='checkbox' />
                   </div>
                   <div className="col-3">
                    <p>From</p>
                   </div>
                   <div className="col-9">
                    <select className="client-form-input">
                        <option>Select</option>
                    </select>
                   </div>
                   <div className="col-3">
                    <p>To</p>
                   </div>
                   <div className="col-9">
                   <select className="client-form-input">
                        <option>Select</option>
                    </select>
                   </div>
                   <div className="col-3">
                    <p>Subject</p>
                   </div>
                   <div className="col-9">
                    <input type='checkbox' disabled />
                   </div>
                   <div className="col-3">
                    <p>Body</p>
                   </div>
                   <div className="col-9">
                    <MyCKEditor />
                   </div>
               </div>
            </div>
            <div className="modal-footer">
              <button  type="button" className="theme-btn btn-style-one small" data-bs-dismiss="modal" onClick={handleUpdateStatus} >Send</button>
              <button type="button" className="theme-btn btn-style-four small" data-bs-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>    
    )
}

export default EmailPreviewModal;