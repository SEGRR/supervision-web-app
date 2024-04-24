import { jsPDF } from 'jspdf'
import "jspdf-autotable";

export function generateSchedulePdfFile(scheduleData, teacherData) {
    var doc = new jsPDF({ orientation: "l" });

    const styles = {
        font: "Helvetica", // Font style
        fontSize: 10, // Font size
        fillColor: [255, 255, 255], // Background color
        textColor: [0, 0, 0], // Text color
        padding: 0.1, // Cell padding (in units declared at jsPDF instantiation)
        lineColor: [0, 0, 0], // Cell border color
        lineWidth: 0.1, // Cell border width
        valign: "middle", // Vertical alignment
        halign: "center", // Horizontal alignment
    };

    function calculateColSpan(yearIndex) {
        return Math.ceil(
            scheduleData.noOfBlocksPerYear[
                scheduleData.selectedYears[yearIndex]
            ].length / scheduleData.paperSlotsPerDay
        );
    }
    console.log(scheduleData);
    scheduleData.yearSchedule.forEach((year, yearIndex) => {
        var headersData = [];
        var bodyRow = [];
        console.log("page", yearIndex + 1);
        doc.setFontSize(16);
        const pageWidth = doc.internal.pageSize.getWidth();
        var textWidth = 0;
        var textX = 0;


        textWidth = doc.getStringUnitWidth(`PUNE INSTITUTE OF COMPUTER TECHNOLOGY`) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        textX = (pageWidth - textWidth) / 2;
        doc.text(textX, 15, `PUNE INSTITUTE OF COMPUTER TECHNOLOGY`);

        textWidth = doc.getStringUnitWidth(`Department of ${scheduleData.department}`) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        textX = (pageWidth - textWidth) / 2;
        doc.text(textX, 22, `Department of ${scheduleData.department}`);

        textWidth = doc.getStringUnitWidth(`${scheduleData.title}`) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        textX = (pageWidth - textWidth) / 2;
        doc.text(textX, 29, `${scheduleData.title}`);

        textWidth = doc.getStringUnitWidth(`Duty Schedule of ${scheduleData.selectedYears[yearIndex]}`) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        textX = (pageWidth - textWidth) / 2;
        doc.text(textX, 36, `Duty Schedule ${scheduleData.selectedYears[yearIndex]}`);
        doc.setFontSize(14);
        var temp = 0 ;
        scheduleData.paperTimeSlots.forEach(function (paperTime, index) {
            textWidth = doc.getStringUnitWidth(`Duty Schedule of ${scheduleData.selectedYears[yearIndex]}`) * doc.internal.getFontSize() / doc.internal.scaleFactor;
            textX = (pageWidth - textWidth) / 2;
            temp = 36+(7*(index+1));
            doc.text(textX, temp, `Slot: ${index+1} ${paperTime.startTime} - ${paperTime.endTime}`);
        })


        const days = [
            { content: "Teacher Name", rowSpan: 3 },
            ...year.headers.days.map((value, index) => {
                if (year.headers.days.length == index + 1) {
                    if (scheduleData.subjectsPerYear[scheduleData.selectedYears[yearIndex]].length % 2 != 0) {
                        return ({
                            content: value,
                            colSpan: Math.ceil(Math.ceil(scheduleData.noOfBlocksPerYear[scheduleData.selectedYears[yearIndex]].length)),
                        })
                    }
                }

                return ({
                    content: value,
                    colSpan: Math.ceil(Math.ceil(scheduleData.noOfBlocksPerYear[scheduleData.selectedYears[yearIndex]].length) * scheduleData.paperSlotsPerDay),
                })
            }),
        ];

        const subjects = year.headers.subjects.map((value) => ({
            content: value,
            colSpan: Math.ceil(scheduleData.noOfBlocksPerYear[scheduleData.selectedYears[yearIndex]].length),
        }));

        const blocks = year.headers.blocks.map((value) => ({ content: value }));

        year.schedule = removeEmptyTeachers(year.schedule);
        Object.keys(year.schedule).forEach(function (index) {
            const row = [
                teacherData.find((teacher) => teacher.teacherId == index) != null ? teacherData.find((teacher) => teacher.teacherId == index).name : "**Teacher Not Present**".toUpperCase(),
                ...year.schedule[index].map((value) => (value ? 1 : "")),
            ];
            bodyRow.push(row);
        });

        headersData.push(days, subjects, blocks);

        doc.autoTable({
            head: headersData,
            body: bodyRow,
            theme: "grid",
            styles: styles,
            startY: temp+2,
            margin: 5

        });

        if (yearIndex < (scheduleData.yearSchedule.length - 1)) {

            doc.addPage();
        }
    });

    doc.save(`${scheduleData.title} Schedule`);
}
export function generateSeatingPdfFile(formData) {
    var doc = new jsPDF({ orientation: "l" });

    function convertDateFormat(inputDate) {
        // Split the input date by '-' to get year, month, and day
        var parts = inputDate.split('-');

        // Rearrange the parts to form the desired format
        var formattedDate = parts[2] + '-' + parts[1] + '-' + parts[0];

        return formattedDate;
    }

    const styles = {
        font: "Helvetica", // Font style
        fontSize: 12, // Font size
        fillColor: [255, 255, 255], // Background color
        textColor: [0, 0, 0], // Text color
        padding: 0.2, // Cell padding (in units declared at jsPDF instantiation)
        lineColor: [0, 0, 0], // Cell border color
        lineWidth: 0.1, // Cell border width
        valign: "middle", // Vertical alignment
        halign: "center", // Horizontal alignment
    };

    const examSlotHeaders = ["Class", "Student Roll No", "Total"];

    const tableRows = [];

    for (let i = 0; i < parseInt(formData.examdays); i++) {

        // Add the exam date, time slots, and classroom no for the current exam day
        var examDayHeader = "" + convertDateFormat(formData.examDates[i]) + "\n";


        formData.examTimeSlots.forEach(element => {
            let time = `\n${element.startTime} TO ${element.endTime}`;
            examDayHeader = examDayHeader + time
        })



        examSlotHeaders.push(examDayHeader);
    }


    let currentClassroomIndex = 0;
    // Initialize current classroom index
    formData.selectedYears.forEach(year => {

        formData.divisionsPerYear[year].forEach((division, index) => {

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


            rollNos.forEach((rollNo, i) => {
                var row = [];
                const currentIndex = currentClassroomIndex;
                currentClassroomIndex++; // Increment current classroom index for the next row


                row.push(division.className);
                row.push(rollNo);
                row.push(rollNo.split('-')[1] - rollNo.split('-')[0] + 1)

                examSlotHeaders.forEach((_, index) => (

                    row.push(formData.selectedClassrooms[currentIndex]?.name || '')



                ))
                tableRows.push(row);
            })


        });
    });

    doc.setFontSize(16);
    const pageWidth = doc.internal.pageSize.getWidth();
    var textWidth = doc.getStringUnitWidth(`PUNE INSTITUTE OF COMPUTER TECHNOLOGY`) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    var textX = (pageWidth - textWidth) / 2;
    doc.text(textX, 15, `PUNE INSTITUTE OF COMPUTER TECHNOLOGY`);

    textWidth = doc.getStringUnitWidth(`Department of ${formData.selectedDepartment}`) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    textX = (pageWidth - textWidth) / 2;
    doc.text(textX, 22, `Department of ${formData.selectedDepartment}`);

    textWidth = doc.getStringUnitWidth(`${formData.title}`) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    textX = (pageWidth - textWidth) / 2;
    doc.text(textX, 29, `${formData.title}`);

    textWidth = doc.getStringUnitWidth(`${formData.selectedAcademicYear}`) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    textX = (pageWidth - textWidth) / 2;
    doc.text(textX, 36, `${formData.selectedAcademicYear}`);

    textWidth = doc.getStringUnitWidth(`SEATING ARRANGEMENT`) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    textX = (pageWidth - textWidth) / 2;
    doc.text(textX, 43, `SEATING ARRANGEMENT`);

    doc.autoTable({
        head: [examSlotHeaders],
        body: tableRows,
        theme: "grid",
        styles: styles,
        startY: 50,

    });

    doc.save(`${formData.title} Seating Arrangement`);
}

function removeEmptyTeachers(schedule) {
    for (const key in schedule) {
        if (!schedule[key].includes(true)) {
            delete schedule[key];
        }
    }

    return schedule;
}