import React from "react";
import styled from "styled-components";

import BasicButton from "../assets/BasicButton.png";
import BasicButtonInactive from "../assets/BasicButtonInactive.png";

const MainButton = ({ onClick, $valid, children }) => {
    return (
        <ButtonWrapper>
            <ButtonImg src={$valid === "true" ? BasicButton : BasicButtonInactive} onClick={$valid?onClick:""} $valid={$valid ? "true" : "false"}></ButtonImg>
            <ButtonText onClick={$valid?onClick:""} $valid={$valid ? "true" : "false"}>{children}</ButtonText>
        </ButtonWrapper>
    )
};

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    cursor: ${props => props.$valid === "true" ? "pointer" : "default"};
`

const ButtonImg = styled.img`
    position: absolute;
    justify-content: center;
    align-items: center;
    bottom: 43px;
`

const ButtonText = styled.span`
    position: absolute;
    font-size: 30px;
    color: url(${props => props.$valid === "true" ? "#000000" : "#FFFFFF"});
    bottom: 59px;
`


export default MainButton;