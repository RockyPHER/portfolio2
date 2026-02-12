import { useEffect, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { incrementView, getViewCount } from "../counter.api/counter";

export default function Views() {
  // Começamos como null para saber que ainda está carregando
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function handleViews() {
      const hasViewed = sessionStorage.getItem("page_viewed");
      let count: number | null = null;

      try {
        if (!hasViewed) {
          count = await incrementView();
          if (count !== null) sessionStorage.setItem("page_viewed", "true");
        } else {
          count = await getViewCount();
        }
      } catch (e) {
        console.error(e);
      }

      if (isMounted) {
        // Se a API falhar, colocamos 0, mas pelo menos tentamos carregar
        setViews(count !== null ? Number(count) : 0);
      }
    }

    handleViews();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex group items-center gap-2 relative cursor-default">
      {/* O ícone sempre visível, mas com animação mais sutil */}
      <IoMdEye className="text-xl sm:text-2xl text-white/50 group-hover:text-white/90 transition-colors" />

      {/* O número com transição de opacidade */}
      <p
        className={`font-mono text-sm sm:text-base text-white/70 tabular-nums transition-opacity duration-700 ease-in-out ${
          views !== null ? "opacity-100" : "opacity-0"
        }`}
      >
        {views?.toLocaleString("pt-BR")}
      </p>

      {/* Tooltip */}
      <span className="absolute bottom-full left-1/2 whitespace-nowrap -translate-x-1/2 mb-3 px-2 py-1 bg-black/60 backdrop-blur-md border border-white/20 text-white uppercase rounded opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-xl">
        Total Views
      </span>
    </div>
  );
}
