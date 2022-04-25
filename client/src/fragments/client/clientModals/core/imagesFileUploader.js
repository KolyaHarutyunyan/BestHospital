import React from 'react';
import { fileUploadersStyle } from "./styles";
import { ValidationInput, Loader } from "@eachbase/components";
import { getLimitedVal, Images, isNotEmpty } from '@eachbase/utils';
import { checkFileType, CircularProgressWithLabel } from "./constants";

export const ImagesFileUploader = ({
    handleChange,
    handleChangeType,
    handleChangeFile,
    handleChangeFileName,
    deleteItem,
    fileName,
    error = false,
    getLoader = [],
    createLoader = [],
    uploadedFiles = [],
    selectedFile,
    another,
    anotherId,
    progress,
}) => {
    const classes = fileUploadersStyle();

    const uploadButnStyle = `
        ${classes.uploadButton} ${isNotEmpty(fileName) ? "enable" : "disabled"}
    `; 

    return (
        <>
            <div className={classes.fileTypeInput}>
                <ValidationInput
                    onChange={handleChange}
                    value={fileName}
                    variant={"outlined"}
                    name={"fileType"}
                    type={"text"}
                    placeholder={"File Type*"}
                    errorFalse={error}
                />
            <div>
            <input
                disabled={!isNotEmpty(fileName)}
                onChange={handleChangeFile}
                type="file"
                id="BtnBrowseHidden"
                name="files"
                style={{ display: "none" }}
            />
            <label htmlFor="BtnBrowseHidden" id="LblBrowse">
                <div className={uploadButnStyle}>
                    <span>Upload a file</span>
                </div>
            </label>
                </div>
            </div>
            <p className={classes.authorizationFileSubTitle}>uploaded files</p>
            <div className={!uploadedFiles ? classes.centered : classes.normal}>
                {getLoader.length ? (
                    <Loader height={"29.8vh"} />
                ) : (
                    <div
                        className={
                            !uploadedFiles.length ? classes.centered : classes.normal
                        }
                    >
                        {createLoader.length ? (
                            <div className={classes.fileRow}>
                                <div className={classes.imageContainer}>
                                    <div>
                                        <CircularProgressWithLabel value={progress} />
                                    </div>
                                </div>
                                <div className={classes.fileInput}>
                                    <p className={classes.fileName}>
                                        {selectedFile?.name}
                                    </p>
                                    <ValidationInput
                                        onChange={handleChange}
                                        className={classes.fileNameInput}
                                        value={fileName}
                                        variant={"outlined"}
                                        name={"type"}
                                        type={"text"}
                                        placeholder={"File Type*"}
                                        errorFalse={error}
                                    />
                                </div>
                                <img
                                    src={Images.download}
                                    className={classes.downloadIcon}
                                    alt="download"
                                />
                            </div>
                        ) : null}
                        {uploadedFiles.length ? uploadedFiles.map((item, index) => {
                            return (
                                <div key={index} className={classes.fileRow}>
                                    <div className={classes.imageContainer}>
                                        <div>
                                            {checkFileType(item.mimetype)}
                                            <p className={classes.fileSize}>
                                                {item.size}
                                            </p>
                                            <img
                                                onClick={() => deleteItem(item.id)}
                                                src={Images.removeIcon}
                                                alt="removeIcon"
                                                className={classes.removeIcon}
                                            />
                                        </div>
                                    </div>
                                    <div className={classes.fileInput}>
                                        <p className={classes.fileName}>
                                            {getLimitedVal(item.name, 30)}
                                        </p>
                                        <ValidationInput
                                            handleBlur={handleChangeType}
                                            onChange={(e) => {
                                                handleChangeFileName(e, item.id, item);
                                            }}
                                            className={classes.fileNameInput}
                                            value={
                                            another
                                                ? anotherId === item.id
                                                    ? another
                                                    : item.type
                                                : item.type
                                            }
                                            variant={"outlined"}
                                            name={"type"}
                                            type={"text"}
                                            placeholder={"File Type*"}
                                            errorFalse={error}
                                        />
                                    </div>
                                    <a href={item.url} target={"_blank"} download>
                                        <img
                                            src={Images.download}
                                            className={classes.downloadIcon}
                                            alt="download"
                                        />
                                    </a>
                                </div>
                            );
                        }) : (
                            <div className={classes.iconText}>
                                <img src={Images.fileIcon} alt="" />
                                <p>No Files yet</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};
