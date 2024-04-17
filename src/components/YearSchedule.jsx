import React, { useEffect, useRef, useState } from 'react'
import {
    Paper,
    TextField,
    TableContainer,
    Checkbox,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
} from '@mui/material'

export default function YearSchedule({ teacherData, year, yearIndex, formData, handleInputChange, handleInputChange1 }) {
    const [days, setDays] = useState(year.headers.days);
    const [subjects, setSubjects] = useState(year.headers.subjects);
    const [blocks, setBlocks] = useState(year.headers.blocks);
    const [focusedIndex, setFocusedIndex] = useState(null);
    const [focusedIndexDay, setFocusedIndexDay] = useState(null);
    return (
        <>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
                Year : {formData.selectedYears[yearIndex]}{" "}
            </Typography>
            <TableContainer component={Paper} sx={{ m: 2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" id="schedule-table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"></TableCell>
                            {days.map((index, i) => (
                                <TableCell
                                    key={index}
                                    align="center"
                                    colSpan={Math.ceil(Math.ceil(formData.noOfBlocksPerYear[formData.selectedYears[yearIndex]].length) * formData.paperSlotsPerDay)}
                                    width={50}
                                    sx={{ minWidth: "100px !important", width: "300px !important", }}
                                >
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        defaultValue={index}
                                        value={index}
                                        onChange={(e) => {
                                            const newDays = [...days];
                                            newDays[i] = e.target.value;
                                            setDays(newDays);
                                            handleInputChange(e, yearIndex, "days", i);
                                        }}
                                        onFocus={() => setFocusedIndexDay(i)}
                                        autoFocus={focusedIndexDay === i}
                                    />
                                </TableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            <TableCell width={150}></TableCell>

                            {subjects.map((index, i) => (
                                <TableCell key={index} width={70} sx={{ minWidth: "100px !important", width: "300px !important", }} colSpan={Math.ceil(formData.noOfBlocksPerYear[formData.selectedYears[yearIndex]].length)}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"

                                        size="small"
                                        value={index}
                                        onChange={(e) => {

                                            const newSubjects = [...subjects];
                                            newSubjects[i] = e.target.value;
                                            setSubjects(newSubjects);
                                            handleInputChange(e, yearIndex, "subjects", i);
                                        }}
                                        onFocus={() => setFocusedIndex(i)}
                                        autoFocus={focusedIndex === i}
                                    />

                                </TableCell>
                            ))}


                        </TableRow>
                        <TableRow>
                            <TableCell width={150}></TableCell>
                            {blocks.map(
                                (index, i) => (
                                    <TableCell key={i} sx={{ minWidth: "112px !important", width: "150px !important", }} >
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                            value={index}
                                            onChange={(e) => {
                                                const newBlocks = [...blocks];
                                                newBlocks[i] = e.target.value;
                                                setBlocks(newBlocks);
                                                handleInputChange(e, yearIndex, "blocks", i);
                                            }}

                                        />
                                    </TableCell>
                                )
                            )}
                        </TableRow>


                    </TableHead>
                    <TableBody>
                        {Object.keys(year.schedule).map((teacherIndex) => (
                            <TableRow
                                key={teacherIndex}

                            >
                                <TableCell sx={{ minWidth: "300px !important", width: "300px !important", }} >
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        disabled
                                        defaultValue={teacherData.find(teacher => teacher.teacherId == teacherIndex).name}
                                        sx={{
                                            "& .MuiOutlinedInput-input": {
                                                fontSize: "14px !important"
                                            }
                                        }}
                                    />
                                </TableCell>
                                {year.schedule[teacherIndex].map((isAvailable, index) => (
                                    <TableCell key={index} align="center">
                                        <Checkbox
                                            checked={isAvailable}
                                            onChange={(e) =>
                                                handleInputChange1(
                                                    e,
                                                    year,
                                                    yearIndex,
                                                    teacherIndex,
                                                    index
                                                )
                                            }
                                        />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
