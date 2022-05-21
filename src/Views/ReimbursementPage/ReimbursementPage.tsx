import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../UserStore";
import { useNavigate } from "react-router-dom";
import { approveReimbursementById, getPendingReimbursements, getReimbursments, getReimbursmentsForManager, getRequestsByStatus, getResolvedReimbursements } from "../../Slices/ReimbursementSlice";
import { Loading } from "../../Components/Loading/Loading";
import { Reimbursement } from "../../Components/Reimbursements/Reimbursements";
import { IReimbursement } from "../../Interfaces/IReimbursement";
import { Navbar } from "../../Components/Navbar/Navbar";

//import Reimbursementpage.css

export const ReimbursementPage:React.FC = () => {

    const userInfo = useSelector((state:RootState) => state.user);
    const reimbursementsInfo = useSelector((state:RootState) => state.reimbursements);
    const navigator = useNavigate();
    const dispatch:AppDispatch = useDispatch();

    const [reimbursementStatus, setReimbursementStatus] = useState<number>(0);

    useEffect(()=>{
        if(!userInfo.currentProfile){
            navigator('/login');
        } else if(userInfo.currentProfile && !reimbursementsInfo.reimbursements) {
            if(userInfo.currentProfile.userRole == 1){
                dispatch(getReimbursments());
            }else if(userInfo.currentProfile.userRole == 2){
                dispatch(getReimbursmentsForManager())
            }               
        }
        console.log("UserState: ", userInfo, "Reimbursements: ", reimbursementsInfo);

    },[userInfo, reimbursementsInfo.reimbursements]);

    const isManager = () => {
        if(userInfo.currentProfile?.userRole == 2){
            return true;
        } else return false;
    }

    const handleStatusChangeType = (event:React.ChangeEvent<HTMLSelectElement>) => {
        
        setReimbursementStatus(parseInt(event.target.value));

        if(!isManager()){
            dispatch(getRequestsByStatus(reimbursementStatus));
        }else if(!isManager() && reimbursementStatus == 4){
            dispatch(getReimbursments());
        }
        if(isManager() && reimbursementStatus == 1){
            dispatch(getPendingReimbursements());
        }else if(isManager() && reimbursementStatus == 2){
            dispatch(getResolvedReimbursements());
        }else if(isManager() && reimbursementStatus == 3){
            dispatch(getReimbursmentsForManager());
        }
    }

    return (
        <div className="reimbursement-page">
            <div className="header">
               
                <div className="type-container">
                { isManager()? 
                    <select className="select-type" onChange={handleStatusChangeType}>
                        <option value="1">Pending</option>
                        <option value="2">Resolved</option>
                        <option value="3" >All</option>
                    </select> :
                    <select className="select-type" onChange={handleStatusChangeType}>
                        <option value="1">Pending</option>
                        <option value="2">Approved</option>
                        <option value="3">Denied</option>
                        <option value="4" >All</option>
                    </select>
                }                  
                </div>
            </div>
            <div className="reimbursement-list">
            {reimbursementsInfo.reimbursements ? reimbursementsInfo.reimbursements
            .map((reimbursement:IReimbursement) =>{
                return <div className="reimbursement-container">
                            <div className="reimbursement">
                                <Reimbursement {...reimbursement} key={reimbursement.reimbursementId} />
                            </div>
                        </div>
            }):
            <Loading/>
            }
            </div>
        </div>
    )



}