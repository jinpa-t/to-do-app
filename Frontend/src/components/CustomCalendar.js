import React, { useState, useRef, useEffect } from 'react';
import DayPreview from './dayPreview';
const CustomCalendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [selectedDay, setSelectedDay] = useState();
    const presentDay = useState(new Date().getDate());
    const presentMonth = useState(new Date().getMonth());
    const presentYear = useState(new Date().getFullYear());
    const calendarDayPreview = useRef(null);
    const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
    const firstDayIndex = (month, year) => new Date(year, month, 1).getDay();
    const [todoData, setToDoData] = useState([]);
    let listData = useState([
        [0,  "Go to the to play Tennis.",0, "09-22-2026"],
        [0,  "Mow the lawn.", 1,"09-15-2026"],
        [0,  "Code something good.", 0,"09-15-2026"],
        [1,  "Deep Clean and Manage bedroom and closet.", 2,"09-05-2026"],
        [1, "Get a haircut.",  2,"08-03-2026"],
      ]);
    listData.sort((a,b) => a[2] - b[2]);
     useEffect(() => {
        const loadData = async () => {
        try {
            const response = await fetch('http://localhost:3030/api/todos/', {
            method: "GET",
            headers: {
            'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
            if(!response.ok) {
            throw new Error("Network error while fetching data.");
            }
            const result = await response.json();
            setToDoData (result);
            
        } catch (err) {
            console.log("Error loading data: ", err);
        }
        }
        loadData();
    },[]);

    const fetchAllTodos = async() =>{
        try {
            const response = await fetch('http://localhost:3030/api/todos/', {
            method: "GET",
            headers: {
            'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
            if(!response.ok) {
            throw new Error("Network error while fetching data.");
            }
            const result = await response.json();
            setToDoData (result);
            
        } catch (err) {
            console.log("Error loading data: ", err);
        }
    }
  
    const handleNext = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const handlePrevious = () => {
        fetchAllTodos();
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
            setSelectedDay(day)
        }
    }

    const closePreview = () =>{
        if (calendarDayPreview.current) {
            calendarDayPreview.current.classList.add('hidden');
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
            
            const boxStyle = {
                background: (currentYear == presentYear[0] && currentMonth == presentMonth[0] && i == presentDay[0])? 'lightgreen':'#5d96c5',
                
            };
            cells.push(
            <div key={`day-${i}`} className="calendar-cell" style={boxStyle}>
                <div className='bg-none'>{i}</div>
                <div className='calendar-tasks-container' key={`day-${i}`}  onClick={() => openPreview(i)}>
                    { todoData.map((item) => (
                        <React.Fragment key={item._id}>
                            {i === new Date(item.dueDate.substring(0,10)).getDate() && currentMonth === new Date(item.dueDate.substring(0,10)).getMonth() && currentYear === new Date(item.dueDate.substring(0,10)).getFullYear()  && (
                            <div className={`calendar-tasklist-item ${
                                item.priority === 0 ? 'priority-high' :(item.priority === 1 ? 'priority-medium' :  'priority-low') }`}>{item.description}</div>
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
                <DayPreview 
                    day={selectedDay} 
                    currentMonth={currentMonth} 
                    currentYear={currentYear} 
                    listData={todoData} 
                    />
            </div>
        </div>
    );
};

export default CustomCalendar;