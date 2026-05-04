import { NavLink } from "react-router-dom";


function Navigation() {
  return (
    <div className="absolute top-full right-0 z-50">
      <div
        className="w-51 bg-gray-50 shadow-md rounded-sm border border-gray-200 overflow-hidden mt-1"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col">

          <NavLink to={"/"}
            className="px-4 py-2 text-left hover:bg-gray-100"
          >
            <button>
              Home
            </button>
          </NavLink>
          <NavLink to={"/reunioesdia"}
            className="px-4 py-2 text-left hover:bg-gray-100"
          >
            <button>
              Reuniões do dia
            </button>
          </NavLink>
          <NavLink to={"/reuniaosemana"}
            className="px-4 py-2 text-left hover:bg-gray-100"
          >
            <button>
              Reuniões da semana
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navigation;