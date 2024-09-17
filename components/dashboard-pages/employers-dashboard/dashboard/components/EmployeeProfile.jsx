'use client'
import Paper from "@/components/common/Paper";
import { useState } from "react";

const tabsName = [
    {title:'Personal Information'},
    {title:'Bank Details'},
    {title:'Salary Details'},
]

const EmployeeProfile = () => {
    const [tab, setTab] = useState('Personal Information')

    return(
        <Paper>
        <div className='container-fluid px-5'>
           <div className="d-flex">
           <div className="">
                <label htmlFor="#profileImg">
                <div style={{width:'160px', height:'160px', borderRadius:'5px'}} className="border border-primary"></div>
                </label>
                <div>
                <strong className="fs-6">Dharmendra Patel</strong>
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
                    <p>1972</p>
                </div>
            </div>
            <div className="d-flex my-1">
                <div className="w-50">
                    <strong>User Name</strong>
                </div>
                <div className="w-50">
                    <p>Dharmendra Patel</p>
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
                    <p>dharmendra.patel@gmail.com</p>
                </div>
            </div>
            <div className="d-flex my-1">
                <div className="w-50">
                    <strong>Date of Birth</strong>
                </div>
                <div className="w-50">
                    <pattern>01/06/1962</pattern>
                </div>
            </div>
            <div className="d-flex my-1">
                <div className="w-50">
                    <strong>Date of Joining</strong>
                </div>
                <div className="w-50">
                    <p>14/06/2014</p>
                </div>
            </div>
            <div className="d-flex my-1">
                <div className="w-50">
                    <strong>Designation</strong>
                </div>
                <div className="w-50">
                    <p>React js developer</p>
                </div>
            </div>
            <div className="d-flex my-1">
                <div className="w-50">
                    <strong>Designation</strong>
                </div>
                <div className="w-50">
                    <p>React js developer</p>
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
    )
}

export default EmployeeProfile;