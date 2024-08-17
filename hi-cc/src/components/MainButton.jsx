import React, { useEffect } from "react";
import styled from "styled-components";

import BasicButton from "../assets/BasicButton.png";
import BasicButtonInactive from "../assets/BasicButtonInactive.png";

export default function MainButton ({ onClick, $valid, children, $position }) {
    useEffect(() => {
    }, [$valid])
    return (
        <ButtonWrapper $position={$position}>
            <ButtonImg src={$valid ? BasicButton : BasicButtonInactive} onClick={$valid ? onClick : null} $valid={$valid ? "true" : "false"}></ButtonImg>
            <ButtonText onClick={$valid ? onClick : null} $valid={$valid ? "true" : "false"}>{children}</ButtonText>
        </ButtonWrapper>
    )
};

const ButtonWrapper = styled.div`
    position: ${props => props.$position === "fixed" ? "fixed" : "relative"};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: auto;
    top: ${props => props.$position === "fixed" ? "79vh" : "0px"};
    margin: 55px;
    z-index: 100000;
    @media screen and (max-width: 450px) {
        width: 250px;
        margin: 50px;
    }
    @media screen and (max-width: 330px) {
        width: 200px;
        margin: 45px;
    }
`

const ButtonImg = styled.img`
    position: absolute;
    justify-content: center;
    align-items: center;
    cursor: ${props => props.$valid === "true" ? "pointer" : "default"};
    width: 300px;
    @media screen and (max-width: 450px) {
        width: 250px;
    }
    @media screen and (max-width: 330px) {
        width: 200px;
    }
`

const ButtonText = styled.span`
    position: absolute;
    text-align: center;
    width: 300px;
    cursor: ${props => props.$valid === "true" ? "pointer" : "default"};
    color: ${props => props.$valid === "true" ? "#000000" : "#FFFFFF"};
    font-size: 35px;
    @media screen and (max-width: 450px) {
        width: 250px;
        font-size: 30px;
    }
    @media screen and (max-width: 330px) {
        width: 200px;
        font-size: 23px;
    }
`