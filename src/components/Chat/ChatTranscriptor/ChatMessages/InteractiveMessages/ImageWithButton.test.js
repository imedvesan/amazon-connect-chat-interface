// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import { render, fireEvent } from "@testing-library/react"
import { InteractiveMessageType } from "../../../datamodel/Model";
import { ThemeProvider } from "../../../../../theme";
import ImageWithButton from "./ImageWithButton";
 
const mockImageWithButtonContent = {
    title: "ListPickerTitle",
    subtitle: "ListPickerSubTitle",
    elements: [
        {
            title: "ListPickerElementTitle",
        },
        {
            title: "AnotherListPickerElementTitle",
        }
    ],
    imageData: "ListPickerImageData",
    imageDescription: "ListPickerImageDescription"
};


const mockImageWithButtonNoImageContent = {
    title: "ListPickerTitle",
    subtitle: "ListPickerSubTitle",
    elements: [
        {
            title: "ListPickerElementTitle",
        },
        {
            title: "AnotherListPickerElementTitle",
        }
    ],
};
 
const mockImageWithButtonNoButtonContent = {
    title: "ListPickerTitle",
    subtitle: "ListPickerSubTitle",
    elements: [],
    imageData: "ListPickerImageData",
    imageDescription: "ListPickerImageDescription"
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
 
    expect(mockImageWithButton.getByText("ListPickerTitle")).toBeDefined();
    expect(mockImageWithButton.getByText("ImageContainer")).toBeDefined();
 
    expect(mockImageWithButton.getByText("ListPickerElementTitle")).toBeDefined();
    expect(mockImageWithButton.getByText("AnotherListPickerElementTitle")).toBeDefined();
 
    fireEvent.click(mockImageWithButton.getByText("ListPickerElementTitle"));
    expect(mockProps.addMessage).toHaveBeenCalledTimes(1);
    expect(mockProps.addMessage).toHaveBeenCalledWith({text: "ListPickerElementTitle"});
});

test("should render without image if no image data passed in", () => {
    const addMessage = jest.fn().mockResolvedValue(undefined);
    mockProps = {content: mockImageWithButtonNoImageContent, addMessage: addMessage};

    renderElement(mockProps);
 
    expect(mockImageWithButton.getByText("ListPickerTitle")).toBeDefined();
    expect(mockImageWithButton.getByText("ImageContainer")).toBeUndefined();
 
    expect(mockImageWithButton.getByText("ListPickerElementTitle")).toBeDefined();
    expect(mockImageWithButton.getByText("AnotherListPickerElementTitle")).toBeDefined();
 
    fireEvent.click(mockImageWithButton.getByText("ListPickerElementTitle"));
    expect(mockProps.addMessage).toHaveBeenCalledTimes(1);
    expect(mockProps.addMessage).toHaveBeenCalledWith({text: "ListPickerElementTitle"});
});

test("should render without buttons if no button elements passed in", () => {
    const addMessage = jest.fn().mockResolvedValue(undefined);
    mockProps = {content: mockImageWithButtonNoButtonContent, addMessage: addMessage};

    renderElement(mockProps);
 
    expect(mockImageWithButton.getByText("ListPickerTitle")).toBeDefined();
    expect(mockImageWithButton.getByAltText("ListPickerImageDescription")).toDefined();
 
    expect(mockImageWithButton.getByText("ListPickerElementTitle")).toBeDefined();
    expect(mockImageWithButton.getByText("AnotherListPickerElementTitle")).toBeDefined();
 
    fireEvent.click(mockImageWithButton.getByText("ListPickerElementTitle"));
    expect(mockProps.addMessage).toHaveBeenCalledTimes(0);
    // expect(mockProps.addMessage).toHaveBeenCalledWith({text: "ListPickerElementTitle"});
});