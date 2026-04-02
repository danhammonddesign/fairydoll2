import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Palette, 
  Shirt, 
  Scissors, 
  Eye, 
  Footprints, 
  Cloud, 
  Wand2, 
  RefreshCw, 
  Download,
  Heart,
  Star,
  Loader2,
  Image as ImageIcon,
  CheckCircle2,
  Layers
} from 'lucide-react';
import { FairyState, INITIAL_STATE } from './types';
import { generateDollBase, generateLayeredAsset } from './services/geminiService';

type Category = 'hair' | 'eyes' | 'wings' | 'tops' | 'bottoms' | 'shoes' | 'wands' | 'skin';

const CATEGORIES: { id: Category; icon: any; label: string }[] = [
  { id: 'hair', icon: Scissors, label: 'Hair' },
  { id: 'eyes', icon: Eye, label: 'Eyes' },
  { id: 'wings', icon: Cloud, label: 'Wings' },
  { id: 'tops', icon: Shirt, label: 'Tops' },
  { id: 'bottoms', icon: Heart, label: 'Bottoms' },
  { id: 'shoes', icon: Footprints, label: 'Shoes' },
  { id: 'wands', icon: Wand2, label: 'Wands' },
  { id: 'skin', icon: Palette, label: 'Skin' },
];

const COLORS = [
  '#FFB7C5', '#FFD700', '#E0F7FA', '#FFFFFF', '#4A90E2', 
  '#9B59B6', '#2ECC71', '#E67E22', '#E74C3C', '#34495E',
  '#FFE4E1', '#F0E68C', '#DDA0DD', '#B0E0E6', '#FF69B4'
];

const STYLES: Record<Category, string[]> = {
  hair: ['Bob', 'Long', 'Buns', 'Ponytail', 'Spiky', 'Braids', 'Wavy', 'Short', 'Twin Tails', 'Curly', 'Hime Cut', 'Side Ponytail', 'Messy Bun', 'Drill Hair'],
  eyes: ['Cute', 'Winking', 'Starry', 'Happy', 'Shy', 'Determined', 'Sleepy', 'Tsundere', 'Sparkling', 'Gentle', 'Mischievous'],
  wings: ['Butterfly', 'Dragonfly', 'Heart', 'Feathered', 'Crystal', 'Angel', 'Bat', 'Fairy Dust', 'Glitter', 'Rainbow', 'Glow'],
  tops: ['Frilly', 'Bow', 'Sailor', 'Tank', 'Crop', 'Striped', 'Peplum', 'Heart', 'Lace', 'Ribbon', 'Kimono', 'Hoodie', 'Blouse', 'Corset'],
  bottoms: ['Skirt', 'Shorts', 'Tutu', 'Long Skirt', 'Bloomers', 'Mini', 'Layered', 'Bell', 'Ruffled', 'Pleated', 'Puffy', 'Frilly Shorts', 'Petticoat'],
  shoes: ['Flats', 'Boots', 'Sneakers', 'Ribbon', 'Sandals', 'High Boots', 'Pom Pom', 'Winged', 'Heart', 'Mary Janes', 'Lace-up', 'Slippers', 'Platform'],
  wands: ['Star', 'Moon', 'Heart', 'Crystal', 'Flower', 'Ribbon', 'Bell', 'Feather', 'Gem', 'Sparkle', 'Magic Staff'],
  skin: ['Fair', 'Tan', 'Peach', 'Rosy', 'Pale', 'Honey', 'Cocoa', 'Sun-kissed'],
};

