// import { useEffect, useState } from 'react'
// // import './App.css'

// interface User {
//     id: number
//     username: string
//     password: string
// }

// interface Tag {
//     id: number
//     name: string
//     userId: number
// }

// interface Note {
//     id?: number
//     name: string
//     description: string
//     userId: number
//     tagId: number
// }

// function App() {
//     const API_URL = 'http://localhost:3001/notes'
//     const USERS_API_URL = 'http://localhost:3001/users'
//     const TAGS_API_URL = 'http://localhost:3001/tags'

//     const [user, setUser] = useState<User | null>(null)
//     const [authData, setAuthData] = useState({ username: '', password: '' })
//     const [isLogin, setIsLogin] = useState(true)

//     const [tags, setTags] = useState<Tag[]>([])
//     const [selectedTagId, setSelectedTagId] = useState<number | null>(null)
//     const [newTagName, setNewTagName] = useState('')
//     const [notes, setNotes] = useState<Note[]>([])
//     const [formData, setFormData] = useState<Omit<Note, 'id' | 'userId' | 'tagId'>>({ name: '', description: '' })
//     const [editingId, setEditingId] = useState<number | null>(null)

//     useEffect(() => {
//         if (user) {
//             fetchTags(user.id)
//         }
//     }, [user])

//     const fetchTags = async (userId: number) => {
//         try {
//             const res = await fetch(`${TAGS_API_URL}?userId=${userId}`)
//             const data = await res.json()
//             setTags(data)
//         } catch (err) {
//             console.error('Error fetching tags:', err)
//         }
//     }

//     const fetchNotes = async (tagId: number) => {
//         try {
//             const res = await fetch(`${API_URL}?tagId=${tagId}`)
//             const data = await res.json()
//             setNotes(data)
//         } catch (err) {
//             console.error('Error fetching notes:', err)
//         }
//     }

//     const handleAuth = async (e: React.FormEvent) => {
//         e.preventDefault()
//         if (isLogin) {
//             // Log in
//             const res = await fetch(`${USERS_API_URL}?username=${authData.username}&password=${authData.password}`)
//             const data = await res.json()
//             if (data.length > 0) {
//                 setUser(data[0])
//             } else {
//                 alert('Invalid credentials')
//             }
//         } else {
//             // Sign up
//             const check = await fetch(`${USERS_API_URL}?username=${authData.username}`)
//             const exists = await check.json()
//             if (exists.length > 0) {
//                 alert('Username already exists')
//                 return
//             }

//             const res = await fetch(USERS_API_URL, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(authData)
//             })
//             const newUser = await res.json()
//             setUser(newUser) // Auto-login after signup
//         }

//         setAuthData({ username: '', password: '' })
//     }

//     const handleCreateTag = async (e: React.FormEvent) => {
//         e.preventDefault()
//         if (!user || !newTagName) return

//         try {
//             const res = await fetch(TAGS_API_URL, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ name: newTagName, userId: user.id })
//             })
//             const newTag = await res.json()
//             setTags([...tags, newTag])
//             setNewTagName('')
//         } catch (err) {
//             console.error('Error creating tag:', err)
//         }
//     }

//     const handleSelectTag = (tagId: number) => {
//         setSelectedTagId(tagId)
//         fetchNotes(tagId)
//         setFormData({ name: '', description: '' })
//         setEditingId(null)
//     }

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault()
//         if (!user || !selectedTagId) return

//         try {
//             const noteData = { ...formData, userId: user.id, tagId: selectedTagId }
//             if (editingId) {
//                 await fetch(`${API_URL}/${editingId}`, {
//                     method: 'PUT',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({ ...noteData, id: editingId })
//                 })
//                 setEditingId(null)
//             } else {
//                 await fetch(API_URL, {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify(noteData)
//                 })
//             }

//             setFormData({ name: '', description: '' })
//             fetchNotes(selectedTagId)
//         } catch (err) {
//             console.error('Error saving note:', err)
//         }
//     }

//     const handleEdit = (note: Note) => {
//         setFormData({ name: note.name, description: note.description })
//         setEditingId(note.id!)
//     }

//     const handleDelete = async (id: number) => {
//         try {
//             await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
//             if (selectedTagId) fetchNotes(selectedTagId)
//         } catch (err) {
//             console.error('Error deleting note:', err)
//         }
//     }

//     const logout = () => {
//         setUser(null)
//         setTags([])
//         setNotes([])
//         setSelectedTagId(null)
//         setNewTagName('')
//         setFormData({ name: '', description: '' })
//         setEditingId(null)
//     }

//     return (
//         <div className="app">
//             <h1>Notes App with Tags</h1>

