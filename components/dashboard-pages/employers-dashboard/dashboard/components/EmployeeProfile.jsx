'use client'
import Loader from "@/components/common/Loader";
import Paper from "@/components/common/Paper";
import { employeeDetails } from "@/features/employer/employerSlice";
import { getReq, postApiReq } from "@/utils/apiHandlers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const tabsName = [
    {title:'Personal Information'},
    {title:'Bank Details'},
    {title:'Salary Details'},
]

const EmployeeProfile = ({userDetails}) => {
    const [tab, setTab] = useState('Personal Information')
    const [profileImg, setProfileImg] = useState();
    const userinfo = useSelector((state) => state.employer.user);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);


    const getUserDetails = async() => {
        const response = await getReq(`/current-user/`);
        if(response.status){
         dispatch(employeeDetails(response.data))
        }
     }

    const handleFileUpload = (e) => {
        let file = e.target.files[0]
        setProfileImg(file);
    }
   
    
    const handleUploadProfilePhoto = async() => {
        let formData = new FormData();
        formData.append('profile_photo', profileImg);
        setIsLoading(true);
        try{
            const response = await postApiReq(`/upload-profile-photo/${userinfo.id}/`, formData)
            setIsLoading(false);
            if(response.status){
                toast.success('Profile image has been uploaded successfully');
                getUserDetails();
                setProfileImg('');
            }
        }catch(err){
            toast.error(err.response || 'Something went wrong');s
            setIsLoading(false);
        }
         
    }
    
    useEffect(() => {
        if(profileImg){
            handleUploadProfilePhoto();
        }
    }, [profileImg])


    return(
        <>
        {isLoading && <Loader />}
        <Paper>
        <div className='container-fluid px-5'>
           <div className="d-flex">
           <div className="">
                <label htmlFor="#profileImg">
                <div style={{width:'160px', height:'160px', borderRadius:'5px'}} className="border border-primary">
                    <img
                      alt="profile"
                      src={userinfo?.profile_photo ? userinfo?.profile_photo :'/images/user-dummy.png'}
                      style={{width:'160px', height:'158px'}}
                    />
                </div>
                </label>
                <div className="my-2 text-center">
                    <label htmlFor="profilePhoto">
                    <input type="file" id="profilePhoto" className=""  onChange={handleFileUpload} />
                    {/* <button className="theme-btn btn-style-two small">Upload</button> */}
                    </label>
                {/* <strong className="fs-6">{userDetails?.user?.first_name + ' ' + userDetails?.user?.last_name}</strong> */}
                </div>
            </div>
            <div className="w-100 mx-5">
            <div className="d-flex justify-content-between  px-5">
            <div className="d-flex border border-primary w-100">
                {tabsName.map((item) => {
                    return(
                        <div onClick={() => setTab(item.title)} className={`px-2 text-center flex-fill cursor-pointer fw-medium ${tab == item.title ?  'bg-primary text-white fw-medium' : 'bg-white'}`}>{item.title}</div>
                    )
                })
                }
            </div>
          </div>
          <div className="px-5">
          {tab == 'Personal Information' &&
          <div>
            <div className="d-flex my-1">
                <div className="w-50">
                    <strong>Employee Code</strong>
                </div>
                <div className="w-50">
                    <p>{userDetails?.empcode}</p>
                </div>
            </div>
            <div className="d-flex my-1">
                <div className="w-50">
                    <strong>User Name</strong>
                </div>
                <div className="w-50">
                    <p>{userDetails?.user?.first_name + ' ' + userDetails?.user?.last_name}</p>
                </div>
            </div>
            <div className="d-flex my-1">
                <div className="w-50">
                    <strong>Gender</strong>
                </div>
                <div className="w-50">
                    <p>Male</p>
                </div>
            </div>
            <div className="d-flex my-1">
                <div className="w-50">
                    <strong>Email</strong>
                </div>
                <div className="w-50">
                    <p>{userDetails?.user?.email}</p>
                </div>
            </div>
            <div className="d-flex my-1">
                <div className="w-50">
                    <strong>Date of Birth</strong>
                </div>
                <div className="w-50">
                    <pattern>{userDetails?.user?.birth_date || 'N/A'}</pattern>
                </div>
            </div>
            <div className="d-flex my-1">
                <div className="w-50">
                    <strong>Date of Joining</strong>
                </div>
                <div className="w-50">
                    <p>{userDetails?.joining_date}</p>
                </div>
            </div>
            <div className="d-flex my-1">
                <div className="w-50">
                    <strong>Designation</strong>
                </div>
                <div className="w-50">
                    <p>{userDetails?.role_name}</p>
                </div>
            </div>
            <div className="d-flex my-1">
                <div className="w-50">
                    <strong>PAN</strong>
                </div>
                <div className="w-50">
                    <p>-</p>
                </div>
            </div>
            <div className="d-flex my-1">
                <div className="w-50">
                    <strong>Aadhar</strong>
                </div>
                <div className="w-50">
                    <p>-</p>
                </div>
            </div>
            <div className="d-flex my-1">
                <div className="w-50">
                    <strong>Branch</strong>
                </div>
                <div className="w-50">
                    <p>Indore</p>
                </div>
            </div>
          </div>
          }
          {tab == 'Bank Details' &&
          <div>
            Bank Detials
          </div>
          }
          {tab == 'Salary Details' &&
          <div>
            Salary Details 
          </div>
          }
          </div>
            </div>
           </div>
            {/* <div className="d-flex justify-content-center">
                <label htmlFor="#profileImg">
                <div style={{width:'160px', height:'160px', borderRadius:'50%'}} className="border border-primary"></div>
                </label>
            </div>
                <div className="d-flex justify-content-center my-2">
                    <strong className="fs-4">Dharmendra Patel</strong>
                </div>
            <div className="d-flex justify-content-between py-2">
            <div className="d-flex border border-primary w-100">
                {tabsName.map((item) => {
                    return(
                        <div onClick={() => setTab(item.title)} className={`px-2 text-center flex-fill cursor-pointer fw-medium ${tab == item.title ?  'bg-primary text-white fw-medium' : 'bg-white'}`}>{item.title}</div>
                    )
                })
                }
            </div>
          </div>
          {tab == 'Personal Information' &&
          <div>
            <div></div>
          </div>
          }
          {tab == 'Bank Details' &&
          <div>
            Bank Detials
          </div>
          }
          {tab == 'Salary Details' &&
          <div>
            Salary Details 
          </div>
          } */}
        </div>
        </Paper>
        </>
    )
}

export default EmployeeProfile;