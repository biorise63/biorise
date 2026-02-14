'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

interface SlideData {
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  imageUrl: string;
  price: string;
  category: string;
}

type Category = 'recovery' | 'beauty' | 'women' | 'sport' | 'health' | 'wellness';

const categories: { id: Category; name: string }[] = [
  { id: 'recovery', name: 'Восстановление' },
  { id: 'beauty', name: 'Красота' },
  { id: 'women', name: 'Женское здоровье' },
  { id: 'sport', name: 'Спорт' },
  { id: 'health', name: 'Здоровье' },
  { id: 'wellness', name: 'Wellness' },
];

const allSlides: SlideData[] = [
  {
    title: 'Детокс',
    subtitle: 'Очищение организма',
    description: 'Очищение организма от токсинов и шлаков. Восстановление естественных процессов детоксикации.',
    accent: '#5E6F52',
    imageUrl: '/drips/detox.png',
    price: 'от 2 500 ₽',
    category: 'recovery',
  },
  {
    title: 'После вечеринки',
    subtitle: 'Быстрое восстановление',
    description: 'Быстрое восстановление после праздников. Восполнение витаминов и минералов.',
    accent: '#7F8F70',
    imageUrl: '/drips/after-party.png',
    price: 'от 2 000 ₽',
    category: 'recovery',
  },
  {
    title: 'Здоровые сосуды',
    subtitle: 'Укрепление системы',
    description: 'Укрепление сердечно-сосудистой системы. Поддержка здоровья сосудов и сердца.',
    accent: '#5E6F52',
    imageUrl: '/drips/vessels.png',
    price: 'от 3 000 ₽',
    category: 'health',
  },
  {
    title: 'Иммуно суппорт',
    subtitle: 'Защита организма',
    description: 'Укрепление иммунитета и защитных сил. Поддержка естественной сопротивляемости организма.',
    accent: '#7F8F70',
    imageUrl: '/drips/immuno.png',
    price: 'от 3 500 ₽',
    category: 'health',
  },
  {
    title: 'Энергия +',
    subtitle: 'Повышение тонуса',
    description: 'Повышение жизненного тонуса и энергии. Восстановление работоспособности.',
    accent: '#5E6F52',
    imageUrl: '/drips/energy.png',
    price: 'от 2 800 ₽',
    category: 'wellness',
  },
  {
    title: 'Антистресс+',
    subtitle: 'Восстановление нервной системы',
    description: 'Снятие стресса и восстановление нервной системы. Гармонизация психоэмоционального состояния.',
    accent: '#7F8F70',
    imageUrl: '/drips/antistress.png',
    price: 'от 3 200 ₽',
    category: 'wellness',
  },
  {
    title: 'Красота и омоложение',
    subtitle: 'Улучшение внешнего вида',
    description: 'Улучшение состояния кожи и общего вида. Поддержка естественных процессов омоложения.',
    accent: '#5E6F52',
    imageUrl: '/drips/beauty.png',
    price: 'от 4 000 ₽',
    category: 'beauty',
  },
  {
    title: 'Спорт стандарт',
    subtitle: 'Восстановление после тренировок',
    description: 'Восстановление после тренировок. Поддержка мышечной системы и выносливости.',
    accent: '#7F8F70',
    imageUrl: '/drips/sport.png',
    price: 'от 3 500 ₽',
    category: 'sport',
  },
  {
    title: 'Сахар в норме',
    subtitle: 'Поддержка метаболизма',
    description: 'Нормализация уровня сахара в крови. Поддержка здорового метаболизма и обмена веществ.',
    accent: '#5E6F52',
    imageUrl: '/drips/sugar.png',
    price: 'от 3 200 ₽',
    category: 'health',
  },
  {
    title: 'Половая система',
    subtitle: 'Поддержка репродуктивного здоровья',
    description: 'Поддержка здоровья половой системы. Восстановление и поддержание репродуктивной функции.',
    accent: '#7F8F70',
    imageUrl: '/drips/reproductive.png',
    price: 'от 3 800 ₽',
    category: 'women',
  },
  {
    title: 'Железо стандарт',
    subtitle: 'Восполнение железа',
    description: 'Восполнение дефицита железа в организме. Поддержка кроветворной системы.',
    accent: '#5E6F52',
    imageUrl: '/drips/iron.png',
    price: 'от 2 800 ₽',
    category: 'health',
  },
  {
    title: 'Протеин буст',
    subtitle: 'Поддержка мышечной массы',
    description: 'Увеличение мышечной массы и силы. Поддержка белкового обмена в организме.',
    accent: '#7F8F70',
    imageUrl: '/drips/protein.png',
    price: 'от 3 500 ₽',
    category: 'sport',
  },
  {
    title: 'Брейнсторм',
    subtitle: 'Улучшение работы мозга',
    description: 'Улучшение когнитивных функций и работы мозга. Повышение концентрации и памяти.',
    accent: '#5E6F52',
    imageUrl: '/drips/brainstorm.png',
    price: 'от 3 600 ₽',
    category: 'wellness',
  },
  {
    title: 'Маме можно',
    subtitle: 'Для будущих мам',
    description: 'Специальная программа для беременных и кормящих мам. Безопасная поддержка здоровья.',
    accent: '#7F8F70',
    imageUrl: '/drips/mom.png',
    price: 'от 3 500 ₽',
    category: 'women',
  },
  {
    title: 'Подготовка к беременности',
    subtitle: 'Планирование беременности',
    description: 'Комплексная подготовка организма к беременности. Оптимизация репродуктивного здоровья.',
    accent: '#5E6F52',
    imageUrl: '/drips/pregnancy.png',
    price: 'от 4 000 ₽',
    category: 'women',
  },
  {
    title: 'Джетлаг',
    subtitle: 'Восстановление после перелетов',
    description: 'Быстрое восстановление после смены часовых поясов. Нормализация биоритмов организма.',
    accent: '#7F8F70',
    imageUrl: '/drips/jetlag.png',
    price: 'от 2 500 ₽',
    category: 'recovery',
  },
  {
    title: 'Постковид',
    subtitle: 'Восстановление после COVID-19',
    description: 'Комплексное восстановление после перенесенного COVID-19. Восстановление функций организма.',
    accent: '#5E6F52',
    imageUrl: '/drips/postcovid.png',
    price: 'от 3 800 ₽',
    category: 'recovery',
  },
  {
    title: 'Густые волосы',
    subtitle: 'Укрепление волос',
    description: 'Улучшение состояния волос и их роста. Укрепление волосяных фолликулов.',
    accent: '#7F8F70',
    imageUrl: '/drips/hair.png',
    price: 'от 3 200 ₽',
    category: 'beauty',
  },
  {
    title: 'Снижение веса',
    subtitle: 'Поддержка метаболизма',
    description: 'Поддержка здорового снижения веса. Ускорение метаболизма и обмена веществ.',
    accent: '#5E6F52',
    imageUrl: '/drips/weight.png',
    price: 'от 3 500 ₽',
    category: 'wellness',
  },
  {
    title: 'Бархатная кожа',
    subtitle: 'Улучшение состояния кожи',
    description: 'Улучшение состояния и внешнего вида кожи. Поддержка естественных процессов обновления.',
    accent: '#7F8F70',
    imageUrl: '/drips/skin.png',
    price: 'от 3 800 ₽',
    category: 'beauty',
  },
  {
    title: 'Лаеннек',
    subtitle: 'Регенерация и омоложение',
    description: 'Премиальная программа регенерации и омоложения. Улучшение общего состояния организма.',
    accent: '#5E6F52',
    imageUrl: '/drips/laennec.png',
    price: 'от 5 000 ₽',
    category: 'beauty',
  },
  {
    title: 'Много-компонентная витаминная',
    subtitle: 'Комплекс витаминов',
    description: 'Комплексная витаминная поддержка организма. Восполнение всех необходимых витаминов и минералов.',
    accent: '#7F8F70',
    imageUrl: '/drips/vitamins.png',
    price: 'от 3 000 ₽',
    category: 'wellness',
  },
  {
    title: 'Антиэйдж премиум',
    subtitle: 'Премиальное омоложение',
    description: 'Премиальная программа антиэйдж терапии. Комплексное омоложение на клеточном уровне.',
    accent: '#5E6F52',
    imageUrl: '/drips/antiage.png',
    price: 'от 5 500 ₽',
    category: 'beauty',
  },
  {
    title: 'Айронмен',
    subtitle: 'Для активных людей',
    description: 'Программа для людей с активным образом жизни. Поддержка выносливости и работоспособности.',
    accent: '#7F8F70',
    imageUrl: '/drips/ironman.png',
    price: 'от 4 200 ₽',
    category: 'sport',
  },
  {
    title: 'Анти Климакс',
    subtitle: 'Поддержка в менопаузе',
    description: 'Специальная программа поддержки в период менопаузы. Облегчение симптомов и улучшение качества жизни.',
    accent: '#5E6F52',
    imageUrl: '/drips/menopause.png',
    price: 'от 4 000 ₽',
    category: 'women',
  },
];

