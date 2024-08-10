import styled from "styled-components";

export default function BasicInfo() {
    
    return(
        <BasicInfoWrapper>
            <BasicInfoInnerWrapper>
                내 정보
            </BasicInfoInnerWrapper>
        </BasicInfoWrapper>
    )
};

const BasicInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: auto;
`

const BasicInfoInnerWrapper = styled.div`
    width: calc(100% - 30px);
    height: auto;
    margin: 20px 0px;

    background-color: #FFDEE2;

    border: solid 3px #000000;
    border-radius: 10px;
`