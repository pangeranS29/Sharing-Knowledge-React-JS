import { memo } from "react";
import "./index.css";
// import axios from "axios";
import { PostApi } from "./services/resources";
import { Link, Route, Routes } from "react-router";
import AboutScreens from "./screens/about-screens";
import { toast } from "sonner";

function App() {
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/1"
      );
      const data = await response.json();
      console.log("data", data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchData2 = async () => {
    await fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => {
        console.log("response", response);
        toast.success("success");
        return response.json();
      })
      .then((data) => {
        console.log("data", data);
      });
  };

  // useEffect(() => {
  console.log("response", fetchData());
  console.log("fetchData2", fetchData2());
  // }, []);

  return (
    <div className="flex justify-center items-center text-red-200">
      <Link to={"/about"}>About</Link>
      <Link to={"/about"}>Homes</Link>
      <Routes>
        <Route path="/" element={<div>Homes</div>} />
        <Route path="/about" element={<AboutScreens />} />
      </Routes>
    </div>
  );
}

export default App;
