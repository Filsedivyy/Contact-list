import "./style.css";
import LandingPageComponent from "./components/LandingPage";
import ContactPanel from "./components/ContactPanel";
import EditComponent from "./components/EditComponent";
import EditInputComponent from "./components/EditInputComponent";
const App = () => {
  return (
    <>
      <ContactPanel />
      <EditComponent />;
    </>
  );
};

export default App;
