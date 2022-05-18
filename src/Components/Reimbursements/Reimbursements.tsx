import React from 'react';

import { IReimbursement } from '../../Interfaces/IReimbursement';

//import './Reimbursement.css';
//import defaultImage from "../../deafultpic.jpg";

export const Reimbursement:React.FC<IReimbursement> = (Reimbursement:IReimbursement) => {

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
        </div>
    )

}