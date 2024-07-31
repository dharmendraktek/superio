'use client'

import { getLocalStorage } from "./utils/localstorage"

export const isUserAuthenticated = () => {
   if(getLocalStorage('is_user_token')){
  return true;
 }else{
  return false;
 }

}