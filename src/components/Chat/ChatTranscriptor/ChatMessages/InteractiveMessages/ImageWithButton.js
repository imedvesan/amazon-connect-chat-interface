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
  display: inline;
  justify-content: center;
  margin: 0 10px 10px 0;
  max-width: none;
  border: ${({ theme }) => theme.globals.baseBorder};  
  white-space: pre-line;
  border-radius: ${({ theme }) => theme.spacing.mini};
 
  &:hover {
    background: ${({ theme }) => theme.color.primary};
  }
    
`;
 
function ButtonElement({ element, onClick }) {
  const { title, value } = element;
 
  return (
    <ButtonComponent value={value || title}  onClick={onClick}>
      <div>
        <Title>{title}</Title>
      </div>
    </ButtonComponent>
  );
}
 
ImageWithButton.propTypes = {
  content: PT.object.isRequired,
  addMessage: PT.func.isRequired
};
 
export default function ImageWithButton({ content, addMessage }) {
  // assumptions: version 1, image data is URL. Guarenteed title exists, at least 1 element.
  const { title, subtitle, elements, imageData, imageDescription } = content;
  const [ imageLoaded, setImageLoaded ] = useState(false);
  
  function onImageLoad(){
    setImageLoaded(true);
  }
 
  function onItemClick(e) {
    addMessage({ text: e.currentTarget.value });
  }
 
  return (
    <>
      {title && 
      <TextSection>
        <Title>{title}</Title>
      </TextSection>
      }

    {(imageData) &&
      <ImageContainer showImage={imageLoaded}>
        <ReactiveImage imageSrc={imageData} imageDescription={imageDescription} onImageLoad={onImageLoad}/>
      </ImageContainer>
    }      

      {subtitle && 
      <TextSection>
        <Subtitle>{subtitle}</Subtitle>
      </TextSection>
      }

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