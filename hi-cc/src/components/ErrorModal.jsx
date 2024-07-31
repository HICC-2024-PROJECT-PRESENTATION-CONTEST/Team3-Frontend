import styled from "styled-components";

export default function ErrorModal(props) {
    return (
        <ErrorModalWrapper>
            <Shadow />
            <WriteHere>
                <Title>{props.title}</Title>
                <SubTitle>{props.subtitle}</SubTitle>
                <Description>{props.children}</Description>
            </WriteHere>
            <Top />
            <Bottom />
            <Circle1 />
            <Circle2 />
            <Circle3 />
        </ErrorModalWrapper>
    )
};

const ErrorModalWrapper = styled.div`
    position: relative;
    width: 347px;
    height: 271px;
`

const Shadow = styled.div`
    position: absolute;
    width: 337px;
    height: 261px;
    left: 10px;
    top: 10px;

    background: #000000;
    border-radius: 10px;
`

const WriteHere = styled.div`
    box-sizing: border-box;
    position: absolute;
    text-align: center;

    width: 337px;
    height: 261px;
    left: 0px;
    top: 0px;

    background: #FFFFFF;
    border: 3px solid #000000;
    border-radius: 10px;
    padding: 50px 10px 25px 10px;
`

const Title = styled.div`
    color: #F94364;
    font-size: 60px;
`

const SubTitle = styled.div`
    color: #FF7D95;
    font-size: 17px;
    padding-bottom: 10px;
`

const Description = styled.div`
    color: #000000;
    font-size: 12px;
    line-height: 23px;
`

const Top = styled.div`
    box-sizing: border-box;

    position: absolute;
    width: 337px;
    height: 33px;
    left: 0px;
    top: 0px;

    background: #FAA8B1;
    border: 3px solid #000000;
    border-radius: 10px 10px 0px 0px;
`

const Bottom = styled.div`
    box-sizing: border-box;

    position: absolute;
    width: 337px;
    height: 19px;
    left: 0px;
    top: 242px;

    background: #FAA8B1;
    border: 3px solid #000000;
    border-radius: 0px 0px 10px 10px;
`

const Circle1 = styled.div`
    box-sizing: border-box;

    position: absolute;
    width: 12px;
    height: 12px;
    left: 61px;
    top: 10px;

    background: #FFFFFF;
    border: 2px solid #000000;
    border-radius: 10px;
`

const Circle2 = styled.div`
    box-sizing: border-box;

    position: absolute;
    width: 12px;
    height: 12px;
    left: 41px;
    top: 10px;

    background: #F94364;
    border: 2px solid #000000;
    border-radius: 10px;
`

const Circle3 = styled.div`
    box-sizing: border-box;

    position: absolute;
    width: 12px;
    height: 12px;
    left: 21px;
    top: 10px;

    background: #FF7D95;
    border: 2px solid #000000;
    border-radius: 10px;
`
