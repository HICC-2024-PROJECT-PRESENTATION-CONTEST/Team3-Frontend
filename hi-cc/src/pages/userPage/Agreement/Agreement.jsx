import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import Button from "../../../components/MainButton";

export default function Agreement() {
    const navigate = useNavigate();
    const [agreement, setAgreement] = useState({
        essential1: false,
        essential2: false
    });

    {/* 이용약관1, 2 값 받아오기 */ }
    const location = useLocation();
    useEffect(() => {
        if (location.state) {
            setAgreement(prevState => ({
                ...prevState,
                ...location.state
            }));
        }
    }, [location.state])

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
        navigate(`${path}`, { state: { ...agreement } });
    }

    function handleClick() {
        navigate('/profile');
    }

    return (
        <AgreementWrapper>
            <AgreementInnerWrapper>
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
                    <CheckboxInnerWrapper onClick={() => handleAgree('essential1')}>
                        <Checkbox $valid={agreement.essential1} />
                    </CheckboxInnerWrapper>
                    <CheckboxTextWrapper>
                        <span>(필수) 서비스 이용 약관</span>
                        <AgreementDetails onClick={() => handleAgreementDetails('1')}>보기</AgreementDetails>
                    </CheckboxTextWrapper>
                </CheckboxWrapper>
                {/* 이용약관2 */}
                <CheckboxWrapper>
                    <CheckboxInnerWrapper onClick={() => handleAgree('essential2')}>
                        <Checkbox $valid={agreement.essential2} />
                    </CheckboxInnerWrapper>
                    <CheckboxTextWrapper>
                        <span>(필수) 개인정보 수집·이용 동의서</span>
                        <AgreementDetails onClick={() => handleAgreementDetails('2')}>보기</AgreementDetails>
                    </CheckboxTextWrapper>
                </CheckboxWrapper>

            </AgreementInnerWrapper>
            {/* 동의하고 넘어가는 버튼 */}
            <Button onClick={handleClick} $valid={isAllAgreed} $position="relative">동의하기</Button>
        </AgreementWrapper>
    )
};

const AgreementWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100vw;
    min-height: 100vh;
    height: auto;
    align-items: center;
    background: #F9DBDD;
`

const AgreementInnerWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: auto;
    min-height: max(79vh, 400px);
    align-items: center;
`

const Title = styled.span`
    width: 75vw;
    min-width: calc(230px -5vw);
    max-width: calc(480px - 5vw);
    margin: max(11vh, 80px) 0 max(3vh, 22px) 0;
    top: 100px;
`

const TitleText = styled.div`
    margin: min(1vh, 5px) 0;
    font-size: 25px;
    word-break: keep-all;
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

    margin-bottom: 5px;
    border: solid 3px #000000;
    border-radius: 20px;
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
    margin: 7px 0;
    font-size: 14px;
    align-items: center;
    cursor: pointer;
`

const CheckboxInnerWrapper = styled.div`
    width: 21px;
    height: 21px;
    border: solid;
    border-width: 3px;
    border-radius: 5px;
    border-color: #000000; 
    background-color: #FFFFFF;
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
    margin: 0 1vw;
`
const CheckboxTextWrapper = styled.div`
    display: inline-block;
    justify-content: space-between;
    width: calc(100% - 2vw - 21px);
    margin: 0 1vw;
    color: #464646;
    @media screen and (max-width: 360px) {
        font-size: 10px;
    }
`

const AgreementDetails = styled.div`
    text-decoration: underline;
    float: right;
`