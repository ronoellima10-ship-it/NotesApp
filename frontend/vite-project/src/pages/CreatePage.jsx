
import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from 'lucide-react'


const CreatePage = () => {

  const [title, setTitle] = React.useState("")
  const [content, setContent] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!title.trim() || !content.trim()) {
      alert("Please fill in both title and content")
      return
    }

    setLoading(true)

    try {
      const response = await fetch('http://localhost:3000/v1/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content })
      })

      if (!response.ok) {
        throw new Error("Failed to create note")
      }

      const newNote = await response.json()
      console.log("Note created:", newNote)

    } catch (error) {
      console.error("Error creating note:", error)
      alert("Failed to create note")
      if(error.response && error.response.status === 429) {
        alert("You have been rate limited. Please try again later.")
      }

    } finally {
      setLoading(false)
      navigate("/") // Redirect to home page after creation 
    }

  }

  return (
    
   <div className='min-h-screen bg-base-200'>
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-2x1 mx-auto'> 
        <Link to={"/"} className='btn btn-ghost mb-6'>
           <ArrowLeftIcon className='size-5' />
           Back to Notes
        </Link>
        <div className="card bg-base-100">
          <div className="card-body">
            <h2 className='card-title text-2x1 mb-4'>
              Create a New Note
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input type="text" 
                    placeholder='Note Title'
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Content</span>
                </label>
                <textarea
                  placeholder='Write your note here...'
                  className='textarea textarea-bordered h-32'
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <button type='submit' className='btn btn-primary' disabled={loading}>
                {loading ? "Creating..." : "Create Note"}
              </button>

            </form>

          </div>

        </div>
      </div>
    </div>
   </div>
  )
}

export default CreatePage