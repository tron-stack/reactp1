import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../UserStore';

import { IReimbursement } from '../../Interfaces/IReimbursement';
import { approveReimbursementById, denyReimbursementById} from "../../Slices/ReimbursementSlice";

//import './Reimbursement.css';
//import defaultImage from "../../deafultpic.jpg";

export const Reimbursement:React.FC<IReimbursement> = (Reimbursement:IReimbursement) => {

    const dispatch:AppDispatch = useDispatch();
    const userInfo = useSelector((state:RootState) => state.user);
    const [reimbursementStatus, setReimbursementStatus] = useState<number>(0);

    const isManager = () => {
        if(userInfo.currentProfile?.userRole == 2){
            return true;
        } else return false;
    }

    const isPending = () => {
        if(isManager() && reimbursementStatus == 1){
            return true;
        } else return false;
    }

    const handleResolve = (event:React.MouseEvent<HTMLButtonElement>) => {
        let actionValue = parseInt((event.target as HTMLButtonElement).value);
        let reimbId = event.currentTarget?.getAttribute("data-id");
        if(actionValue == 2){
            if(reimbId){
                dispatch(approveReimbursementById(reimbId));
            }
        } else if(actionValue == 3){
            if(reimbId) {
                dispatch(denyReimbursementById(reimbId));
            }
        } 
    }

    return(
        <div className="reimbursement">
            <div className='reimbursement-id'>
                <h3 className='reimbursement-number'>{Reimbursement.reimbursementId}</h3>
            </div>
            <div className='reimbursement-amount'>
                <h3 className='reimbursement-total'>{Reimbursement.amount}</h3>
            </div>
            <div className='reimbursement-submit-date'>
                <h3 className='reimb-submit-date'>{Reimbursement.dateSubmitted.toDateString()}</h3>
            </div>
            <div className='reimbursement-resolved-date'>
                <h3 className='reimb-resolved-date'>{Reimbursement.dateResolved.toDateString()}</h3>
            </div>
            <div className='reimbursement-description'>
                <h3 className='reimbursement-desc'>{Reimbursement.description}</h3>
            </div>
            <div className="reimbursement-author">
                <h3 className="reimbursement-auth">{Reimbursement.reimbursementAuthor}</h3>
            </div>
            <div className='reimbursement-resolver'>
                <h3 className='reimbursement-res'>{Reimbursement.reimbursementResolver}</h3>
            </div>
            <div className='reimbursement-type'>
                <h3 className='reimb-type'>{Reimbursement.reimbursementType}</h3>
            </div>
            <div className='reimbursement-status'>
                <h3 className='reimb-status'>{Reimbursement.reimbursementStatus}</h3>
            </div>
            { isPending()?
            <div className="actions">
                <button className="approve-btn" value="2" data-id = {Reimbursement.reimbursementId} 
                    onClick={handleResolve}>Approve</button>
                <button className="deny-btn" value="3" >Deny</button>
            </div> 
            : <div></div>
            }
        </div>
    )

}