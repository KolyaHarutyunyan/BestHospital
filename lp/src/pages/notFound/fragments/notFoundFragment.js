import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "components";
import { notFoundTitle } from "./constants";
import { Images } from "assets";

export const NotFoundFragment = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-fragment">
        <Card cardBackgroundColor={"#FFFFFF"}>
            <div className="not-found-container">
                <div className="not-found-content">
                    <h2 className="content-title">{notFoundTitle}</h2>
                    <Button
                        buttonType={"button"}
                        buttonClassName={"back-to-homepage-button"}
                        onClickButton={() => navigate("/")}
                    >
                        Back to homepage
                    </Button>
                    <div className="not-found-picture-box">
                        <img src={Images.Warning} alt="warning" />
                    </div>
                </div>
            </div>
        </Card>
    </div>
  );
};
