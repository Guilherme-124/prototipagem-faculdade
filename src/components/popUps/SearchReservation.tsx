import { Input } from "@base-ui/react/input";
import { Button } from "../ui/button";
import { useState } from "react";
import SearchPeople from "./SearchPeople";
import ExcludeReservationPopUp from "./AreYouSure";


function SearchReservation({ onClose }: { onClose: () => void }) {
  const [searchPeople, setSearchPeople] = useState(false);
  const [excludeReservation, setExcludeReservation] = useState(false);
  const [priority, setPriority] = useState(false);
  const [filterSala, setFilterSala] = useState("");
  const [filterTime, setFilterTime] = useState("");

  return (
    <>
      {excludeReservation && (
        <ExcludeReservationPopUp onClose={() => setExcludeReservation(false)}/>
      )}
      <div
        className="fixed flex w-full h-full z-500 bg-black/30 items-center justify-center"
        onClick={() => onClose()}
      >
        <div
          className="flex flex-col w-fit h-fit bg-gray-50 py-5 px-8 pb-10 z-502 rounded-lg gap-5"
          onClick={(e) => {e.stopPropagation()}}
        >
          <div className="flex items-center justify-between">
            <h1>Procurar Reserva</h1>
            <Button 
              onClick={() => setPriority((prev) => !prev)}
              className={`py-1 px-3 rounded-md hover:bg-gray-400 hover:text-gray-100 ${priority ? "bg-gray-600 " : "bg-gray-300 text-gray-800"}`}
            >
              Prioritario
            </Button>
          </div>
          <div
            className='p-5 flex flex-col items-center w-full gap-5'
          >
            <Input 
              placeholder="Filtrar sala" 
              className={`w-90 px-2 py-1 border border-gray-300 rounded-md`}
              value={filterSala}
              onChange={(e) => setFilterSala(e.target.value)}
            />
            <Input 
              placeholder="Filtrar horário" 
              className={`w-90 px-2 py-1 border border-gray-300 rounded-md`}
              value={filterTime}
              onChange={(e) => setFilterTime(e.target.value)}
            />
          </div>
          <div className="flex w-full justify-between">
            <Button 
              className="w-fit px-3 py-1 hover:bg-gray-400 bg-gray-300 text-gray-800 hover:text-gray-100"
              onClick={() => setSearchPeople(true)}
            >
              Pessoas
            </Button>
            <Button 
              className="w-fit px-3 py-1 hover:bg-gray-400 bg-gray-300 text-gray-800 hover:text-gray-100"
              onClick={() => setExcludeReservation(true)}
            >
              Excluir Reserva
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

export default SearchReservation;
