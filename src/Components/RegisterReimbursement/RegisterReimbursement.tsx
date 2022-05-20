import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../UserStore";
import { registerReimbursement } from "../../Slices/ReimbursementSlice";
import { IReimbursement } from "../../Interfaces/IReimbursement";
import { useNavigate } from "react-router-dom";
//import CreateReimbursement.css

export const RegisterReimbursement:React.FC = () => {

    const [amount, setAmount] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
    const [reimbursementType, setReimbursementType] = useState<number>(0);
    const navigator = useNavigate();
    const currentUser = useSelector((state:RootState)=>state.user.user);
    const dispatch:AppDispatch = useDispatch();

    const handleChangeAmount = (event:React.ChangeEvent<HTMLInputElement>) => {
        setAmount(parseInt(event.target.value));
    }
    const handleChangeDescription = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    }
    const handleChangeType = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setReimbursementType(parseInt(event.target.value));
    }

    const handleReimbursement =  () => {
        let d = new Date().getTime();
        let author = currentUser?.userId;
        
        if(currentUser){
            let reimbursement:IReimbursement = {
                reimbursementId: 0,
                amount,
                dateSubmitted: new Date(),
                dateResolved: new Date(),
                description,
                reimbursementAuthor: currentUser.userId,
                reimbursementType,
                reimbursementStatus: 1
            }
            dispatch(registerReimbursement(reimbursement));
            
        }
        window.location.reload;
    }
    useEffect(()=>{
        console.log(amount, description, reimbursementType);
    },[amount, description, reimbursementType]);

    return(
        <div className="create-reimbursement">
            <div className="amount-container">
                <input className="amount" placeholder="amount" type="number" onChange={handleChangeAmount}></input>
            </div>
            <div className="description-container">
                <textarea className="content" onChange={handleChangeDescription} placeholder="Describe your Reimbursement" maxLength={256}></textarea>
            </div>
            <div className="type-container">
                <select className="select-type" onChange={handleChangeType}>
                    <option value="1">Lodging</option>
                    <option value="2">Travel</option>
                    <option value="3">Food</option>
                    <option value="4">Other</option>
                </select>
            </div>
            <button className="create-btn" onClick={handleReimbursement}>Send New Reimbursement for Approval</button>
    </div>
    )
}

