import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Calendar } from '../ui/calendar';
import { useState } from "react";
import Navigation from "../popUps/Navigate";
import EditReservation from "../popUps/editReservation";
import NewReservation from "../popUps/newReservation";



function ReunioesDia() {
  const reservas = useState(true);
  const [onlyPriority, setOnlyPriority] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [filterSala, setFilterSala] = useState("");
  const [filterTime, setFilterTime] = useState("");
  const [modalType, setModalType] = useState<"new" | "edit" | null>(null);
  const [openNavigate, setOpenNavigate] = useState(false);
  const [selectedReserva, setSelectedReserva] = useState<Reserva | null>(null);

  type Reserva = {
    sala: string;
    day: Date;
    title: string;
    priority?: boolean;
  };

  const reservasData: Reserva[] = [
    { day: new Date(2026, 4, 4, 10, 0), sala: "Sala 1", title: "Reserva 1" },
    { day: new Date(2026, 4, 4, 10, 0), sala: "Sala 2", title: "Reserva 2" },
    { day: new Date(2026, 4, 4, 10, 0), sala: "Sala 3", title: "Reserva 3", priority: true },
    { day: new Date(2026, 4, 8, 13, 0), sala: "Sala 2", title: "Reserva 4" },
  ];


  const times = [
    "06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00",
    "14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"
  ];

  const salas = ["Sala 1", "Sala 2", "Sala 3"];

  return (
    <div id='page' className='w-screen h-screen m-0 p-0 flex'>

      {modalType === "edit" && selectedReserva && (
        <EditReservation
          reserva={selectedReserva}
          onClose={() => {
            setModalType(null);
            setSelectedReserva(null);
          }}
        />
      )}
      {modalType === "new" && (
        <NewReservation onClose={() => setModalType(null)}/>
      )}
      <div id='' className='grid grid-cols-[3fr_7fr] h-full w-full py-6'>
        <div className='flex flex-col h-full w-full border-r border-gray-300 overflow-hidden p-4'>
          <div className="overflow-y-auto">
            <div
              className='p-5 flex flex-col items-center w-full'
            >
              <Input 
                placeholder="Filtrar sala" 
                className="w-80 mb-2"
                value={filterSala}
                onChange={(e) => setFilterSala(e.target.value)}
              />
              <Input 
                placeholder="Filtrar horário" 
                className="w-80"
                value={filterTime}
                onChange={(e) => setFilterTime(e.target.value)}
              />
            </div>
            <div
              className='w-full flex items-center px-2 mt-5'
            >
              <div
                className='w-full flex items-center justify-around px-2 mt-5 gap-5'
              >
                <Button
                  className={`transition-color duration-300 
                  ${onlyPriority 
                    ? "bg-gray-300 text-gray-800 hover:bg-gray-300"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                  onClick={() => setOnlyPriority((prev) => !prev)}
                >
                  Prioritario
                </Button>
                <Button
                  className="bg-gray-200 text-gray-800 hover:bg-gray-300 
                  transition-color duration-300"
                  onClick={() => setModalType("new")}
                >
                  Nova Reserva
                </Button>
              </div>
            </div>

            <div className='flex-1 mt-4 overflow-hidden rounded-md h-7/10 w-full py-2'>
              <Calendar
                className="w-8/10 border-2 rounded-lg m-auto"
                selected={selectedDate}
                onSelect={setSelectedDate}
                mode="single"
              />

            </div>            
          </div>

        </div>
        <div className='h-full w-full px-4 overflow-hidden flex flex-col'>
          <div className='flex-1 mt-4 rounded-md h-9/10 w-full'>
            <div className="pb-4 flex-shrink-0">
              <div
                id="header"
                className="flex h-1/10 items-center justify-between mx-6 text-lg"
              >
                <h1 className="font-semibold text-3xl">
                  Nome Da Empresa
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
              className='grid grid-cols-[60px_repeat(3,1fr)] auto-rows-[80px] overflow-y-auto h-9/10 w-full'
            >
              {reservas ? (
                <>
                  <div className="contents font-semibold">
                    <div className="p-2"></div>
                    {/** map each room */}
                    {salas.map((sala) => (
                      <div key={sala} className="border-r p-2 text-center">
                        {sala}
                      </div>
                    ))}
                  </div>
                  {/** for each hour */}
                  {times.map((time) => (
                    <div key={time} className="contents">

                      {/* print hour */}
                      <div className="p-1">{time}</div>

                      {/* get reserved room */}
                      {salas.map((sala) => {
                        const reserva = reservasData.find((r) => {
                          if (!selectedDate) return false;

                          const sameDay =
                            r.day.toDateString() === selectedDate.toDateString();

                          const sameTime =
                            r.day.toTimeString().slice(0, 5) === time;

                          const matchesPriority =
                            !onlyPriority || r.priority === true;

                          const matchesSala =
                            filterSala === "" ||
                            r.sala.toLowerCase().includes(filterSala.toLowerCase());

                          const matchesTimeInput =
                            filterTime === "" ||
                            r.day.toTimeString().slice(0, 5).includes(filterTime);

                          return (
                            r.sala === sala &&
                            sameDay &&
                            sameTime &&
                            matchesPriority &&
                            matchesSala &&
                            matchesTimeInput
                          );
                        });

                        return (
                          <button 
                            key={sala + time} 
                            className="cursor-pointer border-r p-2 h-full"
                            onClick={() => {
                              if (reserva) {
                                setSelectedReserva(reserva);
                                setModalType("edit");
                              }
                            }}
                          >
                            <div className="border-b h-full">
                              <div className="h-full overflow-y-auto">
                                {/** Print reserva */}
                                {reserva && (
                                  <div
                                    className={`rounded pl-2 flex justify-between items-center 
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
                                    {reserva.title}
                                    {/** if priority put priority */}
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
                                )}
                              </div>

                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </>
              ) : (
                <div className="col-span-4 text-center py-10 text-gray-500">
                  Sem Reservas
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReunioesDia;
