import React, { useState } from 'react';

import styled from "styled-components";

import BasicInfo from "./BasicInfo";
import MyChoice from "./MyChoice";
import OthersChoice from "./OthersChoice";

import pfpEditButton from "../../../assets/pfpEditButton.png";

const API_URL = import.meta.env.VITE_API_URL;

export default function MyPage() {
    const [activeTab, setActiveTab] = useState('BasicInfo');

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

    }

    // 내 정보 수정 페이지로 이동
    function handleProfileEdit() {

    }

    return (
        <MyPageWrapper>
            <MyProfileWrapper>
                {/* 프로필 사진 */}
                <ProfilePictureWrapper>
                    <ProfilePicture>

                    </ProfilePicture>
                    <ProfilePictureEditButton src={pfpEditButton} onClick={handlePictureEdit} />
                </ProfilePictureWrapper>

                {/* 이름 */}
                <NameWrapper>
                    <Name>홍길동</Name><Sir> 님</Sir>
                </NameWrapper>

                {/* 내 정보 수정 버튼 */}
                <EditButton onClick={handleProfileEdit}>내 정보 수정</EditButton>
            </MyProfileWrapper>
            <ContentWrapper>
                <Tabs>
                    <TabWrapper>
                        <Tab onClick={() => setActiveTab('BasicInfo')} $active={activeTab === 'BasicInfo'} />
                        <Text  onClick={() => setActiveTab('BasicInfo')}>기본 정보</Text>
                    </TabWrapper>
                    <TabWrapper>
                        <Tab onClick={() => setActiveTab('MyChoice')} $active={activeTab === 'MyChoice'}/>
                        <Text onClick={() => setActiveTab('MyChoice')}>나의 선택</Text>
                    </TabWrapper>
                    <TabWrapper>
                        <Tab onClick={() => setActiveTab('OthersChoice')} $active={activeTab === 'OthersChoice'}/>
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
    height: 100vh;
    background: #F9DBDD;
    overflow: auto;
`

const MyProfileWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: auto;
    min-height: 30vh;
    margin-bottom: 10px;
    align-items: center;
`

const ProfilePictureWrapper = styled.div`
    position: relative;
    display: flex;
    margin-top: 5vh;

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
    width: 26vw;
    height: 26vw;
    min-width: 80px;
    max-width: 140px;
    min-height: 80px;
    max-height: 140px;

    border: solid 5px;
    border-radius: 15px;
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

    cursor: pointer;
`

const NameWrapper = styled.div`
    width: auto;
    text-align: center;
    margin: 2vw;
`

const Name = styled.span`
    font-size: 23px;
`

const Sir = styled.span`
    font-size: 20px;
`

const EditButton = styled.button`
    width: 72px;
    height: 22px;
    border: solid 2px;
    border-radius: 5px;
    font-size: 10px;

    background-color: #F94364;

    cursor: pointer;
`

const ContentWrapper = styled.div`
    width: 100vw;
    min-width: calc(230px -5vw);
    max-width: calc(480px - 5vw);
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
`

const Tab = styled.div`
    height: 33px;
    transform: skew(20deg);
    transform-origin: bottom left;
    transition: background-color 0.3s ease;

    background-color: ${props => props.$active ? "#FAA8B1" :"#FFFFFF"};

    border: solid 3px;
    border-left: none;
    border-radius: 0 10px 0 0;
    
    cursor: pointer;
`

const Text = styled.div`
    position: absolute;
    width: 90%;
    top: 9px;
    font-size: 15px;
    text-align: center;
    
    cursor: pointer;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;

    background-color: #FAA8B1;
`