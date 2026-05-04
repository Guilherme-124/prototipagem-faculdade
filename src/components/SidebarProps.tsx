import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { LogOut, Pin } from "lucide-react";
import { NavLink } from "react-router-dom";


interface SidebarProps{
  children: React.ReactNode;
}

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
}

interface SectionProps {
  icon?: React.ReactNode;
  text: string;
}


interface SidebarContextType {
  focus: boolean;
  setFocus: React.Dispatch<React.SetStateAction<boolean>>;
  pin: boolean;
}

export const SidebarTitleColor = "gray-500";

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarContext");
  return ctx;
}

export default function Sidebar({children}: SidebarProps) {
  const [focus, setFocus] = useState(false);
  const [pin, setPin] = useState(false);
  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const savedScrollPosition = useRef(0);

  useEffect(() => {
    const sideBar: Element | null = document.querySelector("#Sidebar");

    const handleEnter = () => {
      setFocus(true);

      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = savedScrollPosition.current;
        }
      }, 50);
    }
    const handleLeave = () => {
      setFocus(false);

      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = savedScrollPosition.current;
      }
    }

    if (sideBar !== null) {
      if (!pin) {
        sideBar.addEventListener("mouseenter", handleEnter);
        sideBar.addEventListener("mouseleave", handleLeave);
      }
    }

    return () => {
      if (sideBar !== null) {
        sideBar.removeEventListener("mouseenter", handleEnter);
        sideBar.removeEventListener("mouseleave", handleLeave);
      }
    }
  }, [pin]);

  return (
    <SidebarContext.Provider value={{focus, setFocus, pin}}>
      <aside 
        id="Sidebar" 
        className={`transition-all duration-300 border-r border-gray-300 
        ${pin ? "w-60" : "w-12"}
      `}>
        <div 
          className={`relative top-0 left-0 h-full bg-white border-r border-gray-300
          transition-all duration-300 ease-in-out overflow-hidden
          ${focus || pin ? "w-60 opacity-100" : "w-12 opacity-100"}
        `}>
          <nav className="flex flex-col h-screen">
            <div className={`mx-[5px] py-2 flex top-0 bg-white justify-between
              border-b border-gray-400 overflow-hidden`}
            >
              <NavLink to={"/prototipagem-faculdade/"}>
                <div className="flex items-center cursor-pointer">
                  <div className="font-bold">
                    RBA
                  </div>
                    <div className={`px-1 overflow-hidden transition-all duration-900 ease-in-out
                      ${focus ? "ml-[2px] max-w-56" : "max-w-0"}`}
                    >
                      <span className={`font-semibold ${focus ? "lex" : "hidden"}`}>Comunicações</span>
                    </div>             
                </div>
              </NavLink>
              {focus && 
              <div 
                className={`px-2 py-1 rounded-lg hover:bg-gray-300 transition-color duration-300 
                  ${pin
                    ? "bg-gray-200"
                    : ""
                  }
                `}
                onClick={() => {
                  setPin(!pin)
                }}
              >
                <Pin size={20}/>
              </div>}
            </div>
            <div className={`flex flex-1 flex-col min-h-0 overflow-hidden ${focus ? "overflow-y-auto" : ""}`}>
              <ul 
                className={`flex flex-col px-2`}
              >
                {children}
              </ul>
              <div className={`border-t border-gray-300 mt-auto py-1 mx-2`}>
                <NavLink to={"/prototipagem-faculdade/login"}>
                  <div 
                    className={`inline-flex items-center py-1 rounded-lg 
                      cursor-pointer hover:bg-gray-200
                    ${focus 
                      ? "px-2"
                      : "px-1"
                    }
                  `}>
                    <LogOut size={20}/>
                    <h1 className={`ml-2 ${focus ? "flex" : "hidden"}`}>Sair</h1>
                  </div>
                </NavLink>
              </div>
            </div>
          </nav>
        </div>
      </aside>
    </SidebarContext.Provider>
  );
}

export function SidebarItem({ icon, text, active }: SidebarItemProps) {
  const { focus } = useSidebar();

  return (
    <div>
      <li 
      className={`flex relative items-center py-1 px-1 mt-1 rounded-lg 
        cursor-pointer transition-color duration-300 gap-1 font-light
        ${active 
          ? "bg-gray-300" 
          : "hover:bg-gray-200"
        }
        ${ focus
          ? "ml-4"
          : ""
        }`
      }>
        <div 
          className={`
            flex-shrink-0 my-1 justify-center items-center 
            transition-all duration-300
        `}
        >
          {icon}
        </div>
        <div
          className={`transition-transform duration-300 ease-in-out flex gap-1
          ${focus ? "translate-x-0 opacity-100" : "translate-x-30 opacity-0"}`}
        >
          <span className={`whitespace-nowrap ${focus ? "flex" : "hidden"}`}>{text}</span>
        </div>
      </li>
    </div>

  )
}

export const SidebarSection = ({ icon, text, }: SectionProps) => {
  const { focus } = useSidebar();

  return (
    <div className="relative">
      <div
        className={`hover:bg-gray-200 rounded-lg py-1 cursor-pointer gap-1 whitespace-nowrap min-h-8
        ${focus ? "px-2" : "px-1"} inline-flex transition-colors duration-300`}
      >
        {icon}
        {focus
          ? (<h1 className={`text-gray-500`}>{text}</h1>) 
          : ("")
        }
      </div>
    </div>
  );
} 
