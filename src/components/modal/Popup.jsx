import React from "react";
import closeimg from "../../img/close.svg";
import deleteimg from "../../img/delete.svg";

function Popup({ card, onClose, onUpdate, onDelete }) {
  if (!card) return null;

  const handleCheckboxChange = (taskIndex) => {
    const updatedTasks = card.ArrayList.map((task, i) =>
      i === taskIndex ? { ...task, value: !task.value } : task
    );

    const updatedCard = { ...card, ArrayList: updatedTasks };
    onUpdate(updatedCard);
  };

  return (
    <div className={`modal-popup active`} onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-header">
          <button className="modal-close" onClick={onClose}>
            <img src={closeimg} alt="Закрити" />
          </button>
          <div className="modal-date">{card.dateCard}</div>
          <div className="modal-title">{card.titleCard}</div>
        </div>
        <div className="modal-body">
          <ul className="modal-list">
            {card.ArrayList.map((task, index) => (
              <li key={index}>
                <input
                  className="task-input-checkbox"
                  type="checkbox"
                  checked={task.value}
                  onChange={() => handleCheckboxChange(index)}
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
        <div className="modal-icon">
          <img
            src={deleteimg}
            alt="Видалити"
            className="modal-icon-img"
            style={{ cursor: "pointer" }}
            onClick={() => {
              onDelete(card.id);
              onClose();
              window.location.reload();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Popup;
