import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./page/Home";
import { Blog, AddBlog, EditBlog, Delete } from "./page/Pages";
import { Layout } from "./layout/Layout"

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/add" element={<AddBlog />} />
        <Route path="/edit/:id" element={<EditBlog />} />
        <Route path="/delete/:id" element={<Delete />} />
      </Route>
    </Routes>
  );
}

export default App;
