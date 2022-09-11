import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { format } from "date-fns";
import { createSelectTime } from '../util/selectTime'
import { scheduleType, selectTimeType } from '..';
import { useDispatch } from 'react-redux';
import { addSchedule } from '../store/modules/schedule'

const AddScheduleModalContainer = styled.div<{ isOpenModal: boolean }>`
    ${tw`top-32 left-5 -flex flex-col w-[360px] bg-white rounded-lg shadow-xl z-50`}
    ${props => props.isOpenModal ? tw`fixed` : tw`hidden`}
`;

const AddScheduleModalCloseWrapper = styled.div`
    ${tw`flex justify-end w-full bg-gray-100 text-2xl pr-3 pb-1 rounded-t-lg`}

    div{
        ${tw`cursor-pointer`}
    }
`;

const AddScheduleModalFormWrapper = styled.div`
    ${tw`flex flex-col w-full p-4`}
`;
const AddScheduleModalFormDataContainer = styled.div`
    ${tw`mt-3`}
`;

const SelectBox = styled.select`
    ${tw`outline-none border-transparent border-2 border-solid focus:border-b-indigo-500 focus:bg-gray-100`}
`

interface AddScheduleModalProps {
    isOpenModal: boolean
    setIsOpenModal: Dispatch<SetStateAction<boolean>>
}

const today = new Date();
const tadayText = format(today, 'yyyy-MM-dd');
const scheduleInitialState: scheduleType = {
    id: 0,
    date: tadayText,
    startDate: { hour: 0, min: 0 },
    endDate: { hour: 0, min: 0 },
    title: ''
}

const AddScheduleModal = ({ isOpenModal, setIsOpenModal }: AddScheduleModalProps) => {
    const dispatch = useDispatch();
    const seleteTimeData = createSelectTime();
    const [schedule, setSchedule] = useState<scheduleType>(scheduleInitialState);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsOpenModal(false);
        dispatch(addSchedule(schedule));
        setSchedule(scheduleInitialState)
    };

    const handleStartDateChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const [hour, min] = e.currentTarget.value.split(":");
        setSchedule({
            ...schedule, startDate: {
                hour: parseInt(hour),
                min: parseInt(min)
            }
        })
    };

    const handleEndDateChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const [hour, min] = e.currentTarget.value.split(":");
        setSchedule({
            ...schedule, endDate: {
                hour: parseInt(hour),
                min: parseInt(min)
            }
        })
    };

    return (
        <AddScheduleModalContainer isOpenModal={isOpenModal}>
            <AddScheduleModalCloseWrapper className='flex justify-end itmes-center w-full bg-gray-100 text-2xl pr-3 pb-1 rounded-t-lg' >
                <div onClick={() => {
                    setIsOpenModal(false);
                    setSchedule(scheduleInitialState);
                }}>
                    x
                </div>
            </AddScheduleModalCloseWrapper >
            <AddScheduleModalFormWrapper>
                <form onSubmit={handleSubmit}>
                    <input type='text'
                        className='w-full outline-none border-transparent border-2 border-solid border-b-zinc-100 '
                        placeholder="제목 추가"
                        required
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setSchedule({ ...schedule, title: e.target.value })
                        }}
                        value={schedule.title}
                    />
                    <AddScheduleModalFormDataContainer>
                        <input type="date"
                            value={schedule.date}
                            className="w-[110px]"
                            onChange={(e) => {
                                setSchedule({ ...schedule, date: format(new Date(e.target.value), 'yyyy-MM-dd') });
                            }}
                        />
                        <SelectBox onChange={handleStartDateChange} value={`${schedule.startDate.hour}:${schedule.startDate.min}`}>
                            {seleteTimeData.map((time, index) => (
                                <option
                                    key={time.showText + index}
                                    value={`${time.hour}:${time.min}`}
                                >
                                    {time.showText}
                                </option>
                            ))}
                        </SelectBox>
                        -
                        <SelectBox
                            onChange={handleEndDateChange} value={`${schedule.endDate.hour}:${schedule.endDate.min}`}>
                            {seleteTimeData.map((time, index) => (
                                <option
                                    key={time.showText + index}
                                    value={`${time.hour}:${time.min}`}
                                >
                                    {time.showText}
                                </option>
                            ))}
                        </SelectBox>
                    </AddScheduleModalFormDataContainer>
                    <div className="flex justify-end w-full mb-3 mt-8 ">
                        <button className="bg-blue-500 text-white px-4 py-2 text-sm rounded hover:bg-blue-600" type="submit">
                            저장
                        </button>
                    </div>
                </form>
            </AddScheduleModalFormWrapper >
        </AddScheduleModalContainer >
    );
};

export default AddScheduleModal;