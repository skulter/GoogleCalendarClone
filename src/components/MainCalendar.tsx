import tw, { styled } from "twin.macro";
import { dayOfWeek } from "../util/dayOfweek";
import { allTimeHour } from "../util/allTime";
import { allTime, deleteModalInfoType } from "../index";
import { useSelector } from "react-redux";
import { currentCalendar } from "../store/modules/calendar";
import { schedules } from "../store/modules/schedule";
import { format } from "date-fns";
import { MouseEvent, MouseEventHandler, useState } from "react";
import DeleteScheduleModal from "./DeleteScheduleModal";

const MainCalendarContainer = styled.div`
    ${tw`w-full`}
`
const MainCalendarHeader = styled.div`
     ${tw`flex h-[84px] top-0 sticky bg-white border-b border-solid z-20`}
`
const GreenwichMeanTimeWrapper = styled.div`
     ${tw`flex items-end text-[10px] min-w-[80px]`}
`
const DayOfWeekContainer = styled.div`
     ${tw`flex w-full relative`}
     >div {
        ${tw`flex flex-col justify-center flex-1 min-w-[80px] text-center`}
     }
`
const MainCalendarBody = styled.div`
     ${tw`flex`}
`
const MainCalendarHoursWrapper = styled.div`
     ${tw`min-w-[80px]`}
     div{
        ${tw`flex flex-col text-[12px] h-[50px]`}
     }
`
const MainCalendarTable = styled.div`
    ${tw`flex w-full z-0`}
`

const ScheduleInfo = styled.div<{ height: string, top: string }>`
    ${tw`flex flex-1 flex-col w-5/6 min-h-[25px] absolute 
         bg-blue-500 px-2 py-1 text-sm text-white rounded-lg absolute overflow-y-hidden text-[12px] 
         border-white border cursor-pointer hover:bg-blue-400`}
    height: ${props => props.height};
    top: ${props => props.top};
`

const MainCalendar = () => {
    const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [deleteModalInfo, setDeleteModalInfo] = useState<deleteModalInfoType>({ id: 0, position: { x: 0, y: 0 } });
    const schedulesArr = useSelector(schedules);
    const { current, today } = useSelector(currentCalendar);

    const handleContextMenu = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDeleteModalOpen(true);
        setDeleteModalInfo({
            id: parseInt(e.currentTarget.dataset.schedule as string),
            position: {
                x: e.clientX,
                y: e.clientY
            }
        });
    };
    // const handleScheduleClick = (e: MouseEvent<HTMLDivElement>) => {
    //     e.currentTarget.style.zIndex = '50';
    // }
    return (
        <MainCalendarContainer>
            <MainCalendarHeader>
                <GreenwichMeanTimeWrapper>
                    <div>GMT+09</div>
                </GreenwichMeanTimeWrapper>
                <DayOfWeekContainer>
                    {dayOfWeek.map((day: string, index: number) => {
                        const isToday = format(today, 'yyyyMMdd') === format(new Date(current.year, current.month - 1, current.days[index]), 'yyyyMMdd');
                        return (
                            <div key={index}>
                                <div className="text-[10px]"> {day} </div>
                                <div className={`text-[24px] w-10 h-10 m-auto ${isToday && 'bg-blue-500 rounded-full text-white'}`}>
                                    {current.days[index]}{isToday}
                                </div>
                            </div>
                        )
                    })}
                </DayOfWeekContainer>
            </MainCalendarHeader>
            <MainCalendarBody>
                <MainCalendarHoursWrapper>
                    {allTimeHour.map((hour: allTime, index: number) => (
                        index === 0 ? <div key={hour.hour}></div> : <div key={hour.hour}>{hour.showHour}시</div>
                    ))}
                </MainCalendarHoursWrapper>
                <MainCalendarTable>
                    {dayOfWeek.map((day: string, index) => (
                        <div key={`CalendarTable${day} `} className="relative flex flex-col flex-1 min-w-[80px] ">
                            {allTimeHour.map((hour: allTime) => (
                                <div key={`CalendarTable${day}${hour.hour} `} className="border-b border-l border-solid min-w-[80px] min-h-[50px]" />
                            ))}
                            {schedulesArr.filter((schedule) => {
                                return schedule.date === `${current.year}-${current.month.toString().padStart(2, '0')}-${current.days[index]}`
                            }).map(data => {
                                let height = (data.endDate.hour - data.startDate.hour) * 50 - data.startDate.min * 0.8 + data.endDate.min * 0.8; // 60분 /  각 행의 높이 50 = 0.8333
                                const top = data.startDate.hour * 50 + data.startDate.min * 0.8;
                                return (
                                    <ScheduleInfo
                                        key={`${data.title}${data.date}`}
                                        height={`${height}px`}
                                        top={`${top}px`}
                                        title={`${data.startDate.hour}시${data.startDate.min}분 - ${data.endDate.hour}시${data.endDate.min}분`}
                                        data-schedule={data.id}
                                        onContextMenu={handleContextMenu}
                                    // onClick={handleScheduleClick}
                                    >
                                        <div>{data.title}{data.id}</div>
                                        <div>{data.startDate.hour}시{data.startDate.min}분 - {data.endDate.hour}시{data.endDate.min}분</div>
                                    </ScheduleInfo>
                                )
                            })}
                        </div>
                    ))}
                    {isDeleteModalOpen && <DeleteScheduleModal isOpenModal={isDeleteModalOpen} setIsOpenModal={setDeleteModalOpen} deleteModalInfo={deleteModalInfo} />}
                </MainCalendarTable>
            </MainCalendarBody>
        </MainCalendarContainer >
    );
};

export default MainCalendar;