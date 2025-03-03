import React, { useEffect, useState } from 'react'
import Style from './Style'
import "./NoteChild.css"
import { useNavigate } from 'react-router-dom'
function NoteChild() {
    const [notes, setNotes] = useState([])
    const [title, setTitle] = useState('')
    const [archived,setArchived] = useState([])
    const [btnArchived, setBtnArchived] = useState(false)
    const navigate = useNavigate();
    const handlePre = ()=> {
        if(title.trim() === ''){
            alert("Please enter a valid title!");  
            return;
        }
        const ExistingNotes = JSON.parse(localStorage.getItem("NoteAppData")) || [];
        const SafeExistingNotes = Array.isArray(ExistingNotes) ? ExistingNotes : [ExistingNotes];
        
        const AllStates = { notes, archived, title };
        const AllUpdates = [ ...SafeExistingNotes,AllStates];
        
        localStorage.setItem("NoteAppData", JSON.stringify(AllUpdates));
        
        console.log("Data is Running",AllUpdates); 
        
        navigate('/')
    }
    const handleCreate = () => {
        const date = new Date();
        const toDate = date.getDate()
        const weekday = date.toLocaleDateString("en-US",{weekday:'short'})
        const month = date.toLocaleDateString("en-US",{month:'long'})
        const year = date.toLocaleDateString('en-US',{year:'2-digit',hour:'2-digit',minute:'2-digit',        hour12:true})
        setNotes(prevNotes =>[...prevNotes,{id : Date.now(),note : '', Amount : '',dateTime : `${weekday}, ${toDate} ${month} ${year}`}])
    }

    const handleNoteChange = (id, value) =>{
        setNotes(prevNotes => prevNotes.map(note => note.id === id ? {...note,note : value} : note))
    }
    const handleAmountChange = (id , value) =>{
        setNotes(prevNotes => prevNotes.map(note => note.id === id ? {...note,Amount : value} : note))
    }
    const totalSum = notes.reduce((acc,curr)=> acc + Number(curr.Amount),0)
    const handleRemove = (id) => {
        const remove = prevNotes => prevNotes.filter(note => note.id !== id)
        setNotes(remove)
    }
    const handleArchived = (id) =>{
        const archivedNote  = notes.find(note => note.id === id) 
        setArchived(prevArchived => [...prevArchived, archivedNote])
        setNotes(prevNotes => prevNotes.filter(note => note.id !== id))
    }
    const handleBackArchived = (id) =>{
        const BackArchived = archived.find(note=> note.id === id) 
        setNotes(prevNotes => [...prevNotes,BackArchived])
        setArchived(prevArchived => prevArchived.filter(note => note.id !== id))
    }
    // Archived Amount Sum
    const archivedSum = () =>{
       return archived.reduce((acc,curr)=> acc + Number(curr.Amount),0)
    }

    const handleRemoveArchived = (id) =>{
    const remo = prevArchived => prevArchived.filter(note => note.id !== id)
    setArchived(remo)
    }
  return (
    <Style>
    <div>
        <div className='header-C'>
            <i class="ri-arrow-left-long-line" onClick={handlePre}></i>
            <h2>Add Notes</h2>
        </div>
        <div className='addPage' onClick={handleCreate}>
            <i class="ri-add-fill"></i>
        </div>
        <div className='input-t'>
            <input type='text' placeholder='Title' onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div className='sum'>
            <h3>Sum : {totalSum}</h3>
        </div>
        
        {
            notes.map((note)=>(
            <div className='inputs' key={note.id}>
                <div>
                    <input type='checkbox' checked={false} onClick={()=> handleArchived(note.id)}/>
                </div>
                <div className='input-wrapper'>
                    <input type='text' placeholder='Enter Note' value={note.note} onChange={(e)=> handleNoteChange(note.id, e.target.value)}/>
                </div>
                <div className='amount-wrapper'>
                    <input type='number' placeholder='Amount' value={note.Amount} onChange={(e)=> handleAmountChange(note.id, e.target.value)}/>
                </div>
                <div>
                    <i class="ri-close-large-fill" onClick={()=> handleRemove(note.id)}></i>
                </div>
                <div className='date'>
                    {note.dateTime}
                </div>
            </div>
            ))
        }
        {/* Archived Button */}
        <div className='btn' onClick={() => setBtnArchived(!btnArchived)}>
            <button>
                { btnArchived ? "Hide Archived" : "Show Archived" }
            </button>
        </div>
        <div className='sum'>
            {btnArchived && <h3>Sum : {archivedSum()}</h3>}
        </div>
        {/* Archived */}
        {
            btnArchived && 
                archived.map((note)=>(
                <div className='inputs' key={note.id}>
                    <div className='checkbox-A'>
                        <input type='checkbox' checked onClick={()=> handleBackArchived(note.id)}/>
                    </div>
                    <div className='input-wrapper-A'>
                        <input type='text' placeholder='Enter Note' value={note.note} onChange={(e)=> handleNoteChange(note.id, e.target.value)}/>
                    </div>
                    <div className='amount-wrapper-A'>
                        <input type='number' placeholder='Amount' value={note.Amount} />
                    </div>
                    <div>
                        <i class="ri-close-large-fill" onClick={()=> handleRemoveArchived(note.id)}></i>
                    </div>
                    <div className='date'>
                        {note.dateTime}
                    </div>
                </div>
            ))
        }
    </div>
    </Style>
  )
}

export default NoteChild

