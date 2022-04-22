import React from 'react';
import { useSelector } from 'react-redux';
import { AuthorizationFile } from '../../../../../client';
import { invoicePaymentTHeadTBodyStyle } from './styles';

export const LastStepInputs = ({ invoicePaymentId }) => {
    const classes = invoicePaymentTHeadTBodyStyle();

   const uploadedFiles = useSelector((state) => state.upload.uploadedInfo);

    return (
        <div className={classes.lastStepBoxStyle}>
           <AuthorizationFile 
                fileIsForPayment={true}
                authenticationsId={invoicePaymentId}
                uploadedFiles={uploadedFiles}
           />
        </div>
    );
};
