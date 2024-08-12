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
            <div className="modal-body w-100" >
              {/* <Image 
               src={img}
               width={200}
               height={100}
              /> */}
              <iframe src={img} style={{width:'100%', height:'600px'}} />
            </div>
          </div>
        </div>
      </div>
    )
}

export default ViewDocumentModal;