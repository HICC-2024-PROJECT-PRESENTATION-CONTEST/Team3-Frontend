import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

import Logo from "../../../assets/Logo.png";
import ProfileCard from "../../../components/ProfileCard";
import Button from "../../../components/MainButton";
import TimerModal from "../../../components/TimerModal";

const API_URL = import.meta.env.VITE_API_URL;

export default function Recommends() {
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState(null);
    const [data, setData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modal = useRef();

    useEffect(() => { // 시작하면 추천 상대 가져오기
        fetchRecommends();
    }, []);

    function handleClick(id) { // 상대 클릭 시
        setSelectedId(id);
    }

    function handleSelect() { // 하단의 선택하기 버튼
        setIsModalOpen(true);
    }

    function handleSend() {
        sendMessage(selectedId); // 즉시 문자 보내고 다음 페이지로 이동
    }

    function handleStopSend() {
        setIsModalOpen(false);
    }

    async function fetchRecommends() {
        await fetch(`${API_URL}/profiles/@me/recommands`, {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`${response.status}: ${response.statusText}`);
                } else {
                    return response.json();
                }
            })
            .then((result) => {
                setData(result.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async function sendMessage(id) {
        await fetch(`${API_URL}/profiles/@me/choices`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "target": `${id}` })
        })
            .then((response) => {
                if (!response.ok) {
                    throw { status: response.status, message: response.statusText };
                } else {
                    navigate('/message', { state: `${id}` }); // id도 전달
                }
            })
            .catch((error) => {
                if(error.status === 403) {
                    alert('접근 권한이 없습니다.');
                    navigate('/');
                } else if(error.status === 404) {
                    alert('상대를 찾을 수 없습니다.');
                } else if(error.status === 409) {
                    alert('상대 선택 횟수가 없습니다. 상대 선택 횟수는 QR 당 한 번입니다.');
                    navigate('/mypage');
                } else if(error.status === 500 || error.status === 502) {
                    navigate('/500');
                } else {
                    console.error(error);
                }
            });
    }

    return (
        <RecommendsWrapper>
            <DescriptionWrapper>
                <LogoWrapper src={Logo} />
                <DescriptionText>
                    알아가고 싶은 상대를 골라주세요.
                </DescriptionText>
            </DescriptionWrapper>
            <ProfileCardWrapper>
                {data ? data.map((data) => {
                    return <ProfileCard id={data.uid} key={data.uid} data={data} onClick={() => handleClick(data.uid)} $selected={selectedId === data.uid} />
                }) : <div>추천 상대 목록을 가져오지 못했습니다.</div>}
            </ProfileCardWrapper>

            <Button onClick={handleSelect} $valid={selectedId !== null} $position="fixed">선택하기</Button>

            <TimerModal ref={modal} isOpen={isModalOpen} onConfirm={handleSend} onClose={handleStopSend} />
        </RecommendsWrapper>
    )
};

const RecommendsWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: #F9DBDD;
    overflow: auto;
`
const ProfileCardWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(4, 450px);
    margin: 30px 0 150px 0;
    column-gap: 20px;

    & > :nth-child(2n) {
        transform: translateY(80px);
    }
    
    @media screen and (max-width: 420px) {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(7, 450px);

        & > :nth-child(2n) {
        transform: none;
        }
    }
`

const DescriptionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    margin: 100px 0 30px 0;
    width: calc(80vw + 10px); // -30px 한 상태
    max-width: 620px; // -30px 한 상태

    @media screen and (max-width: 420px) {
        width: calc(75vw - 15px); // -25px 한 상태
        min-width: 235px; // -25px 한 상태
    }
`

const DescriptionText = styled.div`
    font-size: 13px;
    color: #464646;

    width: 30vw;
    min-width: 115px;
    word-break: keep-all;
`

const LogoWrapper = styled.img`
    width: 35vw;
    min-width: 115px;
    max-width: 259px;
`