import styled from "styled-components";

import pfpEditButton from "../../../assets/pfpEditButton.png";

const API_URL = import.meta.env.VITE_API_URL;

export default function MyPage() {

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
                    <ProfilePictureEditButton src={pfpEditButton} onClick={handlePictureEdit}/>
                </ProfilePictureWrapper>

                {/* 이름 */}
                <NameWrapper>
                    <Name>홍길동</Name><Sir> 님</Sir>
                </NameWrapper>

                {/* 내 정보 수정 버튼 */}
                <EditButton onClick={handleProfileEdit}>내 정보 수정</EditButton>
            </MyProfileWrapper>
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
    min-height: 33vh;
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