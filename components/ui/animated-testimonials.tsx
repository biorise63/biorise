"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  location?: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  className,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  className?: string;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className={cn("max-w-sm md:max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8", className)}>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
        <div className="relative z-0">
          <div className="relative h-64 sm:h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 10
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <Image
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    sizes="(max-width: 768px) calc(100vw - 48px), 500px"
                    loading={isActive(index) ? "eager" : "lazy"}
                    draggable={false}
                    className={cn(
                      "h-full w-full rounded-3xl object-cover shadow-premium",
                      testimonial.src === '/doctors/doctor-1.jpg' ? 'object-top' : 'object-center'
                    )}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-between flex-col py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-xl sm:text-2xl font-heading text-olive-primary font-bold mb-2">
              {testimonials[active].name}
            </h3>
            <p className="text-xs sm:text-sm text-olive-primary/70 mb-4">
              {testimonials[active].designation}
            </p>
            <motion.p className="text-base sm:text-lg text-olive-primary/80 mt-4 leading-relaxed">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
            {testimonials[active].location && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.2 }}
                className="text-sm text-olive-primary/60 mt-4"
              >
                {testimonials[active].location}
              </motion.p>
            )}
          </motion.div>
          <div className="flex gap-4 pt-6 md:pt-4">
            <button
              onClick={handlePrev}
              className="h-7 w-7 rounded-full bg-beige-background hover:bg-olive-primary/20 flex items-center justify-center group/button transition-colors"
            >
              <IconArrowLeft className="h-5 w-5 text-olive-primary group-hover/button:rotate-12 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-7 w-7 rounded-full bg-beige-background hover:bg-olive-primary/20 flex items-center justify-center group/button transition-colors"
            >
              <IconArrowRight className="h-5 w-5 text-olive-primary group-hover/button:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
