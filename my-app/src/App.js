import React from 'react';
import Note from './Note';
import "remixicon/fonts/remixicon.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NoteChild from './NoteChild';
import UpdateNote from './UpdateNote';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Note />} />
        <Route path="/Note-child" element={<NoteChild />} />
        <Route path="/update-note" element={<UpdateNote />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
