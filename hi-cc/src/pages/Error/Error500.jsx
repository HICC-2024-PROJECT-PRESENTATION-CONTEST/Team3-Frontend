import styled from "styled-components";

import ErrorModal from "../../components/ErrorModal";

export default function Error500() {
    return (
        <ServerErrorWrapper>
            <ErrorModal title="500" subtitle="Internal Server Error">
                서비스 이용에 불편을 드려 죄송합니다.<br />
                관리자에게 문의하시거나 잠시 후 다시 시도하세요.
            </ErrorModal>
        </ServerErrorWrapper>
    )
};

const ServerErrorWrapper = styled.div`
    display: flex;
    position: relative;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background: url('/src/assets/ErrorBackground.png') no-repeat center/cover;
`