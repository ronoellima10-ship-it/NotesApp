import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { LoaderIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Trash2Icon } from 'lucide-react'
import axios from 'axios'

const NoteDetailPage = () => {

  const [note, setNote] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [saving , setSaving] = React.useState(false)

  const onDelete = async () => {
    if(!window.confirm("Are you sure you want to delete this note?")) {
      return
    } else {
      try {
        const response = await fetch(`http://localhost:3000/v1/api/notes/${id}`, {
          method: 'DELETE',
        })
        if(!response.ok) {
          throw new Error("Failed to delete note")
        }
      } catch (error) {
        console.error("Error deleting note:", error)
        alert("Failed to delete note")
      } finally {
        navigate("/")
      }
    }
  }


  const navigate = useNavigate()

  const {id } = useParams()

  console.log("Note ID from params:", id)

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`http://localhost:3000/v1/api/notes/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch note")
        }
        const data = await response.json()
        setNote(data)
      } catch (error) {
        console.error("Error fetching note:", error)
        setError("Failed to fetch note")
      } finally {
        setLoading(false)
      }
    }
    fetchNote()
  }, [id])

  console.log("Fetched note:", note)

  if(loading){
    return <div className='text-center text-primary py-10'>
      <LoaderIcon className="animate-spin size-10 mx-auto" />
    </div>
  }

  async function SaveChanges(){
    setSaving(true)
    // Implement save changes logic here (e.g., send PUT request to update note)
    try {
      const updateNote = await axios.put(`http://localhost:3000/v1/api/notes/${id}`, note)

      if(!updateNote) {
        throw new Error("Failed to update note")
      }
      setSaving(false)
      alert("Changes saved successfully!")
      navigate("/") 


    } catch (error) {
      setSaving(false)
      alert("Failed to save changes!")
      console.log(error)
    }
  
  }



  return (
    <div>
      <div className='min-h-screen bg-base-200'>
        <div className='container mx-auto px-4 py-8'>
            <div className='max-w-2x1 mx-auto'>
              
              <div>
                <div className='flex  items-center justify-between mb-6'>
                  <Link to={"/"} className='btn btn-ghost'>
                  <ArrowLeft className='h-5 w-5' />
                  Back to Notes
                  </Link>

                  <button onClick={() => onDelete()} disabled={saving }  className='btn btn-error btn-outline'>
                     <Trash2Icon className='h-5 w-5' />
                        Delete Note
                   </button>
                </div>
              </div>
          

          <div className='card bg-base-100'>
            <div className='card-body'>
              <div className='form-control mb-4'>
                <label className='label-text mb-4'>Title</label>
                <input type="text" 
                    placeholder='Note Title'
                    className="input input-bordered"
                    value={note?.title || ''}
                    onChange={(e) => setNote({...note, title: e.target.value})}
                />
              
              <div className='form-control mb-4'>
                <label className='label-text mb-4 mt-4'>Content</label>
                <textarea
                  placeholder='Write your note here...'
                  className='textarea textarea-bordered h-32'
                  value={note?.content || ''}
                  onChange={(e) => setNote({...note, content: e.target.value})}
                />

                <button className='btn btn-ghost btn-xs text-error mt-4' onClick={() => SaveChanges()} disabled={saving}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
          </div>
        </div>

    </div>
  )
}

export default NoteDetailPage