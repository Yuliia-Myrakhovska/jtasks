import React, { useEffect, useState } from "react";
import "./css/style.css";
import { bd } from "./bd";
import Header from "./components/Header";
import Calendar from "./components/Calendar";
import Button from "./components/Button";
import CardSlider from "./components/CardSlider";
import Modal from "./components/modal/Popup";
import ModalCreate from "./components/modal/PopupCreate";

function App() {
  const [cards, setCards] = useState([]);
  const [modalOpenView, setModalOpenView] = useState(false);
  const [modalOpenCreate, setModalOpenCreate] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  const loadCards = async () => {
    try {
      const allCards = await bd.cardinfo.toArray();
      setCards(allCards);
    } catch (err) {
      console.error("Ошибка при загрузке карточек", err);
    }
  };

  useEffect(() => {
    loadCards();
  }, []);

  // Открыть окно просмотра карточки
  const openModalView = (card) => {
    setActiveCard(card);
    setModalOpenView(true);
    document.body.style.overflow = "hidden";
  };

  const closeModalView = () => {
    setModalOpenView(false);
    setActiveCard(null);
    document.body.style.overflow = "";
  };

  // Открыть окно создания карточки
  const openModalCreate = () => {
    setModalOpenCreate(true);
    document.body.style.overflow = "hidden";
  };

  const closeModalCreate = () => {
    setModalOpenCreate(false);
    document.body.style.overflow = "";
  };

  // Добавить карточку (создание)
  const addCard = async (newCard) => {
    try {
      await bd.cardinfo.add(newCard);
      await loadCards();
      closeModalCreate(); // Закрыть окно создания после добавления
    } catch (err) {
      console.error("Ошибка при добавлении карточки", err);
    }
  };

  // Обновить карточку (редактирование)
  const updateCard = async (updatedCard) => {
    try {
      await bd.cardinfo.update(updatedCard.id, updatedCard);
      await loadCards();
      if (activeCard && activeCard.id === updatedCard.id) {
        setActiveCard(updatedCard);
      }
    } catch (err) {
      console.error("Ошибка при обновлении карточки", err);
    }
  };

  const deleteCard = async (id) => {
    try {
      await bd.cardinfo.delete(id);
      await loadCards();
      closeModalView();
    } catch (err) {
      console.error("Ошибка при удалении карточки", err);
    }
  };

  return (
    <>
      <div
        className={`popup-overlay ${
          modalOpenView || modalOpenCreate ? "active" : ""
        }`}
        onClick={() => {
          if (modalOpenView) closeModalView();
          if (modalOpenCreate) closeModalCreate();
        }}
      ></div>

      <Header />
      <main>
        <div className="container">
          <Button onOpenCreateModal={openModalCreate} />
          <CardSlider cards={cards} onCardClick={openModalView} />
          <Calendar bd={bd} onCardClick={openModalView} />
        </div>
      </main>

      {modalOpenView && activeCard && (
        <Modal
          card={activeCard}
          onClose={closeModalView}
          onUpdate={updateCard}
          onDelete={deleteCard}
        />
      )}

      {modalOpenCreate && (
        <ModalCreate onClose={closeModalCreate} onAdd={addCard} />
      )}
    </>
  );
}

export default App;
