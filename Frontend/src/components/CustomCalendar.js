import React, { useState, useRef } from 'react';

const CustomCalendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const presentDay = useState(new Date().getDate());
    const presentMonth = useState(new Date().getMonth());
    const presentYear = useState(new Date().getFullYear());
    const calendarDayPreview = useRef(null);
    const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
    const firstDayIndex = (month, year) => new Date(year, month, 1).getDay();

    const handleNext = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const handlePrevious = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };
    
    const toogleDayPreview = () =>{
        if (calendarDayPreview.current) {
            calendarDayPreview.current.classList.remove('hidden')
        }
    }

    const closePreview = () =>{
        if (calendarDayPreview.current) {
            calendarDayPreview.current.classList.add('hidden')
        }
    }
    const renderCalendar = () => {
        const days = daysInMonth(currentMonth, currentYear);
        const startDay = firstDayIndex(currentMonth, currentYear);
        const cells = [];
        const weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
       
        //  Add Day of the week
        for (let i = 0; i < weekDays.length; i++) {
            cells.push(<div key={`week-day-${weekDays[i]}`} className="calendar-cell-weekday">{weekDays[i]}</div>);
        }

        // 1. Padding for days from the previous month
        for (let i = 0; i < startDay; i++) {
            cells.push(<div key={`empty-start-${i}`} className="calendar-cell empty"></div>);
        }

        // 2. All actual days of the current month
        for (let i = 1; i <= days; i++) {
            //console.log(typeof  currentYear , typeof  presentYear , typeof currentMonth , typeof presentMonth ,typeof  i,  typeof presentDay);
            const boxStyle = {
                background: (currentYear == presentYear[0] && currentMonth == presentMonth[0] && i == presentDay[0])? 'lightgreen':'lightblue',
                transition: 'transform 0.2s ease', // Makes the zoom smooth
                
            };
            cells.push(
            <div key={`day-${i}`} className="calendar-cell">
                <div>{i}</div>
                <div className='calendar-tasks-container' style={boxStyle} onClick={toogleDayPreview}>
                    <div className='calendar-tasklist-item'>Task1</div>
                    <div className='calendar-tasklist-item'>Task2</div>
                    <div className='calendar-tasklist-item'>Task2</div>
                    <div className='calendar-tasklist-item'>Task2</div>
                </div>
            </div>);
        }

        // 3. Trailing padding to fill out the remaining grid cells (up to 42 total)
        const totalCellsRendered = startDay + days;
        const remainingCells = totalCellsRendered <= 35 ? 35 - totalCellsRendered : 42 - totalCellsRendered;
        
        for (let i = 0; i < remainingCells; i++) {
            cells.push(<div key={`empty-end-${i}`} className="calendar-cell empty"></div>);
        }

        return cells;
    };

    return (
        <div className="calendar-container">
            <button onClick={handlePrevious}>Previous</button>
            <h2 className='calendar-title'>{`${currentYear} - ${currentMonth + 1}`}</h2>
            <button onClick={handleNext}>Next</button>
            <div className="calendar-grid">
                {renderCalendar()}
            </div>
            <div className='calendar-day-preview hidden' ref={calendarDayPreview}>
                <button onClick={closePreview}>X</button>
                <ul>
                    <li>Go to the shop.</li>
                </ul>
            </div>
        </div>
    );
};

export default CustomCalendar;