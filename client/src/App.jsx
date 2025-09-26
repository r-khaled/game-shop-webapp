import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import Card from "./components/card";

function App() {
  const baseUrl = "http://localhost:3001";

  const [values, setValues] = useState({});
  const [games, setGames] = useState([]);

  // لتغيير قيم الإدخال
  const handleChangeValues = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // لإضافة لعبة جديدة
  const handleClickButton = () => {
    Axios.post(`${baseUrl}/register`, {
      id:values.id,
      name: values.name,
      cost: values.cost,
      category: values.category,
    }).then((response) => {
      setGames([...games, response.data]); // نضيفها مباشرة في الـ state
      setValues({}); // reset inputs
    });
  };
 
  // لحذف لعبة
 const handleDelete = (id) => {
    Axios.delete(`${baseUrl}/delete/${id}`).then(() => {
      setGames(games.filter((game) => game.id !== id));
    });
  }; 
// لتحديث لعبة
   const handleUpdate = (updatedGame) => {
    Axios.put(`${baseUrl}/update/${updatedGame.id}`, updatedGame).then(
      () => {
        setGames(
          games.map((game) =>
            game.id === updatedGame.id ? updatedGame : game
          )
        );
      }
    );
  };

  // لجلب الألعاب أول ما الصفحة تفتح
  useEffect(() => {
    Axios.get(`${baseUrl}/games`).then((response) => {
      setGames(response.data);
    });
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Game Shop</h1>
        <h3>Add a Game</h3>
        <div className="register-box">
          <input
            className="register-input"
            type="text"
            name="name"
            placeholder="Title"
            value={values.name || ""}
            onChange={handleChangeValues}
          />
          <input
            className="register-input"
            type="text"
            name="cost"
            placeholder="Cost"
            value={values.cost || ""}
            onChange={handleChangeValues}
          />
          <input
            className="register-input"
            type="text"
            name="category"
            placeholder="Category"
            value={values.category || ""}
            onChange={handleChangeValues}
          />
          <button className="register-button" onClick={handleClickButton}>
            Add
          </button>
        </div>
        <br />
        <div className="cards">
          {games.map((game) => (
            <Card
              key={game.id}
              id={game.id}
              name={game.name}
              cost={game.cost}
              category={game.category}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
