import { useState } from "react";
import Navigation from "../popUps/Navigate";
import EditReservation from "../popUps/editReservation";



function ReunioesSemana() {
  const reservas = useState(true);
  const [openNavigate, setOpenNavigate] = useState(false);
  const [modalType, setModalType] = useState<"new" | "edit" | null>(null);
  const [selectedReserva, setSelectedReserva] = useState<Reserva | null>(null);

  type Reserva = {
    sala: string;
    day: Date;
    title: string;
    priority?: boolean;
  };

  const reservasData: Reserva[] = [
    { day: new Date(2026, 5, 8, 10, 0), sala: "Sala 1", title: "Reserva 1" },
    { day: new Date(2026, 5, 8, 10, 0), sala: "Sala 2", title: "Reserva 2" },
    { day: new Date(2026, 5, 8, 10, 0), sala: "Sala 3", title: "Reserva 3", priority: true },
    { day: new Date(2026, 5, 12, 13, 0), sala: "Sala 2", title: "Reserva 4" },
  ];

  const today = new Date();

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });

    const isToday = (date: Date) =>
    date.toDateString() === today.toDateString();

  const times = [
    "06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00",
    "14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"
  ];

  return (
    <div className='h-full w-full px-4'>
      {modalType === "edit" && selectedReserva && (
        <EditReservation
          reserva={selectedReserva}
          onClose={() => {
            setModalType(null);
            setSelectedReserva(null);
          }}
        />
      )}
      <div className='flex-1 mt-4 rounded-md h-9/10 w-full'>
        <div className="pb-15">
          <div
            id="header"
            className="flex h-1/10 items-center justify-between mx-6 text-lg"
          >
            <h1 className="font-semibold text-3xl">
              RBA Comunicações
            </h1>
            <div className="relative">
              <button
                className="py-2 px-3 bg-gray-200 color-gray-800 rounded-sm hover:bg-gray-300 transition-color duration-300 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenNavigate((prev) => !prev);
                }}
              >
                Alternar Visualizacao
              </button>
              {openNavigate && (
                <Navigation />
              )}
            </div>
          </div>              
        </div>

        <div
          className='grid grid-cols-[60px_repeat(7,1fr)] auto-rows-[130px] overflow-y-auto h-9/10 w-full'
        >
          {reservas ? (
            <>
              {/* week days names */}
              <div className="contents">
                <div className="p-2"></div>

                {weekDays.map((day, i) => (
                  <div
                    key={i}
                    className={`border-r p-2 text-center bg-white ${isToday(day) ? "" : "text-gray-500"}`}
                  >
                    {day.toLocaleDateString([], {weekday: "short", day: "2-digit"})}
                  </div>
                ))}
              </div>
              {times.map((time) => (
                <div key={time} className="contents">

                  {/* time column */}
                  <div className="px-2 text-md font-medium bg-white">
                    {time}
                  </div>

                  {/* day's columns */}
                  {weekDays.map((day, dayIndex) => {

                    const reservasDoSlot = reservasData.filter((r) => {
                      const sameDay =
                        r.day.toDateString() === day.toDateString();

                      const sameTime =
                        r.day.toTimeString().slice(0, 5) === time;

                      return sameDay && sameTime;
                    });

                    return (
                      <div
                        key={dayIndex + time}
                        className="border-r p-2 min-h-[80px]"
                      >
                        <div className="border-t pt-1 h-full overflow-auto">
                          {reservasDoSlot.map((reserva, i) => (
                            <div
                              key={i}
                              onClick={() => {
                                setSelectedReserva(reserva);
                                setModalType("edit");
                              }}
                              className={`flex cursor-pointer justify-between rounded-md text-xs my-[1px] items-center
                                ${reserva.priority ? "pl-2" : "px-2 py-1"} 
                                ${(reserva.sala === "Sala 1")
                                  ? "bg-blue-500 text-white"
                                  : reserva.sala === "Sala 2"
                                  ? "bg-red-500 text-white"
                                  : reserva.sala === "Sala 3"
                                  ? "bg-yellow-400"
                                  : ""
                                }
                              `}
                            >
                              <div className="font-medium">
                                {reserva.title}
                              </div>

                              {reserva.priority && (
                                <div className={`h-full px-2 py-1 rounded-sm font-semibold text-white
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
                    );
                  })}
                </div>
              ))}
            </>
          ) : (
            <div className="col-span-8 text-center py-10 text-gray-500">
              Sem Reservas
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReunioesSemana;