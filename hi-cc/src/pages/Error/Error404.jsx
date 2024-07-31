import styled from "styled-components";

import ErrorModal from "../../components/ErrorModal";

export default function Error404() {
    return (
        <NotFoundWrapper>
            <WhiteRec />
            <WhiteRec />
            <WhiteRec />
            <PinkRec />
            <PinkRec />
            <PinkRec />
            <ErrorModal title="404" subtitle="Not Found">
                페이지를 찾을 수 없습니다.<br />
                입력하신 주소가 정확한지 다시 한 번 확인해주세요.
            </ErrorModal>
        </NotFoundWrapper>
    )
};

const NotFoundWrapper = styled.div`
    display: flex;
    position: relative;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background: url('/src/assets/ErrorBackground.png') no-repeat center/cover;
`