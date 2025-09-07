// src/App.jsx
import React, { useEffect, useState } from "react";
import Navbar from "./components/navigation/Navbar";
import "./components/styles/Style.css";
import Home from "./components/Routes/Home";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Services from "./components/Routes/Services";
import Books from "./components/Routes/Books";
import Projects from "./components/Routes/Projects";
import Achievements from "./components/Routes/Achievements";
import Resume from "./components/Routes/Resume";
import About from "./components/Routes/About";
import { DarkModeProvider } from "./components/context/DarkModeContext";
import { LangDialogueboxProvider } from "./components/context/LanguageContext";
import { FilterDialogueBoxProvider } from "./components/context/FilterContext";
import ServicesDetails from "./components/contents/ServicesDetails";
import { CertDialogueContextProvider } from "./components/context/CertDialogueContext";
import ForDev from "./components/Routes/ForDev";
import PostList from "./components/Routes/PostList";
import { auth } from "./components/Auth/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

import SignUp from "./components/Auth/register";
import Profile from "./components/Auth/profile";
import Login from "./components/Auth/login";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Menifesto from "./components/Routes/Menifesto";
import { PDialogueBoxProvider } from "./components/context/PDialogueBoxContext";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <DarkModeProvider>
        <LangDialogueboxProvider>
          <PDialogueBoxProvider>
          <FilterDialogueBoxProvider>
            <CertDialogueContextProvider>
              <Navbar />
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:id" element={<ServicesDetails />} />
                <Route path="/books" element={<Books />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/about" element={<About />} />
                <Route path="/fordev" element={<ForDev />} />
                <Route path="/blog" element={<PostList />} />

                {/* Protected routes */}
                <Route element={<PrivateRoute user={user} />}>
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/manifesto" element={<Menifesto />} />
                  <Route path="/resume" element={<Resume />} />
                  <Route path="/achievements" element={<Achievements />} />
                </Route>

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </CertDialogueContextProvider>
          </FilterDialogueBoxProvider>
          </PDialogueBoxProvider>
        </LangDialogueboxProvider>
      </DarkModeProvider>
    </Router>
  );
};

export default App;
