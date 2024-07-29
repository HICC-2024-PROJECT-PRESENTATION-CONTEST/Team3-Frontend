import { useState } from "react";
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

    function handleAgreementDetails(path) {
        navigate(`${path}`)
    }

    function handleClick() {
        navigate('/profile');
    }

    return (
        <AgreementWrapper>
            <Title>
                <TitleText>서비스 이용을 위한</TitleText>
                <TitleText>이용약관 동의</TitleText>
                <DescriptionText>
                    원활한 서비스 이용을 위해
                </DescriptionText>
                <DescriptionText>
                    필수 항목 동의가 필요합니다.
                </DescriptionText>
            </Title>
            {/* 모두 동의하기 버튼 */}
            <AgreeAllButton onClick={handleAllAgree}>
                <CheckboxWrapper>
                    <CheckboxInnerWrapper>
                        <Checkbox $valid={isAllAgreed} />
                    </CheckboxInnerWrapper>
                    <MainButtonText>모두 동의하기</MainButtonText>
                </CheckboxWrapper>
            </AgreeAllButton>

            {/* 이용약관1 */}
            <CheckboxWrapper>
                <CheckboxInnerWrapper>
                    <Checkbox onClick={() => handleAgree('essential1')} $valid={agreement.essential1} />
                </CheckboxInnerWrapper>
                <CheckboxTextWrapper>
                    (<span>필수) 서비스 이용 약관</span>
                    <AgreementDetails onClick={() => handleAgreementDetails('1')}>보기</AgreementDetails>
                </CheckboxTextWrapper>
            </CheckboxWrapper>
            {/* 이용약관2 */}
            <CheckboxWrapper>
                <CheckboxInnerWrapper>
                    <Checkbox onClick={() => handleAgree('essential2')} $valid={agreement.essential2} />
                </CheckboxInnerWrapper>
                <CheckboxTextWrapper>
                    <span>(필수) 개인정보 수집·이용 동의서</span>
                    <AgreementDetails onClick={() => handleAgreementDetails('2')}>보기</AgreementDetails>
                </CheckboxTextWrapper>
            </CheckboxWrapper>


            {/* 동의하고 넘어가는 버튼 */}
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
    width: 75vw;
    min-width: calc(230px -5vw);
    max-width: calc(480px - 5vw);
    margin: 11vh 0 3vh 0;
    top: 100px;
`

const TitleText = styled.div`
    margin: 1vh 0;
    font-size: 25px;
`

const DescriptionText = styled.div`
    font-size: 13px;
    color: #464646;
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
    justify-content: center;
    cursor: pointer;
    z-index: 100;
`

const CheckboxWrapper = styled.div`
    display: flex;
    width: 75vw;
    min-width: 200px;
    max-width: 460px;
    height: auto;
    margin: 2vh 0;
    font-size: 14px;
    align-items: center;
`

const CheckboxInnerWrapper = styled.div`
    width: 21px;
    height: 21px;
    border: solid;
    border-width: 3px;
    border-radius: 5px;
    border-color: #000000; 
    background-color: #FFFFFF;
    margin-right: 1vw;
`

const Checkbox = styled.div`
    width: 15;
    height: 15px;
    border-radius: 2px;
    background-color: ${props => props.$valid ? "black" : "white"};
    margin: 3px;
    z-index: 1;
`

const MainButtonText = styled.span`
    font-size: 17px;
`
const CheckboxTextWrapper = styled.div`
    display: inline-block;
    width: 100%;
    color: #464646;
    @media screen and (max-width: 360px) {
        font-size: 10px;
    }
`

const AgreementDetails = styled.div`
    text-decoration: underline;
    float: right;
`