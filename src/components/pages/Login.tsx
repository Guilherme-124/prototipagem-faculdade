import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setAdmin }: { setAdmin: (v: boolean) => void }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  return (
    <div className="h-full w-full bg-white font-sans overflow-x-hidden">

      {/* HERO */}
      <section
        className="h-6/10 w-full bg-[#77bdff]"
        style={{ clipPath: "polygon(0 0, 100% 0, 150% 110%, 0 80%)" }}
      >
        <h1 className="pt-20 px-10 text-5xl leading-none text-gray-900 font-bold tracking-wide">
          <br />RBA <br /> Comunicação -<br />Salas de Reunião
        </h1>
      </section>

      {/* FORM */}
      <section className="px-10 py-8">
        <div className="flex items-center gap-3 mb-3">
          <label className="font-semibold min-w-[46px]">
            Email:
          </label>
          <input 
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 max-w-[280px] h-8 px-2 border border-[#ccc] rounded text-md" 
          />
        </div>

        <div className="flex items-center gap-3 mb-3">
          <label className="font-semibold min-w-[46px]">
            Senha:
          </label>
          <input
            type="password"
            className="flex-1 max-w-[280px] h-8 px-2 border border-[#ccc] rounded"
          />
        </div>

        <div className="flex gap-3 mt-4">
          <button
          onClick={() => {
            if (email === "admin") {
              setAdmin(true);
            } else {
              setAdmin(false);
            }

            navigate("/prototipagem-faculdade/home");
          }}
            className="h-8 px-5 bg-[#2ecc40] text-white font-semibold rounded hover:bg-[#27b537] active:scale-95"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/prototipagem-faculdade/cadastro")}
            className="h-8 px-5 bg-[#2ecc40] text-white font-semibold rounded hover:bg-[#27b537] active:scale-95"
          >
            Criar conta
          </button>
        </div>
      </section>
    </div>
  );
}