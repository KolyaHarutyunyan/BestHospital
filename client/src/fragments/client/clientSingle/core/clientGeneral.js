import { Card } from '@eachbase/components';
import { serviceSingleStyles } from './styles';
import { Colors, Images } from "@eachbase/utils";

export const ClientGeneral = ({data}) =>{
    const classes = serviceSingleStyles()

    const generalInfo = [
        {title: 'First Name', value: data?.firstName},
        {title: 'Middle Name', value: data?.middleName},
        {title: 'Last Name', value: data?.lastName},
        {title: 'Code', value: data?.code},
    ]

    const otherDetails = [

        {title: 'Gender:', value: data?.gender},
        {title: 'Date of Birth', value: data?.birthday},
        {title: 'Age', value: data?.age},
        {title: 'Ethnicity', value: data?.ethnicity},
        {title: 'Language:', value: data?.language},
        {title: 'Family Language:', value: data?.familyLanguage},
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
            <div style={{width:24}} />
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