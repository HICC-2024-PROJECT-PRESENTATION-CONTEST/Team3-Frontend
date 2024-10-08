import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from "styled-components";

import BasicInfo from "./BasicInfo";
import MyChoice from "./MyChoice";
import OthersChoice from "./OthersChoice";

import hiccLogo from "../../../assets/hiccLogo.png";
import pfpEditButton from "../../../assets/pfpEditButton.png";
import Bear from "../../../assets/bear.png";
import Deer from "../../../assets/deer.png";
import Dino from "../../../assets/dino.png";
import Dog from "../../../assets/dog.png";
import Cat from "../../../assets/cat.png";
import Rabbit from "../../../assets/rabbit.png";
import Fox from "../../../assets/fox.png";
import Fish from "../../../assets/fish.png";
import Penguin from "../../../assets/penguin.png";
import Squirrel from "../../../assets/squirrel.png";
import Tiger from "../../../assets/tiger.png";
import Horse from "../../../assets/horse.png";
import Snake from "../../../assets/snake.png";
import Duck from "../../../assets/duck.png";
import Raccoon from "../../../assets/raccoon.png";
import Wolf from "../../../assets/wolf.png";
import Sheep from "../../../assets/sheep.png";
import Frog from "../../../assets/frog.png";
import Monkey from "../../../assets/monkey.png";
import Pig from "../../../assets/pig.png";
import Turtle from "../../../assets/turtle.png";

const API_URL = import.meta.env.VITE_API_URL;

