import React from "react";
import './FilterCheckbox.css';

function FilterCheckbox({active, toggleCheckbox}) {

 const onClick=()=> {
    toggleCheckbox();
  }

  return (
    <div>
      <div className="checkbox">
        <button className={active ? "checkbox__button checkbox__button_active" :"checkbox__button" }
                type='button' onClick={onClick}></button>
        <p className='checkbox__title'>Короткометражки</p>
      </div>
    </div>
  )
}

export default FilterCheckbox;