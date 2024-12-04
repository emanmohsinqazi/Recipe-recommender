import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import GenerateRecipe from './pages/GenerateRecipe';
import { AuthProvider } from './context/AuthContext';
import { RecipeProvider } from './context/RecipeContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <RecipeProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/generate" element={<GenerateRecipe />} />
            </Routes>
          </div>
        </RecipeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;