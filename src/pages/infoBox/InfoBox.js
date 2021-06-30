import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import "./InfoBox.css";
import { InfoBoxData } from './InfoBoxData';

const InfoBox = () => {
    return (
        <>
        {InfoBoxData.map((data) => (
        <Card className="infoBox">
            <CardContent className="infoBox__content">
                        <div className="infoBox__left">
                            <h3>{data.title}</h3>
                            <h5>{data.reason}</h5>
                            <Typography>{data.value}</Typography>
                        </div>
                        <div className="infoBox__Right">
                        <h3 className="infoBox__rightIcons">{data.icons}</h3>
                        </div>
            </CardContent>
        </Card>
        ))}
        </>
    )
}

export default InfoBox;