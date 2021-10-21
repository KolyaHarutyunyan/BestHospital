import React, {useState} from 'react';
import {createClientStyle} from '../index';
import {Images} from "@eachbase/utils";
import {AddButton, AddModalButton, ValidationInput} from "@eachbase/components";

const credentialBtn = {
    maxWidth: 192,
    width: '100%'
}

export const AuthorizationFile = () => {

    const classes = createClientStyle()

    const aaa = true

    const [fileName, setFileName] = useState('')

    const handleChange = (e) => {
        setFileName(e.target.value)
    }

    const handleSubmit = () => {
        alert('done')
    }

    return (
        <div className={classes.authorizationFileWrapper}>
            <div className={classes.authorizationFileHeader}>
                <h1>Uploaded files</h1>
                <h2>Please fulfill the file type to upload a file.</h2>
                <p>
                    <span className={classes.starIcon}>*</span>
                    Only
                    <span>PDF , PNG , CSV </span> &
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
                />
                <input hidden type="file"/>
                <AddButton
                    styles={credentialBtn}
                    disabled={true}
                    text='Upload a file'
                />
            </div>
            <p className={classes.authorizationFileSubTitle}>uploaded files</p>
            <div className={aaa ? classes.centered : classes.normal}>
                {
                    aaa ? <p>coming soon</p> :
                        <div>
                            <img src={Images.fileIcon} alt=""/>
                            <p>No File yet</p>
                        </div>
                }
            </div>
            <AddModalButton handleClick={handleSubmit} text='Done'/>
        </div>
    )
}