import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const navigate = useNavigate();

  return (
    <div className="relative h-full w-full font-sans bg-white overflow-x-hidden">

      {/* HERO */}
      <section
        className="w-full h-6/10 bg-[#fffc98]"
        style={{ clipPath: "polygon(0 0, 100% 0, 150% 110%, 0 80%)" }}
      >
        <h1 className="pt-9 px-10 text-[3.4rem] leading-none text-[#111] tracking-wide">
          <br />RBA <br /> Comunicação -<br />Salas de Reunião
        </h1>
      </section>

      {/* CARD */}
      <div className="absolute top-60 right-5 bg-[#e8e8e8] rounded-lg px-5 py-10 min-w-fit w-130 shadow-[0_8px_40px_rgba(0,0,0,0.13)]">

        {["Nome", "Email", "Senha", "Confirme a senha"].map((label, i) => (
          <div key={i} className="flex items-center gap-4 mb-3">
            <label className="text-md font-semibold text-[#111] min-w-[120px]">
              {label}:
            </label>
            <input
              type={label.includes("Senha") ? "password" : "text"}
              className="flex-1 h-10 px-3 border border-[#ccc] rounded-md text-[0.82rem] text-[#888] bg-white outline-none focus:border-[#888] focus:text-[#111]"
            />
          </div>
        ))}

        <button
          onClick={() => navigate("/")}
          className="w-full mt-5 h-10 bg-[#2ecc40] text-white rounded-md text-md font-semibold hover:bg-[#27b537] active:scale-95 transition"
        >
          Criar conta
        </button>
      </div>
    </div>
  );
}