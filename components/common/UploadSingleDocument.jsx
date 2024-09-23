import Image from "next/image";


const UploadSingleDocument = ({handleFileUpload, multiple}) => {
    return(
        <>
              <label>
                <div
                  htmlFor="#upload"
                  className="border-black rounded-1 p-2"
                  style={{ width: "60px", height: "60px" }}
                >
                  <Image
                    width={90}
                    height={10}
                    src="/images/upload.png"
                    alt="brand"
                  />
                </div>
                <input
                  type="file"
                  id="upload"
                  onChange={(e) => {
                    handleFileUpload(e);
                  }}
                  className="d-none"
                  multiple
                />
              </label>
        </>
    )
}

export default UploadSingleDocument