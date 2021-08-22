import {AddButton, ValidationInput} from "@eachbase/components";
import {Images} from "@eachbase/utils";
import {systemItemStyles} from "./styles";


const credentialBtn = {
    maxWidth: '174px',
    width: '100%',
    flex: '0 0 174px',
    padding: 0
}

const credentials = [
    {
        name: 'HB',
        type: 'license'
    },
    {
        name: 'HB',
        type: 'license'
    },
    {
        name: 'HB',
        type: 'license'
    },
    {
        name: 'HB',
        type: 'license'
    },
    {
        name: 'HB',
        type: 'license'
    },
]

export const Departments = ({removeItem, openModal}) => {

    const classes = systemItemStyles()

    const handleChange = (e) => {
        console.log(e.target.value);
    }

    const editDepartment = (modalType) => {
        openModal(modalType)
    }

    return (
        <>
            <div className={`${classes.flexContainer} ${classes.headerSize}`}>
                <ValidationInput
                    style={classes.credentialInputStyle}
                    onChange={handleChange}
                    variant={"outlined"}
                    name={"Name"}
                    type={"text"}
                    placeholder={'Name*'}
                />
                <AddButton styles={credentialBtn} handleClick={() => alert('Add Department')} text='Add Department'/>
            </div>
            <p className={classes.title}>Departments</p>
            <div className={classes.credentialTable}>
                {
                    credentials.map((credentialItem, index) => {
                        return (
                            <div className={classes.item}>
                                <p>
                                    <span>{credentialItem.name}</span>
                                    {credentialItem.type}</p>
                                <div className={classes.icons}>
                                    <img src={Images.edit}
                                         onClick={(e) => editDepartment('editDepartment')} alt="edit"/>
                                    <img src={Images.remove} alt="delete" onClick={() => removeItem('department')}/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}