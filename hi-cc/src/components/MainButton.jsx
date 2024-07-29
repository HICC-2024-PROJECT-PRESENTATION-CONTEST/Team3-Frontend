import React, { useEffect } from "react";
import styled from "styled-components";

import BasicButton from "../assets/BasicButton.png";
import BasicButtonInactive from "../assets/BasicButtonInactive.png";

export default function MainButton ({ onClick, $valid, children }) {
    useEffect(() => {
    }, [$valid])
    return (
        <ButtonWrapper>
            <ButtonImg src={$valid === true ? BasicButton : BasicButtonInactive} onClick={$valid ? onClick : null} $valid={$valid ? "true" : "false"}></ButtonImg>
            <ButtonText onClick={$valid ? onClick : null} $valid={$valid ? "true" : "false"}>{children}</ButtonText>
        </ButtonWrapper>
    )
};

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    cursor: ${props => props.$valid === "true" ? "pointer" : "default"};
    z-index: 0;
`

const ButtonImg = styled.img`
    position: absolute;
    justify-content: center;
    align-items: center;
    bottom: 43px;
    @media screen and (max-width: 360px) {
        width: 200px;
        height: auto;
    }
`

const ButtonText = styled.span`
    position: absolute;
    font-size: 30px;
    color: url(${props => props.$valid === "true" ? "#000000" : "#FFFFFF"});
    bottom: 59px;
    @media screen and (max-width: 360px) {
        font-size: 23px;
        bottom: 53px;
    }
`