import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import Circle1 from "../../../assets/Circle1.png";
import Circle2 from "../../../assets/Circle2.png";
import HeartIcon from "../../../assets/HeartIcon.png";

export default function Start() {
    const navigate = useNavigate();
    function handleStartClick() {
        navigate('/agreement');
    }

    function handleLoginClick() {
        navigate('/login');
    }

    return (
        <StartWrapper>
            <Heart src={HeartIcon} alt="" />
            <SmallCircle src={Circle1} alt="" />
            <BigCircle src={Circle2} alt="" />
            <LoginWrapper>
                <Text>
                    <MainText>Hi, CC!</MainText>가 이상형을 찾아드립니다.
                </Text>
                <StartButton onClick={handleStartClick}>시작하기</StartButton>
                이미 등록한 적 있나요?
                <LoginButton onClick={handleLoginClick}>로그인하기</LoginButton>
            </LoginWrapper>
        </StartWrapper>
    )
};

const StartWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    align-items: center;
    background: linear-gradient(to bottom, #FFF5F6, #FAA8B1);
    overflow: hidden;
`

const Heart = styled.img`
    position: absolute;
    top: 45px;
    width: 57px;
    height: auto;
    z-index: 1;
`

const SmallCircle = styled.img`
    position: absolute;
    top: 45px;
    right: -100px;
    width: 180px;
    height: auto;
    z-index: 0;
`

const BigCircle = styled.img`
    position: absolute;
    top: 167px;
    left: -300px;
    width: 490px;
    height: auto;
    z-index: 0;
`

const LoginWrapper = styled.div`
    display: flex;
    position: absolute;
    bottom: 10%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 100;
`

const StartButton = styled.button`
    width: 267px;
    height: 61px;
    background-color: #FFF5F6;
    z-index: 100;
    border-width: 0px;
    border-radius: 30px;
    font-size: 22px;
    margin: 10px 0;
`
const LoginButton = styled.button`
    width: 100px;
    height: 30px;
    background-color: transparent;
    text-decoration: underline;
    border-width: 0px;
    z-index: 100;
`

const Text = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #000000;
    font-size: 30px;
`

const MainText = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #F94364;
    font-size: 40px;
    font-weight: bold;
`