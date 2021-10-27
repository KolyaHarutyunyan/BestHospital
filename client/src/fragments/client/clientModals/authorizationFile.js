import React, {useEffect, useState} from 'react';
import {createClientStyle} from '../index';
import {Images} from "@eachbase/utils";
import {AddButton, AddModalButton, ValidationInput} from "@eachbase/components";

import {useDispatch} from "react-redux";
import {clientActions, uploadActions} from "@eachbase/store";
import {useParams} from "react-router-dom";

const credentialBtn = {
    maxWidth: 192,
    width: '100%',
    marginLeft: 16,
    height: 48
}

export const AuthorizationFile = ({handleFile}) => {

    const classes = createClientStyle()

    const dispatch = useDispatch()

    const params = useParams()

    const uploadedFiles = false

    const [fileName, setFileName] = useState('')

    const handleChange = (e) => {
        setFileName(e.target.value)
    }

    const hiddenFileInput = React.useRef(null);

    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    const handleSubmit = () => {
        alert('done')
    }

    const handleChangeFile = event => {
        const createInfo = {
            "resource": params.id,
            "type": fileName,
        }
        dispatch(uploadActions.createUpload(event.target.files[0], createInfo))
    };

    return (
        <div className={classes.authorizationFileWrapper}>
            <div className={classes.authorizationFileHeader}>
                <h1>Uploaded files</h1>
                <h2>Please fulfill the file type to upload a file.</h2>
                <p>
                    <span className={classes.starIcon}>*</span>
                    Only
                    <span> PDF , PNG , CSV </span> &
                    <span> JPEG </span>
                    formats are supported
                </p>
            </div>
            <div className={classes.fileTypeInput}>
                <ValidationInput
                    onChange={(e) => handleChange(e)}
                    value={fileName}
                    variant={"outlined"}
                    name={"fileType"}
                    type={"text"}
                    placeholder={'File Type*'}
                    errorFalse={true}
                />
                <input
                    hidden
                    type="file"
                    ref={hiddenFileInput}
                    onChange={handleChangeFile}
                />
                <AddButton
                    styles={credentialBtn}
                    disabled={!fileName}
                    text='Upload a file'
                    handleClick={handleClick}
                />
            </div>
            <p className={classes.authorizationFileSubTitle}>uploaded files</p>
            <div className={!uploadedFiles ? classes.centered : classes.normal}>
                {
                    uploadedFiles ? <p>coming soon</p> :
                        <div className={classes.iconText}>
                            <img src={Images.fileIcon} alt=""/>
                            <p>No File yet</p>
                        </div>
                }
            </div>
            <AddModalButton handleClick={handleSubmit} text='Done'/>
        </div>
    )
}