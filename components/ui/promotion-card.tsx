'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { motion } from 'framer-motion';

export interface PromotionCardProps {
  title: string;
  description?: string;
  image?: string;
  price?: string;
  oldPrice?: string;
  features?: string[];
  buttonText: string;
  buttonHref: string;
  content?: React.ReactNode;
  className?: string;
}

export function PromotionCard({
  title,
  description,
  image,
  price,
  oldPrice,
  features,
  buttonText,
  buttonHref,
  content,
  className,
}: PromotionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -5 }}
      className={cn(
        'flex flex-col rounded-2xl border border-olive-primary/20',
        'bg-gradient-to-b from-white to-beige-background/50',
        'p-6 text-start',
        'hover:from-white hover:to-beige-background',
        'max-w-[400px] sm:max-w-[400px]',
        'transition-all duration-300 shadow-premium hover:shadow-premium-hover',
        className
      )}
    >
      {image && (
        <motion.div
          initial={{ scale: 0.95 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-64 rounded-xl overflow-hidden mb-4"
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </motion.div>
      )}
      
      <motion.h3
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-2xl font-heading text-olive-primary mb-3"
      >
        {title}
      </motion.h3>
      
      {content ? (
        <div className="mb-4 flex-1">
          {content}
        </div>
      ) : (
        <>
          {description && (
            <p className="text-sm text-olive-primary/70 mb-4 leading-relaxed">
              {description}
            </p>
          )}

          {features && features.length > 0 && (
            <div className="mb-4 space-y-2">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <motion.svg
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                    className="w-5 h-5 text-olive-primary flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </motion.svg>
                  <span className="text-sm text-olive-primary">{feature}</span>
                </motion.div>
              ))}
            </div>
          )}

          {price && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mb-4"
            >
              {oldPrice && (
                <span className="text-sm text-olive-primary/50 line-through mr-2">
                  {oldPrice}
                </span>
              )}
              <span className="text-2xl font-semibold text-olive-primary">
                {price}
              </span>
            </motion.div>
          )}
        </>
      )}

      <motion.a
        href={buttonHref}
        target={buttonHref.startsWith('http') ? '_blank' : undefined}
        rel={buttonHref.startsWith('http') ? 'noopener noreferrer' : undefined}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-auto bg-olive-primary text-white px-6 py-3 rounded-full text-center hover:bg-olive-light transition-all shadow-premium hover:shadow-premium-hover"
      >
        {buttonText}
      </motion.a>
    </motion.div>
  );
}
