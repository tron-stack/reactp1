import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState,AppDispatch } from "../../UserStore";
import { getUserDetails, getUserDetailsbyUsername } from "../../Slices/UserSlice";
//import Navbar
import { Reimbursement } from "../../Components/Reimbursements/Reimbursements";
import { IReimbursement } from "../../Interfaces/IReimbursement";
import { UpdateUser } from "../../Components/UpdateUser/UpdateUser";


export const ProfilePage:React.FC =() => {

    const profile = useSelector((state:RootState)=>state.user);
    const dispatch:AppDispatch = useDispatch();

    const username = profile.currentProfile?.userName;

    useEffect(()=>{
        console.log("get info about current user: ", username);
        if(username && !profile.currentProfile){
            dispatch(getUserDetailsbyUsername(username));
        }
    }, [profile]);

    const isManager = () =>{
        if (profile.currentProfile?.userRole == 2){
            return true;
        } else {
            return false;
        }
    }

    return(
    
        <div>
       
            <h1>Profile of {profile.currentProfile?.firstName} {profile.currentProfile?.lastName}</h1>
            <h2>User ID: {profile.currentProfile?.userId}</h2>
            <h3>Email: {profile.currentProfile?.email}</h3>
            <h4>User Role: {isManager() ? <h4>Manager</h4> : <h4>Employee</h4>}
            </h4>

            
            <UpdateUser/>


                
            
        </div>)
}

/*
userId: number,
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    userRole: number
*/