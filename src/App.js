import { Container } from "react-bootstrap";
import "./App.css";
import AdminBox from "./components/AdminBox";
import Header from "./components/Header";
import Timer from "./components/Timer";
import VestedAddresses from "./components/VestedAddresses";

function App() {
  return (
    <Container>
      <Header />
      <main className="row">
        <AdminBox />
        <Timer />
        <VestedAddresses />
      </main>
    </Container>
  );
}

export default App;
