import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/MainButton";

export default function Profile() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        userName: '',
        phoneNumberFirst: '',
        phoneNumberSecond: '',
        password: '',
        confirmPassword: '',
        gender: '',
        major: '',
        birthday: '',
        ageDifferenceDown: '',
        ageDifferenceUp: '',
        height: '',
        MBTI: '',
        takeAfter: '',
        smoking: '',
    });

    const { userName, phoneNumberFirst, phoneNumberSecond, password, confirmPassword, gender, major, birthYear, ageDifferenceDown, ageDifferenceUp, height, MBTI, takeAfter, smoking } = inputs;

    function handleClick() {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        navigate('/recommends');
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs((prevInput) => {
            if (['phoneNumberFirst', 'phoneNumberSecond', 'password', 'confirmPassword', 'birthYear', 'ageDifference', 'height'].includes(name))
                return {
                    ...prevInput,
                    [name]: +value // 숫자값 반환 강제
                }
            else
                return {
                    ...prevInput,
                    [name]: value
                }
        });
        console.log(inputs);
    }

    let userNameInvalid = inputs.userName.trim().length >= 1;

    return (
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
                {/* 이름 입력 칸 */}
                <NameWrapper>
                    <InputTitle>성명
                        <EssentialMark>*</EssentialMark></InputTitle>
                    <TextInput
                        name="userName"
                        placeholder="이름은 상대 선택 화면에서 '홍*동'과 같이 표시됩니다."
                        onChange={handleChange}
                        value={userName}
                    />
                    {!userNameInvalid && (
                        <WarningMessage>*2글자 ~ 30글자의 한글/영어/중국어/일본어 이름만 등록 가능합니다.</WarningMessage>
                    )}
                </NameWrapper>

                {/* 전화번호 입력 칸 */}
                <PhoneNumberWrapper>
                    <InputTitle>
                        휴대폰 번호
                        <EssentialMark>*</EssentialMark>
                    </InputTitle>
                    <PhoneNumberInnerWrapper>
                        <PhoneNumberInput>010</PhoneNumberInput> -
                        <PhoneNumberInput>
                            <TextInput name="phoneNumberFirst" onChange={handleChange} value={phoneNumberFirst} />
                        </PhoneNumberInput> -
                        <PhoneNumberInput>
                            <TextInput name="phoneNumberSecond" onChange={handleChange} value={phoneNumberSecond} />
                        </PhoneNumberInput>
                    </PhoneNumberInnerWrapper>
                </PhoneNumberWrapper>

                {/* 비밀번호 입력 칸 */}
                <PasswordWrapper>
                    <InputTitle>
                        비밀번호
                        <EssentialMark>*</EssentialMark>
                    </InputTitle>
                    <TextInput
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={password}
                        autoComplete="off"
                    />
                </PasswordWrapper>

                {/* 비밀번호 확인 입력 칸 */}
                <PasswordWrapper>
                    <InputTitle>
                        비밀번호 확인
                        <EssentialMark>*</EssentialMark>
                    </InputTitle>
                    <TextInput
                        type="password"
                        name="confirmPassword"
                        onChange={handleChange}
                        value={confirmPassword}
                        autoComplete="off"
                    />
                    {password !== confirmPassword && (
                        <WarningMessage>비밀번호가 일치하지 않습니다.</WarningMessage>
                    )}
                </PasswordWrapper>

                {/* 성별 입력 칸 */}
                <GenderWrapper>
                    <InputTitle>
                        성별
                        <EssentialMark>*</EssentialMark>
                    </InputTitle>
                    <CheckboxWrapper>
                        <Checkbox name="gender"
                            onChange={handleChange}
                            value="male">남</Checkbox>
                        <Checkbox name="gender"
                            onChange={handleChange}
                            value="female">여</Checkbox>
                    </CheckboxWrapper>
                </GenderWrapper>

                {/* 학과 입력 칸 */}
                <MajorWrapper>
                    <InputTitle>학과</InputTitle>
                    <TextInput
                        name="major"
                        onChange={handleChange}
                        value={major}
                    />
                </MajorWrapper>

                {/* 생년 입력 칸 */}
                <BirthYearWrapper>
                    <InputTitle>
                        생년
                        <EssentialMark>*</EssentialMark>
                    </InputTitle>
                    <SelectInput
                        name="birthYear"
                        onChange={handleChange}
                        value={birthYear}
                    >
                        {Array.from({ length: 17 }, (_, i) => 1990 + i).map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </SelectInput>
                </BirthYearWrapper>

                {/* 나이차 입력 칸 */}
                <AgeDifferenceWrapper>
                    <InputTitle>
                        상대방 나이차
                        <EssentialMark>*</EssentialMark>
                    </InputTitle>
                    <AgeDifferenceInnerWrapper>
                        위로
                        <AgeDifferenceInputWrapper>
                            <TextInput
                                name="ageDifferenceDown"
                                onChange={handleChange}
                                value={ageDifferenceDown}
                            />
                        </AgeDifferenceInputWrapper>
                        아래로
                        <AgeDifferenceInputWrapper>
                            <TextInput
                                name="ageDifferenceUp"
                                onChange={handleChange}
                                value={ageDifferenceUp}
                            />
                        </AgeDifferenceInputWrapper>
                    </AgeDifferenceInnerWrapper>
                </AgeDifferenceWrapper>

                {/* 키 입력 칸 */}
                <HeightWrapper>
                    <InputTitle>
                        키
                    </InputTitle>
                    <TextInput
                        name="height"
                        onChange={handleChange}
                        value={height}
                    />
                </HeightWrapper>

                {/* MBTI 입력 칸 */}
                <MBTIWrapper>
                    <InputTitle>
                        MBTI
                    </InputTitle>
                    <SelectInput
                        name="MBTI"
                        onChange={handleChange}
                        value={MBTI}
                    >
                        {['ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP', 'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'].map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </SelectInput>
                </MBTIWrapper>

                {/* 닮은꼴 입력 칸 */}
                <TakeAfterWrapper>
                    <InputTitle>
                        닮은꼴
                        <EssentialMark>*</EssentialMark>
                    </InputTitle>
                    <SelectInput
                        name="takeAfter"
                        onChange={handleChange}
                        value={takeAfter}
                    >
                        {['토끼상', '고양이상', '강아지상', '여우상', '곰상', '사슴상'].map(person => (
                            <option key={person} value={person}>{person}</option>
                        ))}
                    </SelectInput>
                </TakeAfterWrapper>

                {/* 흡연여부 입력 칸 */}
                <SmokingWrapper>
                    <InputTitle>
                        흡연여부
                        <EssentialMark>*</EssentialMark>
                    </InputTitle>
                    <CheckboxWrapper>
                        <Checkbox
                            name="smoking"
                            onChange={handleChange}
                            value="Y"
                        >
                            예
                        </Checkbox>
                        <Checkbox
                            name="smoking"
                            onChange={handleChange}
                            value="N"
                        >
                            아니오
                        </Checkbox>
                    </CheckboxWrapper>
                </SmokingWrapper>
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

const InputWrapper = styled.form`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 75vw;
    min-width: calc(230px -5vw);
    max-width: calc(480px - 5vw);
    
    color: #000000;
`

const NameWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: 10px 0;
`
const PhoneNumberWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: center;
    width: 100%;
`

const PhoneNumberInnerWrapper = styled.pre`
    display: flex;
    align-items: center;
    text-align: center;
    width: 100%;
`

const PhoneNumberInput = styled.div`
    width: 30%;
    padding: 5px;
    margin: 0 4%;
`

const PasswordWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
`

const GenderWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
`
const MajorWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
`
const BirthYearWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
`
const AgeDifferenceWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
`
const AgeDifferenceInnerWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: flex-start;
    width: 100%;
`
const AgeDifferenceInputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: flex-start;
    margin: 0 10px;
    width: 25%;
`

const HeightWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
`
const MBTIWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
`
const TakeAfterWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
`
const SmokingWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
`

const InputTitle = styled.p`
    font-size: 15px;
`

const EssentialMark = styled.span`
    font-size: 15px;
    color: #F94364;
`

const TextInput = styled.input`
    width: 100%;
    padding: 5px;

    border-width: 2px;
    border-radius: 5px;
    
    ::placeholder {
        color: #979797;
    }
`

const SelectInput = styled.select`
    width: 100%;
    padding: 5px;
    border-width: 2px;
    border-radius: 5px;
    margin-top: 5px;
    
    ::placeholder {
        color: #979797;
    }
`;

const WarningMessage = styled.div`
    font-size: 11px;
    color: #F94364;
    padding-top: 5px;
`
const CheckboxWrapper = styled.div`
    display: flex;
    align-items: flex-start;
`

const Checkbox = styled.div`
    border: solid 2px;
    border-radius: 5px;
    margin-right: 10px;
    padding: 3px 15px;

    background-color: #FFFFFF;
`