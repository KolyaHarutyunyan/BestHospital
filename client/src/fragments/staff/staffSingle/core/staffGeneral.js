import { Card } from '@eachbase/components';
import { Colors, Images } from "@eachbase/utils";
import { serviceSingleStyles } from './styles';

export const StaffGeneral = ({staffGeneral}) =>{

    const classes = serviceSingleStyles()
    console.log(staffGeneral,'staff genereal');
    const generalInfo = [
        {title: 'First Name', value: staffGeneral?.firstName},
        {title: 'Middle Name', value: staffGeneral?.middleName},
        {title: 'Last Name', value: staffGeneral?.lastName},
        {title: 'Primary Email', value: staffGeneral?.email},
        {title: 'Secondary Email', value: staffGeneral?.secondaryEmail},
        {title: 'Primary Phone Number', value: staffGeneral?.phone},
        {title: 'Secondary Phone Number', value: staffGeneral?.secondaryPhone},
    ]
    const addressInfo = [
        {title: 'Street Address', value: 'Street Address'},
        {title: 'Country', value: 'Country'},
        {title: 'City', value: 'City'},
        {title: 'State', value: staffGeneral?.state},
        {title: 'Zip Code', value: 'Zip Code'},
    ]
    const otherDetails = [
        {title: 'Driver License', value: staffGeneral?.license?.driverLicense},
        {title: 'Issuing State', value: staffGeneral?.license?.state},
        {title: 'Expiration Date', value: staffGeneral?.license?.expireDate},
        {title: 'Residency Status', value: staffGeneral?.residency},
        {title: 'SSn Number', value: staffGeneral?.ssn},
        {title: 'Gender', value: staffGeneral?.gender},
        {title: 'Date of Birth', value: staffGeneral?.birthday},
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
            <Card
                width='32.5%'
                cardInfo={addressInfo}
                showHeader={true}
                title='Address'
                color={Colors.BackgroundMango}
                icon={Images.address}
            />
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