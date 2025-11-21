import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/loginPage";
import Signup from "./Pages/signupPage";
import Home from "./Pages/homePage";
import GenerateRecipe from "./Pages/generateRecipePage";
import Favorites from "./Pages/favouritePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/generateRecipe" element={<GenerateRecipe />} />
        <Route path="/favourite" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
