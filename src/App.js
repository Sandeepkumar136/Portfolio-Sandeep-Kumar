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
// import Profile from "./components/Routes/Profile";
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
import SignUp from "../src/components/Auth/register";
import Profile from "../src/components/Auth/profile";
import Login from "../src/components/Auth/login";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Menifesto from "./components/Routes/Menifesto";

const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Router>
        <DarkModeProvider>
          <LangDialogueboxProvider>
            <FilterDialogueBoxProvider>
              <CertDialogueContextProvider>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<SignUp />} />
                  <Route
                    path="/profile"
                    element={
                      <PrivateRoute user={user}>
                        <Profile />
                      </PrivateRoute>
                    }
                  />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/:id" element={<ServicesDetails />} />
                  <Route path="/books" element={<Books />} />
                  <Route path="/menifesto" element={<Menifesto />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/resume" element={<Resume />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/fordev" element={<ForDev />} />
                  <Route path="/blog" element={<PostList />} />
                  <Route path="/achievements" element={<Achievements />} />
                </Routes>
              </CertDialogueContextProvider>
            </FilterDialogueBoxProvider>
          </LangDialogueboxProvider>
        </DarkModeProvider>
      </Router>
    </>
  );
};

export default App;
