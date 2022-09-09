import Header from '../components/Header';
import Main from '../components/Main';
import styled from 'styled-components';
import tw from 'twin.macro';


const StyledButton = styled.button<{ test: string }>`
    ${tw`py-1 px-8 uppercase rounded-lg border duration-200 bg-gray-300`}; // added duration-200 (optional)

    &:hover {
        ${tw`text-sm`}
        color : ${(props) => props.test}
    }
`;

const Calendar = () => {
    return (
        <>
            <Header />
            <Main />
        </>
    )
};

export default Calendar;
