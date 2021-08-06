import { Card } from '@eachbase/components';
import { serviceSingleStyles } from './styles';
import { Colors, Images } from "@eachbase/utils";

export const StaffGeneral = ({staffGeneral}) =>{

    const classes = serviceSingleStyles()

    const generalInfo = [
        {title: 'First Name:', value: staffGeneral?.firstName},
        {title: 'Middle Name:', value: staffGeneral?.middleName},
        {title: 'Last Name:', value: staffGeneral?.lastName},
        {title: 'Primary Email:', value: staffGeneral?.email},
        {title: 'Secondary Email:', value: staffGeneral?.secondaryEmail},
        {title: 'Primary Phone Number:', value: staffGeneral?.phone},
        {title: 'Secondary Phone Number:', value: staffGeneral?.secondaryPhone},
    ]
    const addressInfo = [
        {title: 'Street Address:', value: 'Street Address'},
        {title: 'Country:', value: 'Country'},
        {title: 'City:', value: 'City'},
        {title: 'State:', value: staffGeneral.state},
        {title: 'Zip Code:', value: 'Zip Code'},
    ]
    const otherDetails = [
        {title: 'Driver License:', value: 'driving license'},
        {title: 'Issuing State:', value: 'issuing state'},
        {title: 'Expiration Date:', value: 'expiration date'},
        {title: 'Department:', value: 'department'},
        {title: 'Supervisor:', value: 'supervisor'},
        {title: 'Residency Status:', value: staffGeneral?.residency},
        {title: 'SSn Number:', value: staffGeneral?.ssn},
        {title: 'Gender:', value: staffGeneral?.gender},
        {title: 'Date of Birth:', value: staffGeneral?.birthday},
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