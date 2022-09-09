import tw, { styled } from "twin.macro";
import { dayOfWeek } from "../util/dayofweek";
import { allTimeHour } from "../util/allTime";
import { allTime } from "index";

const MainCalendarContainer = styled.div`
    ${tw`w-full`}
`
const MainCalendarHeader = styled.div`
     ${tw`flex h-[84px] top-0 sticky bg-white border-b border-solid`}
`
const GreenwichMeanTimeWrapper = styled.div`
     ${tw`flex items-end text-[10px] min-w-[80px]`}
`
const DayOfWeekContainer = styled.div`
     ${tw`flex w-full`}
`
const MainCalendarBody = styled.div`
     ${tw`flex`}
`
const MainCalendarHoursWrapper = styled.div`
     ${tw`flex flex-col min-w-[80px]`}
     div{
        ${tw`flex text-[12px] h-[50px]`}
     }
`
const MainCalendarTable = styled.div`
    ${tw`flex w-full`}
`
const MainCalendar = () => {
    return (
        <MainCalendarContainer>
            <MainCalendarHeader>
                <GreenwichMeanTimeWrapper>
                    <div>GMT+09</div>
                </GreenwichMeanTimeWrapper>
                <DayOfWeekContainer>
                    {dayOfWeek.map((day: string, index: number) => {
                        return <div key={index} className="flex flex-col justify-center flex-1 min-w-[80px] w-1/7 justify-center ">
                            <div className="m-auto text-[10px]"> {day} </div>
                            <h2 className="m-auto text-[2rem]"> {index} </h2>
                        </div>
                    })}
                </DayOfWeekContainer>
            </MainCalendarHeader>
            <MainCalendarBody>
                <MainCalendarHoursWrapper>
                    {allTimeHour.map((hour: allTime, index: number) => (
                        index === 0 ? <div key={hour.hour}>{ }</div> : <div key={hour.hour}>{hour.showHour}</div>
                    ))}
                </MainCalendarHoursWrapper>
                <MainCalendarTable>
                    {dayOfWeek.map((day: string, index: number) => (
                        <div key={`CalendarTable${day}`} className="flex flex-col flex-1 w-1/7 min-w-[80px] ">
                            {allTimeHour.map((hour: allTime, index: number) => (
                                <div key={`CalendarTable${day}${hour.hour}`} className="border-b border-l border-solid min-w-[80px] min-h-[50px]"></div>
                            ))}
                        </div>
                    ))}
                </MainCalendarTable>
            </MainCalendarBody>
        </MainCalendarContainer>
    );
};

export default MainCalendar;