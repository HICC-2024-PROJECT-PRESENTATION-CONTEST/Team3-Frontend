import styled from "styled-components"
import { useNavigate, useLocation } from "react-router-dom";

import Button from "../../../components/MainButton";

export default function Agreement2() {
    const navigate = useNavigate();
    const location = useLocation();
    function handleClick(agree) {
        navigate('/agreement', { state: { ...location.state, essential2: agree } });
    }

    return (
        <AgreementWrapper>
            <AgreementInnerWrapper>
                {/* 이용약관 소개 */}
                <Title>
                    <TitleText>
                        개인정보
                    </TitleText>
                    <TitleText>
                        수집·이용 동의서(필수)
                    </TitleText>
                    <DescriptionText>
                        Hi, CC 서비스의 등을 위해 아래와 같이<br />
                        개인정보를 수집·이용합니다.
                    </DescriptionText>
                </Title>


                {/* 이용약관 세부 사항 */}
                <DetailsWrapper>
                    <DetailsInnerWrapper>
                        <DetailsText>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim modi in
                            exercitationem explicabo, at rem officia autem non porro soluta dolorum
                            officiis ipsa repellat, laudantium ea unde labore, temporibus quas? Lorem
                            ipsum dolor sit amet, consectetur adipisicing elit. Eveniet eius totam
                            quam pariatur ratione, in voluptatem dignissimos laboriosam sint aut!
                            Repudiandae consectetur odit quo corrupti quidem perferendis aut dolores
                            quis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat nam
                            optio dolore recusandae fuga voluptatibus. Ea quam deserunt consectetur
                            quo aut eligendi, molestiae incidunt molestias ullam? Repellendus ratione
                            repellatLorem ipsum, dolor sit amet consectetur adipisicing elit. Enim modi in
                            exercitationem explicabo, at rem officia autem non porro soluta dolorum
                            officiis ipsa repellat, laudantium ea unde labore, temporibus quas?Lorem
                            ipsum dolor sit amet, consectetur adipisicing elit. Eveniet eius totam
                            quam pariatur ratione, in voluptatem dignissimos laboriosam sint aut!
                            Repudiandae consectetur odit quo corrupti quidem perferendis aut dolores
                            quis?Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat nam
                            optio dolore recusandae fuga voluptatibus. Ea quam deserunt consectetur
                            quo aut eligendi, molestiae incidunt molestias ullam? Repellendus ratione
                            repellatLorem ipsum, dolor sit amet consectetur adipisicing elit. Enim modi in
                            exercitationem explicabo, at rem officia autem non porro soluta dolorum
                        </DetailsText>
                    </DetailsInnerWrapper>
                </DetailsWrapper>

                <AdditionalText>
                    동의를 거부할 권리가 있습니다.<br />
                    단, 필수 동의 거부 시 서비스가 제한 될 수 있습니다.
                </AdditionalText>
            </AgreementInnerWrapper>

            {/* 동의하기 버튼 */}
            <Button onClick={() => handleClick(true)} $valid={true} $position="relative">동의하기</Button>
            <DisagreeButton onClick={() => handleClick(false)}>동의하지 않습니다.</DisagreeButton>
        </AgreementWrapper>
    )
};

const AgreementWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: auto;
    min-height: 100vh;
    align-items: center;
    background: #F9DBDD;
`

const AgreementInnerWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 75vw;
    min-width: calc(230px -5vw);
    max-width: calc(480px - 5vw);
    height: auto;
    min-height: 79vh;
    align-items: center;
`

const Title = styled.span`
    width: 100%;
    margin: 11vh 0 3vh 0;
    top: 100px;
`

const TitleText = styled.div`
    margin: 1vh 0;
    font-size: 25px;
`

const DescriptionText = styled.pre`
    font-size: 13px;
    color: #464646;
`

const DetailsWrapper = styled.div`
    width: 100%;
    height: min(50vh, 300px);
    border: 2px solid #000000;
    border-radius: 5px;
    background-color: #FFFFFF;
    padding: 1vh 1.5vw;
    z-index: 5;
`

const DetailsInnerWrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
    z-index: 10;
    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        width: 6px;
        background-color: #FAA8B1;
        border-radius: 50px;
    }
    &::-webkit-scrollbar-track {
        width: 10px;
        background-color: transparent;
    }
`

const DetailsText = styled.pre`
    font-size: 13px;
    font-family: sans-serif;
    white-space: pre-line; // 공백 있는 그대로 표시, 자동 줄바꿈, 줄바꿈 그대로 표시
`

const AdditionalText = styled.div`
    width: 100%;
    font-size: 13px;
    font-family: sans-serif;
    white-space: normal; // 공백 1개만 표시, 자동 줄바꿈
    word-wrap: break-word;
    color: #353535;
    margin: 10px 0;
    @media screen and (max-width: 360px) {
        font-size: 10px;
    }
`

const DisagreeButton = styled.div`
    position: relative;
    font-size: 13px;
    text-decoration: underline;
    color: #353535;
    margin-top: -13px;
    margin-bottom: 55px;
    z-index: 100000;
    @media screen and (max-width: 450px) {
        margin-bottom: 50px;
    }
    @media screen and (max-width: 330px) {
        margin-bottom: 45px;
        font-size: 11px;
    }
`