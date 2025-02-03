import React, { ReactNode, useState, cloneElement, isValidElement } from "react";

interface LogoContainerProps {
  children: ReactNode;
}

const LogoContainer = ({ children }: LogoContainerProps) => {
  const [isAnimated, setIsAnimated] = useState(false);
  const handleMouseEnter = () => {
    setIsAnimated(true);
  }
  const handleMouseLeave = () => {
    setIsAnimated(false);
  }
  return (
    <div 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ border: '1px solid red'}}
    >
     {React.Children.map(children, (child) => {
        if (isValidElement(child)) {
          // Cast child to a ReactElement that accepts isAnimated.
          const childElement = child as React.ReactElement<{ isAnimated?: boolean }>;
          return cloneElement(childElement, { isAnimated });
        }
        return child;
      })}
    </div>
  );
};

export default LogoContainer;