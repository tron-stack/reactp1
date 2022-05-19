import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../UserStore";
import { useNavigate } from "react-router-dom";
import { getReimbursments, getReimbursmentsForManager } from "../../Slices/ReimbursementSlice";
import { Loading } from "../../Components/Loading/Loading";
import { Reimbursement } from "../../Components/Reimbursements/Reimbursements";
import { IReimbursement } from "../../Interfaces/IReimbursement";

//import Reimbursementpage.css

export const ReimbursementPage:React.FC = () => {

    const userInfo = useSelector((state:RootState) => state.user);
    const reimbursementsInfo = useSelector((state:RootState) => state.reimbursements);
    const navigator = useNavigate();
    const dispatch:AppDispatch = useDispatch();

    // get username or userid for manager, request status for user

    useEffect(()=>{
        if(!userInfo.user){
            navigator('/login');
        } else if(userInfo.user && !reimbursementsInfo.reimbursements) {
            if(userInfo.user.userRole == 1){
                dispatch(getReimbursments());
            }else if(userInfo.user.userRole == 2){
                dispatch(getReimbursmentsForManager())
            } 
                
        }
        console.log("UserState: ", userInfo, "Reimbursements: ", reimbursementsInfo);

    },[userInfo, reimbursementsInfo.reimbursements]);

    return (
        <div className="reimbursement-page">
            {reimbursementsInfo.reimbursements ? reimbursementsInfo.reimbursements
                .map((reimbursement:IReimbursement) =>{
                    return <Reimbursement {...reimbursement} key={reimbursement.reimbursementId} />
            }):
            <Loading/>
            }
        </div>
    )



}