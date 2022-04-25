import React from "react";
import { Box, CircularProgress, Typography } from "@material-ui/core";
import { Images } from "@eachbase/utils";
import { fileUploadersStyle } from "./styles";

export const checkFileType = (uploadedFileType) => {
    switch(uploadedFileType) {
        case "application/pdf":
            return <img src={Images.pdfIcon} alt="pdf" />;
        case "image/jpeg":
            return <img src={Images.jpegIcon} alt="jpeg" />;
        case "image/png":
            return <img src={Images.pngIcon} alt="png" />;
        case "text/csv":
            return <img src={Images.csvIcon} alt="csv" />;

        default: return null;
    }
};

export const CircularProgressWithLabel = (props) => {
    const classes = fileUploadersStyle();
    
    return (
        <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                }}
            >
                <Typography
                className={classes.percentage}
                variant="caption"
                component="div"
                color="secondary"
                >
                {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
};