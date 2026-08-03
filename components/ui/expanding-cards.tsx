"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardItem {
  id: string | number;
  title: string;
  description: string;
  imgSrc: string;
  icon: React.ReactNode;
  linkHref: string;
}

interface ExpandingCardsProps extends React.HTMLAttributes<HTMLUListElement> {
  items: CardItem[];
  defaultActiveIndex?: number;
}

export const ExpandingCards = React.forwardRef<
  HTMLUListElement,
  ExpandingCardsProps
>(({ className, items, defaultActiveIndex = 0, ...props }, ref) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(
    defaultActiveIndex,
  );
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gridStyle = React.useMemo(() => {
    if (activeIndex === null) return {};

    if (isDesktop) {
      const columns = items
        .map((_, index) => (index === activeIndex ? "5fr" : "1fr"))
        .join(" ");
      return { gridTemplateColumns: columns };
    }

    const rows = items
      .map((_, index) => (index === activeIndex ? "5fr" : "1fr"))
      .join(" ");
    return { gridTemplateRows: rows };
  }, [activeIndex, items, isDesktop]);

  const handleInteraction = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <ul
      className={cn(
        "grid w-full max-w-6xl gap-2",
        "h-[700px] md:h-[560px]",
        "transition-[grid-template-columns,grid-template-rows] duration-500 ease-out",
        className,
      )}
      style={{
        ...gridStyle,
        ...(isDesktop
          ? { gridTemplateRows: "1fr" }
          : { gridTemplateColumns: "1fr" }),
      }}
      ref={ref}
      {...props}
    >
      {items.map((item, index) => (
        <li
          key={item.id}
          id={String(item.id)}
          className={cn(
            "group relative min-h-0 min-w-0 cursor-pointer overflow-hidden rounded-2xl",
            "border border-olive-primary/20 bg-[#f3ede2] shadow-premium",
            "md:min-w-[80px]",
          )}
          onMouseEnter={() => handleInteraction(index)}
          onFocus={() => handleInteraction(index)}
          onClick={() => handleInteraction(index)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleInteraction(index);
            }
          }}
          tabIndex={0}
          data-active={activeIndex === index}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.imgSrc}
            alt={item.title}
            className={cn(
              "absolute inset-0 h-full w-full object-cover p-0",
              "transition-all duration-300 ease-out",
              "group-data-[active=true]:scale-100 group-data-[active=true]:grayscale-0",
              "scale-105 grayscale-[15%]",
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

          <article className="absolute inset-0 flex flex-col justify-end gap-2 p-4">
            <h3 className="hidden origin-left rotate-90 text-xs font-light uppercase tracking-[0.14em] text-white/80 opacity-100 transition-all duration-300 ease-out md:block group-data-[active=true]:opacity-0">
              {item.title}
            </h3>

            <div className="text-white/90 opacity-0 transition-all duration-300 delay-75 ease-out group-data-[active=true]:opacity-100">
              {item.icon}
            </div>

            <h3 className="text-lg font-semibold leading-tight text-white opacity-0 transition-all duration-300 delay-150 ease-out group-data-[active=true]:opacity-100 md:text-xl">
              {item.title}
            </h3>

            <p className="w-full max-w-xs text-xs leading-relaxed text-white/85 opacity-0 transition-all duration-300 delay-225 ease-out group-data-[active=true]:opacity-100 md:text-sm">
              {item.description}
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
});

ExpandingCards.displayName = "ExpandingCards";
