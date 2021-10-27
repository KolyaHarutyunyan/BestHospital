import React, {useState} from 'react'
import {Calendar, momentLocalizer, Views} from 'react-big-calendar'
import defEvents from './defEvents'
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {NavigateBefore, NavigateNext} from "@material-ui/icons";
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import {scheduleStyle} from "./styles";
import {AddButton, ButtonsTab, SelectInput, ValidationInput} from "@eachbase/components";
import {InputBase, InputLabel, NativeSelect, styled} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";

export const Filters = ({goToBack, goToNext, label, handleChangeScreenView, viewType, handleOpenClose}) =>{
    const BootstrapInput = styled(InputBase)(({ theme }) => ({

        marginRight:'24px',
        'label + &': {
            marginTop: theme.spacing(3),
        },
        '& .MuiInputBase-input': {
            borderRadius: 4,
            width:200,
            position: 'relative',
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #ced4da',
            fontSize: 16,
            padding: '10px 26px 10px 12px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            '&:focus': {
                borderRadius: 4,
                borderColor: '#80bdff',
                boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
            },
        },
    }));

    const [events, setEvents] = useState(defEvents ? defEvents : '')
    const [displayDragItemInCell, setDisplayDragItemInCell] = useState(true)
    const [draggedEvent, setDraggedEvent] = useState('')
    const [screen, setScreen] = useState('calendar')
    const classes = scheduleStyle()
    const [age, setAge] = React.useState(10);
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const handleChangeScreen = (type) =>{
        setScreen(type)
        handleChangeScreenView && handleChangeScreenView(type)
    }


    return(
        <div  className={classes.selectButtonsLabel}>
            <div className={classes.calendarNextPrewButtons}>
                <div className={classes.buttonsWrapper}>
                    <ButtonsTab
                        viewType={viewType}
                        getActive={() => handleChangeScreen('list')}
                        getInactive={() => handleChangeScreen('calendar')}
                        first={'List View'}
                        second={'Calendar View'}
                    />
                    <div className={classes.dateStyle}>
                        <span> {label}</span>
                    </div>

                    <div className={classes.navigationButtons} >
                        <NavigateBefore style={{ color: '#387DFF', cursor: 'pointer' }} onClick={() => goToBack()} />
                        <NavigateNext style={{ color: '#387DFF', cursor: 'pointer' }} onClick={() => goToNext()} />
                    </div>
                </div>
                <div className={classes.searchWrapper}>
                    <ValidationInput
                        variant={"outlined"}
                        // onChange={handleChange}
                        // value={inputs.startDate}
                        type={"date"}
                        label={""}
                        name='startDate'
                        // typeError={error === 'startDate' && ErrorText.field}
                    />
                    <AddButton styles={{width: 93}} text='Search' Icon={false}
                        // handleClick={handleSubmit}
                    />

                </div>
            </div>
            <div className={classes.filtersWrapper}>
                <div className={classes.filtersWrapperRow}>
                <div>
                    <FormControl sx={{ m: 1 }} variant="standard">
                        <InputLabel className={classes.label} htmlFor="demo-customized-select-native">Staff Member</InputLabel>
                        <NativeSelect
                            id="demo-customized-select-native"
                            value={age}
                            onChange={handleChange}
                            input={<BootstrapInput />}
                        >
                            <option aria-label="None" value="" />
                            <option value={10}>All</option>
                            <option value={20}>Twenty</option>
                            <option value={30}>Thirty</option>
                        </NativeSelect>
                    </FormControl>
                </div>
                <div>
                    <FormControl sx={{ m: 1 }} variant="standard">
                        <InputLabel className={classes.label} htmlFor="demo-customized-select-native">Client</InputLabel>
                        <NativeSelect
                            id="demo-customized-select-native"
                            value={age}
                            onChange={handleChange}
                            input={<BootstrapInput />}
                        >
                            <option aria-label="None" value="" />
                            <option value={10}>Ten</option>
                            <option value={20}>Twenty</option>
                            <option value={30}>Thirty</option>
                        </NativeSelect>
                    </FormControl>
                </div>
                <div>
                    <FormControl sx={{ m: 1 }} variant="standard">
                        <InputLabel className={classes.label} htmlFor="demo-customized-select-native">Event Type</InputLabel>
                        <NativeSelect
                            id="demo-customized-select-native"
                            value={age}
                            onChange={handleChange}
                            input={<BootstrapInput />}
                        >
                            <option aria-label="None" value="" />
                            <option value={10}>Ten</option>
                            <option value={20}>Twenty</option>
                            <option value={30}>Thirty</option>
                        </NativeSelect>
                    </FormControl>
                </div>
                <div>
                    <FormControl sx={{ m: 1 }} variant="standard">
                        <InputLabel className={classes.label} htmlFor="demo-customized-select-native">Event Status</InputLabel>
                        <NativeSelect
                            id="demo-customized-select-native"
                            value={age}
                            onChange={handleChange}
                            input={<BootstrapInput />}
                        >
                            <option aria-label="None" value="" />
                            <option value={10}>Ten</option>
                            <option value={20}>Twenty</option>
                            <option value={30}>Thirty</option>
                        </NativeSelect>
                    </FormControl>
                </div>


            </div>
                <div onClick={handleOpenClose} className={classes.addEvent}>
                    <div>+</div>
                    <p>Add Event</p>
                </div>
            </div>
        </div>
    )
}