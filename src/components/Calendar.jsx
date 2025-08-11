import React, { useState, useEffect } from "react";
import imgleft from "../img/left.svg";
import imgright from "../img/right.svg";

const truncateText = (text, maxLength) => {
  if (typeof text !== "string") return "";
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};

function Calendar({ bd, onCardClick }) {
  const [dateCalendar, setDateCalendar] = useState(new Date());
  const [tasksByDate, setTasksByDate] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function fetchTasks() {
      const year = dateCalendar.getFullYear();
      const month = dateCalendar.getMonth() + 1;
      const monthStr = month < 10 ? `0${month}` : `${month}`;

      const cardsForMonth = await bd.cardinfo
        .filter((card) => card.dateCard.startsWith(`${year}-${monthStr}`))
        .toArray();

      const newTasks = {};
      cardsForMonth.forEach((card) => {
        newTasks[card.dateCard] = card;
      });

      setTasksByDate(newTasks);
    }

    fetchTasks();
  }, [dateCalendar, bd]);

  const monthName = dateCalendar
    .toLocaleString("uk-UA", { month: "long" })
    .replace(/^./, (str) => str.toUpperCase());
  const year = dateCalendar.getFullYear();

  const firstDay = (() => {
    const jsDay = new Date(year, dateCalendar.getMonth(), 1).getDay();
    return jsDay === 0 ? 6 : jsDay - 1;
  })();

  const lastDate = new Date(year, dateCalendar.getMonth() + 1, 0).getDate();

  const weeks = [];
  let dayCounter = 1;
  let dayCounterNext = 1;
  const maxTaskLength = windowWidth > 768 ? 14 : 6;

  for (let week = 0; week < 6; week++) {
    const days = [];
    for (let weekday = 0; weekday < 7; weekday++) {
      if (week === 0 && weekday < firstDay) {
        days.push(<td key={`empty-${week}-${weekday}`}></td>);
      } else if (dayCounter <= lastDate) {
        const dayStr = dayCounter < 10 ? `0${dayCounter}` : `${dayCounter}`;
        const monthStr =
          dateCalendar.getMonth() + 1 < 10
            ? `0${dateCalendar.getMonth() + 1}`
            : `${dateCalendar.getMonth() + 1}`;
        const year = dateCalendar.getFullYear();

        const dateKey = `${year}-${monthStr}-${dayStr}`;

        const cardForDay = tasksByDate[dateKey];

        days.push(
          <td
            key={`day-${dayCounter}`}
            className="calendar-day-cell"
            style={{ cursor: cardForDay ? "pointer" : "default" }}
            onClick={() => {
              if (cardForDay && onCardClick) {
                onCardClick(cardForDay);
              }
            }}
          >
            <span className="calendar-day">{dayCounter}</span>
            <span className="calendar-task">
              {cardForDay && (
                <span>{truncateText(cardForDay.titleCard, maxTaskLength)}</span>
              )}
            </span>
          </td>
        );

        dayCounter++;
      } else {
        days.push(
          <td key={`next-month-${dayCounterNext}`} className="calendar-dayNext">
            <span className="calendar-day nextMonth">{dayCounterNext}</span>
          </td>
        );
        dayCounterNext++;
      }
    }
    weeks.push(<tr key={`week-${week}`}>{days}</tr>);
    if (dayCounter > lastDate) break;
  }

  const prevMonth = () => {
    setDateCalendar((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() - 1);
      return d;
    });
  };

  const nextMonth = () => {
    setDateCalendar((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() + 1);
      return d;
    });
  };

  const goToday = () => {
    setDateCalendar(new Date());
  };

  return (
    <div className="calendar-container">
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={goToday} id="today">
            Сьогодні
          </button>
          <div className="container-date-info">
            <img
              id="prev-month"
              src={imgleft}
              alt="left"
              onClick={prevMonth}
              style={{ cursor: "pointer" }}
            />
            <img
              id="next-month"
              src={imgright}
              alt="right"
              onClick={nextMonth}
              style={{ cursor: "pointer" }}
            />
            <span id="month-name">
              {monthName} {year}
            </span>
          </div>
        </div>
        <table id="calendar-table">
          <thead>
            <tr>
              <th>Пн</th>
              <th>Вт</th>
              <th>Ср</th>
              <th>Чт</th>
              <th>Пт</th>
              <th>Сб</th>
              <th>Нд</th>
            </tr>
          </thead>
          <tbody className="calendar-body">{weeks}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Calendar;