//             {!user ? (
//                 <div className="auth-form">
//                     <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
//                     <form onSubmit={handleAuth}>
//                         <input
//                             type="text"
//                             placeholder="Username"
//                             value={authData.username}
//                             onChange={(e) => setAuthData({ ...authData, username: e.target.value })}
//                             required
//                         />
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             value={authData.password}
//                             onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
//                             required
//                         />
//                         <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
//                     </form>
//                     <button onClick={() => setIsLogin(!isLogin)}>
//                         {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
//                     </button>
//                 </div>
//             ) : (
//                 <>
//                     <h2>Welcome, {user.username} <button onClick={logout}>Logout</button></h2>

//                     <div className="tags-section">
//                         <h3>Create New Tag</h3>
//                         <form onSubmit={handleCreateTag}>
//                             <input
//                                 type="text"
//                                 placeholder="Tag Name"
//                                 value={newTagName}
//                                 onChange={(e) => setNewTagName(e.target.value)}
//                                 required
//                             />
//                             <button type="submit">Add Tag</button>
//                         </form>

//                         <h3>Your Tags</h3>
//                         {tags.length === 0 ? (
//                             <p>No tags found. Create a tag to start adding notes.</p>
//                         ) : (
//                             <ul>
//                                 {tags.map((tag) => (
//                                     <li key={tag.id}>
//                                         {tag.name}
//                                         <button onClick={() => handleSelectTag(tag.id)}>
//                                             {selectedTagId === tag.id ? 'Selected' : 'Select'}
//                                         </button>
//                                     </li>
//                                 ))}
//                             </ul>
//                         )}
//                     </div>

//                     {selectedTagId && (
//                         <>
//                             <h3>Notes for Tag: {tags.find((t) => t.id === selectedTagId)?.name}</h3>
//                             <form onSubmit={handleSubmit} className="form">
//                                 <input
//                                     type="text"
//                                     placeholder="Note Name"
//                                     value={formData.name}
//                                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                                     required
//                                 />
//                                 <textarea
//                                     placeholder="Note Description"
//                                     value={formData.description}
//                                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                                     required
//                                 />
//                                 <button type="submit">{editingId ? 'Update Note' : 'Add Note'}</button>
//                                 {editingId && (
//                                     <button type="button" onClick={() => {
//                                         setEditingId(null)
//                                         setFormData({ name: '', description: '' })
//                                     }}>Cancel</button>
//                                 )}
//                             </form>

//                             <div className="notes-list">
//                                 <h4>Notes</h4>
//                                 {notes.length === 0 ? (
//                                     <p>No notes found for this tag</p>
//                                 ) : (
//                                     <ul>
//                                         {notes.map((note) => (
//                                             <li key={note.id}>
//                                                 <h5>{note.name}</h5>
//                                                 <p>{note.description}</p>
//                                                 <div className="note-actions">
//                                                     <button onClick={() => handleEdit(note)}>Edit</button>
//                                                     <button onClick={() => handleDelete(note.id!)}>Delete</button>
//                                                 </div>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 )}
//                             </div>
//                         </>
//                     )}
//                 </>
//             )}
//         </div>
//     )
// }

// export default App

// -----------------------------------------------------------------------------------------------------------

import { Route, Routes } from "react-router-dom";
import AppProvider from "./context/AppProvider";
import RootLayout from "./layout/RootLayout";
import TagsLayout from "./layout/TagsLayout";
import AddNewTag from "./pages/AddNewTag";
import LogIn from "./pages/LogIN";
import NotFoundPage from "./pages/NotFoundPage";
import SignUp from "./pages/SignUp";
import SingleTag from "./pages/SingleTag";
import Tags from "./pages/Tags";
import User from "./pages/User";
import Home from "./pages/Home";
import ScrolToTop from "./components/ScrolToTop";
import AddNewNote from "./pages/AddNewNote";
import SingleTagLyout from "./layout/SingleTagLayout";
import EditTAg from "./pages/EditTag";
import SingleNoteLayout from "./layout/SingleNoteLayout";
import SingleNote from "./pages/SingleNote";

const App = () => {


    return (
        <AppProvider>
            <ScrolToTop>
                <Routes>
                    <Route path="/" element={<RootLayout />}>
                        <Route index element={<Home />} />
                        <Route path="/login" element={<LogIn />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/user" element={<User />} />
                        <Route path="/tags" element={<TagsLayout />}>
                            <Route index element={<Tags />} />

                            <Route path=":tagId" element={<SingleTagLyout />} >
                                <Route index element={<SingleTag />} />
                                <Route path="addnote" element={<AddNewNote />} />
                                <Route path="edittag" element={<EditTAg />} />

                                <Route path=":noteId" element={<SingleNoteLayout />} >
                                    <Route index element={<SingleNote />} />
                                    {/* <Route path="edittag" element={<EditNote />} /> */}
                                </Route>

                            </Route>

                            <Route path="*" element={<NotFoundPage />} />
                        </Route>
                        <Route path="/newtag" element={<AddNewTag />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </ScrolToTop>
        </AppProvider>
    );
};

export default App;


{/* <Route path=":tagId" element={<SingleTag />} ></Route> */ }