export default function MyPage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('BasicInfo');
    const [imageSrc, setImageSrc] = useState(null);
    const [lookLikeImageSrc, setLookLikeImageSrc] = useState(null);
    const canvasRef = useRef(null);
    const [name, setName] = useState(null);
    const [choicesCount, setChoicesCount] = useState(null);

    useEffect(() => {
        fetchMyProfile();
    }, []);

    // 프로필 사진 가져오기
    useEffect(() => {
        fetch(`${API_URL}/profiles/@me/image?size=200`, {
            method: 'GET',
            credentials: 'include',
        })
            .then((res) => {
                if (!res.ok) {
                    const error = new Error();
                    error.status = res.status;
                    throw error;
                }
                return res.blob();
            })
            .then((blob) => {
                const imageUrl = URL.createObjectURL(blob);
                setImageSrc(imageUrl);
            })
            .catch((error) => {
                if (error.status === 403) {
                    alert("접근 권한이 없습니다. 올바른 경로로 접속했는지 확인해주세요.");
                    navigate('/');
                } else if (error.status === 404) {
                    // 프로필 사진 등록 안한 경우
                } else if (error.status === 500 || error.status === 502) {
                    navigate("/500");
                } else {
                    console.error(error);
                    alert('알 수 없는 오류가 발생했습니다.');
                }
            });
    }, []);

    useEffect(() => {
        handleFileChange();
    }, [imageSrc]);

    {/* 사진 없을 경우 닮은꼴로 대체, 이름 받아오기 */ }
    async function fetchMyProfile() {
        await fetch(`${API_URL}/profiles/@me`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`${response.status}: ${response.statusText}`);
                } else {
                    return response.json();
                }
            })
            .then((result) => {
                return result.data;
            })
            .then((data) => {
                setName(data.name);
                setChoicesCount(data.choicescount);
                if (!imageSrc) {
                    let image = null;
                    switch (data.looklike) {
                        case '강아지상':
                            image = Dog;
                            break;
                        case '말상':
                            image = Horse;
                            break;
                        case '토끼상':
                            image = Rabbit;
                            break;
                        case '공룡상':
                            image = Dino;
                            break;
                        case '펭귄상':
                            image = Penguin;
                            break;
                        case '곰상':
                            image = Bear;
                            break;
                        case '사슴상':
                            image = Deer;
                            break;
                        case '고양이상':
                            image = Cat;
                            break;
                        case '물고기상':
                            image = Fish;
                            break;
                        case '호랑이상':
                            image = Tiger;
                            break;
                        case '다람쥐상':
                            image = Squirrel;
                            break;
                        case '여우상':
                            image = Fox;
                            break;
                        case '뱀상':
                            image = Snake;
                            break;
                        case '오리상':
                            image = Duck;
                            break;
                        case '너구리상':
                            image = Raccoon;
                            break;
                        case '늑대상':
                            image = Wolf;
                            break;
                        case '양상':
                            image = Sheep;
                            break;
                        case '개구리상':
                            image = Frog;
                            break;
                        case '원숭이상':
                            image = Monkey;
                            break;
                        case '돼지상':
                            image = Pig;
                            break;
                        case '거북이상':
                            image = Turtle;
                            break;
                        default:
                            break;
                    }
                    setLookLikeImageSrc(image);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // 백으로부터 받아온 프로필 사진 띄우기
    function handleFileChange() {
        if (imageSrc) {
            const img = new Image;
            img.src = imageSrc;
            img.onload = () => {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');

                // vw 계산
                const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
                // 150px 이상, 300px 이하
                let width = Math.min(Math.max(0.3 * vw, 150), 300);
                let height = width;

                const size = Math.min(img.width, img.height);
                canvas.width = width;
                canvas.height = height;

                // 캔버스를 정사각형으로 자름
                // img 객체, x 자르기 시작할 위치, y 자르기 시작할 위치,이미지 내의 x, y 중심으로 그려질 높이, 캔버스의 x, y 좌표, 캔버스에 그릴 x 크기, 캔버스에 그릴 y 크기
                ctx.drawImage(img, (img.width - size) / 2, (img.height - size) / 2, size, size, 0, 0, width, height);

            };
        }
    }

    // 상대 선택 화면으로 돌아가기
    function handleChoiceLeftButtonClick() {
        navigate('/recommends');
    }

    function renderContent() {
        switch (activeTab) {
            case 'BasicInfo':
                return <BasicInfo />;
            case 'MyChoice':
                return <MyChoice />;
            case 'OthersChoice':
                return <OthersChoice />;
            default:
                return <BasicInfo />;
        }
    }

    // 프로필 사진 수정 페이지로 이동
    function handlePictureEdit() {
        navigate('/mypage/profilepicture');
    }

    // 내 정보 수정 페이지로 이동
    function handleProfileEdit() {
        navigate('/mypage/editprofile');
    }

    return (
        <MyPageWrapper>
            <MyProfileWrapper>
                <ChoiceLeftButtonWrapper>
                    {/* 선택횟수가 남았을 경우 선택창으로 돌아가는 버튼 */}
                    {choicesCount !== null && choicesCount > 0 ? <ChoiceLeftButton onClick={()=> handleChoiceLeftButtonClick()}>
                        <HeartImg src={hiccLogo} />
                    </ChoiceLeftButton> : ""}
                </ChoiceLeftButtonWrapper>
                {/* 프로필 사진 */}
                <ProfilePictureWrapper>
                    <ProfilePicture>
                        {imageSrc ? <ProfilePicturePreview src={imageSrc} /> : <LookLike src={lookLikeImageSrc} />}
                    </ProfilePicture>
                    <ProfilePictureEditButton src={pfpEditButton} onClick={handlePictureEdit} />
                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                </ProfilePictureWrapper>

                {/* 이름 */}
                <NameWrapper>
                    <Name>{name}</Name><Sir> 님</Sir>
                </NameWrapper>

                {/* 내 정보 수정 버튼 */}
                <EditButton onClick={handleProfileEdit}>내 정보 수정</EditButton>
            </MyProfileWrapper>
            <ContentWrapper>
                <Tabs>
                    <TabWrapper>
                        <Tab onClick={() => setActiveTab('BasicInfo')} $active={activeTab === 'BasicInfo'} />
                        <Text onClick={() => setActiveTab('BasicInfo')}>기본 정보</Text>
                    </TabWrapper>
                    <TabWrapper>
                        <Tab onClick={() => setActiveTab('MyChoice')} $active={activeTab === 'MyChoice'} />
                        <Text onClick={() => setActiveTab('MyChoice')}>나의 선택</Text>
                    </TabWrapper>
                    <TabWrapper>
                        <Tab onClick={() => setActiveTab('OthersChoice')} $active={activeTab === 'OthersChoice'} />
                        <Text onClick={() => setActiveTab('OthersChoice')}>상대방의 선택</Text>
                    </TabWrapper>
                </Tabs>
                <Content>
                    {renderContent()}
                </Content>
            </ContentWrapper>
        </MyPageWrapper>
    )
};

const MyPageWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: auto;
    min-height: 100vh;
    background: #F9DBDD;
    overflow: auto;
    overflow-x: hidden;
`

const ChoiceLeftButtonWrapper = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;

    width: 100vw;
    min-width: 280px;
    max-width: 480px;
    height: 100%;
`

const ChoiceLeftButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 30px 0 0 30px;

    width: 40px;
    height: 40px;
    border: solid 3px #000000;
    border-radius: 30%;

    background-color: #FAA8B1;

    cursor: pointer;
`

const HeartImg = styled.img`
    width: 27px;
    height: 27px;
`

const MyProfileWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: auto;
    margin-bottom: 10px;
    align-items: center;
`

const ProfilePictureWrapper = styled.div`
    position: relative;
    display: flex;
    margin-top: 30px;
    
    width: calc(32vw + 1px);
    height: 32vw;
    min-width: 103px;
    min-height: 104px;
    max-width: 170px;
    max-height: 171px;
    
    justify-content: center;
    align-items: center;
`

const ProfilePicture = styled.div`
    position: relative;
    display: flex;
    width: 26vw;
    height: 26vw;
    min-width: 80px;
    max-width: 140px;
    min-height: 80px;
    max-height: 140px;

    border: solid 5px;
    border-radius: 20%;

    justify-content: center;
    align-items: center;

    background-color: #FFFFFF;
`

const ProfilePicturePreview = styled.img`
    position: absolute;
    
    width: 26vw;
    height: 26vw;
    min-width: 80px;
    max-width: 140px;
    min-height: 80px;
    max-height: 140px;

    border: solid 7px #000000;
    border-radius: 20%;
    object-fit: cover;
    
    z-index: 100;
`

const LookLike = styled.img`
    width: calc(26vw - 30px);
    height: calc(26vw - 30px);
    min-width: 50px;
    max-width: 110px;
    min-height: 50px;
    max-height: 110px;
    
    z-index: 100;
`

const ProfilePictureEditButton = styled.img`
    position: absolute;
    min-width: 30px;
    width: 10vw;
    max-width: 50px;
    min-height: 30px;
    height: 10vw;
    max-height: 50px;

    right: 0px;
    bottom: 0px;

    z-index: 100;

    cursor: pointer;
`

const NameWrapper = styled.div`
    width: auto;
    text-align: center;
    margin: 10px;
`

const Name = styled.span`
    font-size: 23px;
`

const Sir = styled.span`
    font-size: 20px;
`

const EditButton = styled.button`
    border: solid 2px;
    border-radius: 5px;
    font-size: 10px;
    padding: 3px 8px;
    margin-bottom: 10px;
    color: #000000;

    background-color: #F94364;

    cursor: pointer;
`

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    min-width: 280px;
    max-width: 480px;
    flex-grow: 1;
`

const Tabs = styled.div`
    display: flex;
    flex-direction: row;

    width: 100%;
    height: 37.8px;
`

const TabWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 37.8px;
    overflow: hidden;
    border-left: solid 3px;
    border-bottom: solid 3px;
`

const Tab = styled.div`
    height: 100%;
    transform: skew(20deg);
    transform-origin: bottom left;
    transition: background-color 0.3s ease;

    background-color: ${props => props.$active ? "#FAA8B1" : "#FFFFFF"};

    border: solid 3px;
    border-left: none;
    border-bottom: none;
    // border-bottom: ${props => props.$active ? "solid 3px #FAA8B1" : "solid 3px"};
    border-radius: 0 10px 0 0;
    
    cursor: pointer;
`

const Text = styled.div`
    position: absolute;
    word-break: keep-all;
    width: 90%;
    top: 9px;
    font-size: 15px;
    text-align: center;
    
    cursor: pointer;

    @media screen and (max-width: 360px) {
        font-size: 13px;
    }
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
    flex-grow: 1;

    background-color: #FAA8B1;
`