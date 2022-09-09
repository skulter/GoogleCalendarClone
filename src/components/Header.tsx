import { Component } from 'react';
import tw, { styled } from 'twin.macro';
import Menu from '/menu.svg';
import Calendar from '/calendar.png';
import ChevronLeft from '/chevron_left.svg';
import ChevronRight from '/chevron_right.svg';

const HeaderContainer = styled.header`
    ${tw`flex items-center w-full h-16 p-2 border-b border-gray-300 `};
`;

const MenuContainer = styled.div`
      ${tw`flex items-center w-60 h-12`};
`
const MenuBtnWrapper = styled.div`
      ${tw`flex items-center justify-center w-12 p-3 m-1 cursor-pointer rounded-full hover:bg-gray-100`};
`
const CalendarWrapper = styled.div`
    ${tw`flex items-center`};
    span{
        ${tw`pl-1 text-xl text-gray-500`};
    }
`
const DateContainer = styled.div`
    ${tw`flex items-center w-full h-12 justify-between`};
   
`
const TodayBtnWrapper = styled.div`
     ${tw`flex items-center h-9`};
     .today{
        ${tw`text-sm border rounded border-gray-300 px-3 py-1.5 mr-4 text-gray-700 cursor-pointer`};
        :hover{
            ${tw`bg-gray-100`}
        }
     }
     .chevron{
        ${tw`flex items-center justify-center cursor-pointer w-8 h-8 rounded-full hover:bg-gray-100`};
     }
     div {
        ${tw`flex items-center ml-2 h-full`}
        .todayDate{
            ${tw`text-xl w-44`};
        }
    }
`

export class Header extends Component {
    render() {
        return (
            <HeaderContainer>
                <MenuContainer>
                    <MenuBtnWrapper><img src={Menu} /></MenuBtnWrapper>
                    <CalendarWrapper>
                        <img src={Calendar} width='40px' height='40px' />
                        <span>캘린더</span>
                    </CalendarWrapper>
                </MenuContainer>
                <DateContainer>
                    <TodayBtnWrapper>
                        <span className='today'>오늘</span>
                        <span className='chevron'><img src={ChevronLeft} /></span>
                        <span className='chevron fill-blue-500'><img src={ChevronRight} /></span>
                        <div>
                            <span className='todayDate'>2022년 9월 8일</span>
                        </div>
                    </TodayBtnWrapper>
                    <span className="px-3 py-1 mx-3 border border-gray-200 rounded text-sm">주</span>
                </DateContainer>

            </HeaderContainer>
        )
    }
}

export default Header