import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { DateFormatter, ClassNames, ModifiersClassNames, DayPicker, SelectSingleEventHandler } from 'react-day-picker';
import styles from 'react-day-picker/dist/style.css';
import { useSelector, useDispatch } from 'react-redux';
import tw, { styled } from 'twin.macro';
import { currentCalendar, setDay, setMonth } from '../store/modules/calendar';
import { schedules, setCurrentSchedule } from '../store/modules/schedule';

const LeftbarDatePickerWrapper = styled.div<{ isOpen: boolean, isModal: boolean }>`
    ${tw`bg-white mt-2`}
    ${props => props.isOpen ? '' : tw`hidden`}
    ${props => props.isModal ? tw`absolute shadow-[ 0px 5px 10px 0px rgba(0,0,0,0.30)]` : ''}
    .head{
        ${tw`text-[14px] text-gray-600 mt-3`}
    }
    .table{
        ${tw`w-[216px]`}
    }
    .row{
        ${tw`h-8 text-[12px] font-semibold`}
        .cell{
            button{
                ${tw`my-0 mx-auto w-5 h-5 mt-[1px]`}
            }
        }
    }
    .caption{
        ${tw`flex justify-between text-[10px] text-gray-600 ml-1`}
    }
    .nav{
        ${tw`flex justify-center items-center`}
        button{
            ${tw`w-5 h-5 rounded-full hover:bg-gray-100`}
            svg{
                ${tw`w-3`}
            }
        }
    }

    .today{
        ${tw`text-white bg-blue-500 hover:bg-blue-600`}
    }
    .selected{
        ${tw`text-blue-800 bg-blue-300`}
    }
    .outside{
        ${tw`text-gray-500 font-normal`}
    }
`;

const formatCaption: DateFormatter = (month, options) => (format(month, 'yyyy년 M월', { locale: options?.locale }));

const classNames: ClassNames = {
    ...styles,
    caption: 'caption',
    nav: 'nav',
    head: 'head',
    table: 'table',
    row: 'row',
    cell: 'cell',
}

const modifiersClassNames: ModifiersClassNames = {
    today: 'today',
    selected: 'selected',
    outside: 'outside'
}

interface DatePickerProps {
    isOpen: boolean,
    isModal: boolean,
}
const DatePicker = ({ isOpen, isModal }: DatePickerProps) => {
    const { selectDay, current } = useSelector(currentCalendar);
    const { currentSchedule } = useSelector(schedules);
    const dispatch = useDispatch();
    return (
        <LeftbarDatePickerWrapper isOpen={isOpen} isModal={isModal}>
            <DayPicker
                showOutsideDays
                fixedWeeks
                locale={ko}
                classNames={classNames}
                modifiersClassNames={modifiersClassNames}
                mode="single"
                formatters={{ formatCaption }}
                month={new Date(`${current.year}-${current.month}`)}
                onMonthChange={(e: unknown) => dispatch(setMonth((e as Date).toString()))}
                onSelect={(e: unknown) => {
                    dispatch(setDay((e as SelectSingleEventHandler).toString()));
                    dispatch(setCurrentSchedule({
                        ...currentSchedule,
                        date: format((e as Date), 'yyyy-MM-dd')
                    }))
                }}
                selected={selectDay}
            />
        </LeftbarDatePickerWrapper>
    );
};

export default DatePicker;