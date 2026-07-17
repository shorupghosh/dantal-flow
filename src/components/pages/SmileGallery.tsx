import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowDown, ZoomIn } from 'lucide-react';

interface SmileGalleryProps {
  setCurrentView?: (view: string) => void;
  setSelectedTreatment?: (treatment: string) => void;
}

type Category = 'All' | 'Implants' | 'Whitening' | 'Smile Design' | 'Veneers';

interface GalleryItem {
  id: string;
  category: Exclude<Category, 'All'>;
  title: string;
  description: string;
  before: string;
  after: string;
}

const GALLERY_DATA: GalleryItem[] = [
  {
    id: '1',
    category: 'Smile Design',
    title: 'Complete Smile Makeover',
    description: 'A full redesign focusing on symmetry and brightness to restore natural aesthetics.',
    before: '/images/teeth_before_aligners.png',
    after: '/images/teeth_after_aligners.png'
  },
  {
    id: '2',
    category: 'Whitening',
    title: 'Laser Teeth Whitening',
    description: 'Single 60-minute session for a vibrant, 5-shade improvement.',
    before: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800&h=600',
    after: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800&h=600'
  },
  {
    id: '3',
    category: 'Implants',
    title: 'Full Molar Implant',
    description: 'Surgical titanium implant with custom porcelain crown restoration.',
    before: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=800&h=600',
    after: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800&h=600'
  },
  {
    id: '4',
    category: 'Veneers',
    title: 'Porcelain Veneers',
    description: 'Six front teeth seamlessly restored with ultra-thin porcelain veneers.',
    before: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=800&h=600',
    after: 'https://images.unsplash.com/photo-1522845015757-50bce044e5da?auto=format&fit=crop&q=80&w=800&h=600'
  },
  {
    id: '5',
    category: 'Smile Design',
    title: 'Gingival Contouring & Crowns',
    description: 'Gum line leveling perfectly paired with ceramic crowns.',
    before: 'https://images.unsplash.com/photo-1579684453423-f84349ef60b0?auto=format&fit=crop&q=80&w=800&h=600',
    after: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800&h=600'
  },
  {
    id: '6',
    category: 'Whitening',
    title: 'Deep Stain Removal',
    description: 'Advanced whitening targeting intrinsic stains for lasting brightness.',
    before: 'https://images.unsplash.com/photo-1445404590072-16ef9c18bd83?auto=format&fit=crop&q=80&w=800&h=600',
    after: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?auto=format&fit=crop&q=80&w=800&h=600'
  }
];

const CATEGORIES: Category[] = ['All', 'Implants', 'Whitening', 'Smile Design', 'Veneers'];

export const SmileGallery: React.FC<SmileGalleryProps> = ({ setCurrentView, setSelectedTreatment }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredData = activeCategory === 'All' 
    ? GALLERY_DATA 
    : GALLERY_DATA.filter(item => item.category === activeCategory);

  const handleBookClick = (treatment: string) => {
    setSelectedImage(null);
    if (setSelectedTreatment) {
      setSelectedTreatment(treatment);
    }
    if (setCurrentView) {
      setCurrentView('booking');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-background text-foreground min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
          >
            Smile Gallery
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Real patients, life-changing results. Explore our before and after transformations.
          </motion.p>
        </div>

        {/* Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105'
                  : 'bg-card text-foreground border border-border hover:bg-muted hover:scale-105'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredData.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col"
                onClick={() => setSelectedImage(item)}
              >
                {/* Images Container */}
                <div className="relative w-full aspect-[4/5] overflow-hidden flex flex-col">
                  {/* Before */}
                  <div className="relative h-1/2 w-full border-b-[2px] border-background">
                    <img src={item.before} alt="Before" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-muted-foreground border border-border/50">
                      Before
                    </div>
                  </div>
                  
                  {/* Arrow Indicator */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-xl z-10 border-4 border-card group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <ArrowDown size={18} strokeWidth={3} />
                  </div>

                  {/* After */}
                  <div className="relative h-1/2 w-full border-t-[2px] border-background">
                    <img src={item.after} alt="After" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute bottom-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                      After
                    </div>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 pointer-events-none">
                    <div className="bg-background/90 backdrop-blur-sm p-4 rounded-full text-foreground shadow-2xl translate-y-8 group-hover:translate-y-0 transition-all duration-300 opacity-0 group-hover:opacity-100">
                      <ZoomIn size={24} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-xs font-bold text-primary mb-2 uppercase tracking-wider">{item.category}</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-background/90 backdrop-blur-xl" 
              onClick={() => setSelectedImage(null)} 
            />
            
            {/* Modal Content */}
            <motion.div
              layoutId={`card-${selectedImage.id}`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-5xl bg-card border border-border rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] z-10"
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-50 w-10 h-10 bg-background/50 hover:bg-background backdrop-blur-md border border-border rounded-full flex items-center justify-center text-foreground transition-all"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-2/3 flex flex-col relative bg-muted overflow-hidden">
                {/* Before */}
                <div className="relative h-[40vh] md:h-[45vh] w-full border-b-[2px] border-background">
                   <img src={selectedImage.before} alt="Before" className="w-full h-full object-cover" />
                   <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider text-foreground border border-border/50 shadow-lg">
                      Before
                    </div>
                </div>
                
                {/* Divider Arrow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-2xl z-10 border-[6px] border-card">
                  <ArrowDown size={24} strokeWidth={3} />
                </div>

                {/* After */}
                <div className="relative h-[40vh] md:h-[45vh] w-full border-t-[2px] border-background">
                  <img src={selectedImage.after} alt="After" className="w-full h-full object-cover" />
                  <div className="absolute bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
                      After
                    </div>
                </div>
              </div>

              <div className="w-full md:w-1/3 p-8 flex flex-col justify-center bg-card overflow-y-auto max-h-[90vh]">
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider mb-6 self-start">
                  {selectedImage.category}
                </div>
                <h2 className="text-3xl font-extrabold text-foreground mb-4">{selectedImage.title}</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  {selectedImage.description}
                </p>
                <button 
                  onClick={() => handleBookClick(selectedImage.category)}
                  className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                >
                  Book Free Consultation
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
