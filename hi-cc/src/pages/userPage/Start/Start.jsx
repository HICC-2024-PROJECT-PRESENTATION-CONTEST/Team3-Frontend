import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import StartLogo from "../../../assets/StartLogo.png";
import StartButtonImg from "../../../assets/StartButton.png";

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
            <Logo src={StartLogo} />
            <LoginWrapper>
                <StartButton src={StartButtonImg} onClick={handleStartClick} />
                <Text>이미 등록한 적 있나요?</Text>
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
    background: linear-gradient(to bottom, #FFDEE2, 52%, #FAA8B1);
    overflow: hidden;
`

const Logo = styled.img`
    margin: max(25vh, 130px);
    min-width: 200px;
    width: 50vw;
    max-width: 270px;
    height: auto;
    z-index: 1;
`

const LoginWrapper = styled.div`
    display: flex;
    position: absolute;
    top: max(70vh, 450px);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 100;
`

const StartButton = styled.img`
    min-width: 220px;
    width: 55vw;
    max-width: 297px;
    height: auto;
    color: #FFFFFF;
    font-size: 30px;
    z-index: 100;
    border-width: 0px;
    margin: 20px 0 10px 0;
    cursor: pointer;
`
const LoginButton = styled.button`
    width: auto;
    height: 30px;
    background-color: transparent;
    text-decoration: underline;
    color: #353535;
    font-size: 16px;
    border-width: 0px;
    z-index: 100;
    cursor: pointer;
`

const Text = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #353535;
    font-size: 16px;
`