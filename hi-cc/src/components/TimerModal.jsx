import { forwardRef, useState, useEffect, useRef } from "react";
import styled from "styled-components";

const TIMER = 5000;

const TimerModal = forwardRef(function TimerModal({onConfirm, onClose, isOpen}, ref) {
    const [remainingTime, setRemainingTime] = useState(TIMER);
    const intervalRef = useRef(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            ref.current.showModal();
            setRemainingTime(TIMER); // 모달이 열릴 때 타이머 초기화
            intervalRef.current = setInterval(() => {
                setRemainingTime(prevTime => prevTime - 100);
            }, 100);

            timeoutRef.current = setTimeout(() => {
                onConfirm();
                ref.current.close();
            }, TIMER);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }
    }, [isOpen, onConfirm]);

    // 문자 즉시 전송
    function handleSend() {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        onConfirm();
        ref.current.close();
    }

    function handleCancel() {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        onClose();
        ref.current.close();
    }

    return (
        <ModalWrapper ref={ref}>
            <ModalInnerWrapper>
                <DescriptionText>5초 뒤 상대방에게 내 이름과 연락처가 전송됩니다.</DescriptionText>
                <ProgressBar>
                    <Progress value={remainingTime} max={TIMER} />
                    <Circle />
                </ProgressBar>
                <ButtonWrapper>
                    <form method="dialog">
                        <CancelButton onClick={handleCancel}>취소</CancelButton>
                    </form>
                    <SendButton onClick={handleSend}>바로 보내기</SendButton>
                </ButtonWrapper>
            </ModalInnerWrapper>
            <Top />
            <Circle1 />
            <Circle2 />
            <Circle3 />
        </ModalWrapper>
    );
})

export default TimerModal;

const ModalWrapper = styled.dialog`
    position: relative;
    width: 260px;
    height: 210px;
    padding: 0;
    border: none;
    background-color: transparent;
    z-index: 1000;
`

const ModalInnerWrapper = styled.div`
    box-sizing: border-box; // padding 사용을 위해
    width: 260px;
    height: 210px;
    padding: 50px 5px 5px 5px;

    display: flex;
    flex-direction: column;
    align-items: center;

    background: #FFFFFF;
    border: 3px solid #000000;

    border-radius: 20px;
`

const Top = styled.div`
    box-sizing: border-box;
    position: absolute;
    width: 260px;
    height: 35px;

    left: 0px;
    top: 0px;

    background: #FAA8B1;
    border: 3px solid #000000;
    border-radius: 20px 20px 0px 0px;
`

const Circle1 = styled.div`
    box-sizing: border-box;

    position: absolute;
    width: 15px;
    height: 15px;
    right: 33px;
    top: 10px;

    background: #F94364;
    border: 2.5px solid #000000;
    border-radius: 50%;
`

const Circle2 = styled.div`
    box-sizing: border-box;

    position: absolute;
    width: 15px;
    height: 15px;
    right: 53px;
    top: 10px;

    background: #FF7D95;
    border: 2.5px solid #000000;
    border-radius: 50%;
`

const Circle3 = styled.div`
    box-sizing: border-box;

    position: absolute;
    width: 15px;
    height: 15px;
    right: 13px;
    top: 10px;

    background: #FFFFFF;
    border: 2.5px solid #000000;
    border-radius: 50%;
`

const DescriptionText = styled.div`
    word-break: keep-all;
    padding: 0px 30px 0px 30px;
    font-size: 18px;
    text-align: center;
`

const ProgressBar = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 14px;
    margin: 10px 0;
`

const Progress = styled.progress`
    width: 193px;
    height: 7px;
    appearance: none;

    &::-webkit-progress-bar {
        background-color: #FFFFFF;
        border: solid 2px #000000;
        border-radius: 10px;
    }
    &::-webkit-progress-value {
        background-color: #F94364;
    }
`

const Circle = styled.div`
    box-sizing: border-box;
    position: absolute;
    width: 14px;
    height: 14px;
    top: 0px;
    right: -7px;
    background-color: #F94364;
    border: solid 2px #000000;
    border-radius: 50%;
    box-shadow: inset 0 0 0 1px #FFFFFF; // 안쪽에 shadow
    animation: moveLeft 5s linear;
    animation-fill-mode: forwards;

    @keyframes moveLeft {
        from {
            right: -7px;
        }
        to {
            right: 193px;
        }
    }
`

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const CancelButton = styled.button`
    background-color: #FAA8B1;
    font-size: 18px;
    color: #000000;
    padding: 3px 10px;

    border: solid 3px #000000;
    border-radius: 10px;
    margin-right: 15px;
    box-shadow: 3px 3px 0px rgba(0, 0, 0);
    
    cursor: pointer;
`

const SendButton = styled.button`
    background-color: #F94364;
    font-size: 18px;
    color: #000000;
    padding: 3px 10px;

    border: solid 3px #000000;
    border-radius: 10px;
    box-shadow: 3px 3px 0px rgba(0, 0, 0);

    cursor: pointer;
`