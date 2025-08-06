import React from "react";
import Notes from "./Notes/Notes";
import { ThemeProvider } from "./store/ThemeContext";

function App() {
  return (
    <>
      <ThemeProvider>
        <Notes />
      </ThemeProvider>
    </>
  );
}

export default App;
