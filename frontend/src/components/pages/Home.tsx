import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Calendario from "../Calendario/Calendar";
import { useEffect, useMemo, useState } from "react";
import EditReservation from "../popUps/editReservation";
import NewReservation from "../popUps/newReservation";
import Navigation from "../popUps/Navigate";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


function Home({ admin }: { admin: boolean }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [onlyPriority, setOnlyPriority] = useState(false);
  const [filterTitle, setFilterTitle] = useState("");
  const [filterTime, setFilterTime] = useState("");
  const [modalType, setModalType] = useState<"new" | "edit" | null>(null);
  const [openNavigate, setOpenNavigate] = useState(false);
  const [selectedReserva, setSelectedReserva] = useState<Reserva | null>(null);
  const [showGraph, setShowGraph] = useState(false);


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

  const reservasPorHora = times.map((time) => ({
    time,
    total: reservasData.filter(
      (r) => r.day.getHours() === parseInt(time.split(":")[0])
    ).length,
  }));

  const reservasPorSala = salas.map((sala) => ({
    sala,
    total: reservasData.filter((r) => r.sala === sala).length,
  }));

  const reservasDoDia = useMemo(() => {
    return reservasData.filter((reserva) => {
      const sameDay = isSameDay(reserva.day, selectedDate);
      const matchesPriority =
        !onlyPriority || reserva.priority === true;

      const matchesTitle =
        filterTitle === "" ||
        reserva.title.toLowerCase().includes(filterTitle.toLowerCase());

      const matchesTimeInput =
        filterTime === "" ||
        reserva.day.toTimeString().slice(0, 5).includes(filterTime);

      return sameDay && matchesPriority && matchesTitle && matchesTimeInput;
    });
  }, [reservasData, selectedDate, onlyPriority, filterTitle, filterTime]);

  useEffect(() => {
  const handleClick = () => setOpenNavigate(false);

  if (openNavigate) {
    window.addEventListener("click", handleClick);
  }

  return () => window.removeEventListener("click", handleClick);
}, [openNavigate]);

  function isSameDay(a: Date, b: Date) {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

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
        <div className='flex flex-col h-full w-full border-r border-gray-300 overflow-auto p-4 items-center'>
          <div
            className='p-5 flex flex-col items-center w-full'
          >
            <Input 
              placeholder="Procurar Titulo da Reserva" 
              className="w-80 mb-2"
              value={filterTitle}
              onChange={(e) => setFilterTitle(e.target.value)}
            />
            <Input 
              placeholder="Procurar Horario da Reserva" 
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
            <div
              className='overflow-y-auto h-full w-full border border-gray-300 rounded-sm'
            >
              {reservasDoDia.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-500 font-semibold">
                  <h1>No Reservations Today</h1>
                </div>
              ) :times.map((time) => {
                const reservasNoHorario = reservasDoDia.filter(
                  (reserva) =>
                    reserva.day.getHours() === parseInt(time.split(":")[0])
                  );

                return (
                  <div
                    key={time}
                    className="flex w-full h-30 border-b border-gray-300 pt-[1px]"
                  >
                    {/* Hour */}
                    <div className="p-1">{time}</div>

                    {/* Reservations container */}
                    <div className="flex flex-row flex-1 w-full h-fit gap-1 overflow-auto">

                      {reservasNoHorario.length > 0 ? (
                        reservasNoHorario.map((reserva, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setSelectedReserva(reserva);
                              setModalType("edit");
                            }}
                            className={`cursor-pointer rounded pl-2 flex justify-between items-center h-fit whitespace-nowrap 
                              ${
                                reserva.priority ? "pl-2" : "px-2 py-1"
                              } 
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
                            <h1>{reserva.title}</h1>

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
                          </button>
                        ))
                      ) : (
                        <div />
                      )}

                    </div>
                  </div>
                );
              })}

            </div>

          </div>
        </div>
        <div className='flex flex-col justify-between h-full w-full overflow-y-auto px-4'>
          {admin ? (
            <div className="flex items-start justify-between w-full">
              <div
                onClick={() => setShowGraph((prev) => !prev)}
                className="fixed top-0 bg-gray-300 hover:bg-gray-400 hover:text-white transition-color
                duration-250 text-[0.75rem] pb-[1px] px-2 rounded-md cursor-pointer"
              >
                {showGraph ? "Esconder Graficos" : "Mostrar Gráficos"}
              </div>
              {/* LEFT → scrollable graphs */}
              {showGraph ? (
                <div className="flex-1 overflow-x-auto">
                  <div className="flex gap-8 min-w-max">

                    {/* GRAPH 1 */}
                    <div>
                      <h2 className="font-semibold text-sm mb-2">
                        Reservas por Sala
                      </h2>

                      <ResponsiveContainer width={200} height={130}>
                        <BarChart data={reservasPorSala}>
                          <XAxis dataKey="sala" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="total" fill="#3b82f6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* GRAPH 2 */}
                    <div>
                      <h2 className="font-semibold text-sm mb-2">
                        Reservas por Hora
                      </h2>

                      <ResponsiveContainer width={200} height={130}>
                        <BarChart data={reservasPorHora}>
                          <XAxis dataKey="time" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="total" fill="#22c55e" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                  </div>
                </div>
              ) : (
                <div className="flex-1">
                  <h1 className="font-semibold text-3xl">
                    Nome Da Empresa
                  </h1>
                </div>
              )}

              {/* RIGHT → always visible button */}
              <div className="flex items-start gap-2 ml-4">
                <div className="relative">
                  <button
                    className="py-2 px-3 bg-gray-200 rounded-sm hover:bg-gray-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenNavigate((prev) => !prev);
                    }}
                  >
                    Alternar Visualizacao
                  </button>

                  {openNavigate && <Navigation />}
                </div>
              </div>

            </div>
          ) : (
            <div
              id="header"
              className="flex items-center justify-between mx-6 text-lg"
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
          )}


          <Calendario
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            reservas={reservasData}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
