import React, { useState } from 'react';
import { Typography, Table, TableHead, TableBody, TableRow, TableCell, TextField } from '@mui/material';

export default function SeatingArrangementTable({ formData, setFormData }) {


    const [selectedClassrooms, setselectedClassrooms] = useState(formData.selectedClassrooms);


    // Handle classroom number change
    const handleClassroomChange = (classroomIndex, newValue) => {
        const updatedselectedClassrooms = [...selectedClassrooms];
        updatedselectedClassrooms[classroomIndex].name = newValue;
        setselectedClassrooms(updatedselectedClassrooms);
    };
    // Handle exam date change
    const handleExamDateChange = (event, index) => {

        const { value } = event.target;

        setFormData({
            ...formData,
            examDates: {
                ...formData.examDates,
                [index]: value
            }
        })


    };
    // Generating the table header for exam slots
    const examSlotHeaders = [];
    for (let i = 0; i < parseInt(formData.examdays); i++) {

        // Add the exam date, time slots, and classroom no for the current exam day
        const examDayHeader = (
            <TableCell key={i} >
                <div>
                    <TextField
                        fullWidth
                        type="date"
                        variant="outlined"
                        size="small"
                        name="examStartDate"
                        value={formData.examDates[i] || ''}
                        onChange={(e) => handleExamDateChange(e, i)}
                    />
                </div>
                {formData.examTimeSlots.map((slot, index) => (
                    <div key={index}>{`${slot.startTime} TO ${slot.endTime}`}</div>
                ))}
                <div>Classroom No</div>
            </TableCell>
        );

        examSlotHeaders.push(examDayHeader);
    }

    // Generating the table body rows

    let currentClassroomIndex = 0; // Initialize current classroom index
    const tableRows = formData.selectedYears.flatMap(year => {
        return formData.divisionsPerYear[year].map((division, index) => {
            // Calculate total students in the class
            let totalStudents = parseInt(division.total);

            // Calculate the number of students per classroom
            const studentsPerClassroom = formData.selectedClassrooms.map(classroom => parseInt(classroom.capacity));

            // Split total students into classrooms based on capacity
            const rollNos = [];
            let startRollNo = parseInt(division.startRollNo);
            for (let i = 0; i < studentsPerClassroom.length; i++) {
                const currentCapacity = Math.min(studentsPerClassroom[i], totalStudents);
                rollNos.push(`${startRollNo}-${startRollNo + currentCapacity - 1}`);
                startRollNo += currentCapacity;
                totalStudents -= currentCapacity;
                if (totalStudents <= 0) break;
            }

            // Generate table rows for each classroom
            const rows = rollNos.map((rollNo, i) => {
                console.log(rollNo);
                const currentIndex = currentClassroomIndex;
                currentClassroomIndex++; // Increment current classroom index for the next row
                return (
                    <TableRow key={`${division.className}_${i}`}>
                        <TableCell>{division.className}</TableCell>
                        <TableCell>{rollNo}</TableCell>
                        <TableCell>{rollNo.split('-')[1] - rollNo.split('-')[0] + 1}</TableCell>
                        {examSlotHeaders.map((_, index) => (
                            <TableCell key={`${division.className}_${i}_${index}`}>
                                <TextField
                                    id={`classroom${i}_${index}`}
                                    defaultValue={formData.selectedClassrooms[currentIndex]?.name || ''}
                                    onChange={(e) => handleClassroomChange(currentIndex, e.target.value)}
                                    InputProps={{
                                        readOnly: false,
                                    }}
                                    size='small'
                                />
                            </TableCell>
                        ))}
                    </TableRow>
                );
            });

            return rows;
        });
    });



    return (
        <div>
            <Typography variant="h5" align="center" gutterBottom>
                PUNE INSTITUTE OF COMPUTER TECHNOLOGY
            </Typography>
            <Typography variant="h6" align="center" gutterBottom>
                Department of {formData.selectedDepartment}
            </Typography>
            <Typography variant="h6" align="center" gutterBottom>
                {formData.title}
            </Typography>
            <Typography variant="h6" align="center" gutterBottom>
                {formData.selectedAcademicYear}
            </Typography>
            <Typography variant="h6" align="center" gutterBottom>
                SEATING ARRANGEMENT
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Class</TableCell>
                        <TableCell>Student Roll No</TableCell>
                        <TableCell>Total</TableCell>
                        {examSlotHeaders}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableRows}
                </TableBody>
            </Table>
        </div>
    );

}
