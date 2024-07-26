import { getReq } from "@/utils/apiHandlers";
import { BASE_URL } from "@/utils/endpoints";
import axios from "axios";
import { employeeDetail } from "./employerSlice";


export const handleGetLobs = async() => {
    const response = await getReq('')
    if(response.status){
       setLobList(response.data);
    }
  }

export  const handleGetClientNames = async() => {
    const response = await getReq('');
    if(response.status){
      setClientNameList(response.data);
    }
  }

export  const handleGetClientManagers = async() => {
     const response = getReq('');
     if(response.status){
        setClientManagerList(response.data);
     }
  }

export const handleGetUsersList = async() => {
    const response = await getReq('');
    if(response.status){
      setUsersList(response.data);
    }
  } 


export const getUserDetails = async() => {
    const response = await getReq('/current-user/');
    console.log("------------response ", response);
    if(response.status){
      return response.data
    }
}