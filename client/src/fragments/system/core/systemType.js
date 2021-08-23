import {TableCell} from "@material-ui/core";
import {Notes, TableBodyComponent, AddButton, ValidationInput} from "@eachbase/components";
import {Images} from "@eachbase/utils";
import { systemItemStyles} from './styles'

const headerTitles = [
    {
        title: 'Name',
        sortable: true
    },
    {
        title: 'Display Code',
        sortable: false
    },
    {
        title: 'Category',
        sortable: false
    },
    {
        title: 'Action',
        sortable: false
    },
];

export const SystemType = ({removeItem, openModal}) => {

    const classes = systemItemStyles()

    const notesItem = (item, index) => {
        return (
            <TableBodyComponent key={index}>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.subject}</TableCell>
                <TableCell>
                    {item.action}
                </TableCell>
            </TableBodyComponent>
        )
    }

    const editService = (modalType) =>{
        openModal(modalType)
    }

    const data = [
        {
            date: 'Function Behavioral Analysis',
            name: 'FBA',
            subject: 'ABA',
            action:
                <div className={classes.icons}>
                    <img src={Images.edit} onClick={()=> editService('editService')} alt="edit"/>
                    <img src={Images.remove} alt="delete" onClick={() => removeItem('service')}/>
                </div>,
        }
    ]

    const handleChange = (e) => {
        console.log(e.target.value);
    }

    return (
        <>
            <div className={classes.flexContainer}>
                <ValidationInput
                    style={classes.systemInputStyles}
                    onChange={handleChange}
                    variant={"outlined"}
                    name={"roleName"}
                    type={"text"}
                    placeholder={'Service Name*'}
                />
                <ValidationInput
                    style={classes.systemInputStyles}
                    onChange={handleChange}
                    variant={"outlined"}
                    name={"roleName"}
                    type={"text"}
                    placeholder={'Display Code*'}
                />
                <ValidationInput
                    style={classes.systemInputStyles}
                    onChange={handleChange}
                    variant={"outlined"}
                    name={"roleName"}
                    type={"text"}
                    placeholder={'Category'}
                />
                <AddButton handleClick={()=> alert('Add Service Type')} text='Add Service Type'/>
            </div>
            <p className={classes.title}>Service Type</p>
            <Notes defaultStyle={true} data={data} pagination={true} items={notesItem} headerTitles={headerTitles}/>
        </>

    )
}