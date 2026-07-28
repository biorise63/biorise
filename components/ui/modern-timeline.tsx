"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "./card"
import { Badge } from "./badge"
import { CheckCircle, Clock, Circle, ArrowUpRight } from "lucide-react"
import { formatArticleDate } from "@/lib/format-date"

export interface TimelineItem {
  title: string
  description: string
  date?: string
  image?: string
  status?: "completed" | "current" | "upcoming"
  category?: string
  href?: string
}

export interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

const getStatusConfig = (status: TimelineItem["status"]) => {
  const configs = {
    completed: {
      progressColor: "bg-success",
      borderColor: "border-success/20",
      badgeBg: "bg-success/10",
      badgeText: "text-success",
      label: "Опубликовано",
    },
    current: {
      progressColor: "bg-primary",
      borderColor: "border-primary/20",
      badgeBg: "bg-primary/10",
      badgeText: "text-primary",
      label: "Новое",
    },
    upcoming: {
      progressColor: "bg-warning",
      borderColor: "border-warning/20",
      badgeBg: "bg-warning/10",
      badgeText: "text-warning",
      label: "Скоро",
    },
  }

  return configs[status || "upcoming"]
}

const getStatusIcon = (status: TimelineItem["status"]) => {
  switch (status) {
    case "completed":
      return CheckCircle
    case "current":
      return Clock
    default:
      return Circle
  }
}

export function Timeline({ items, className }: TimelineProps) {
  if (!items || items.length === 0) {
    return (
      <div className={cn("mx-auto w-full max-w-4xl px-4 py-8 sm:px-6", className)}>
        <p className="text-center text-muted-foreground">Статьи пока не добавлены</p>
      </div>
    )
  }

  return (
    <section
      className={cn("mx-auto w-full max-w-5xl px-4 py-8 sm:px-6", className)}
      role="list"
      aria-label="Лента статей BIORISE"
    >
      <div className="relative">
        <div
          className="absolute bottom-0 left-4 top-0 w-px bg-border sm:left-6"
          aria-hidden="true"
        />

        <motion.div
          className="absolute left-4 top-0 w-px origin-top bg-primary sm:left-6"
          initial={{ scaleY: 0 }}
          whileInView={{
            scaleY: 1,
            transition: {
              duration: 1.2,
              ease: "easeOut",
              delay: 0.2,
            },
          }}
          viewport={{ once: true }}
          aria-hidden="true"
        />

        <div className="relative space-y-8 sm:space-y-12">
          {items.map((item, index) => {
            const config = getStatusConfig(item.status)
            const IconComponent = getStatusIcon(item.status)
            const isLogoImage = item.image?.includes('logo')
            const cardBody = (
              <motion.div
                className="flex-1 min-w-0"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Card
                  className={cn(
                    "relative border bg-card/90 backdrop-blur-sm transition-all duration-300 hover:shadow-md",
                    config.borderColor,
                    "group-hover:border-primary/30",
                  )}
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                      <div className="min-w-0 flex-1">
                        <motion.h3
                          className="mb-1 text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-primary sm:text-xl"
                          layoutId={`title-${index}`}
                        >
                          {item.title}
                        </motion.h3>

                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                          {item.category && <span className="font-medium">{item.category}</span>}
                          {item.category && item.date && (
                            <span className="h-1 w-1 rounded-full bg-muted-foreground" aria-hidden="true" />
                          )}
                          {item.date && <time dateTime={item.date}>{formatArticleDate(item.date)}</time>}
                        </div>
                      </div>

                      <Badge
                        className={cn(
                          "w-fit border border-current/20 text-xs font-medium",
                          config.badgeBg,
                          config.badgeText,
                        )}
                        aria-label={`Статус: ${config.label}`}
                      >
                        {config.label}
                      </Badge>
                    </div>

                    <motion.p
                      className="mb-4 text-sm leading-relaxed text-muted-foreground sm:text-base"
                      initial={{ opacity: 0.85 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {item.description}
                    </motion.p>

                    <div className="flex items-center justify-between gap-3">
                      <div
                        className="h-1 flex-1 overflow-hidden rounded-full bg-muted"
                        role="progressbar"
                        aria-valuenow={item.status === "completed" ? 100 : item.status === "current" ? 65 : 25}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`Прогресс для ${item.title}`}
                      >
                        <motion.div
                          className={cn("h-full rounded-full", config.progressColor)}
                          initial={{ width: 0 }}
                          animate={{
                            width:
                              item.status === "completed"
                                ? "100%"
                                : item.status === "current"
                                  ? "65%"
                                  : "25%",
                          }}
                          transition={{
                            duration: 1.2,
                            delay: index * 0.2 + 0.8,
                            ease: "easeOut",
                          }}
                        />
                      </div>

                      {item.href && (
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                          Читать
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )

            return (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  },
                }}
                viewport={{ once: true, margin: "-30px" }}
                role="listitem"
                aria-label={`Статья ${index + 1}: ${item.title}`}
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="relative flex-shrink-0">
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      tabIndex={0}
                      role="img"
                      aria-label={`Изображение статьи ${item.title}`}
                    >
                      <div className="relative z-10 h-12 w-12 overflow-hidden rounded-full border-2 border-background shadow-lg sm:h-16 sm:w-16">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className={cn(
                              'h-full w-full',
                              isLogoImage
                                ? 'bg-white p-2 object-contain'
                                : 'object-cover',
                            )}
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-muted">
                            <IconComponent
                              className="h-5 w-5 text-muted-foreground/70 sm:h-6 sm:w-6"
                              aria-hidden="true"
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>

                  {item.href ? (
                    <Link href={item.href} className="block min-w-0 flex-1">
                      {cardBody}
                    </Link>
                  ) : (
                    cardBody
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="absolute -bottom-6 left-4 -translate-x-1/2 transform sm:left-6"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{
            opacity: 1,
            scale: 1,
            transition: {
              duration: 0.4,
              delay: items.length * 0.1 + 0.3,
              type: "spring",
              stiffness: 400,
            },
          }}
          viewport={{ once: true }}
          aria-hidden="true"
        >
          <div className="h-3 w-3 rounded-full bg-primary shadow-sm" />
        </motion.div>
      </div>
    </section>
  )
}
