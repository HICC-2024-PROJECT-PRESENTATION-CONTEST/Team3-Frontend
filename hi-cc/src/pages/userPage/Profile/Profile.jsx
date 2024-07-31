import styled from  "styled-components";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/MainButton";

export default function Profile() {
    const navigate = useNavigate();
    function handleClick() {
        navigate('/recommends')
    }
    return(
        <ProfileWrapper>
            {/* 프로필 등록 페이지 소개 */}
            <Title>
                <TitleText>
                    내 정보 등록
                </TitleText>
                <DescriptionText>
                    *이 표시된 칸은 필수 입력칸입니다.
                </DescriptionText>
            </Title>

            {/* 프로필 입력 칸 */}
            <InputWrapper>
            </InputWrapper>

            {/* 등록하기 버튼 */}
            <Button onClick={handleClick} $valid={true}>등록하기</Button>
        </ProfileWrapper>
    )
};

const ProfileWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    align-items: center;
    background: #F9DBDD;
`

const Title = styled.span`
    width: 75vw;
    min-width: calc(230px -5vw);
    max-width: calc(480px - 5vw);
    margin: 11vh 0 3vh 0;
    top: 100px;
`

const TitleText = styled.div`
    margin: 1vh 0;
    font-size: 25px;
`

const DescriptionText = styled.pre`
    font-size: 13px;
`

const InputWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
`