import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const navigate = useNavigate();

  return (
    <main className="h-full w-full flex items-center justify-center px-5 py-10 font-sans">

      <div className="flex flex-col items-center w-full max-w-[480px]">

        {/* Avatar */}
        <div className="relative w-[180px] h-[180px] mb-8">
          <div className="w-full h-full bg-gradient-to-br from-[#f0f0f0] to-[#dcdcdc] rounded-[20px] flex items-center justify-center shadow-lg">
            <div className="flex flex-col items-center gap-2">
              <div className="w-[50px] h-[50px] bg-[#bdbdbd] rounded-full" />
              <div className="w-[90px] h-[60px] bg-[#bdbdbd] rounded-t-[14px]" />
            </div>
          </div>

          <div className="absolute -bottom-2 -left-2 w-9 h-9 bg-[#d0d0d0] rounded-full border-2 border-white flex items-center justify-center">
            📷
          </div>
        </div>

        {/* Fields */}
        <div className="w-full flex flex-col gap-5 mb-9">
          {["Nome", "Email", "Idade"].map((label, i) => (
            <div key={i} className="flex items-baseline gap-2 border-b pb-1">
              <label className="text-[0.88rem] font-semibold">{label}:</label>
              <h1>xxxxxxxxxxxxxxxxxxxx</h1>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/prototipagem-faculdade/perfiledit")}
            className="h-8 px-6 border rounded text-[0.78rem] hover:bg-gray-100 active:scale-95"
          >
            Editar
          </button>

          <button
            onClick={() => navigate("/prototipagem-faculdade/login")}
            className="h-8 px-6 border rounded text-red-600 border-red-200 hover:bg-red-50 active:scale-95"
          >
            Sair
          </button>
        </div>
      </div>
    </main>
  );
}