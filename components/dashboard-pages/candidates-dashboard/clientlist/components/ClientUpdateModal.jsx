"use Client";

const ClientUpdateModal = ({ data }) => {
  return (
    <>
      <div className="modal fade" id="clientUpdateModal">
        <div className="modal-dialog modal-lg modal-dialog-centered clientUpdate-modal modal-dialog-scrollable">
          <div className="modal-content">
            <button
              type="button"
              className="closed-modal"
              data-bs-dismiss="modal"
            ></button>
            {/* End close modal btn */}

            <div className="modal-body">
              {/* <!-- Login modal --> */}
              <div id="login-modal">
                {/* <!-- Login Form --> */}
                <div className="login-form default-form">
                  <form method="post">
                    <div className="row">
                      <div className="col-6">
                        <div className="form-group">
                          <label>Name</label>
                          <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            required
                          />
                        </div>
                        {/* name */}
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            type="text"
                            name="Email"
                            placeholder="Email"
                            required
                          />
                        </div>
                        {/* password */}
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label>Skype Id</label>
                          <input
                            type="text"
                            name="skypeId"
                            placeholder="Skype Id"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label>Role</label>
                          <input
                            type="text"
                            name="role"
                            placeholder="Role"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label>Team</label>
                          <select
                            class="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>Select</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label>Branch</label>
                          <select
                            class="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>Select</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label>Department</label>
                          <select
                            class="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>Select</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div>
                        {/* password */}
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label>Reporting Manager</label>
                          <select
                            class="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>Select</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="form-group mt-5">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        name="log-in"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </div>
                {/* <!--End Login Form --> */}
              </div>
              {/* <!-- End Login Module --> */}
            </div>
            {/* En modal-body */}
          </div>
          {/* End modal-content */}
        </div>
      </div>
    </>
  );
};

export default ClientUpdateModal;
