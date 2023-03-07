import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Counter from "./components/Counter";
import PostList from "./components/PostsFeature/PostList";
import AddPostForm from "./components/PostsFeature/AddPostForm";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SinglePostPage from "./components/PostsFeature/SinglePostPage"

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<PostList />} />

        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
