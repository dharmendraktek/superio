'use client'


const DocsPreviewModal = ({doc}) => {  

 
    return(
        <div className="modal fade" id="docsPreviewModal" tabindex="-1" aria-labelledby="docsPreviewModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header border border-bottom-primary">
              <h5 className="modal-title" id="docsPreviewModalLabel">Document</h5>
              <button type="button" className="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div>
                {doc ?
               <img src={doc} />
               :
               "No Documents is available"
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default DocsPreviewModal;