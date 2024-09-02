import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";

import Logo from "../../../assets/Logo.png";
import Next from "../../../assets/NextButton.png";
import Profile from "../../../assets/ProfileButton.png";
import Heart from "../../../assets/Heart.png";
import InternetButton from "../../../assets/InternetButton.png";
import ProfileCard from "../../../components/ProfileCard2";
import Button from "../../../components/MainButton";

const API_URL = import.meta.env.VITE_API_URL;

export default function Message() {
    const location = useLocation();
    const navigate = useNavigate();
    const [data, setData] = useState(location.state?.data || null);
    const [message, setMessage] = useState(undefined);

    useEffect(() => {
        if(data === null) {
            alert('선택한 상대가 없습니다. 잘못된 경로로 들어오지 않았는지 확인해주세요.');
            navigate('/mypage');
        } else {
            fetchProfiles();
        }
    }, [])

    // 메시지 전송 횟수에 따라 리다이렉트. 그외 오류에 따라서도 리다이렉트
    async function fetchProfiles() {
        await fetch(`${API_URL}/profiles/@me`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw { status: response.status, message: response.statusText }
                }
                else
                    return response.json();
            })
            .then((result) => {
                if(result.data.messagescount === 0) {
                    alert('메시지 전송 횟수가 부족합니다. 메시지 전송 횟수는 상대 당 한번입니다.');
                    navigate('/mypage');
                    return;
                }
            })
            .catch((error) => {
                if (error.status === 403) {
                    // 접근 경로가 잘못된 사용자
                    alert("접근 권한이 없습니다. 올바른 경로로 접속했는지 확인해주세요.");
                } else if (error.status === 404) {
                    navigate('/');
                } else if (error.status === 500 || error.status === 502) {
                    navigate("/500");
                } else {
                    alert('알 수 없는 오류가 발생했습니다.');
                    console.error(error);
                }
            });
    }

    // 메시지 입력 처리, 900자 제한
    function handleMessageChange(event) {
        const newMessage = event.target.value;
        if(newMessage.length <= 900) {
            setMessage(newMessage);
        }
    }

    // 추가 메시지 보내기
    async function sendAdditionalMessage() {
        await fetch(`${API_URL}/profiles/@me/message`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "target": `${data.uid}`,
                "message": `${message}`
            })
        })
        .then((response) => {
            if (!response.ok) {
                throw { status: response.status, message: response.statusText };
            } else {
                navigate('/mypage');
            }
        })
        .catch((error) => {
            if(error.status === 403) {
                alert('접근 권한이 없습니다.');
                navigate('/');
            } else if(error.status === 404) {
                alert('상대의 프로필 정보를 찾을 수 없습니다.');
            } else if(error.status === 409) {
                alert('메시지 전송 횟수가 부족합니다. 메시지 전송 횟수는 상대 당 한번입니다.');
                navigate('/mypage');
            } else if(error.status === 500 || error.status === 502) {
                navigate('/500');
            } else {
                console.error(error);
            }
        });
    }

    return (
        <MessageWrapper>
            
            {/* 넘어가기 버튼, 프로필 수정 버튼 */}
            <ButtonWrapper>
                <NextButton src={Next} onClick={() => navigate('/mypage')} onDragStart={e => e.preventDefault()} />
                <ProfileButton src={Profile} onClick={() => navigate('/mypage/editprofile')} onDragStart={e => e.preventDefault()} />
            </ButtonWrapper>
            <MessageTitleWrapper>
                <LogoImg src={Logo} onDragStart={e => e.preventDefault()} />
                <Description>
                    상대에게 한 번,<br />
                    추가 문자를 보낼 수 있어요.
                </Description>
            </MessageTitleWrapper>

            {/* 선택한 상대의 프로필 카드 */}
            {data ?
                <ProfileCard id={data.uid} key={data.uid} data={data} />
                : <Error>선택한 상대의 데이터를 가져오지 못했습니다.</Error>}

            {/* 메시지 입력칸 */}
            <MessageBoxWrapper>
                <MessageBox>
                    <Top2 />
                    <ButtonImg src={InternetButton} />
                    <MessageInput
                        placeholder="메시지를 입력하세요. 메시지는 900자까지 입력 가능합니다."
                        onChange={handleMessageChange}
                        value={message} />
                    <HeartImg src={Heart} onDragStart={e => e.preventDefault()} />
                </MessageBox>
            </MessageBoxWrapper>

            <Button onClick={sendAdditionalMessage} $valid={message} $position="absolute">
                문자 보내기
            </Button>
        </MessageWrapper>
    )
};

const MessageWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: #F9DBDD;
    overflow: auto;
`

const ButtonWrapper = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: end;
    align-items: center;

    width: 80vw;
    min-width: 250px;
    max-width: 635px;
    height: 45px;
    margin: 20px 0;
`

const NextButton = styled.img`
    width: 29px;
    height: 27px;
    margin: 0 5px;

    cursor: pointer;
`

const ProfileButton = styled.img`
    width: 40px;
    height: 40px;

    cursor: pointer;
`

const MessageTitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    margin: 35px 0 10px 0;
    width: calc(80vw + 10px); // -30px 한 상태
    max-width: 620px; // -30px 한 상태

    @media screen and (max-width: 420px) {
        width: calc(75vw - 15px); // -25px 한 상태
        min-width: 235px; // -25px 한 상태
    }
`

const LogoImg = styled.img`
    width: 35vw;
    min-width: 115px;
    max-width: 259px;
`

const Description = styled.div`
    font-size: 18px;
    color: #353535;
`

const Error = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    width: auto;

    padding: 10px;
    margin: 30px 20px;

    color: #000000;
    background-color: #9B9B9B;
    border-radius: 10px;

    word-break: keep-all;
`

// 메시지 입력칸

const MessageBoxWrapper = styled.div`
    position: relative;
    min-width: 230px;
    width: calc(80vw - 20px);
    max-width: 580px;
    height: 130px;
    margin-top: 20px;
`

const MessageBox = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    min-width: 230px;
    width: calc(80vw - 20px);
    max-width: 580px;
    height: 130px;

    background: #FFFFFF;
    border: 3px solid #000000;
    border-radius: 10px;
`

const Top2 = styled.div`
    box-sizing: border-box;

    position: absolute;
    min-width: 230px;
    width: calc(80vw - 20px);
    max-width: 580px;
    height: 26px;
    top: 0;
    left: 0;

    background: #FF7D95;
    border: 3px solid #000000;
    border-radius: 10px 10px 0px 0px;
`

const ButtonImg = styled.img`
    position: absolute;
    top: 8px;
    right: 14px;
    width: auto;
    height: 11px;
`

const MessageInput = styled.textarea`
    box-sizing: border-box;
    position: absolute;
    top: 33px;
    min-width: 180px;
    width: calc(80vw - 70px);
    max-width: 530px;
    height: 80px;

    font-size: 15px;

    background-color: transparent;

    border: none;
    outline: none;
    resize: none;
    z-index: 1000;
    &::-webkit-scrollbar {
        display: none;
    }
`

const HeartImg = styled.img`
    position: absolute;
    right: 15px;
    bottom: 15px;
    
    width: 40px;
    height: auto;
`