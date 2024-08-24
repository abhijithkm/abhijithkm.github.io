import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Box, Typography } from '@mui/material';
import * as React from 'react';




interface TimelineData {
    date: string;
    title: string;
    description: string;
}

interface TimelineComponentProps {
    items: TimelineData[];
    title: string;
}

const TimelineComponent: React.FC<TimelineComponentProps> = ({ items, title }) => {
    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                {title}
            </Typography>
            <Timeline>
                {items.map((item, index) => (
                    <TimelineItem key={index}>
                        <TimelineOppositeContent color="textSecondary">
                            {item.date}
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot />
                            {index < items.length - 1 && <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent>
                            <Typography variant="h6">{item.title}</Typography>
                            <Typography variant="body1">{item.description}</Typography>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </Box>
    );
};

export default TimelineComponent;
