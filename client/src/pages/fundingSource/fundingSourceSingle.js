import React, {useEffect, useState} from "react";
import {SimpleTabs, Card, Notes, TableWrapperGeneralInfo, InactiveModal} from "@eachbase/components";
import {adminActions, fundingSourceActions} from "@eachbase/store";
import {useDispatch, useSelector} from "react-redux";
import otherDetails from '@eachbase/assets/images/icons/otherDetails.svg';
import {useLocation, useParams} from "react-router-dom";
import {CardItem} from "../../components/card/cardItem";
import {FundingSourceItem} from "../../fragments/fundingSource";

export const FundingSourceSingle = ({general}) => {

    return (
        <>
            <FundingSourceItem/>
        </>
    );
}