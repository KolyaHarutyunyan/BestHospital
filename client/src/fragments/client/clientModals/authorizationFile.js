import React, {useEffect, useState} from 'react';
import {createClientStyle} from '../index';
import {Images} from "@eachbase/utils";
import {AddButton, AddModalButton, ValidationInput} from "@eachbase/components";
import axios from 'axios';
import {useDispatch} from "react-redux";
import {clientActions} from "../../../store";

const credentialBtn = {
    maxWidth: 192,
    width: '100%',
    marginLeft: 16,
    height: 48
}

export const AuthorizationFile = ({handleFile}) => {

    const classes = createClientStyle()

    const dispatch = useDispatch()

    const uploadedFiles = false

    const [fileName, setFileName] = useState('')

    const [file,setFile] = useState({})

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

    useEffect(()=>{
        if (file.name){
            let fD = new FormData();
            console.log(file,'file file file useEffect');
            let sent = fD.append('name',file)
            console.log(sent, 'sent')
            dispatch(clientActions.createClientsAuthorizationFile(sent))
        }
    },[file.name])

    const handleChangeFile = event => {
        const fileUploaded = event.target.files[0];
        setFile(fileUploaded)
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