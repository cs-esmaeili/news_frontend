import React, { useState, useEffect, useRef } from 'react';

const InputList = ({ length }) => {
  // Initialize an array of refs. In this case, we're assuming length is the number of input elements
  const inputRefs = useRef(Array.from({ length }, () => React.createRef()));

  // Helper function to focus the next input
  const focusNextInput = (index) => {
    const nextIndex = index + 1;
    if (nextIndex < length) {
      inputRefs.current[nextIndex].current.focus();
    }
  };

  // Helper function to focus the previous input
  const focusPrevInput = (index) => {
    const prevIndex = index - 1;
    if (prevIndex >= 0) {
      inputRefs.current[prevIndex].current.focus();
    }
  };

  // Render the input fields dynamically based on the provided length
  const inputs = Array.from({ length }).map((_, index) => (
    <input
      key={index}
      ref={inputRefs.current[index]}
      onKeyDown={(e) => {
        if (e.key === 'Backspace' && e.currentTarget.value === '') {
          focusPrevInput(index);
        } else if (e.key >= '0' && e.key <= '9' && e.currentTarget.value.length === 1) {
          focusNextInput(index);
        }
      }}
      onChange={(e) => {
        // Handle the change event as needed, e.g., updating state or props
      }}
      maxLength={2} // Set the appropriate maxLength as per your requirement
    />
  ));

  return (
    <div>
      {inputs}
    </div>
  );
};

export default InputList;