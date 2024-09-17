
const DocumentPreviewModal = ({img}) => {
    console.log("-------------img -------", img);
    return(
        <div
        style={{ width: "800px !important", background: "light-gray" }}
        className="offcanvas offcanvas-end"
        tabindex="-1"
        id="documentQuickView"
        aria-labelledby="documentQuickViewLabel"
      >
        <div className="offcanvas-header">
          <h5 id="documentQuickViewLabel">{"Resume"}</h5>
          <div className="d-flex justify-content-end">
            {/* <button className="theme-btn btn-style-one small">New</button>
            <button className="theme-btn btn-style-two mx-2 small">Save</button> */}
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              {/* Cancel */}
            </button>
          </div>
        </div>
        <div className="offcanvas-body">
          <iframe
            src={img}
            style={{ width: "100%", height: "100%" }}
            frameborder="0"
            sandbox="allow-same-origin allow-scripts"
          ></iframe>
        </div>
      </div>
    )
}

export default DocumentPreviewModal;