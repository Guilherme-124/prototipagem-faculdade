"use client"
import { Input } from "@base-ui/react/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { NavLink } from "react-router-dom";


function NewRoom() {
  const [roomName, setRoomName] = useState("");

  const salas = ["Sala 1", "Sala 2", "Sala 3"] as const;

  return (
    <>
      <div
        className="fixed flex w-full h-full z-500 bg-black/30 items-center justify-center"
      >
        <div
          className="flex flex-col w-fit h-fit bg-gray-50 py-5 px-8 pb-10 z-502 rounded-lg gap-5"
          onClick={(e) => {e.stopPropagation()}}
        >
          <div className="flex items-center justify-between">
            <h1>Criar Sala</h1>
          </div>
          <Input 
            className={`w-90 px-2 py-1 border border-gray-300 rounded-md`}
            placeholder="Nome da Sala"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <div className="flex w-full justify-between">
            <NavLink to={"/"}>
              <Button 
                className="px-3 py-1 hover:bg-gray-400 bg-gray-300 text-gray-800 hover:text-gray-100"
              >
                Salvar
              </Button>
            </NavLink>
            <NavLink to={"/"}>
              <Button 
                className="px-3 py-1 hover:bg-gray-400 bg-gray-300 text-gray-800 hover:text-gray-100"
              >
                Cancelar
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewRoom;