export default function ElegantCarousel() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('recovery');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const SLIDE_DURATION = 6000;
  const TRANSITION_DURATION = 800;

  // Фильтруем слайды по категории
  const slides = allSlides.filter(slide => slide.category === selectedCategory);

  // Сбрасываем индекс при смене категории
  useEffect(() => {
    setCurrentIndex(0);
    setProgress(0);
  }, [selectedCategory]);

  const goToSlide = useCallback(
    (index: number, dir?: 'next' | 'prev') => {
      if (isTransitioning || index === currentIndex || index < 0 || index >= slides.length) return;
      setDirection(dir || (index > currentIndex ? 'next' : 'prev'));
      setIsTransitioning(true);
      setProgress(0);

      setTimeout(() => {
        setCurrentIndex(index);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, TRANSITION_DURATION / 2);
    },
    [isTransitioning, currentIndex, slides]
  );

  const goNext = useCallback(() => {
    if (slides.length === 0) return;
    const nextIndex = (currentIndex + 1) % slides.length;
    goToSlide(nextIndex, 'next');
  }, [currentIndex, goToSlide, slides.length]);

  const goPrev = useCallback(() => {
    if (slides.length === 0) return;
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(prevIndex, 'prev');
  }, [currentIndex, goToSlide, slides.length]);

  useEffect(() => {
    if (isPaused || slides.length === 0) return;

    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 100 / (SLIDE_DURATION / 50);
      });
    }, 50);

    intervalRef.current = setInterval(() => {
      goNext();
    }, SLIDE_DURATION);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [currentIndex, isPaused, goNext, slides.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 60) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  const currentSlide = slides.length > 0 ? slides[currentIndex] : null;

  if (slides.length === 0 || !currentSlide) {
    return (
      <div className="carousel-wrapper-full">
        <div className="carousel-categories">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`carousel-category-btn ${
                selectedCategory === category.id ? 'active' : ''
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="text-center py-20 text-olive-primary/70">
          В этой категории пока нет капельниц
        </div>
      </div>
    );
  }

  return (
    <div className="carousel-wrapper-full">
      {/* Категории */}
      <div className="carousel-categories">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`carousel-category-btn ${
              selectedCategory === category.id ? 'active' : ''
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Карусель */}
      <div
        className="carousel-wrapper"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background accent wash */}
        <div
          className="carousel-bg-wash"
          style={{
            background: `radial-gradient(ellipse at 70% 50%, ${currentSlide.accent}18 0%, transparent 70%)`,
          }}
        />

        <div className="carousel-inner">
          {/* Image - First on mobile, Second on desktop */}
          <div className="carousel-image-container carousel-image-container--mobile-first">
          <div
            className={`carousel-image-frame ${isTransitioning ? 'transitioning' : 'visible'}`}
          >
            <Image
              src={currentSlide.imageUrl}
              alt={currentSlide.title}
              width={500}
              height={700}
              className="carousel-image"
              style={{ objectFit: 'contain' }}
            />
            <div
              className="carousel-image-overlay"
              style={{
                background: `linear-gradient(135deg, ${currentSlide.accent}22 0%, transparent 50%)`,
              }}
            />
          </div>

            {/* Decorative frame corner */}
            <div className="carousel-frame-corner carousel-frame-corner--tl" style={{ borderColor: currentSlide.accent }} />
            <div className="carousel-frame-corner carousel-frame-corner--br" style={{ borderColor: currentSlide.accent }} />
          </div>

          {/* Text Content - Second on mobile, First on desktop */}
          <div className="carousel-content">
            <div className="carousel-content-inner">
            {/* Collection number */}
            <div
              className={`carousel-collection-num ${isTransitioning ? 'transitioning' : 'visible'}`}
            >
              <span className="carousel-num-line" />
              <span className="carousel-num-text">
                {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </span>
            </div>

            {/* Title */}
            <h2
              className={`carousel-title ${isTransitioning ? 'transitioning' : 'visible'}`}
            >
              {currentSlide.title}
            </h2>

            {/* Subtitle */}
            <p
              className={`carousel-subtitle ${isTransitioning ? 'transitioning' : 'visible'}`}
              style={{ color: currentSlide.accent }}
            >
              {currentSlide.subtitle}
            </p>

            {/* Description */}
            <p
              className={`carousel-description ${isTransitioning ? 'transitioning' : 'visible'}`}
            >
              {currentSlide.description}
            </p>

            {/* Price */}
            <div className={`carousel-price ${isTransitioning ? 'transitioning' : 'visible'}`}>
              <span className="text-2xl font-semibold" style={{ color: currentSlide.accent }}>
                {currentSlide.price}
              </span>
            </div>

            {/* Navigation Arrows */}
            <div className="carousel-nav-arrows">
              <button
                onClick={goPrev}
                className="carousel-arrow-btn"
                aria-label="Previous slide"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goNext}
                className="carousel-arrow-btn"
                aria-label="Next slide"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            </div>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="carousel-progress-bar">
          {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`carousel-progress-item ${index === currentIndex ? 'active' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className="carousel-progress-track">
              <div
                className="carousel-progress-fill"
                style={{
                  width: index === currentIndex ? `${progress}%` : index < currentIndex ? '100%' : '0%',
                  backgroundColor: index === currentIndex ? currentSlide.accent : undefined,
                }}
              />
            </div>
            <span className="carousel-progress-label">{slide.title}</span>
          </button>
        ))}
        </div>
      </div>
    </div>
  );
}
