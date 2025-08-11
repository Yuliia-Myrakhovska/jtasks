import React from "react";
import icon from "../img/icon.svg";

function Header() {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const weekdays = [
    "неділя",
    "понеділок",
    "вівторок",
    "середа",
    "четвер",
    "п’ятниця",
    "субота",
  ];
  const weekday = weekdays[now.getDay()];
  const weekdayCapitalized = weekday.charAt(0).toUpperCase() + weekday.slice(1);

  return (
    <header>
      <div className="container">
        <div className="header-container">
          <div className="header-left">
            <div className="header-logo">
              <img src={icon} alt="Logo" className="logo" />
            </div>
            <div className="header-title">
              <h1 className="title">JTasks</h1>
              <h2 className="subtitle">Створюй свої завдання</h2>
            </div>
          </div>

          <div className="header-datetime">
            <div className="datetime-day">
              <span id="datetime-day-info">{day}</span>
            </div>
            <span className="datetime-decor"></span>
            <div className="datetime-data">
              <span id="datetime-date-month">.{month}</span>
              <span id="datetime-date-weekday">{weekdayCapitalized}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
