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

const jobTitles = [
    {
        name: 'HH',
    },
    {
        name: 'HB',
    },
    {
        name: 'HC',
    },
    {
        name: 'CH',
    },
    {
        name: 'BH',
    },
]

export const JobTitles = ({removeItem, openModal}) => {

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
                    placeholder={'Job Titles*'}
                />
                <AddButton disabled={!isDisabled} styles={credentialBtn} handleClick={() => alert('Add Job Title')} text='Add Job Title'/>
            </div>
            <p className={classes.title}>Job Titles</p>
            <div className={classes.credentialTable}>
                {
                    jobTitles.map((jobItem, index) => {
                        return (
                            <div className={classes.item} key={index}>
                                <p>{jobItem.name}</p>
                                <div className={classes.icons}>
                                    <img src={Images.edit}
                                         onClick={(e) => editDepartment('editJobTitles')} alt="edit"/>
                                    <img src={Images.remove} alt="delete" onClick={() => removeItem({id: 15,name:jobItem.name})}/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}