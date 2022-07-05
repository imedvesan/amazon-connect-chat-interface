// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
 
import React, { useState } from "react";
import styled from "styled-components";
import PT from "prop-types";
import { Button } from "connect-core";
import {
  ReactiveImage,
  TextSection,
  ResponsesSection,
  Title,
  Subtitle
} from "../InteractiveMessage";
 
// have to calculate max height to maintain 16:9 aspect ratio
const ImageContainer = styled.div`
  max-height: calc(95vw * (9/16));
  overflow: hidden;
  display: ${props => props.showImage ? "flex" : "none"};
`;
 
const ButtonComponent = styled(Button)`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: none;
  border: ${({ theme }) => theme.globals.baseBorder};  
  white-space: pre-line;
 
  &:hover {
    background: ${({ theme }) => theme.color.primary};
  }
  
  &:last-of-type {
    border-bottom-left-radius: ${({ theme }) => theme.spacing.mini};
    border-bottom-right-radius: ${({ theme }) => theme.spacing.mini};
    margin-bottom: 0;   
  }
  
`;
 
function ButtonElement({ element, onClick }) {
  const { title, subtitle } = element;
 
  return (
    <ButtonComponent value={title}  onClick={onClick}>
      <div>
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </div>
    </ButtonComponent>
  );
}
 
ImageWithButton.propTypes = {
  content: PT.object.isRequired,
  addMessage: PT.func.isRequired
};
 
export default function ImageWithButton({ content, addMessage }) {
    console.error(content);
  // assumptions: version 1, image data is URL. Guarenteed title exists, at least 1 element.
  const { title, subtitle, elements, imageData, imageDescription } = content;
  const [ imageLoaded, setImageLoaded ] = useState(false);
  
  function onImageLoad(){
    setImageLoaded(true);
  }
 
  function onItemClick(e) {
    addMessage({ text: e.currentTarget.value });
  }
 
  console.log("Inside ImageWithButton");

  return (
    <>
      {(imageData) &&
      <ImageContainer showImage={imageLoaded}>
        <ReactiveImage imageSrc={imageData} imageDescription={imageDescription} onImageLoad={onImageLoad}/>
      </ImageContainer>
      }      
      
      <TextSection>
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </TextSection>
    <ResponsesSection>
      <div>
        {elements.map((button, index) =>
          <ButtonElement key={'element-' + index} element={button} onClick={onItemClick} />
        )}
      </div>
    </ResponsesSection>
    </>
  );
};