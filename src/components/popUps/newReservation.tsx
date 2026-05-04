"use client"
import { Input } from "@base-ui/react/input";
import { Button } from "../ui/button";
import { useState } from "react";
import SearchPeople from "./SearchPeople";

import {
  Popover,
  PopoverContent,
  PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";


function NewReservation({ onClose }: { onClose: () => void }) {
  const [searchPeople, setSearchPeople] = useState(false);
  const [priority, setPriority] = useState(false);
  const [sala, setSala] = useState<string>("");
  const [date, setDate] = useState(new Date);

  const salas = ["Sala 1", "Sala 2", "Sala 3"] as const;

  return (
    <>
      <div
        className="fixed flex w-full h-full z-500 bg-black/30 items-center justify-center"
        onClick={() => onClose()}
      >
        <div
          className="flex flex-col w-fit h-fit bg-gray-50 py-5 px-8 pb-10 z-502 rounded-lg gap-5"
          onClick={(e) => {e.stopPropagation()}}
        >
          <div className="flex items-center justify-between">
            <h1>Criar Reserva</h1>
            <Button 
              onClick={() => setPriority((prev) => !prev)}
              className={`py-1 px-3 rounded-md hover:bg-gray-400 hover:text-gray-100 ${priority ? "bg-gray-600 " : "bg-gray-300 text-gray-800"}`}
            >
              Prioritario
            </Button>
          </div>
          <Input 
            className={`w-90 px-2 py-1 border border-gray-300 rounded-md`}
            placeholder="Titulo: nome da reserva"
          />
          <select
            className="w-90 px-2 py-1 border border-gray-300 rounded-md bg-white"
            value={sala}
            onChange={(e) => setSala(e.target.value)}
          >
            <option value="">Select a room</option>
            {salas.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
            </select>
          <Input 
            className={`w-90 px-2 py-1 border border-gray-300 rounded-md`}
            type="text"
            value={
              date
                ? `${date.getHours().toString().padStart(2, "0")}:${date
                    .getMinutes()
                    .toString()
                    .padStart(2, "0")}`
                : ""
            }
            onChange={(e) => {
              if (!date) return;

              const [h, m] = e.target.value.split(":").map(Number);

              const newDate = new Date(date);
              newDate.setHours(h);
              newDate.setMinutes(m);
              newDate.setSeconds(0);

              setDate(newDate);
            }}
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-90 justify-start text-left font-normal"
              >
                {date 
                  ? date?.toLocaleString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }) 
                  : "Selecionar data e hora"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-800">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(selectedDay) => {
                  if (!selectedDay || !date) return;

                  const newDate = new Date(selectedDay);

                  newDate.setHours(date.getHours());
                  newDate.setMinutes(date.getMinutes());
                  newDate.setSeconds(0);

                  setDate(newDate);
                }}
              />
            </PopoverContent>
          </Popover>
          <div className="flex w-full justify-between">
            <Button 
              className="w-fit px-3 py-1 hover:bg-gray-400 bg-gray-300 text-gray-800 hover:text-gray-100"
              onClick={() => setSearchPeople(true)}
            >
              Pessoas
            </Button>
          </div>
          <div className="flex w-full justify-between">
            <Button 
              className="px-3 py-1 hover:bg-gray-400 bg-gray-300 text-gray-800 hover:text-gray-100"
              onClick={() => onClose()}
            >
              Salvar
            </Button>
            <Button 
              className="px-3 py-1 hover:bg-gray-400 bg-gray-300 text-gray-800 hover:text-gray-100"
              onClick={() => onClose()}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
      {searchPeople && (
        <SearchPeople onClose={() => setSearchPeople(false)}/>
      )}
    </>
  );
}

export default NewReservation;
