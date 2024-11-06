import React from "react";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<BlogList />}></Route>
          <Route path="/post/:id" element={<BlogDetail />}></Route>
        </Routes>
      </Router>
    );
  }
}

export default App;
