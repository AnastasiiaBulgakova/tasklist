import React from "react";
import './header.css'

const Header = () => {

    return(
        
    <header className="header">
    <h1>todos</h1>
    <form className="new-todo-form">
      <input className="new-todo" placeholder="Task" autoFocus />
      <input className="new-todo-form__timer" placeholder="Min" autoFocus />
      <input className="new-todo-form__timer" placeholder="Sec" autoFocus />
    </form>
    </header>
    
    );
}

export default Header;