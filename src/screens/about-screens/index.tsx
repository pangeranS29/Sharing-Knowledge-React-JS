import { useEffect } from "react";
import { useCounter } from "../../stores/useCounter";
import { TodoApi } from "@/services/resources";

function AboutScreens() {
  const { count, decrement, increment } = useCounter((state) => state);

  useEffect(() => {
    TodoApi.get()
      .then((response) => {
        console.log("response_from_PostApi", response);
      })
      .catch((error) => {
        console.error("error from PostApi", error);
      });
  }, []);

  return (
    <div className="flex flex-col">
      <div className="text-red-700">should be center! counter: {count}</div>

      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => increment()}
      >
        Increment
      </button>
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => decrement()}
      >
        Decrement
      </button>
    </div>
  );
}
export default AboutScreens;
