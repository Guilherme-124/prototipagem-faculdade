import { useMemo } from "react";
import useCalendar from "./useCalendar";

type Reserva = {
  sala: string;
  day: Date;
  title: string;
  priority?: boolean;
};


type Props = {
  locale?: string;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  reservas: Reserva[];
};

const Calendario: React.FC<Props> = ({ locale = navigator.language, selectedDate, setSelectedDate, reservas }) => {
  const {
    year,
    month,
    weekdays,
    cells,
    isToday,
    goNext,
    goPrev } = useCalendar(new Date(), locale);

  const monthFormatter = useMemo(() => {
    return new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" })
  }, [locale])

  function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

  const TODAY = new Date();


  return (
    <>
      <div className="h-8/10 overflow-y-auto">
      {/* Calendar header */}
        <div className="sticky top-0 z-10 bg-white">
          <div
            className="flex items-center justify-between mb-3"
          >
            <button
              className="px-3 py-2 rounded-2xl border border-gray-50 text-sm hover:bg-gray-100 transition"
              onClick={goPrev}
            >
              Prev
            </button>

            <div
              className="text-lg font-semibold select-none"
            >
              {monthFormatter.format(new Date(year, month, 1))}
            </div>
            <button
              className="px-3 py-2 rounded-2xl border border-gray-50 text-sm hover:bg-gray-100 transition"
              onClick={goNext}
            >
              Next
            </button>
          </div>          

          <div className="grid grid-cols-7">
            {/* Day names */}
              {weekdays.map(dayName => (
                <div
                  key={dayName}
                  className="text-center font-medium py-1 border border-gray-300"
                >
                  {dayName}
                </div>
              ))}
          </div>
        </div>


        <div
          className="grid grid-cols-7 text-xs text-gray-500 mb-1"
        >
          {/* Day Cells */}
          {cells.map(({ date, currentMonth }) => {
            const todayCell = isToday(date);

            const reservasDoDia = reservas.filter((r) => isSameDay(r.day, date))

            let base = " aspect-square relative flex items-center justify-center select-none border border-gray-300 cursor-pointer";
            base += todayCell ? "" : " hover:bg-gray-100";
            const tones = currentMonth ? " bg-white" : "bg-gray-100 opacity-70";
            const todayRing = todayCell ? " ring-2 ring-inset ring-blue-400" : "";

            return (
              <div
                key={date.toISOString()}
                className={`${base} ${todayRing} 
                  ${(selectedDate.toDateString() === date.toDateString() 
                    && selectedDate.toDateString() !== TODAY.toDateString()) ? "bg-gray-200" : `${tones}`}
                `}
                title={date.toDateString()}
                onClick={() => setSelectedDate(date)}
              >
                <span className={`absolute top-1.5 right-1.5 ${todayCell ? "font-bold" : ""}`}>
                  {date.getDate()}
                </span>

                {todayCell &&
                  <span className="absolute top-1.5 left-1.5 text-[10px] px-1 py-0.5 rounded-md bg-blue-400/80 text-white">
                    today
                  </span>
                }
                <div
                  className="flex flex-col gap-1 overflow-y-auto w-full h-full p-1 pr-5"
                >
                  {reservasDoDia.map((reserva, i) => (
                    <div
                      key={i}
                      className={`text-sm pl-1 rounded truncate flex items-center justify-between w-full overflow-x-auto
                        ${
                          reserva.priority
                            ? "bg-yellow-400 text-gray-900"
                            : reserva.sala === "Sala 1"
                            ? "bg-blue-500 text-white"
                            : reserva.sala === "Sala 2"
                            ? "bg-red-500 text-white"
                            : reserva.sala === "Sala 3"
                            ? "bg-yellow-300"
                            : "bg-gray-300"
                        }
                      `}
                    >
                      {reserva.title}

                      {reserva.priority && (
                        <div className={`h-full ml-1 px-2 py-1 rounded-sm font-semibold text-white
                          ${(reserva.sala === "Sala 1")
                            ? "bg-blue-600 text-white"
                            : reserva.sala === "Sala 2"
                            ? "bg-red-600 text-white"
                            : reserva.sala === "Sala 3"
                            ? "bg-yellow-500"
                            : ""
                          }`
                        }>
                          Prioritário
                        </div>
                      )}
                    </div>
                  ))}                  
                </div>

              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Calendario;