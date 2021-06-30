import moment from 'moment';
import React,{ useEffect, useState } from 'react'
import './Calender.css';
import { Card } from '@material-ui/core';
import { Link } from 'react-router-dom';
import db from '../../firebase';

const Calender = () => {
    // const [attendance, setAttendance] = useState([]);
    const [calender, setCalender] = useState([]);
    const [value, setValue] = useState(moment());
    const startDay = value.clone().startOf("month").startOf("week");
    const endDay = value.clone().endOf("month").endOf("week");
    
    useEffect(() => {
        const day = startDay.clone().subtract(1, "day");
        const a = [];   // using temp variable to not re-render many times
        while(day.isBefore(endDay, "day")){
        a.push(
            Array(7).fill(0).map(() => (day.add(1, "day").clone()))
        )
    }
    setCalender(a)
    }, [value]);

    // // To get the data of attendance of every employee

    // useEffect(() => {
    //     db.collection("Attendance").onSnapshot((snapshot) => (
    //         setAttendance(snapshot.docs.map((doc) => ({
    //             id: doc.id,
    //             data: doc.data(),
    //         })))
    //     ))
    // }, [])

    return (
        <div className="calender">
        <h2>Calender</h2>
            {calender.map(week => (
                <div className="calender__week">
                    {week.map(day => (
                        <div className="calender__dayWrapper" onClick={() => setValue(day)}>
                        <Link to="/attendance/repeat">
                        <Card className={value.isSame(day, "day") ? "calender__selected" : "calender__day"}>
                        {day.format("D").toString()}
                        </Card>
                        </Link>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Calender;
