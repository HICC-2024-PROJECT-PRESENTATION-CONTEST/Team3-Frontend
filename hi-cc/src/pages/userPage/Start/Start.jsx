import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import Square1 from '../../../assets/Square1.png';
import Square2 from '../../../assets/Square2.png';

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
            <SmallSquare src={Square1} alt="" />
            <BigSquare src={Square2} alt="" />
            <LoginWrapper>
                <StartButton onClick={handleStartClick}>시작하기</StartButton>
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

// const Heart = styled.img`
//     position: absolute;
//     top: 45px;
//     width: 57px;
//     height: auto;
//     z-index: 1;
// `

const SmallSquare = styled.img`
    position: absolute;
    top: 33%;
    right: 59px;
    width: 20px;
    height: auto;
    z-index: 0;
`

const BigSquare = styled.img`
    position: absolute;
    top: 25%;
    right: 28px;
    width: 31px;
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
    background-color: #000000;
    color: #FFFFFF;
    font-size: 30px;
    z-index: 100;
    border-width: 0px;
    border-radius: 20px;
    margin: 10px 0;
`
const LoginButton = styled.button`
    width: 100px;
    height: 30px;
    background-color: transparent;
    text-decoration: underline;
    color: #353535;
    font-size: 16px;
    border-width: 0px;
    z-index: 100;
`

const Text = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #353535;
    font-size: 16px;
`