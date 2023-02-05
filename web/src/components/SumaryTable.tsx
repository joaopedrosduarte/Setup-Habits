import { useEffect, useState } from "react";
import { HabitDay } from './HabitDay';
import { generateDateRange } from '../utils/generateDateRange';
import { api } from '../lib/axios';
import dayjs from 'dayjs';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const daysRange = generateDateRange()
const minimumSumaryDatesSize = 18 * 7

const amountOfDaysToFill = minimumSumaryDatesSize - daysRange.length

type Sumary = Array<{
    id: string;
    date: string;
    amount: number;
    completed: number;
}>

export function SumaryTable(){
    const [summary, setSummary] = useState<Sumary>([])
    
    useEffect(() => {
        api.get('summary').then(response => {
            setSummary(response.data)
        })
    },[])

    return (
        <div className="flex w-full">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {weekDays.map((weekDay, i) => {
                    return (
                        <div key={`${weekDay}-${i}`} className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
                            {weekDay}
                        </div>
                    )
                })}
            </div>
            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {
                    summary.length > 0 && daysRange.map(date => {
                        const dayInSumarry = summary.find(day => {
                            return dayjs(date).isSame(day.date, 'day');
                        })

                        return <HabitDay amount={dayInSumarry?.amount} defaultCompleted={dayInSumarry?.completed} date={date} key={date.toString()} />
                    })
                }

                {amountOfDaysToFill > 0 && Array.from({length: amountOfDaysToFill}).map((_, i) => {
                    return <div key={i} className="w-10 h-10 bg-zinc-900 border-2 rounded-lg border-zinc-800 cursor-not-allowed opacity-40"/>
                })}
            </div>
        </div>
    )
}