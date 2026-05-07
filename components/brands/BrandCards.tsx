"use client";

import { useState, startTransition } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BLUR_DATA_URL } from "@/lib/blur";
import BrandModal from "@/components/BrandModal";
import { brands, type Brand } from "@/data/brands";

const BrandCards = () => {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (brand: Brand) => {
    startTransition(() => {
      setSelectedBrand(brand);
      setIsModalOpen(true);
    });
  };

  const handleCardKeyDown = (e: React.KeyboardEvent, brand: Brand) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openModal(brand);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBrand(null);
  };

  return (
    <>
      <motion.section
        className="grid grid-cols-1 lg:grid-cols-2 gap-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        {brands.map((brand, index) => {
          const imageSrc =
            brand.screenshots?.[0] || brand.logo;
          const useScreenshot = Boolean(brand.screenshots?.[0]);

          return (
            <motion.article
              key={brand.name}
              role="button"
              tabIndex={0}
              onClick={() => openModal(brand)}
              onKeyDown={(e) => handleCardKeyDown(e, brand)}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.7 + index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="flex flex-col cursor-pointer"
            >
              {/* Image Card - distinct visual card, same style as project cards */}
              <div className="relative w-full overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-br from-muted/20 via-muted/10 to-muted/30 aspect-video shadow-[0_2px_12px_hsl(222_47%_11%_/_0.08)] transition-shadow duration-300 hover:shadow-lg group/card">
                {useScreenshot ? (
                  <Image
                    src={brand.screenshots![0]}
                    alt={brand.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="relative w-24 h-24 md:w-28 md:h-28">
                      <Image
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        fill
                        className="object-contain"
                        sizes="112px"
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                      />
                    </div>
                  </div>
                )}

              </div>

              {/* Text and details - separate from image card */}
              <div className="mt-5 flex flex-col gap-2">
                <h3 className="text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                  {brand.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {brand.category}
                  <span className="mx-1.5 text-muted-foreground/60" aria-hidden>•</span>
                  {brand.status}
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm mt-1 line-clamp-3">
                  {brand.description}
                </p>

                {/* Metrics */}
                {brand.metrics && brand.metrics.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mt-3">
                    {brand.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg bg-muted/50 px-3 py-2 text-center"
                      >
                        <div className="text-base font-bold text-foreground">
                          {metric.value}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col xs:flex-row sm:flex-row gap-2 sm:gap-3 mt-5 pt-2">
                  <a
                    href={brand.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-accent/5 transition-colors text-sm font-medium touch-manipulation"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Website
                  </a>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(brand);
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium touch-manipulation"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.section>

      <BrandModal
        isOpen={isModalOpen}
        onClose={closeModal}
        brand={selectedBrand}
      />
    </>
  );
};

export default BrandCards;
