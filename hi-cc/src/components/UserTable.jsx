import styled from "styled-components";

export function UserTable({data}) {
    return (
        <Result>
            <Td>{data.uid}</Td>
            <Td>{data.name}</Td>
            <Td>{data.phone}</Td>
            <Td>{data.instagram}</Td>
            <Td>{data.gender}</Td>
            <Td><button>보기</button></Td>
            <Td><button>삭제</button></Td>
        </Result>
    );
}

const Result = styled.tr`
    box-sizing: border-box;
    font-family: sans-serif;
`

const Td = styled.td`
    text-align: center;

    color: #FFFFFF;
    font-family: sans-serif;
    font-size: 15px;

    max-width: 50px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`