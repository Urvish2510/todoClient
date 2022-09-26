import React from "react";
import "./App.css";

import Activities from "./components/activities/Activities";
import FormComponent from "./components/Form/FormComponent";

const App = () => {
  return (
    <div className="app">
      <header className="app__header">
        <h1 className="header__title">Productivity Tracker</h1>
        <FormComponent />
      </header>
      <main className="app__main">
        <Activities />
      </main>
    </div>
  );
};

export default App;
