/*
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from "react";
import axios from "axios";

export default function FormDialog(props) {
    const [editValues, setEditValues] = useState({
        id: props.id,
        name: props.name,
        cost: props.cost,
        category: props.category,
    });


    const handleEditValues = () => {
        console.log(props.baseUrl)
        axios.put(`http://localhost:3001/edit`, {
            id: editValues.id,
            name: editValues.name,
            cost: editValues.cost,
            category: editValues.category,
        });
        handleClose();

    }

    const handleDeleteGame = () => {
        axios.delete(`http://localhost:3001/delete/${editValues.id}`)
    }

    const handleChangeValues = (value)=>{
        setEditValues(prevValues=>({
                ...prevValues,
                [value.target.id]: value.target.value,
            })
        )
    }

    const handleClickOpen = () => {
        props.setOpen(true);
    };

    const handleClose = () => {
        props.setOpen(false);
    };

    return (
        <div>

            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle>Edit</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Title"
                        defaultValue={props.name}
                        type="text"
                        onChange={handleChangeValues}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="cost"
                        label="Cost"
                        defaultValue={props.cost}
                        type="text"
                        onChange={handleChangeValues}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="category"
                        label="Category"
                        defaultValue={props.category}
                        type="text"
                        onChange={handleChangeValues}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleEditValues}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
*/
import React, { useState } from "react";
import "./dialog.css";
import axios from "axios";

export default function FormDialog(props) {
  const [editValues, setEditValues] = useState({
    id: props.id,
    name: props.name,
    cost: props.cost,
    category: props.category,
  });

  const handleChangeValues = (e) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditValues = () => {
    axios
      .put("http://localhost:3001/edit", editValues)
      .then(() => {
        props.onUpdate(); // علشان بعد التعديل يعيد تحميل البيانات
        handleSave();
        handleClose();
      })
      .catch((err) => console.log(err));

  };
  const handleSave = () => {
  const updatedGame = { id, name: newName, cost: newCost, category: newCategory };
  onUpdate(updatedGame); // تبعت للأب
  setOpen(false); // تقفل الـ dialog بعد ما ترسل
};


  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <>
      {props.open && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Edit Game</h2>
            <input
              type="text"
              name="name"
              placeholder="Title"
              defaultValue={props.name}
              onChange={handleChangeValues}
            />
            <input
              type="text"
              name="cost"
              placeholder="Cost"
              defaultValue={props.cost}
              onChange={handleChangeValues}
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              defaultValue={props.category}
              onChange={handleChangeValues}
            />

            <div className="modal-actions">
              <button className="cancel" onClick={handleClose}>
                Cancel
              </button>
              <button className="save" onClick={handleEditValues}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
