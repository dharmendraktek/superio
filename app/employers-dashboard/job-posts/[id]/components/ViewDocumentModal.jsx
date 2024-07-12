import Image from "next/image";


const ViewDocumentModal = ({img}) => {
    return(
        <div className="modal fade" id="viewDocModal" tabindex="-1" aria-labelledby="viewDocModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header border border-bottom-primary">
              <h5 className="modal-title" id="viewDocModalLabel">Document Preview</h5>
              <button type="button" className="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* <Image 
               src={img}
               width={200}
               height={100}
              /> */}
              <img src={img} />
            </div>
          </div>
        </div>
      </div>
    )
}

export default ViewDocumentModal;