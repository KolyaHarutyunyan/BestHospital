import React from 'react';
import { useSelector } from 'react-redux';
import { AuthorizationFile } from '../../../../../client';
import { claimPaymentTHeadTBodyStyle } from './styles';

export const LastStepInputs = ({ claimPaymentId }) => {
    const classes = claimPaymentTHeadTBodyStyle();

   const uploadedFiles = useSelector((state) => state.upload.uploadedInfo);

    return (
        <div className={classes.lastStepBoxStyle}>
           <AuthorizationFile 
                fileIsForPayment={true}
                authenticationsId={claimPaymentId}
                uploadedFiles={uploadedFiles}
           />
        </div>
    );
};
