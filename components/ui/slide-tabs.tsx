'use client'

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface TabProps {
  children: React.ReactNode;
  setPosition: (position: { left: number; width: number; opacity: number }) => void;
  href?: string;
  onClick?: () => void;
}

interface SlideTabsProps {
  items: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
  }>;
}

const SlideTabs = ({ items }: SlideTabsProps) => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="relative mx-auto flex w-fit rounded-full border-2 border-olive-primary bg-white p-1"
    >
      {items.map((item, index) => (
        <Tab
          key={index}
          setPosition={setPosition}
          href={item.href}
          onClick={item.onClick}
        >
          {item.label}
        </Tab>
      ))}
      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({ children, setPosition, href, onClick }: TabProps) => {
  const ref = useRef<HTMLLIElement>(null);

  const handleMouseEnter = () => {
    if (!ref?.current) return;

    const { width } = ref.current.getBoundingClientRect();

    setPosition({
      left: ref.current.offsetLeft,
      width,
      opacity: 1,
    });
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
    }
    if (href?.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const content = (
    <span className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-olive-primary md:px-5 md:py-3 md:text-base font-menu transition-colors hover:text-olive-light">
      {children}
    </span>
  );

  return (
    <li
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className="relative"
    >
      {href && !href.startsWith('#') ? (
        <Link href={href} className="block">
          {content}
        </Link>
      ) : (
        content
      )}
    </li>
  );
};

const Cursor = ({ position }: { position: { left: number; width: number; opacity: number } }) => {
  return (
    <motion.li
      animate={{
        left: position.left,
        width: position.width,
        opacity: position.opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
      }}
      className="absolute z-0 h-7 rounded-full bg-olive-primary md:h-12"
    />
  );
};

export default SlideTabs;
