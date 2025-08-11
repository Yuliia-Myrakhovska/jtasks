function Button({ onOpenCreateModal }) {
  return (
    <div className="container-button">
      <div
        className="button-create"
        onClick={onOpenCreateModal}
        style={{ cursor: "pointer" }}
      >
        <img src="img/dist/add.svg" alt="" />
        <span className="button-name">Створити</span>
      </div>
    </div>
  );
}

export default Button;
