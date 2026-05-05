import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";


function ExcludeReservationPopUp({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();


  return (
    <div
      className="fixed flex w-full h-full z-600 bg-black/30 items-center justify-center"
      onClick={() => onClose()}
    >
      <div
        className="flex flex-col w-70 h-fit bg-gray-50 py-5 px-8 pb-10 z-602 rounded-lg gap-5"
        onClick={(e) => {e.stopPropagation()}}
      >
        <h1>Tem certeza que deseja excluir a Reserva?</h1>

        <div className="flex w-full justify-between">
          <Button 
            className="px-8 py-1"
            onClick={() => navigate("/prototipagem-faculdade/home")}
          >
            Sim
          </Button>
          <Button 
            className="px-8 py-1"
            onClick={() => onClose()}
          >
            Não
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ExcludeReservationPopUp;