export default function App() {
  const [state, setState] = useState<FairyState>(INITIAL_STATE);
  const [activeCategory, setActiveCategory] = useState<Category>('hair');
  
  // Doll Layers
  const [dollBase, setDollBase] = useState<string | null>(null);
  const [loadedAssets, setLoadedAssets] = useState<Record<string, string>>({});
  const [isGeneratingBase, setIsGeneratingBase] = useState(false);
  const [quotaError, setQuotaError] = useState(false);

  // Stable refs for background loading
  const loadedAssetsRef = useRef<Record<string, string>>({});
  const generatingAssetsRef = useRef<Set<string>>(new Set());
  const isGeneratingBaseRef = useRef(false);

  const initDoll = useCallback(async () => {
    if (isGeneratingBaseRef.current) return;
    isGeneratingBaseRef.current = true;
    setIsGeneratingBase(true);
    setQuotaError(false);
    try {
      const base = await generateDollBase(state.skinColor);
      if (base) {
        setDollBase(base);
      } else {
        throw new Error("No image data");
      }
    } catch (e) {
      console.error("Doll generation failed:", e);
      setQuotaError(true);
    } finally {
      isGeneratingBaseRef.current = false;
      setIsGeneratingBase(false);
    }
  }, [state.skinColor]);

  // Initial Doll Base Generation
  useEffect(() => {
    setDollBase(null);
    initDoll();
  }, [initDoll]);

  // Asset Generation & Swapping Logic (Stable version)
  const getAsset = useCallback(async (category: string, styleIndex: number) => {
    const style = STYLES[category as Category][styleIndex];
    const cacheKey = `${category}-${styleIndex}`;
    
    if (loadedAssetsRef.current[cacheKey] || generatingAssetsRef.current.has(cacheKey)) return;

    generatingAssetsRef.current.add(cacheKey);
    setQuotaError(false);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const img = await generateLayeredAsset(category, style);
      if (img) {
        loadedAssetsRef.current[cacheKey] = img;
        setLoadedAssets({ ...loadedAssetsRef.current });
      }
    } catch (e) {
      console.error(`Asset generation failed for ${cacheKey}:`, e);
      setQuotaError(true);
    } finally {
      generatingAssetsRef.current.delete(cacheKey);
    }
  }, []);

  // Pre-load current state assets one by one (Stable version)
  useEffect(() => {
    const categories: Category[] = ['hair', 'eyes', 'wings', 'tops', 'bottoms', 'shoes', 'wands'];
    let isMounted = true;

    const loadSequentially = async () => {
      for (const cat of categories) {
        if (!isMounted) break;
        // Fix: 'shoes' category maps to 'shoeStyle' in state
        const statePrefix = cat === 'shoes' ? 'shoe' : cat;
        const styleKey = (statePrefix + 'Style') as keyof FairyState;
        const styleIndex = state[styleKey] as number;
        
        if (styleIndex === undefined) {
          console.warn(`Style index for ${cat} is undefined!`);
          continue;
        }

        const cacheKey = `${cat}-${styleIndex}`;
        
        if (!loadedAssetsRef.current[cacheKey] && !generatingAssetsRef.current.has(cacheKey)) {
          await getAsset(cat, styleIndex);
          // Wait longer between categories to avoid quota limits
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
    };

    loadSequentially();
    return () => { isMounted = false; };
  }, [state.hairStyle, state.eyeStyle, state.wingStyle, state.topStyle, state.bottomStyle, state.shoeStyle, state.wandStyle, getAsset]);

  const updateState = (key: keyof FairyState, value: any) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  const randomize = () => {
    setState(prev => ({
      ...prev,
      hairStyle: Math.floor(Math.random() * STYLES.hair.length),
      eyeStyle: Math.floor(Math.random() * STYLES.eyes.length),
      topStyle: Math.floor(Math.random() * STYLES.tops.length),
      bottomStyle: Math.floor(Math.random() * STYLES.bottoms.length),
      shoeStyle: Math.floor(Math.random() * STYLES.shoes.length),
      wingStyle: Math.floor(Math.random() * STYLES.wings.length),
      wandStyle: Math.floor(Math.random() * STYLES.wands.length),
    }));
  };

  const renderOptions = () => {
    const styles = STYLES[activeCategory];
    const styleKey = (activeCategory + 'Style') as keyof FairyState;
    const colorKey = (activeCategory + 'Color') as keyof FairyState;

    return (
      <div className="flex flex-col gap-6 p-4 h-full overflow-y-auto bg-white/50 backdrop-blur-sm rounded-3xl border-4 border-pink-200 scrollbar-hide">
        {/* Style Selection with Anime Icons */}
        {styles.length > 0 && activeCategory !== 'skin' && (
          <div className="grid grid-cols-2 gap-3">
            {styles.map((style, i) => {
              const cacheKey = `${activeCategory}-${i}`;
              const icon = loadedAssets[cacheKey];
              const isGenerating = generatingAssetsRef.current.has(cacheKey);

              return (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    updateState(styleKey, i);
                    getAsset(activeCategory, i);
                  }}
                  className={`relative aspect-square rounded-2xl border-4 overflow-hidden shadow-sm transition-all ${
                    state[styleKey] === i 
                      ? 'border-pink-500 ring-4 ring-pink-200' 
                      : 'border-white hover:border-pink-200'
                  }`}
                >
                  {icon ? (
                    <img 
                      src={icon} 
                      alt={style} 
                      className="w-full h-full object-cover" 
                      style={{ 
                        backgroundColor: state[colorKey] as string,
                        mixBlendMode: 'multiply' 
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-pink-50 flex items-center justify-center">
                      {isGenerating ? (
                        <Loader2 className="animate-spin text-pink-300" size={24} />
                      ) : (
                        <ImageIcon className="text-pink-100" size={24} />
                      )}
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-[10px] font-bold py-1 px-2 backdrop-blur-sm">
                    {style}
                  </div>
                  {state[styleKey] === i && (
                    <div className="absolute top-2 right-2 bg-pink-500 text-white rounded-full p-1 shadow-md">
                      <CheckCircle2 size={12} />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        )}

        {/* Color Selection */}
        <div className="flex flex-col gap-3">
          <h3 className="text-pink-600 font-bold flex items-center gap-2">
            <Palette size={20} /> Pick a Color!
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {COLORS.map(color => (
              <motion.button
                key={color}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => updateState(colorKey, color)}
                className={`w-full aspect-square rounded-full border-4 shadow-sm ${
                  state[colorKey] === color ? 'border-pink-600' : 'border-white'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderLayer = (cat: string, zIndex: number) => {
    const styleKey = (cat + 'Style') as keyof FairyState;
    const colorKey = (cat + 'Color') as keyof FairyState;
    const styleIndex = state[styleKey] as number;
    const cacheKey = `${cat}-${styleIndex}`;
    const img = loadedAssets[cacheKey];

    if (!img) return null;

    return (
      <motion.img
        key={cacheKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        src={img}
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        style={{ 
          zIndex,
          backgroundColor: state[colorKey] as string,
          mixBlendMode: 'multiply'
        }}
      />
    );
  };

  return (
    <div 
      className="min-h-screen flex flex-col md:flex-row font-sans transition-colors duration-500"
      style={{ backgroundColor: state.background }}
    >
      {/* Left: Fairy Preview (The Doll) */}
      <div className="flex-1 relative flex flex-col items-center justify-center p-8 min-h-[60vh] md:min-h-screen overflow-hidden">
        {/* Floating Decorations */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-white/20"
              initial={{ 
                x: Math.random() * 100 + '%', 
                y: Math.random() * 100 + '%',
                scale: 0.5 + Math.random()
              }}
              animate={{
                y: [0, -40, 0],
                rotate: [0, 20, -20, 0],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
            >
              {i % 2 === 0 ? <Heart size={64} fill="currentColor" /> : <Star size={64} fill="currentColor" />}
            </motion.div>
          ))}
        </div>

        <div className="absolute top-8 left-8 flex gap-4 z-50">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/90 backdrop-blur-md p-4 rounded-3xl shadow-2xl border-4 border-pink-200 flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center text-white">
              <Layers size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black text-pink-600 leading-none">Doll Studio</h1>
              <p className="text-pink-400 text-sm font-medium">Instant Dress Up</p>
            </div>
          </motion.div>
        </div>

        {/* The Doll Canvas */}
        <div className="w-full max-w-lg aspect-[3/4] relative bg-white/30 backdrop-blur-sm rounded-[40px] border-8 border-white shadow-2xl overflow-hidden">
          <AnimatePresence mode="popLayout">
            {(!dollBase || isGeneratingBase) ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-pink-500/20 backdrop-blur-md text-white gap-4 z-50">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 size={64} />
                </motion.div>
                <p className="text-2xl font-black drop-shadow-lg">Preparing Doll...</p>
                <p className="text-sm font-medium opacity-80">The magic is gathering! ✨</p>
                
                {quotaError && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => initDoll()}
                    className="mt-6 px-8 py-3 bg-white text-pink-500 rounded-full font-black shadow-xl hover:bg-pink-50 transition-all flex items-center gap-2 border-4 border-pink-200"
                  >
                    <RefreshCw size={20} /> Try Again
                  </motion.button>
                )}
              </div>
            ) : (
              <div className="relative w-full h-full">
                {/* 1. Wings (Back) */}
                {renderLayer('wings', 10)}

                {/* 2. Base Doll */}
                {dollBase && (
                  <img 
                    src={dollBase} 
                    alt="Base Doll" 
                    className="absolute inset-0 w-full h-full object-contain z-20"
                  />
                )}

                {/* 3. Eyes */}
                {renderLayer('eyes', 30)}

                {/* 4. Bottoms */}
                {renderLayer('bottoms', 40)}

                {/* 5. Tops */}
                {renderLayer('tops', 50)}

                {/* 6. Shoes */}
                {renderLayer('shoes', 60)}

                {/* 7. Hair */}
                {renderLayer('hair', 70)}

                {/* 8. Wand (Front) */}
                {renderLayer('wands', 80)}
              </div>
            )}
          </AnimatePresence>
        </div>

        <div className="absolute bottom-8 flex gap-4 z-50">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={randomize}
            className="bg-white p-5 rounded-full shadow-xl text-pink-500 border-4 border-pink-100 hover:border-pink-300"
          >
            <RefreshCw size={32} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            className="bg-pink-500 p-5 rounded-full shadow-xl text-white border-4 border-pink-300"
            onClick={() => alert("Your magical creation is ready! ✨")}
          >
            <Download size={32} />
          </motion.button>
        </div>
      </div>

      {/* Right: Controls */}
      <div className="w-full md:w-[480px] bg-white/90 backdrop-blur-2xl p-6 flex flex-col gap-6 md:h-screen border-t-8 md:border-t-0 md:border-l-8 border-pink-100 shadow-2xl">
        {/* Category Selector */}
        <div className="flex md:grid md:grid-cols-4 gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 flex flex-col items-center justify-center p-3 rounded-2xl border-4 transition-all ${
                activeCategory === cat.id
                  ? 'bg-pink-500 border-pink-600 text-white shadow-lg'
                  : 'bg-white border-pink-100 text-pink-300 hover:border-pink-300'
              }`}
            >
              <cat.icon size={24} />
              <span className="text-[10px] font-bold mt-1 uppercase tracking-wider">{cat.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Options Panel */}
        <div className="flex-1 min-h-[300px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderOptions()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Message */}
        <div className="bg-pink-50 p-4 rounded-3xl text-center border-2 border-pink-100">
          {quotaError ? (
            <p className="text-red-400 text-sm font-bold flex flex-col items-center gap-1">
              <span className="flex items-center gap-2">
                <RefreshCw size={18} className="animate-spin" /> Magic is recharging...
              </span>
              <span className="text-[10px] opacity-70">We hit a limit, please wait a moment!</span>
            </p>
          ) : (
            <p className="text-pink-400 text-sm font-bold italic flex items-center justify-center gap-2">
              <Sparkles size={18} className="animate-pulse" /> 
              Instant Anime Doll Magic!
              <Sparkles size={18} className="animate-pulse" />
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
