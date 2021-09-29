import { useState} from "react";
import moment from "moment";
import { Card } from '@eachbase/components';
import { serviceSingleStyles } from './styles';
import { Colors, Images } from "@eachbase/utils";

export const ClientGeneral = ({data}) =>{
    let today = new Date();

    const [otherDetails, setOtherDetails] = useState([
        {title: 'Gender', value: data?.gender},
        {title: 'Date of Birth', value: data?.birthday && moment(data?.birthday).format('DD MM YYYY') },
        {title: 'Age', value  : data?.birthday ? today.getFullYear() - new Date(data.birthday).getFullYear() : ''} ,
        {title: 'Ethnicity', value: data?.ethnicity},
        {title: 'Language', value: data?.language},
        {title: 'Family Language:', value: data?.familyLanguage},
    ])

    const classes = serviceSingleStyles()

    const generalInfo = [
        {title: 'First Name', value: data?.firstName},
        {title: 'Middle Name', value: data?.middleName},
        {title: 'Last Name', value: data?.lastName},
        {title: 'Code', value: data?.code},
    ]

    return (
        <div className={classes.staffGeneralWrapper}>
            <Card
                width='32.5%'
                cardInfo={generalInfo}
                showHeader={true}
                title='General Info'
                color={Colors.BackgroundBlue}
                icon={Images.generalInfoIcon}
            />
            <div className={classes.clearBoth} />
            <Card
                width='32.5%'
                cardInfo={otherDetails}
                showHeader={true}
                title='Other Details'
                color={Colors.ThemeRed}
                icon={Images.otherDetailsIcon}
            />
        </div>
    )
}