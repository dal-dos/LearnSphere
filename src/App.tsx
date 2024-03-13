import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation, Home, Dashboard, Profile, Login, Signup, Lectures, Posts, Post, PostLecture } from "./components"; 
import "./App.css"
function App() {

  return (

    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/" element={<Dashboard />} />
        <Route path="/profile/" element={<Profile />}>
          <Route path=":postSlug" element={<Profile />} />
        </Route>
        <Route path="/login/" element={<Login />} />
        <Route path="/signup/" element={<Signup />} />
        <Route path="/post-lecture/" element={<PostLecture />}/>
        <Route path="/lectures/" element={<Lectures />}>
          <Route index element={<Posts />} />
          <Route path=":postSlug" element={<Post />} />
        
        </Route>
      </Routes>
    </Router>
  )
}

export default App
