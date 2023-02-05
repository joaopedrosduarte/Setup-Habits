import { Check } from "phosphor-react";
import * as Checkbox from '@radix-ui/react-checkbox'
import { FormEvent, FormEventHandler, useState } from "react";
import { api } from "../lib/axios";

const avaiableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sabado']

export function NewHabitForm(){
    const [title, setTitle] = useState('');
    const [weekDays, setWeekDays] = useState<number[]>([])

    async function createNewHabit(event: FormEvent){
        event.preventDefault();

        if(!title || weekDays.length === 0){
            return;
        }

        await api.post('habits', {
            title,
            weekDays,
        })

        setTitle('');
        setWeekDays([])

        console.log(title, weekDays);
        alert('criou');
    }

    function HandleToggleWeekDay(weekDay: number) {
        if (weekDays.includes(weekDay)){
            const weekDaysWithRemovedOne = weekDays.filter(day => day !== weekDay);

            setWeekDays(weekDaysWithRemovedOne)
        } else {

            const weekDayWithRemovedOne = [... weekDays, weekDay];
            setWeekDays(weekDayWithRemovedOne)
        }
    }

    return (
        <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
            <label htmlFor="title" className="font-semibold leading-tight">
                Qual seu comprometimento ?
            </label>

            <input type="text" id="title" placeholder="ex.: Exercícios, dormir bem, etc..." autoFocus value={title} className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-offset-2 focus:outline-none focus:ring-violet-900 focus:ring-offset-background" onChange={event => setTitle(event.target.value)}/>

            <label htmlFor="" className="font-semibold leading-tight mt-4">
                Qual a recorrência ?
            </label>

            <div className="flex flex-col gap-2 mt-3">
                {
                    avaiableWeekDays.map((weekDay, i) => {
                        return (
                            <Checkbox.Root 
                                key={weekDay} 
                                className="flex items-center gap-3 group focus:outline-none focus:ring-offset-background" 
                                onCheckedChange={() => { HandleToggleWeekDay(i) }}
                                checked={weekDays.includes(i)}
                            >
                                <div className="h-8 w-8 rounded-lg flex justify-center items-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-offset-2 focus:outline-none group-focus:ring-violet-600 group-focus:ring-offset-background" >
                                    <Checkbox.CheckboxIndicator> 
                                        <Check size={20} className="text-white" />
                                    </Checkbox.CheckboxIndicator>
                                </div>

                                <span className="font-semibold text-white text-xl leading-tight group-data-[state=checked]:text-zinc-400 transition-all">
                                    {weekDay}
                                </span>
                            </Checkbox.Root>
                        )
                    })
                }
            </div>

            <button type="submit" className="mt-6 rounded-lg p-4 gap-3 flex items-center justify-center font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none focus:ring-green-600 focus:ring-offset-background">
                <Check size={20} weight="bold"/>
                Confirmar
            </button>
        </form>
    )
}