

const UserDeleteModal = ({handleDeleteUser}) => {
    
    return(
        <>
        <div className="modal fade" id="userDeleteModal">
          <div className="modal-dialog modal-lg modal-dialog-centered userDelete-modal modal-dialog-scrollable">
            <div className="modal-content">
              <button
                type="button"
                className="closed-modal"
                data-bs-dismiss="modal"
              ></button>
  
              <div className="modal-body">
                <div id="userDelete-modal" className="text-center my-3">
                    <h3>Are you sure you want to delete this user !</h3>
                </div>
                <div className="text-center  my-2">
                    <button onClick={handleDeleteUser} className="theme-btn small btn-style-one ">Yes</button>
                    <button  
                data-bs-dismiss="modal" className="theme-btn small mx-2 btn-style-nine ">No</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}

export default UserDeleteModal;