import React, { useEffect, useState } from 'react'
import Style from './Style'
import "./Note.css"
import {  useNavigate } from 'react-router-dom'

function Note() {
    const [reciveData, setReciveData] = useState([{notes : [], archived : []}])
    const [openMenus, setOpenMenus] = useState({});
    const [menu , setMenu] = useState(false)
    const [inputSearch, setInputSearch] = useState('')

    const navigate = useNavigate()
    const handleChange = ()=>{
        navigate('/Note-child')
    }
    
    
    useEffect(() => {
        const storedData = localStorage.getItem("NoteAppData") ? JSON.parse(localStorage.getItem("NoteAppData")) : [];
        setReciveData(storedData);
    }, []);    
    // console.log(reciveData)

    const handleUpdateNote = (data,index) => {
        navigate('/update-note', { state: {data ,index}}); 
        // console.log( { state: {data ,index}})
    };
    const handleRemoveNote = (index) =>{
            const updateData = reciveData.filter((_,i) => i !== index)
            setReciveData(updateData)
            localStorage.setItem("NoteAppData",JSON.stringify(updateData))
          }
    useEffect(()=>{
                document.addEventListener("click", ()=> {setOpenMenus({}); setMenu(false)});
                return ()=> document.removeEventListener("click", setOpenMenus({}))
              },[])
            const toggleMenu = (index) => {
                setOpenMenus(prev => {
                    return prev[index] ? {} : { [index]: true };
                });
            };
    const SearchMatch = reciveData.filter((data)=>
        data.title?.toLowerCase().includes(inputSearch?.toLowerCase())
    )
    console.log(SearchMatch)
  return (
    <Style>
        <div className='header'>
            <h2>Notes</h2>
            <i class="ri-more-2-line header-menu" onClick={(e)=> {e.stopPropagation();setMenu(!menu)} }>
                 {menu && <ul className='header-ul' >
                     <li>Select Item</li>
                     <li>Import</li>
                     <li>Export</li>
                 </ul>}
             </i>
        </div>
        <div className='search-box'>
            <i class="ri-search-line"></i>
            <input type='text' placeholder='Search' className='input' onChange={(e) => setInputSearch(e.target.value)}/>
        </div>
        <div className='addPage' onClick={handleChange}>
            <i class="ri-add-fill"></i>
        </div>
        <div className='wrapperNote'>
        {
           SearchMatch?.length > 0 ? SearchMatch.map((data, index)=>(
            <div className='saveBox' key={index} onClick={()=> handleUpdateNote(data,index)}>
                <div className='header-box'>
                    <h4>{data.title || "No title"}</h4>
                    <i class="ri-more-2-fill menu"  onClick={(e)=> {e.stopPropagation(); toggleMenu(index) }}>
                    {
                        openMenus[index] && <ul className='box-ul'>
                            <li>Select item</li>
                            <li onClick={()=> handleUpdateNote(data,index)}>Edit</li>
                            <li onClick={() => handleRemoveNote(index)}>Delete</li>
                            <li>Share</li>
                        </ul>
                        }
                    </i>
                </div>
                    {
                        data.notes?.map((note)=>(
                            <div className='body'>
                                <input type='checkbox'/>
                                <p>{note.note}</p>
                                <p>{note.Amount}</p>
                            </div>
                        
                        ))
                    }
                {
                    data.archived?.map((arch)=>(
                        <div className='body-Archived'>
                            <input type='checkbox' checked/>
                            <p>{arch.note}</p>
                            <p>{arch.Amount}</p>
                        </div>
                    ))
                }
            </div>
            )) : ""
        }
        </div>
    </Style>
  )
}

export default Note;