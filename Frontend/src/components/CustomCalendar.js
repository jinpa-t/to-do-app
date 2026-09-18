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

    let listData = useState([
        [0,  "Go to the to play Tennis.",0, "09-22-2026"],
        [0,  "Mow the lawn.", 1,"09-15-2026"],
        [1,  "Deep Clean and Manage bedroom and closet.", 2,"09-05-2026"],
        [1, "Get a haircut.",  2,"08-03-2026"],
      ]);

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
    
    const openPreview = (day) =>{
        console.log(day)
        if (calendarDayPreview.current) {
            calendarDayPreview.current.classList.remove('hidden');
            renderPreview(day)
        }
    }

    const closePreview = () =>{
        if (calendarDayPreview.current) {
            calendarDayPreview.current.classList.add('hidden');
        }
    }

    const renderPreview = (day) => {
        
        const cells = [];
       
        cells.push(
        <div key={`day-${day}`} className="">
            
                {listData[0].map((item, index) => (
                    <React.Fragment key={index}>
                        {day === new Date(item[3]).getDate() && currentMonth === new Date(item[3]).getMonth() && currentYear === new Date(item[3]).getFullYear()  && (
                        <div className={`calendar-tasklist-item ${
                            item[2] === 0 ? 'priority-high' :(item[2] === 1 ? 'priority-medium' :  'priority-low') }`}>{item[1]}</div>
                        )}
                    </React.Fragment>))
                }
        </div>);
        
        return cells;
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
            
            const boxStyle = {
                background: (currentYear == presentYear[0] && currentMonth == presentMonth[0] && i == presentDay[0])? 'lightgreen':'#5d96c5',
                
            };
            cells.push(
            <div key={`day-${i}`} className="calendar-cell" style={boxStyle}>
                <div className='bg-none'>{i}</div>
                <div className='calendar-tasks-container' key={`day-${i}`}  onClick={() => openPreview(i)}>
                    {listData[0].map((item, index) => (
                        <React.Fragment key={index}>
                            {i === new Date(item[3]).getDate() && currentMonth === new Date(item[3]).getMonth() && currentYear === new Date(item[3]).getFullYear()  && (
                            <div className={`calendar-tasklist-item ${
                                item[2] === 0 ? 'priority-high' :(item[2] === 1 ? 'priority-medium' :  'priority-low') }`}>{item[1]}</div>
                            )}
                        </React.Fragment>))
                    }
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
            <div className='calendar-title-container'>
                <button onClick={handlePrevious}>Prev</button>
                <h2 className='calendar-title'>{`${currentYear} - ${currentMonth + 1}`}</h2>
                <button onClick={handleNext}>Next</button>
            </div>    
            <div className="calendar-grid">
                {renderCalendar()}
            </div>
            <div className='calendar-day-preview hidden' ref={calendarDayPreview}>
                <button onClick={closePreview}>X</button>
                {renderPreview(5)}
            </div>
        </div>
    );
};

export default CustomCalendar;