import tw, { styled } from 'twin.macro';
import { ClassNames, DateFormatter, DayPicker, ModifiersClassNames } from 'react-day-picker';
import ko from 'date-fns/locale/ko';
import 'react-day-picker/dist/style.css';
import styles from 'react-day-picker/dist/style.module.css';
import { format } from 'date-fns';
import { useState } from 'react';
import AddScheduleButton from './AddScheduleButton';


const LeftbarContainer = styled.div`
      ${tw`flex flex-col w-64 ml-3`}
`
const LeftbarDatePickerWrapper = styled.div`
    .head{
        ${tw`text-[12px] text-gray-600 mt-3`}
    }
    .table{
        ${tw`w-[216px] text-[12px]`}
    }
    .row{
        ${tw`h-8 text-[8px]`}
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
`

const formatCaption: DateFormatter = (month, options) => (format(month, 'yyyy년 M월', { locale: options?.locale }));

const classNames: ClassNames = {
    ...styles,
    // root: 'root',
    caption: 'caption',
    nav: 'nav',
    head: 'head',
    table: 'table',
    row: 'row',
    cell: 'cell',

};

const modifiersClassNames: ModifiersClassNames = {
    today: 'today',
    selected: 'selected',
};

const Leftbar = () => {
    const [selectedDay, setSelectedDay] = useState<Date>();
    return (
        <LeftbarContainer>
            <AddScheduleButton />
            <LeftbarDatePickerWrapper>
                <DayPicker
                    locale={ko}
                    classNames={classNames}
                    modifiersClassNames={modifiersClassNames}
                    mode="single"
                    formatters={{ formatCaption }}
                    onSelect={setSelectedDay}
                    selected={selectedDay} />
            </LeftbarDatePickerWrapper>
        </LeftbarContainer>
    );
};

export default Leftbar;