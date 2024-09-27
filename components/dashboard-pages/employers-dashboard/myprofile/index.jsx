'use client';
import InnerLayout from "@/components/common/InnerLayout/InnerLayout";
import Paper from "@/components/common/Paper";
import { employeeDetails } from "@/features/employer/employerSlice";
import { getReq, postApiReq } from "@/utils/apiHandlers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const tabsName = [
  { title: 'Personal Information' },
  { title: 'Bank Details' },
  // { title: 'Salary Details' },
];

const Index = () => {
  const [tab, setTab] = useState('Personal Information');
  const [profileImg, setProfileImg] = useState();
  const [imagePreview, setImagePreview] = useState();
  const userDetails = useSelector((state) => state.employer.user);
  const dispatch = useDispatch();

  const getUserDetails = async () => {
    try {
      const response = await getReq(`/current-user/`);
      if (response.status) {
        dispatch(employeeDetails(response.data));
      }
    } catch (err) {
      toast.error('Failed to fetch user details');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImg(file);
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  const handleUploadProfilePhoto = async () => {
    if (!profileImg) return;
    
    const formData = new FormData();
    formData.append('profile_photo', profileImg);
    
    try {
      const response = await postApiReq(`/upload-profile-photo/${userDetails.id}/`, formData);
      if (response.status) {
        toast.success('Profile image uploaded successfully');
        getUserDetails();
        setProfileImg(null);
        setImagePreview(null);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    if (profileImg) {
      handleUploadProfilePhoto();
    }
  }, [profileImg]);

  return (
    <InnerLayout>
      <section className="px-4">
        <Paper>
          <div className='container-fluid px-5'>
            <div className="d-flex">
              <div className="">
                <label htmlFor="profilePhoto">
                  <div style={{ width: '160px', height: '160px', borderRadius: '5px' }} className="border border-primary">
                    <img
                      alt="profile"
                      src={imagePreview || userDetails?.profile_photo || '/images/user-dummy.png'}
                      style={{ width: '160px', height: '158px' }}
                    />
                  </div>
                </label>
                <div className="my-2 text-center">
                  <input type="file" id="profilePhoto" onChange={handleFileUpload} style={{ display: 'none' }} />
                  <label htmlFor="profilePhoto" className="cursor-pointer theme-btn btn-style-one small">Upload</label>
                </div>
              </div>
              <div className="w-100 mx-5">
                <div className="d-flex justify-content-between px-5">
                  <div className="d-flex border border-primary w-100">
                    {tabsName.map((item) => (
                      <div
                        key={item.title}
                        onClick={() => setTab(item.title)}
                        className={`px-2 text-center flex-fill cursor-pointer fw-medium ${tab === item.title ? 'bg-primary text-white' : 'bg-white'}`}
                      >
                        {item.title}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="px-5">
                  {tab === 'Personal Information' && (
                    <div>
                      {[
                        { label: 'Employee Code', value: userDetails?.empcode },
                        { label: 'User Name', value: `${userDetails?.user?.first_name} ${userDetails?.user?.last_name}` },
                        { label: 'Gender', value: 'Male' },
                        { label: 'Email', value: userDetails?.user?.email },
                        { label: 'Date of Birth', value: userDetails?.user?.birth_date || 'N/A' },
                        { label: 'Date of Joining', value: userDetails?.joining_date },
                        { label: 'Designation', value: userDetails?.role_name },
                        { label: 'PAN', value: '-' },
                        { label: 'Aadhar', value: '-' },
                        { label: 'Branch', value: 'Indore' },
                      ].map((item, index) => (
                        <div className="d-flex my-1" key={index}>
                          <div className="w-50"><strong>{item.label}</strong></div>
                          <div className="w-50"><p>{item.value}</p></div>
                        </div>
                      ))}
                    </div>
                  )}
                  {tab === 'Bank Details' && <div className="text-center py-5">No data available</div>}
                </div>
              </div>
            </div>
          </div>
        </Paper>
      </section>
    </InnerLayout>
  );
};

export default Index;
