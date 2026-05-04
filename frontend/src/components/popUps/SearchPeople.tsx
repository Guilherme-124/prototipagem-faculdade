import { useState } from "react";
import { Button } from "../ui/button";


function SearchPeople({ onClose }: { onClose: () => void }) {
  const [pessoasDisponiveis, setPessoasDisponiveis] = useState<string[]>(["Pessoa 1", "Pessoa 2", "Pessoa 3", "Pessoa 4", "Pessoa 5", "Pessoa 6", "Pessoa 7", "Pessoa 8", "Pessoa 9"]);
  const [pessoasSelecionadas, setPessoasSelecionadas] = useState<string[]>([]);


  function handleSelectPerson(pessoa: string) {
    setPessoasDisponiveis((prev) =>
      prev.filter((p) => p !== pessoa)
    );

    setPessoasSelecionadas((prev) => [...prev, pessoa]);
  }

  function handleUnselectPerson(pessoa: string) {
    setPessoasSelecionadas((prev) =>
      prev.filter((p) => p !== pessoa)
    );

    setPessoasDisponiveis((prev) => [...prev, pessoa]);
  }

  return (
    <div
      className="fixed flex w-full h-full z-600 bg-black/30 items-center justify-center"
      onClick={() => onClose()}
    >
      <div
        className="flex flex-col w-100 h-fit bg-gray-50 py-5 px-8 pb-10 z-602 rounded-lg gap-5"
        onClick={(e) => {e.stopPropagation()}}
      >
        <h1>Pessoas</h1>
        <div className="border-b border-gray-500 pb-1">
          <h1 
            className="bg-gray-400 text-white text-xs rounded-sm px-2"
          >
            Pessoas convidadas
          </h1>
          <div className="flex flex-col max-h-50 gap-2 mt-2 overflow-y-auto">
            {pessoasSelecionadas.map((pessoa) => (
              <button
                key={pessoa}
                onClick={() => handleUnselectPerson(pessoa)}
                className="flex items-center gap-2 bg-gray-300 text-gray-800 px-2 py-1 rounded"
              >
                <div className="w-10 h-10 rounded-full bg-gray-200"/>
                {pessoa}
              </button>
            ))}
          </div>
        </div>
        <div className="border-b border-gray-500 pb-1">
          <h1 
            className="bg-gray-400 text-white text-xs rounded-sm px-2"
          >
            Pessoas disponiveis
          </h1>
          <div className="flex flex-col max-h-50 gap-2 mt-2 overflow-y-auto">
            {pessoasDisponiveis.map((pessoa) => (
              <button
                key={pessoa}
                onClick={() => handleSelectPerson(pessoa)}
                className="flex items-center gap-2 bg-gray-300 text-gray-800 px-2 py-1 rounded"
              >
                <div className="w-10 h-10 rounded-full bg-gray-200"/>
                {pessoa}
              </button>
            ))}
          </div>
        </div>
        <div className="flex w-full justify-between">
          <Button 
            className="px-3 py-1"
            onClick={() => onClose()}
          >
            Salvar
          </Button>
          <Button 
            className="px-3 py-1"
            onClick={() => onClose()}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SearchPeople;
