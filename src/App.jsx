import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Counter from "./components/Counter";
import PostList from "./components/PostList";
import AddPostForm from "./components/AddPostForm";

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
