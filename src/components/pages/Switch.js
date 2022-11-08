import React from 'react';
import './Switch.css';

const Switch = ({label}) => {
    console.log(label);
    return (
        <div className="container">
          {label}{" "}
          <div className="toggle-switch">
            <input type="checkbox" className="checkbox" 
                   name={label} id={label} />
            {/* {label} */}
            <label className="label" htmlFor={label}>
              <span className="inner" />
              <span className="switch" />
            </label>
          </div>
        </div>
      );
    
}
export default Switch