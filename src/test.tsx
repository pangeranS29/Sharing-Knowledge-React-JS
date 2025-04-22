import "./App.css";
import { CardComponent } from "./components/card-component";

function App() {
  const onCancel = () => {
    console.log("Cancel");
  };

  const onSubmit = () => {
    console.log("Submit");
  };
  return (
    <div>
      <CardComponent
        header={{
          title: "Card Title",
          description: "Card Description",
        }}
        onCancel={onCancel}
        onSubmit={onSubmit}
      >
        <div>Card Content</div>
      </CardComponent>
    </div>
  );
}

export default App;
