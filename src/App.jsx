import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./page/Home";
import { Blog } from "./page/Blog";
import { Layout } from "./layout/Layout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
      </Route>
    </Routes>
  );
}

export default App;
