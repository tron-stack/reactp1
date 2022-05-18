import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//import Navbar
import { RootState, AppDispatch } from "../../UserStore";
import { useNavigate } from "react-router-dom";
import { getReimbursments } from "../../Slices/ReimbursementSlice";
//import CreateReimbursement
import { Loading } from "../../Components/Loading/Loading";
import { Reimbursement } from "../../Components/Reimbursements/Reimbursements";
import { IReimbursement } from "../../Interfaces/IReimbursement";

//import Reimbursementpage.css

export const ReimbursementPage:React.FC = () => {

    const userInfo = useSelector((state:RootState) => state.user);
    const reimbursements = useSelector((state:RootState) => state.reimbursements);
    const navigator = useNavigate();
    const dispatch:AppDispatch = useDispatch();

    useEffect(()=>{
        if(!userInfo.user){
            navigator('/login');
        } else if(userInfo.user && !reimbursements.reimbursements) {
            dispatch(getReimbursments());
        }
        console.log("UserState: ", userInfo, "Reimbursements: ", reimbursements);

    },[userInfo, reimbursements.reimbursements]);

    return (
        <div className="reimbursement-page">
            <Loading/>
        </div>
    )



}