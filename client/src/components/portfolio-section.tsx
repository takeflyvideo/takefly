import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: "all" | "landscape" | "urban" | "events";
}

const galleryItems: GalleryItem[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    alt: "Mountain aerial view",
    category: "landscape"
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    alt: "Rio de Janeiro aerial view",
    category: "urban"
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    alt: "Forest aerial view",
    category: "landscape"
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    alt: "City skyline aerial",
    category: "urban"
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    alt: "Beach wedding aerial",
    category: "events"
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    alt: "Ocean cliffs aerial",
    category: "landscape"
  },
  {
    id: "7",
    src: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    alt: "Urban intersection aerial",
    category: "urban"
  },
  {
    id: "8",
    src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
    alt: "Corporate event aerial",
    category: "events"
  }
];

const filterButtons = [
  { id: "all", label: "Todas" },
  { id: "landscape", label: "Paisagens" },
  { id: "urban", label: "Urbano" },
  { id: "events", label: "Eventos" }
];

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>(galleryItems);

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredItems(galleryItems);
    } else {
      setFilteredItems(galleryItems.filter(item => item.category === activeFilter));
    }
  }, [activeFilter]);

  return (
    <section id="portfolio" className="py-20 px-4" data-testid="portfolio-section">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6 font-serif" data-testid="portfolio-title">
            Nosso Portfólio
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="portfolio-subtitle">
            Uma coleção de momentos únicos capturados do alto, cada imagem conta uma história
          </p>
        </motion.div>
        
        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
          data-testid="portfolio-filters"
        >
          {filterButtons.map((button) => (
            <button
              key={button.id}
              onClick={() => setActiveFilter(button.id)}
              className={`glass-effect px-6 py-3 rounded-full transition-all hover-scale ${
                activeFilter === button.id
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
              data-testid={`filter-${button.id}`}
            >
              {button.label}
            </button>
          ))}
        </motion.div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="gallery-grid">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="aspect-square overflow-hidden rounded-xl hover-scale cursor-pointer"
              data-testid={`gallery-item-${item.id}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
