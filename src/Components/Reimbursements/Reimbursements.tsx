import React from 'react';

import { IReimbursement } from '../../Interfaces/IReimbursement';

import './Reimbursement.css';
//import defaultImage from "../../deafultpic.jpg";

export const Post:React.FC<IReimbursement> = (Reimbursement:IReimbursement) => {

    return(
        <div className="post">
            <div className="post-profile">
                <img className="post-image" src="" />
                <h3 className="post-user">{Reimbursement.reimbursementAuthor}</h3>
            </div>

            <div className="post-content">
                <p>{Reimbursement.description}</p>
            </div>
        </div>
    )

}