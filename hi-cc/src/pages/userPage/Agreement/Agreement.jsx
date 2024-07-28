import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "../../../components/MainButton";

export default function Agreement() {
    const navigate = useNavigate();
    const [agreement, setAgreement] = useState({
        essential1: false,
        essential2: false
    });

    let isAllAgreed = Object.values(agreement).every(value => value);

    function handleAllAgree() {
        const allAgreed = agreement.essential1 && agreement.essential2;
        setAgreement({
            essential1: !allAgreed,
            essential2: !allAgreed,
        });
    }

    function handleAgree(item) {
        setAgreement(prevState => ({
            ...prevState,
            [item]: !prevState[item]
        }))
    }

    function handleClick() {
        navigate('/profile');
    }

    return (
        <AgreementWrapper>
            <Title>서비스 이용을 위한</Title>
            <Title>이용약관 동의</Title>
            <AgreeAllButton onClick={handleAllAgree}>
                <CheckboxWrapper>
                    <Checkbox $valid={isAllAgreed}/>
                </CheckboxWrapper>
                <ButtonText>모두 동의하기</ButtonText>
            </AgreeAllButton>
            <CheckboxWrapper>
                <Checkbox onClick={() => handleAgree('essential1')} $valid={agreement.essential1}/>
            </CheckboxWrapper>
            (필수)
            <CheckboxWrapper>
                <Checkbox onClick={() => handleAgree('essential2')} $valid={agreement.essential2}/>
            </CheckboxWrapper>
            (필수)
            <Button onClick={handleClick} $valid={isAllAgreed}>동의하기</Button>
        </AgreementWrapper>
    )
};

const AgreementWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    align-items: center;
    background: #F9DBDD;
`

const Title = styled.span`
    font-size: 25px;
    top: 100px;
`

const AgreeAllButton = styled.div`
    display: flex;
    align-items: center;
    width: 80vw;
    min-width: 230px;
    max-width: 480px;
    height: 53px;
    border: solid;
    border-width: 3px;
    border-radius: 20px;
    border-color: #000000;
    background-color: #FAA8B1;
    cursor: pointer;
    z-index: 100;
`

const CheckboxWrapper = styled.div`
    width: 21px;
    height: 21px;
    border: solid;
    border-width: 3px;
    border-radius: 5px;
    border-color: #000000; 
    background-color: #FFFFFF;
    margin: 0 1vw 0 3vw;
    z-index: 1;
`

const Checkbox = styled.div`
    width: 17;
    height: 17px;
    border-radius: 5px;
    background-color: ${props => props.$valid ? "black" : "white"};
    margin: 2px;
    z-index: 1;
`

const ButtonText = styled.span`
    font-size: 17px;
`