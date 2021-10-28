import React, {useState} from 'react';
import {createClientStyle} from '../index';
import {Images} from "@eachbase/utils";
import {AddButton, AddModalButton, ValidationInput} from "@eachbase/components";

import {useDispatch} from "react-redux";
import {uploadActions} from "@eachbase/store";
import {useParams} from "react-router-dom";

const credentialBtn = {
    maxWidth: 192,
    width: '100%',
    marginLeft: 16,
    height: 48
}

const changeChangeFile = {
    width: '100%',
    height: 150
}

export const AuthorizationFile = ({uploadedFiles}) => {

    const classes = createClientStyle()

    const dispatch = useDispatch()

    const params = useParams()

    const [fileName, setFileName] = useState('')

    const handleChange = (e) => {
        setFileName(e.target.value)
    }

    const hiddenFileInput = React.useRef(null);

    const handleClick = () => {
        hiddenFileInput.current.click();
    };
    const handleSubmit = () => {

    }

    const handleChangeFile = event => {
        const createInfo = {
            "resource": params.id,
            "type": fileName,
        }
        dispatch(uploadActions.createUpload(event.target.files[0], createInfo))
    };

    const checkFileType = (uploadedFileType)=>{
        if(uploadedFileType === "application/pdf"){
           return <img src={Images.pdfIcon} alt="pdf"/>
        }else if (uploadedFileType === "image/jpeg"){
          return <img src={Images.jpegIcon} alt="jpeg"/>
        }else if (uploadedFileType === "image/png"){
            return <img src={Images.pngIcon} alt="png"/>
        }else if (uploadedFileType === "text/csv"){
            return <img src={Images.csvIcon} alt="csv"/>
        } else {
            alert('error')
        }
    }

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
                    uploadedFiles ?
                        uploadedFiles && uploadedFiles.map((item, index)=>{
                            console.log(item,'item');
                            return (
                                <div key={index} className={classes.fileRow}>
                                    <div className={classes.imageContainer}>
                                        {checkFileType(item.mimetype)}
                                        <p className={classes.fileSize}>{item.size}</p>
                                    </div>
                                    <div>
                                        <p>{item.type}</p>
                                        <ValidationInput
                                            onChange={()=>{console.log('aaaa')}}
                                            style={{changeChangeFile}}
                                            value={item.type}
                                            variant={"outlined"}
                                            name={"type"}
                                            type={"text"}
                                            placeholder={'File Type*'}
                                            errorFalse={true}
                                        />
                                    </div>
                                    <img src={Images.download} className={classes.downloadIcon} alt="download"/>
                                </div>
                            )
                        })
                        :
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