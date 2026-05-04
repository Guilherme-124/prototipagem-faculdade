import { useNavigate } from "react-router-dom";

export default function PerfilEdit() {
  const navigate = useNavigate();

  return (
    <main className="h-full w-full flex items-center justify-center px-5 py-10 font-sans">

      <div className="flex flex-col items-center w-full max-w-[480px]">

        {/* Avatar same */}
        <div className="relative w-[180px] h-[180px] mb-8">
          <div className="w-full h-full bg-gradient-to-br from-[#f0f0f0] to-[#dcdcdc] rounded-[20px] flex items-center justify-center shadow-lg" />
        </div>

        {/* Fields */}
        <div className="w-full flex flex-col gap-5 mb-9">
          {["Nome", "Email", "Idade"].map((label, i) => (
            <div key={i} className="flex items-baseline gap-2 border-b pb-1">
              <label className="text-[0.88rem] font-semibold">{label}:</label>
              <input className="bg-transparent outline-none text-[0.88rem]" />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/prototipagem-faculdade/perfil")}
            className="h-8 px-6 border rounded"
          >
            Salvar
          </button>

          <button
            onClick={() => navigate("/prototipagem-faculdade/perfil")}
            className="h-8 px-6 border rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    </main>
  );
}