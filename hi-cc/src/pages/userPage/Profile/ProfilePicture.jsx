import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import PersonIcon from "../../../assets/personIcon.png";
import AddButton from "../../../assets/AddButton.png";

export default function ProfilePicture() {
    function handleClick() {

    }

    return (
        <ProfilePictureWrapper>
            <ProfilePictureInnerWrapper>
                <Title>프로필 사진 등록</Title>
                <IconWrapper>
                    <Icon src={PersonIcon} alt="person icon" />
                    <AddButtonWrapper src={AddButton} alt="사진을 추가하려면 클릭하세요." onClick={handleClick} />
                </IconWrapper>
                <DescriptionWrapper>
                    <DescriptionTitle>
                        유의사항
                    </DescriptionTitle>
                    <DescriptionText>
                        사진을 등록한 경우 프로필 사진을 등록한 사람끼리는 사진을 볼 수 있지만, 사진을 등록하지 않은 경우 상대방의 프로필 사진을 볼 수 없습니다.
                    </DescriptionText>
                </DescriptionWrapper>
            </ProfilePictureInnerWrapper>
            <ButtonWrapper>
                <Button>건너뛰기</Button>
                <Button style={{color: "#000000", backgroundColor: "#F94364", border: "solid 4px #000000"}}>등록하기</Button>
            </ButtonWrapper>
        </ProfilePictureWrapper>
    )
};

const ProfilePictureWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: auto;
    min-height: 100vh;
    align-items: center;
    background: #F9DBDD;
`

const ProfilePictureInnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 83vh;
`

const Title = styled.span`
    display: flex;
    justify-content: center;
    width: 75vw;
    min-width: calc(230px - 5vw);
    max-width: calc(480px - 5vw);
    margin: 11vh 0 4vh 0;
    top: 100px;

    font-size: 25px;
`

const IconWrapper = styled.div`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 30vw;
    height: 30vw;
    min-width: 150px;
    min-height: 150px;
    max-width: 300px;
    max-height: 300px;

    border: solid 7px;
    border-radius: 50%;

    background-color: #FAA8B1;
`

const Icon = styled.img`
    width: 18vw;
    height: 18vw;
    min-width: 90px;
    min-height: 90px;
    max-width: 180px;
    max-height: 180px;
`

const AddButtonWrapper = styled.img`
    position: absolute;

    right: -6px;
    bottom: -6px;

    width: 8vw;
    min-width: 40px;
    max-width: 80px;
    height: auto;

    cursor: pointer;
`

const DescriptionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 40vw;
    min-width: calc(230px - 5vw);
    max-width: calc(480px - 5vw);
    
    margin: 5vh 0;
`

const DescriptionTitle = styled.div`
    text-align: center;
    
    margin-bottom: 5px;

    font-size: 18px;
`

const DescriptionText = styled.div`
    text-align: center;
    
    white-space: normal;
    word-break: keep-all; 
    font-size: 15px;
    color: #747474;
`
const ButtonWrapper = styled.div`
    display: flex;
    width: 75vw;
    min-width: calc(230px - 5vw);
    max-width: calc(480px - 5vw);
    justify-content: center;
`

const Button = styled.button`
    width: 35vw;
    height: 60px;
    
    min-width: 130px;

    margin: 0 1.5vw;

    border: solid 4px #5D5D5D;
    border-radius: 20px;

    background-color: #9B9B9B;

    font-size: 25px;
    color: #FFFFFF;

    @media screen and (max-width: 360px) {
        font-size: 23px;
    }
`