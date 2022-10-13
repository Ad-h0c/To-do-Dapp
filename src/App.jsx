import Header from "./components/Header";
import Hero from "./components/Home";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Todo from "./components/Todo";
import SignUp from "./components/SignUp";
import PageNotFound from "./components/PageNotFound";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col items-center md:pr-20">
        <Header />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/App" element={<Todo />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
