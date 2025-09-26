import React, { useState } from "react";
import "./card.css";
import FormDialog from "./dialog/dialog";

const Card = ({ id, name, cost, category, onDelete, onUpdate }) => {
  const [open, setOpen] = useState(false);

  const cardOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteGame = () => {
    onDelete(id); // هتتنفذ من الـ App
  };

  return (
    <>
      <FormDialog
        open={open}
        setOpen={setOpen}
        onClose={handleClose}
        id={id}
        name={name}
        cost={cost}
        category={category}
        onUpdate={onUpdate} // يبعث التعديلات للـ App
      />

      <div className="game-card">
        <div className="info">
          <h4>{name}</h4>
          <p>${cost}</p>
          <p>{category}</p>
        </div>
        <div className="actions">
          <button className="edit" onClick={cardOpen}>
            Edit
          </button>
          <button className="delete" onClick={handleDeleteGame}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;

