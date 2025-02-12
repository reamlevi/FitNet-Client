import './sidebar.css';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/authContext/AuthContext';
import GroupForm from '../popUpForms/groupForm/groupForm';
import GroupList from './groupList/groupList';
import {GroupAdd,Group,Event,EventNote} from '@mui/icons-material';
import {Divider,Chip} from '@mui/material';
import axios from '../../Api';
import EventForm from '../popUpForms/eventForm/EventForm';
import EventList from './eventList/EventList';




export default function Sidebar({updateRightBar}) {

    const [showFormGroup, setShowFormGroup] = useState(false);
    const [showFormEvent, setShowFormEvent] = useState(false);
    const { user } = useContext(AuthContext);
    const [groups, setGroups] = useState([]);
    const [events, setEvents] = useState([]); 


    function togglePopGroup () {
        setShowFormGroup(!showFormGroup);
    };

    function togglePopEvent () {
        setShowFormEvent(!showFormEvent);
    };

    useEffect(() => {
        const fetchGroups = async () => {
            try{
                const res = await axios.get('/groups/all/' + user._id);
                console.log(res.data);  // Debugging purposes, remove this line in production!
                setGroups(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchGroups();
    }, [user,showFormGroup]);

    useEffect(() => {
        const fetchEvents = async () => {
            try{
                const res = await axios.get('/events/all/' + user._id);
                console.log(res.data);  // Debugging purposes, remove this line in production!
                setEvents(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchEvents();
    }, [user,showFormEvent]);

    return (
        <>
            {showFormGroup ? <GroupForm toggle={togglePopGroup} rightBar={updateRightBar} /> : null}
            {showFormEvent ? <EventForm toggle={togglePopEvent} rightBar={updateRightBar}/> : null}
            <div className="sidebar">
                <div className="sidebarWrapper">
                    <button className="sidebarButtonGroup" onClick={togglePopGroup}>
                        <GroupAdd className="sidebarIcon" />
                        <span className="sidebarText">Create Group</span>
                    </button>
                    <button className="sidebarButtonEvent" onClick={togglePopEvent}>
                        <EventNote className="sidebarIcon" />
                        <span className="sidebarText">Create Event</span>
                    </button>
                    <Divider className="sidebarHr" style = {{marginTop: 30,marginBottom:40}}>
                        <Chip icon=<Group/> label="Groups" size="small" />
                    </Divider>
                    <GroupList group={groups.admin} title = 'My Groups'/>
                    <GroupList group={groups.follow} title = 'Joined Groups'/>
                    <GroupList group={groups.recommend} title = 'Recommended Groups'/>

                    <Divider className="sidebarHr" style = {{marginTop: 30,marginBottom:40}}>
                        <Chip icon=<Event/> label="Events" size="small" />
                    </Divider>
                    <EventList event={events.own} title = 'My Events'/>
                    <EventList event={events.follow} title = 'Joined Events'/>
                    <EventList event={events.recommend} title = 'Recommended Events'/>
                </div>
            </div>
        </>
    );
}
