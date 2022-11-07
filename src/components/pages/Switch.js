import React from 'react';
import './Switch.css';
import cx from "classnames";
const Switch = ({rounded = true, isToggled, onToggle}) =>{
  const sliderCX = cx("slider", {
      'rounded':rounded,
  });
  return(
      <label class='switch'>
          <input type="checkbox" checked={isToggled} onChange={onToggle}/>
          <span className={sliderCX}/>

      </label>
  );
};


export default Switch