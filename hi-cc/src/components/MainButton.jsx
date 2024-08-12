import React, { useEffect } from "react";
import styled from "styled-components";

import BasicButton from "../assets/BasicButton.png";
import BasicButtonInactive from "../assets/BasicButtonInactive.png";

export default function MainButton ({ onClick, $valid, children, $position }) {
    useEffect(() => {
    }, [$valid])
    return (
        <ButtonWrapper $position={$position}>
            <ButtonImg src={$valid === true ? BasicButton : BasicButtonInactive} onClick={$valid ? onClick : null} $valid={$valid ? "true" : "false"}></ButtonImg>
            <ButtonText onClick={$valid ? onClick : null} $valid={$valid ? "true" : "false"}>{children}</ButtonText>
        </ButtonWrapper>
    )
};

const ButtonWrapper = styled.div`
    position: ${props => props.$position === "fixed" ? "fixed" : "relative"};
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    top: ${props => props.$position === "fixed" ? "79vh" : "none"};
    margin: 8vh 0;
    z-index: 100000;
`

const ButtonImg = styled.img`
    position: absolute;
    min-width: 225px;
    width: 75vw;
    max-width: 300px;
    justify-content: center;
    align-items: center;
    cursor: ${props => props.$valid === "true" ? "pointer" : "default"};
`

const ButtonText = styled.span`
    position: absolute;
    min-width: 225px;
    width: 30vw;
    max-width: 300px;
    text-align: center;
    font-size: 8vw;
    cursor: ${props => props.$valid === "true" ? "pointer" : "default"};
    color: ${props => props.$valid === "true" ? "#000000" : "#FFFFFF"};
    @media screen and (max-width: 300px) {
        font-size: 25px;
    }
    @media screen and (min-width: 450px) {
        font-size: 35px;
    }
`