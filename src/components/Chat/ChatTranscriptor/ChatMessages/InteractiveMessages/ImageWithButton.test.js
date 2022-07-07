// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import { render, fireEvent } from "@testing-library/react"
import { InteractiveMessageType } from "../../../datamodel/Model";
import { ThemeProvider } from "../../../../../theme";
import ImageWithButton from "./ImageWithButton";
 
const mockImageWithButtonContent = {
    title: "MessageTitle",
    subtitle: "MessageSubTitle",
    elements: [
        {
            title: "Button1Title",
        },
        {
            title: "Button2Title",
        }
    ],
    imageData: "ImageData",
    imageDescription: "ImageDescription"
};


const mockImageWithButtonNoImageContent = {
    title: "MessageTitle",
    subtitle: "MessageSubTitle",
    elements: [
        {
            title: "Button1Title",
        },
        {
            title: "Button2Title",
        }
    ],
};
 
const mockImageWithButtonNoButtonContent = {
    title: "MessageTitle",
    subtitle: "MessageSubTitle",
    elements: [],
    imageData: "ImageData",
    imageDescription: "ImageDescription"
};

 
let mockImageWithButton;
let mockProps;
 
function renderElement(props) {
    mockImageWithButton = render(
        <ThemeProvider>
            <ImageWithButton {...props}/>
        </ThemeProvider>
    );
}
 
test("Style should match the snapshot", () => {
    const addMessage = jest.fn().mockResolvedValue(undefined);
    mockProps = {content: mockImageWithButtonContent, addMessage: addMessage};

    renderElement(mockProps);
    expect(mockImageWithButton).toMatchSnapshot();
});
 
test("Should be able to use ImageWithButton", () => {
    const addMessage = jest.fn().mockResolvedValue(undefined);
    mockProps = {content: mockImageWithButtonContent, addMessage: addMessage};

    renderElement(mockProps);
 
    expect(mockImageWithButton.getByText("MessageTitle")).toBeDefined();
    expect(mockImageWithButton.getByAltText("ImageDescription")).toBeDefined();
 
    expect(mockImageWithButton.getByText("Button1Title")).toBeDefined();
    expect(mockImageWithButton.getByText("Button2Title")).toBeDefined();
 
    fireEvent.click(mockImageWithButton.getByText("Button1Title"));
    expect(mockProps.addMessage).toHaveBeenCalledTimes(1);
    expect(mockProps.addMessage).toHaveBeenCalledWith({text: "Button1Title"});
});

test("should render without image if no image data passed in", () => {
    const addMessage = jest.fn().mockResolvedValue(undefined);
    mockProps = {content: mockImageWithButtonNoImageContent, addMessage: addMessage};

    renderElement(mockProps);
 
    expect(mockImageWithButton.getByText("MessageTitle")).toBeDefined();
    expect(mockImageWithButton.queryByText("ImageDescription")).toBeNull();
 
    expect(mockImageWithButton.getByText("Button1Title")).toBeDefined();
    expect(mockImageWithButton.getByText("Button2Title")).toBeDefined();
 
    fireEvent.click(mockImageWithButton.getByText("Button1Title"));
    expect(mockProps.addMessage).toHaveBeenCalledTimes(1);
    expect(mockProps.addMessage).toHaveBeenCalledWith({text: "Button1Title"});
});

test("should render without buttons if no button elements passed in", () => {
    const addMessage = jest.fn().mockResolvedValue(undefined);
    mockProps = {content: mockImageWithButtonNoButtonContent, addMessage: addMessage};

    renderElement(mockProps);
 
    expect(mockImageWithButton.getByText("MessageTitle")).toBeDefined();
    expect(mockImageWithButton.getByAltText("ImageDescription")).toBeDefined();
 
    expect(mockImageWithButton.queryByText("Button1Title")).toBeNull();
    expect(mockImageWithButton.queryByText("Button2Title")).toBeNull();
});