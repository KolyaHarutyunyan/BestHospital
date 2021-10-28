import React, {useState} from 'react'
import {Calendar, momentLocalizer, Views} from 'react-big-calendar'
import defEvents from './defEvents'
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {NavigateBefore, NavigateNext} from "@material-ui/icons";
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import {scheduleStyle} from "./styles";
import {AddButton, ButtonsTab, SelectInput, SimpleModal, ValidationInput} from "@eachbase/components";
import {InputBase, InputLabel, NativeSelect, styled} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import {Filters} from "./filters";
import {InfoModal} from "./modals";

const DragAndDropCalendar = withDragAndDrop(Calendar)

export const Selectable =({handleChangeScreenView, handleOpenClose, openCloseRecur}) => {
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
    const [age, setAge] = React.useState(10);
    const [open, setOpen] = useState(false)
    const [info, setInfo] = useState('')

    const handleOpenCloseModal =(date) =>{
        setOpen(!open)
        setInfo(date)
    }
    // const handleChange = (event) => {
    //     setAge(event.target.value);
    // };
    //
    // const  handleDragStart = event => {
    //     setDraggedEvent(event)
    //
    //     // this.setState({ draggedEvent: event })
    // }
    //
    // const  dragFromOutsideItem = () => {
    //     return draggedEvent
    // }
    //
    // const onDropFromOutside = ({ start, end, allDay }) => {
    //
    //     const event = {
    //         id: draggedEvent.id,
    //         title: draggedEvent.title,
    //         start,
    //         end,
    //         allDay: allDay,
    //     }
    //     setDraggedEvent(null)
    //     // this.setState({ draggedEvent: null })
    //     // this.moveEvent({ event, start, end })
    // }

    const moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
        let allDay = event.allDay
        if (!event.allDay && droppedOnAllDaySlot) {
            allDay = true
        } else if (event.allDay && !droppedOnAllDaySlot) {
            allDay = false
        }
        const nextEvents = events.map(existingEvent => {
            return existingEvent.id == event.id
                ? { ...existingEvent, start, end, allDay }
                : existingEvent
        })
        setEvents(nextEvents)

        // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
    }

    // const resizeEvent = ({ event, start, end }) => {
    //     const nextEvents = events.map(existingEvent => {
    //         return existingEvent.id == event.id
    //             ? { ...existingEvent, start, end }
    //             : existingEvent
    //     })
    //    setEvents(nextEvents)
    // }
    //
    // const  newEvent = (_event) => {
    //     // let idList = this.state.events.map(a => a.id)
    //     // let newId = Math.max(...idList) + 1
    //     // let hour = {
    //     //   id: newId,
    //     //   title: 'New Event',
    //     //   allDay: event.slots.length == 1,
    //     //   start: event.start,
    //     //   end: event.end,
    //     // }
    //     // this.setState({
    //     //   events: this.state.events.concat([hour]),
    //     // })
    // }


    const  handleSelect = ({ start, end }) => {
        const date = {
            startDate:moment(start).format('YYYY-MM-DD'),
            startTime:moment(start).format('hh:mm'),
            endTime:moment(end).format('hh:mm'),
        }
        handleOpenClose(date)
        // const title = window.prompt('New Event name')
        // if (title)
        //     setEvents(
        //          [
        //     ...events,
        //     {
        //         start,
        //         end,
        //         title,
        //     },
        // ])
    }

        const localizer = momentLocalizer(moment);

        const classes = scheduleStyle()

        const CustomToolbar = (toolbar) => {
            const goToBack = () => {
                if (toolbar.view === 'day') {
                    toolbar.date.setDate(toolbar.date.getDate() - 1);
                    toolbar.onNavigate('next');
                } else if (toolbar.view === 'week') {
                    toolbar.date.setDate(toolbar.date.getDate() - 7);
                    toolbar.onNavigate('next');
                } else {
                    toolbar.date.setMonth(toolbar.date.getMonth() - 1);
                    toolbar.onNavigate('next');
                }
            };

            const goToNext = () => {
                if (toolbar.view === 'day') {
                    toolbar.date.setDate(toolbar.date.getDate() + 1);
                    toolbar.onNavigate('next');
                } else if (toolbar.view === 'week') {
                    toolbar.date.setDate(toolbar.date.getDate() + 7);
                    toolbar.onNavigate('next');
                } else {
                    toolbar.date.setMonth(toolbar.date.getMonth() + 1);
                    toolbar.onNavigate('next');
                }
            };


            return (
                <Filters
                    handleOpenClose={handleOpenClose}
                    handleChangeScreenView={handleChangeScreenView}
                    goToBack={goToBack}
                    goToNext={goToNext}
                    viewType={'calendar'}
                    label={toolbar.label}
                />
            );
        };




        return (
            <>
                <DragAndDropCalendar
                    components={{
                        toolbar: CustomToolbar,
                    }}

                    // onShowMore={(events, date) => console.log(date)}
                    // timeslots={4}

                    formats={{
                        // timeGutterFormat: 'HH:mm',
                        // dateFormat: `dd ${'asdasdas'}`,
                        dayFormat: `dd`,
                    }}
                    onEventDrop={moveEvent}
                    resizable
                    view={'week'}
                    selectable
                    localizer={localizer}
                    events={events}
                    defaultView={Views.WEEK}
                    // scrollToTime={new Date(1970, 1, 1, 6)}
                    defaultDate={new Date()}
                    onSelectEvent={handleOpenCloseModal}
                    onSelectSlot={handleSelect}
                />
            {/*}*/}

                <SimpleModal
                    handleOpenClose = {handleOpenCloseModal}
                    openDefault={open}
                    content={
                        <InfoModal openCloseRecur={openCloseRecur} type={info}  handleOpenClose = {handleOpenCloseModal}/>
                    }
                />
            </>
        )
}

