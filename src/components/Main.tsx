import MainCalendar from "./MainCalendar";
import tw, { styled } from 'twin.macro';
import Leftbar from '../components/Leftbar';

const MainContainer = styled.main`
    ${tw`flex mt-4`}
`
const MainWrapper = styled.div`
    ${tw`flex flex-1 max-h-[calc(100vh - 5rem)] overflow-scroll`}
`
const Main = () => {
    return (
        <MainContainer>
            <Leftbar />
            <MainWrapper>
                <MainCalendar />
            </MainWrapper>
        </MainContainer>
    );
};

export default Main;