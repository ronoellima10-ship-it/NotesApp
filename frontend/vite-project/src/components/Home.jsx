import {  useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Rat, TableOfContents } from 'lucide-react'
import RatelimitedUI from './RatelimitedUI'
import axios from 'axios'
import toast from 'react-hot-toast'
import NoteCard from './NoteCard'



const HomePage = () => {

    const [isRateLimited, setIsRateLimited] = useState(true)
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)

  useEffect(()=> {
    const fetchNotes = async () => {
        try {
            const response = await axios.get('http://localhost:3000/v1/api/notes')
            console.log(response.data)
            setNotes(response.data)
           
            setLoading(false)
            setIsRateLimited(false)
            
        } catch (error) {
            console.log(error)
            if (error.response && error.response?.status === 429) {
                toast.error("You have been rate limited. Please try again later.")
            } else {  
              setIsRateLimited(true)
            setLoading(false)
  
                  toast.error("An error occurred while fetching notes. Please try again later.")
            }
      } finally {
        setLoading(false)
      }
    }
    fetchNotes()
  }, [])

  return (
    <div className='min-h-screen'>
       

         {isRateLimited && <RatelimitedUI />}

         <div className="max-w-7x1 mx-auto p-4 mt-6"> 
           {loading && <div className="text-center text-primary py-10"> Loading notes...</div>}

           {notes.length === 0 && !loading && !isRateLimited && (
            <div className="text-center text-primary py-10">
              <TableOfContents className='size-10 mx-auto mb-4' />
              No notes found. Create your first note!
            </div>
           )}

           {notes.length > 0 && !isRateLimited && (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {notes.map((response) => (
                    <NoteCard key={response._id} title={response.title} note = {response} /> 
                  ))}
                </div>
           )}
         </div>

    </div>
  );
};

export default HomePage;