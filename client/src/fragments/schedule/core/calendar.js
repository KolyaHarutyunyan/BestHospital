import React, {useEffect, useState} from 'react'
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
import {useDispatch} from "react-redux";
import {appointmentActions} from "../../../store";
import {getAppointmentById} from "../../../store/appointment/appointment.action";

const DragAndDropCalendar = withDragAndDrop(Calendar)

export const Selectable = ({
                               handleChangeScreenView,
                               handleOpenClose,
                               openCloseRecur,
                               appointments,
                               adminsList,
                               clientList,
                               appointmentById,
                               handleOpen,


                               handleSendDate
                           }) => {
    const dispatch = useDispatch()
    const BootstrapInput = styled(InputBase)(({theme}) => ({

        marginRight: '24px',
        'label + &': {
            marginTop: theme.spacing(3),
        },
        '& .MuiInputBase-input': {
            borderRadius: 4,
            width: 200,
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

    // const [events, setEvents] = useState(defEvents ? defEvents : '')
    // const [displayDragItemInCell, setDisplayDragItemInCell] = useState(true)
    // const [draggedEvent, setDraggedEvent] = useState('')
    // const [screen, setScreen] = useState('calendar')
    // const [age, setAge] = React.useState(10);

    const [open, setOpen] = useState(false)
    const [info, setInfo] = useState('')
    const events = appointments.map((i) => ({
        id: i._id,
        title:
            i.type === 'DRIVE' ? 'Drive Time' :
                i.type === 'SERVICE' ? 'Service Appointment' :
                    i.type === 'BREAK' ? 'Break' :
                        i.type === 'PAID' ? 'Paid Time Off' : '',
        start: new Date(i.startDate),
        end: new Date(i.endTime),
    }));



    const handleOpenCloseModal = (date) => {
        setOpen(!open)
        setInfo(date)
        if (date) {
            dispatch(appointmentActions.getAppointmentById(date.id))
        }
    }

    const moveEvent = ({event, start, end, isAllDay: droppedOnAllDaySlot}) => {
        let allDay = event.allDay
        if (!event.allDay && droppedOnAllDaySlot) {
            allDay = true
        } else if (event.allDay && !droppedOnAllDaySlot) {
            allDay = false
        }
        const nextEvents = events.map(existingEvent => {
            return existingEvent.id === event.id
                ? {...existingEvent, start, end, allDay}
                : existingEvent
        })

        const filteredDate = appointments.filter((i) => (
            i._id === event.id
        ))

        const date = {
            ...filteredDate[0]
        }

        const editDate = {
            ...date,
        }
        editDate['startDate'] = start
        editDate['startTime'] = start
        editDate['endTime'] = end
        editDate['staff'] = date.staff[0]._id ? date.staff[0]._id : date.staff
        editDate['client'] = null
        date.miles ? editDate['miles'] = date.miles ? +date.miles : '' : ''

        dispatch(appointmentActions.editAppointment(editDate, filteredDate[0]._id))
    }

    const handleSelect = ({start, end}) => {
        const date = {
            startDate: new Date(start),
            startTime: new Date(start),
            endTime: new Date(end),
        }
        handleOpenClose('', date,)
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
                handleSendDate={handleSendDate}
                handleOpen={handleOpen}
                adminsList={adminsList}
                clientList={clientList}
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
                    // dayFormat: `dd`,
                }}
                onEventDrop={moveEvent}
                resizable
                defaultView={'week'}
                selectable
                localizer={localizer}
                events={events}
                defaultView={Views.WEEK}
                // scrollToTime={new Date(1970, 1, 1, 6)}
                defaultDate={new Date()}
                onSelectEvent={(i) => handleOpenCloseModal(i)}
                onSelectSlot={handleSelect}
            />
            {/*}*/}

            <SimpleModal
                handleOpenClose={handleOpenCloseModal}
                openDefault={open}
                content={
                    <InfoModal
                        openCloseRecur={openCloseRecur}
                        info={info}
                        handleOpenClose={handleOpenCloseModal}
                    />
                }
            />
        </>
    )
}

