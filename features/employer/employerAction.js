import { BASE_URL } from "@/utils/endpoints";
import axios from "axios";


export const handleGetLobs = async() => {
    const response = await axios.get(BASE_URL + '')
    if(response.status){
       setLobList(response.data);
    }
  }

export  const handleGetClientNames = async() => {
    const response = await axios.get(BASE_URL+ '');
    if(response.status){
      setClientNameList(response.data);
    }
  }

export  const handleGetClientManagers = async() => {
     const response = axios.get(BASE_URL + '');
     if(response.status){
        setClientManagerList(response.data);
     }
  }

export const handleGetUsersList = async() => {
    const response = await axios.get(BASE_URL + '');
    if(response.status){
      setUsersList(response.data);
    }
  } 