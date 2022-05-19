import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { AppDispatch, RootState } from '../../UserStore';
import { useNavigate } from 'react-router-dom';
import { RegisterReimbursement } from '../../Components/RegisterReimbursement/RegisterReimbursement';

export const UserHomePage: React.FC = () => {

    // const userState = useSelector((state:RootState)=> state.user);
    const requestState = useSelector((state:RootState)=> state.reimbursements);

    const navigator = useNavigate();
    const dispatch:AppDispatch = useDispatch();

    useEffect(() => {
        if(requestState.error){
           console.log(requestState.error); 
        }
    },[requestState])

    return(
        <div className="user-homepage-container">
            <div className="nav-container"></div>
            <div className="homepage-body">
                {requestState.error ? <h2 className="request-registration-error">Reqeust Registration Error</h2> : <></>}
                <RegisterReimbursement />
            </div>
        </div>
    )

}