import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Counter from "./components/Counter";
import PostList from "./components/PostsFeature/PostList";
import AddPostForm from "./components/PostsFeature/AddPostForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      {/* <Counter /> */}
      <PostList />
      <AddPostForm />
    </div>
  );
}

export default App;
