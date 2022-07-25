import React from "react";
import './FilterCheckbox.css';

function FilterCheckbox() {
  const [isActive, setIsActive] = React.useState(false);

  function toggleCheckbox() {
    setIsActive(!isActive);
  }

  return (
    <div>
      <div className="checkbox">
        <button className={isActive ? "checkbox__button" : "checkbox__button checkbox__button_active"}
                type='button' onClick={toggleCheckbox}></button>
        <p className='checkbox__title'>Короткометражки</p>
      </div>
    </div>
  )
}

export default FilterCheckbox;