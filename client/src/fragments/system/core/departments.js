import {AddButton, ValidationInput} from "@eachbase/components";
import {Images} from "@eachbase/utils";
import {systemItemStyles} from "./styles";
import {useState} from "react";


const credentialBtn = {
    maxWidth: '174px',
    width: '100%',
    flex: '0 0 174px',
    padding: 0
}

const departments = [
    {
        name: 'HB',
        type: 'license'
    },
    {
        name: 'HBC',
        type: 'license'
    },
    {
        name: 'HHH',
        type: 'license'
    },
    {
        name: 'BBBB',
        type: 'license'
    },
    {
        name: 'BCD',
        type: 'license'
    },
]

export const Departments = ({removeItem, openModal}) => {

    const classes = systemItemStyles()

    const [inputs, setInputs] = useState({})
    const [error, setError] = useState('')

    const handleChange = e =>{
        setInputs(
            prevState => (
                {
                    ...prevState,
                    [e.target.name]: e.target.value
                }
            ));
        error === e.target.name && setError('')
    }

    const editDepartment = (modalType) => {
        openModal(modalType)
    }

    const isDisabled = inputs.name

    return (
        <>
            <div className={`${classes.flexContainer} ${classes.headerSize}`}>
                <ValidationInput
                    style={classes.credentialInputStyle}
                    onChange={handleChange}
                    value={inputs.name}
                    variant={"outlined"}
                    name={"name"}
                    type={"text"}
                    placeholder={'Name*'}
                />
                <AddButton
                    disabled={!isDisabled}
                    styles={credentialBtn}
                    handleClick={() => alert('Add Department')} text='Add Department'/>
            </div>
            <p className={classes.title}>Departments</p>
            <div className={classes.credentialTable}>
                {
                    departments.map((departmentItem, index) => {
                        return (
                            <div className={classes.item} key={index}>
                                <p>
                                    <span>{departmentItem.name}</span>
                                    {departmentItem.type}</p>
                                <div className={classes.icons}>
                                    <img src={Images.edit}
                                         onClick={() => editDepartment('editDepartment')} alt="edit"/>
                                    <img src={Images.remove} alt="delete" onClick={() => removeItem({id: 10, name: departmentItem.name})}/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}