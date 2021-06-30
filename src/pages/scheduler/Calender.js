import moment from 'moment';
import React,{ useEffect, useState } from 'react'
import './Calender.css';
import { Card } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Calender = () => {
    const [calender, setCalender] = useState([]);
    const [value, setValue] = useState(moment());
    const startDay = value.clone().startOf("month").startOf("week");
    const endDay = value.clone().endOf("month").endOf("week");
    
    useEffect(() => {
        const day = startDay.clone().subtract(1, "day");
        const a = [];
        while(day.isBefore(endDay, "day")){
        a.push(
            Array(7).fill(0).map(() => (day.add(1, "day").clone()))
        )
    }
    setCalender(a)
    }, [value])

    return (
        <div className="calender">
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
