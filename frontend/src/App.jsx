import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import AssignmentList from "./styles/pages/AssignmentList";
import AssignmentDetail from "./styles/pages/AssignmentDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AssignmentList />} />
        <Route path="/assignment/:id" element={<AssignmentDetail/>} />
      </Routes>
    </Router>
  );
}

export default App;