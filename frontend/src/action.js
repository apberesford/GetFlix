import React, { useState } from "react";
import styled from "styled-components";


const Action = ({ color, size, children, onClick }) => {
  const [isHovered, setISHovered] = useState(false);
  return (
    <Wrapper
      onClick={onClick}
      onMouseEnter={() => setISHovered(true)}
      onMouseLeave={() => {
        setISHovered(false);
      }}
      style={{ width: size, height: size, color: isHovered ? color : null }}
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.button`
  display: block;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
  &:active {
    color: inherit;
  }
`;
export default Action;
