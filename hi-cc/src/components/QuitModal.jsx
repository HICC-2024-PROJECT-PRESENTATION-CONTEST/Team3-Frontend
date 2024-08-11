import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const API_URL = import.meta.env.VITE_API_URL;

const BasicModal = forwardRef(function BasicModal(props, ref) {
    const navigate = useNavigate();
    // 탈퇴하기
    function handleRealQuit() {
        deleteProfile();
    }

    async function deleteProfile() {
        await fetch(`${API_URL}/profiles/@me`, {
            method: 'DELETE',
            credentials: 'include',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`${response.status}: ${response.statusText}`);
                } else {
                    navigate('/');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <ModalWrapper ref={ref}>
            <ModalInnerWrapper>
                <TitleText>정말로 <span style={{ color: '#F94364' }}>탈퇴</span>하시겠습니까?</TitleText>
                <DescriptionText>회원 탈퇴 시 계정 관련 모든 정보가 삭제되어 복구가 불가능합니다.</DescriptionText>
                <ButtonWrapper>
                    <form method="dialog">
                        <CancelButton>취소</CancelButton>
                    </form>
                    <QuitButton onClick={handleRealQuit}>탈퇴하기</QuitButton>
                </ButtonWrapper>
            </ModalInnerWrapper>
            <Top />
            <Circle1 />
            <Circle2 />
            <Circle3 />
        </ModalWrapper>
    );
})

export default BasicModal;

const ModalWrapper = styled.dialog`
    position: relative;
    width: 260px;
    height: 185px;
    padding: 0;
    border: none;
    background-color: transparent;
    z-index: 1000;
`

const ModalInnerWrapper = styled.div`
    box-sizing: border-box; // padding 사용을 위해
    width: 260px;
    height: 185px;

    padding: 50px 5px 5px 5px;

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

const TitleText = styled.div`
    word-break: keep-all;
    font-size: 20px;
    text-align: center;
`

const DescriptionText = styled.div`
    word-break: keep-all;
    padding: 10px 30px 12px 30px;
    font-size: 12px;
    text-align: center;
`

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const CancelButton = styled.button`
    width: 75px;
    height: 35px;
    background-color: #FAA8B1;
    font-size: 18px;

    border: solid 3px #000000;
    border-radius: 10px;
    margin-right: 15px;
    box-shadow: 3px 3px 0px rgba(0, 0, 0);
    
    cursor: pointer;
`

const QuitButton = styled.button`
    width: 110px;
    height: 35px;
    background-color: #F94364;
    font-size: 18px;

    border: solid 3px #000000;
    border-radius: 10px;
    box-shadow: 3px 3px 0px rgba(0, 0, 0);

    cursor: pointer;
`