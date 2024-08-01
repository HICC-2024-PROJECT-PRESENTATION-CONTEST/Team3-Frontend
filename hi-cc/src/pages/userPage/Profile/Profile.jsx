import { useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/MainButton";

export default function Profile() {
    const navigate = useNavigate();

    const userNameRef = useRef(); // focus 기능을 위한 ref
    const phoneNumberFirstRef = useRef();
    const phoneNumberSecondRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const genderRef = useRef();
    const birthYearRef = useRef();
    const takeAfterRef = useRef();
    const smokingRef = useRef();

    const [inputs, setInputs] = useState({
        userName: '',
        phoneNumberFirst: '',
        phoneNumberSecond: '',
        password: '',
        confirmPassword: '',
        gender: '',
        major: '',
        birthYear: '',
        ageDifferenceDown: 0,
        ageDifferenceUp: 0,
        height: '',
        MBTI: '',
        takeAfter: '',
        smoking: '',
    });

    const [warnings, setWarnings] = useState({
        userName: false,
        phoneNumberFirst: false,
        phoneNumberSecond: false,
        password: false,
        confirmPassword: false,
        gender: false,
        birthYear: false,
        takeAfter: false,
        smoking: false,
    });

    const { userName, phoneNumberFirst, phoneNumberSecond, password, confirmPassword, gender, major, birthYear, ageDifferenceDown, ageDifferenceUp, height, MBTI, takeAfter, smoking } = inputs;

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs((prevInput) => {
                return {
                    ...prevInput,
                    [name]: value
                }
        });
        console.log(inputs);
    }

    function handleSelect(e) {
        // div 요소는 name, value 속성을 가지지 않으므로
        const name = e.target.getAttribute('name');
        const value = e.target.getAttribute('value');
        setInputs((prevInput) => {
            return {
                ...prevInput,
                [name]: value
            }
        });
        console.log(inputs);
    }

    function handleBlur(e) {
        const { name, value } = e.target;
        let isValid = false;

        // 유효성 검사 로직
        switch (name) {
            case 'userName':
                const regex = /^[\uAC00-\uD7A3\u3040-\u30FF\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF\u0020-\u007E]+$/;
                isValid = regex.test(value) && value.trim().length >= 2;
                break;
            case 'phoneNumberFirst':
            case 'phoneNumberSecond':
                isValid = /^\d{4}$/.test(value);
                break;
            case 'password':
                isValid = /^\d{4}$/.test(value);
                // 4자리 숫자인지 확인
                break;
            case 'confirmPassword':
                isValid = value === inputs.password;
                break;
            case 'gender':
            case 'birthYear':
            case 'takeAfter':
            case 'smoking':
                isValid = value !== '';
                break;
            default:
                break;
        }

        setWarnings((prevState) => ({
            ...prevState,
            [name]: !isValid
        }));
    }

    // 나이차 +, - 버튼
    function handleAgeDifferenceChange(name, operation) {
        setInputs((prevInput) => {
            let newValue = prevInput[name];
            if (operation === '+' && newValue < 9) {
                newValue += 1;
            } else if (operation === '-' && newValue > 0) {
                newValue -= 1;
            }
            return {
                ...prevInput,
                [name]: +newValue
            }
        });
    }

    // 등록하기 버튼
    function handleClick() {
        if (warnings.userName) {
            return userNameRef.current.focus();
        }

        if (warnings.phoneNumberFirst) {
            return phoneNumberFirst.current.focus();
        }

        if (warnings.phoneNumberSecond) {
            return phoneNumberSecond.current.focus();
        }

        if (warnings.password) {
            return password.current.focus();
        }
        
        if (warnings.confirmPassword) {
            return confirmPassword.current.focus();
        }

        if (warnings.gender) {
            return  gender.current.focus();
        }

        navigate('/recommends');
    }


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
                        type="text"
                        name="userName"
                        placeholder="이름은 상대 선택 화면에서 '홍*동'과 같이 표시됩니다."
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={userName}
                        ref={userNameRef}
                        $valid={!warnings.userName}
                    />
                    {warnings.userName&& (
                        <WarningMessage>
                            *2글자 ~ 30글자의 한글/영어/중국어/일본어 이름만 등록 가능합니다.
                        </WarningMessage>
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
                            <TextInput
                                name="phoneNumberFirst"
                                type="number"
                                min="0"
                                max="9999"
                                onChange={handleChange}
                                value={phoneNumberFirst}
                                ref={phoneNumberFirstRef}
                                $valid={!warnings.phoneNumberFirst}
                            />
                        </PhoneNumberInput> -
                        <PhoneNumberInput>
                            <TextInput
                                name="phoneNumberSecond"
                                type="number"
                                min="0"
                                max="9999"
                                onChange={handleChange}
                                value={phoneNumberSecond}
                                ref={phoneNumberSecondRef}
                                $valid={!warnings.phoneNumberSecond}
                            />
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
                        onBlur={handleBlur}
                        value={password}
                        placeholder="비밀번호는 4자리 숫자로 입력해주세요"
                        autoComplete="off"
                        ref={passwordRef}
                        $valid={!warnings.password}
                    />
                    {warnings.password&& (
                        <WarningMessage>
                            *비밀번호는 4자리 숫자로 입력해주세요.
                        </WarningMessage>
                    )}
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
                        onBlur={handleBlur}
                        value={confirmPassword}
                        autoComplete="off"
                        ref={confirmPasswordRef}
                        $valid={!warnings.confirmPassword}
                    />
                    {warnings.confirmPassword && (
                        <WarningMessage>
                            *비밀번호가 일치하지 않습니다.
                        </WarningMessage>
                    )}
                </PasswordWrapper>

                {/* 성별 입력 칸 */}
                <GenderWrapper>
                    <InputTitle>
                        성별
                        <EssentialMark>*</EssentialMark>
                    </InputTitle>
                    <CheckboxWrapper ref={genderRef} tabIndex={0}>
                        {/* div에 focus하려면 tabIndex를 붙여야함 */}
                        <Checkbox
                            name="gender"
                            onClick={handleSelect}
                            value="male"
                            $selected={inputs.gender === "male"}
                        >
                            남
                        </Checkbox>
                        <Checkbox
                            name="gender"
                            onClick={handleSelect}
                            value="female"
                            $selected={inputs.gender === "female"}
                        >
                            여
                        </Checkbox>
                    </CheckboxWrapper>
                </GenderWrapper>

                {/* 학과 입력 칸 */}
                <MajorWrapper>
                    <InputTitle>학과</InputTitle>
                    <TextInput
                        name="major"
                        onChange={handleChange}
                        value={major}
                        placeholder="학과를 입력하세요."
                        $valid="true"
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
                        ref={birthYearRef}
                        $valid={!warnings.birthYear}
                    >
                        <option value="" disabled>YYYY</option>
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
                        <CountButton
                                type="button"
                                name="ageDifferenceUp"
                                onClick={() => handleAgeDifferenceChange('ageDifferenceUp', '-')}
                                $valid={inputs.ageDifferenceUp > 0}
                            >
                                -
                            </CountButton>
                            {inputs.ageDifferenceUp}
                            <CountButton
                                type="button"
                                name="ageDifferenceUp"
                                onClick={() => handleAgeDifferenceChange('ageDifferenceUp', '+')}
                                $valid={inputs.ageDifferenceUp < 9}
                            >
                                +
                            </CountButton>
                        </AgeDifferenceInputWrapper>
                        아래로
                        <AgeDifferenceInputWrapper>
                            <CountButton
                                type="button"
                                name="ageDifferenceDown"
                                onClick={() => handleAgeDifferenceChange('ageDifferenceDown', '-')}
                                value={ageDifferenceDown}
                                $valid={inputs.ageDifferenceDown > 0}
                            >
                                -
                            </CountButton>
                            {inputs.ageDifferenceDown}
                            <CountButton
                                type="button"
                                name="ageDifferenceDown"
                                onClick={() => handleAgeDifferenceChange('ageDifferenceDown', '+')}
                                value={ageDifferenceDown}
                                $valid={inputs.ageDifferenceDown < 9}
                            >
                                +
                            </CountButton>
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
                        placeholder="키를 입력해주세요."
                        $valid="true"
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
                        <option value="" disabled>MBTI를 선택하세요</option>
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
                        ref={takeAfterRef}
                        $valid={!warnings.takeAfter}
                    >
                        <option value="" disabled>본인의 닮은꼴을 선택하세요</option>
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
                    <CheckboxWrapper 
                        ref={smokingRef}
                        tabIndex={0}
                    >
                        <Checkbox
                            name="smoking"
                            onClick={handleSelect}
                            value="Y"
                            $selected={inputs.smoking === "Y"}
                        >
                            예
                        </Checkbox>
                        <Checkbox
                            name="smoking"
                            onClick={handleSelect}
                            value="N"
                            $selected={inputs.smoking === "N"}
                        >
                            아니오
                        </Checkbox>
                    </CheckboxWrapper>
                </SmokingWrapper>
            </InputWrapper>

            {/* 등록하기 버튼 */}
            {/* 비밀번호 0000일 경우 고려하기!! */}
            <Button onClick={handleClick} $valid={userName && phoneNumberFirst && phoneNumberSecond && password && confirmPassword && gender && birthYear && takeAfter && smoking}>등록하기</Button>
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
    margin: 1px 0;
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

const PhoneNumberInnerWrapper = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    width: 100%;
`

const PhoneNumberInput = styled.div`
    width: 30%;
    padding: 0 5px;
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
    align-items: center;
    width: 100%;
`
const AgeDifferenceInputWrapper = styled.div`
    position: relative;
    display: flex;
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

const InputTitle = styled.div`
    font-size: 15px;
    padding: 25px 0 10px 0;
`

const EssentialMark = styled.span`
    font-size: 15px;
    color: #F94364;
`

const TextInput = styled.input`
    width: calc(100% - 5px);
    padding: 5px 5px;
    
    border-color: ${(props) => props.$valid ? "#000000" : "#F94364"};
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

    background-color: ${(props) => props.$selected ? "#FAA8B1" : "#FFFFFF"};
`

const CountButton = styled.button`
    width: 27px;
    height: 27px;
    border: solid 2px;
    border-radius: 5px;
    margin: 0 10px;

    background-color: ${(props) => props.$valid ? "#FAA8B1" : "#D9D9D9"};
`