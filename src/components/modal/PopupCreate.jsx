import React, { useState } from "react";
import close from "../../img/close.svg";
import add from "../../img/add_task.svg";

function PopupCreate({ onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [tasks, setTasks] = useState([{ name: "", value: false }]);

  const addTaskInput = () => {
    setTasks([...tasks, { name: "", value: false }]);
  };

  const handleTaskChange = (index, newName) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, name: newName } : task
    );
    setTasks(newTasks);
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("Введіть назву задачі");
      return;
    }
    if (!date) {
      alert("Введіть дату");
      return;
    }
    onAdd({ titleCard: title, dateCard: date, ArrayList: tasks });
  };

  return (
    <div
      className="modal-popup-create active"
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="modal-header">
        <button className="modal-close-create" onClick={onClose}>
          <img src={close} alt="Закрити" />
        </button>
        <input
          type="text"
          value={title}
          id="task-title"
          placeholder="Додайте назву"
          maxLength="100"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="modal-body">
        <input
          type="date"
          id="modal-date-create"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <div className="input-task">
          {tasks.map((task, index) => (
            <input
              key={index}
              type="text"
              className="task-input-text"
              placeholder="Додайте завдання"
              value={task.name}
              onChange={(e) => handleTaskChange(index, e.target.value)}
            />
          ))}
        </div>
      </div>
      <div className="modal-button-save">
        <img
          className="add-task-icon"
          src={add}
          alt="Додати завдання"
          onClick={addTaskInput}
          style={{ cursor: "pointer" }}
        />
        <span
          className="task-save"
          onClick={() => {
            handleSubmit();
            window.location.reload();
          }}
          style={{ cursor: "pointer" }}
        >
          Зберегти
        </span>
      </div>
    </div>
  );
}

export default PopupCreate;
