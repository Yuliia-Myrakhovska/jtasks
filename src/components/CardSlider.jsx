import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import drop from "../img/drop.svg";
import img from "../img/Sandy_Edu-03_Single-02.jpg";

function CardSlider({ cards, onCardClick }) {
  if (!cards.length) {
    return (
      <div className="content-decoration">
        <img src={img} alt="" />
        <p>Завдань немає</p>
      </div>
    );
  }

  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={3}
      breakpoints={{
        0: { slidesPerView: 1 },
        768: { slidesPerView: 3 },
      }}
    >
      {cards.slice(0, 10).map((card, index) => (
        <SwiperSlide key={card.id}>
          <div
            className={`card slide ${index === 0 ? "card-today" : ""}`}
            onClick={() => onCardClick(card)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onCardClick(card)}
          >
            <div className="card-header">
              <div className="card-date">{card.dateCard}</div>
              <div className="card-title">{card.titleCard}</div>
            </div>
            <div className="card-body">
              <ul className="card-list">
                {card.ArrayList.map((task, i) => (
                  <li key={i}>
                    <input
                      className="task-input-checkbox"
                      type="checkbox"
                      checked={task.value}
                      disabled
                      readOnly
                    />
                    <p
                      className="task-input-text"
                      style={{
                        textDecoration: task.value ? "line-through" : "none",
                        color: task.value ? "gray" : "black",
                      }}
                    >
                      {task.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-more">
              <img
                className="card-more-icon"
                src={drop}
                alt="Більше"
                onClick={(e) => {
                  e.stopPropagation();
                  onCardClick(card);
                }}
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default CardSlider;
