import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Droplet, Trees } from 'lucide-react';
import { useLang } from '../core/LangContext';

type SoundMode = 'agua' | 'bosque' | null;

/**
 * ForestSoundToggle Component — Bosque Luna Glamping
 *
 * Utiliza grabaciones de audio REALES de campo en alta definición:
 * 1. BOTÓN "AGUA": Grabación real de río de montaña (agua fluyendo sobre piedras, borbolleo cristalino, 0% viento).
 * 2. BOTÓN "BOSQUE": Grabación real de ambiente del bosque (aves del bosque en vivo + brisa en las hojas, 0% río).
 */
export default function ForestSoundToggle() {
  const { lang } = useLang();
  const [activeMode, setActiveMode] = useState<SoundMode>(null);
  const [masterVolume, setMasterVolume] = useState(0.7);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  // Referencias a los elementos Audio HTML5
  const riverAudioRef = useRef<HTMLAudioElement | null>(null);
  const forestAudioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);

  const labels = {
    es: {
      agua: 'Sonido de Agua',
      bosque: 'Sonido del Bosque',
      vol: 'Volumen',
    },
    ca: {
      agua: 'So d\'Aigua',
      bosque: 'So del Bosc',
      vol: 'Volum',
    },
    fr: {
      agua: 'Son de l\'Eau',
      bosque: 'Son de la Forêt',
      vol: 'Volume',
    },
  };

  const currentLabel = labels[lang] || labels.es;

  // Inicializa las instancias de Audio al montar el componente
  useEffect(() => {
    const riverUrl = '/assets/audio/river.mp3';
    const forestUrl = '/assets/audio/forest_birds.mp3';

    const riverAudio = new Audio(riverUrl);
    riverAudio.loop = true;
    riverAudio.volume = 0;
    riverAudioRef.current = riverAudio;

    const forestAudio = new Audio(forestUrl);
    forestAudio.loop = true;
    forestAudio.volume = 0;
    forestAudioRef.current = forestAudio;

    return () => {
      if (fadeIntervalRef.current) cancelAnimationFrame(fadeIntervalRef.current);
      riverAudio.pause();
      forestAudio.pause();
    };
  }, []);

  // Función de fundido cruzado suave (crossfade / fade in / fade out)
  const fadeVolume = (
    targetMode: SoundMode,
    targetMasterVol: number
  ) => {
    if (fadeIntervalRef.current) {
      cancelAnimationFrame(fadeIntervalRef.current);
    }

    const river = riverAudioRef.current;
    const forest = forestAudioRef.current;

    if (!river || !forest) return;

    // Asegurar reproducir si no están sonando
    if (targetMode === 'agua' && river.paused) {
      river.play().catch(() => {});
    }
    if (targetMode === 'bosque' && forest.paused) {
      forest.play().catch(() => {});
    }

    const step = () => {
      let isDone = true;

      // Canal Agua
      const targetRiverVol = targetMode === 'agua' ? targetMasterVol : 0;
      const currentRiverVol = river.volume;
      const diffRiver = targetRiverVol - currentRiverVol;

      if (Math.abs(diffRiver) > 0.02) {
        river.volume = Math.min(1, Math.max(0, currentRiverVol + Math.sign(diffRiver) * 0.04));
        isDone = false;
      } else {
        river.volume = targetRiverVol;
        if (targetRiverVol === 0 && !river.paused) {
          river.pause();
        }
      }

      // Canal Bosque
      const targetForestVol = targetMode === 'bosque' ? targetMasterVol : 0;
      const currentForestVol = forest.volume;
      const diffForest = targetForestVol - currentForestVol;

      if (Math.abs(diffForest) > 0.02) {
        forest.volume = Math.min(1, Math.max(0, currentForestVol + Math.sign(diffForest) * 0.04));
        isDone = false;
      } else {
        forest.volume = targetForestVol;
        if (targetForestVol === 0 && !forest.paused) {
          forest.pause();
        }
      }

      if (!isDone) {
        fadeIntervalRef.current = requestAnimationFrame(step);
      }
    };

    fadeIntervalRef.current = requestAnimationFrame(step);
  };

  // Manejador de selección de modo
  const handleSelectMode = (targetMode: 'agua' | 'bosque') => {
    if (activeMode === targetMode) {
      // Pausar
      setActiveMode(null);
      fadeVolume(null, masterVolume);
    } else {
      // Activar / Cambiar
      setActiveMode(targetMode);
      fadeVolume(targetMode, masterVolume);
    }
  };

  // Manejador de cambio de volumen
  const handleVolumeChange = (newVol: number) => {
    setMasterVolume(newVol);
    if (activeMode) {
      if (activeMode === 'agua' && riverAudioRef.current) {
        riverAudioRef.current.volume = newVol;
      }
      if (activeMode === 'bosque' && forestAudioRef.current) {
        forestAudioRef.current.volume = newVol;
      }
    }
  };

  return (
    <div className="relative flex items-center gap-2">
      {/* BOTÓN 1: SONIDO DE AGUA (Río Real) */}
      <button
        onClick={() => handleSelectMode('agua')}
        aria-pressed={activeMode === 'agua'}
        title="Escuchar grabación real de Río de Montaña"
        className={`
          group relative flex items-center gap-2 px-3.5 py-1.5 rounded-full border
          transition-all duration-300 select-none text-xs font-semibold
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]
          ${activeMode === 'agua'
            ? 'bg-[#0B130E]/90 text-[#38BDF8] border-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.45)] scale-105'
            : 'bg-black/40 backdrop-blur-md text-[#F4EFE6]/75 border-[#F4EFE6]/20 hover:border-[#38BDF8]/60 hover:text-[#F4EFE6]'
          }
        `}
      >
        <Droplet className={`w-3.5 h-3.5 ${activeMode === 'agua' ? 'text-[#38BDF8] animate-pulse' : 'opacity-70'}`} />
        <span>{currentLabel.agua}</span>

        {activeMode === 'agua' && (
          <span className="flex items-end gap-0.5 h-2.5 px-0.5">
            <span className="w-0.5 bg-[#38BDF8] rounded-full animate-[soundWave_0.8s_ease-in-out_infinite]" style={{ height: '70%' }}></span>
            <span className="w-0.5 bg-[#38BDF8] rounded-full animate-[soundWave_1.1s_ease-in-out_infinite_0.2s]" style={{ height: '100%' }}></span>
          </span>
        )}
      </button>

      {/* BOTÓN 2: SONIDO DEL BOSQUE (Pájaros Reales + Brisa Suave) */}
      <button
        onClick={() => handleSelectMode('bosque')}
        aria-pressed={activeMode === 'bosque'}
        title="Escuchar grabación real de Aves del Bosque"
        className={`
          group relative flex items-center gap-2 px-3.5 py-1.5 rounded-full border
          transition-all duration-300 select-none text-xs font-semibold
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]
          ${activeMode === 'bosque'
            ? 'bg-[#0B130E]/90 text-[#D4AF37] border-[#D4AF37] shadow-[0_0_18px_rgba(212,175,55,0.45)] scale-105'
            : 'bg-black/40 backdrop-blur-md text-[#F4EFE6]/75 border-[#F4EFE6]/20 hover:border-[#D4AF37]/60 hover:text-[#F4EFE6]'
          }
        `}
      >
        <Trees className={`w-3.5 h-3.5 ${activeMode === 'bosque' ? 'text-[#D4AF37] animate-pulse' : 'opacity-70'}`} />
        <span>{currentLabel.bosque}</span>

        {activeMode === 'bosque' && (
          <span className="flex items-end gap-0.5 h-2.5 px-0.5">
            <span className="w-0.5 bg-[#D4AF37] rounded-full animate-[soundWave_0.9s_ease-in-out_infinite]" style={{ height: '80%' }}></span>
            <span className="w-0.5 bg-[#D4AF37] rounded-full animate-[soundWave_1.2s_ease-in-out_infinite_0.2s]" style={{ height: '100%' }}></span>
          </span>
        )}
      </button>

      {/* Control desplegable de volumen */}
      <button
        onClick={() => setShowVolumeSlider(!showVolumeSlider)}
        className="p-1.5 text-[#F4EFE6]/60 hover:text-[#D4AF37] transition-colors rounded-full"
        title={currentLabel.vol}
        aria-label={currentLabel.vol}
      >
        {activeMode ? <Volume2 className="w-3.5 h-3.5 text-[#D4AF37]" /> : <VolumeX className="w-3.5 h-3.5 opacity-50" />}
      </button>

      {showVolumeSlider && (
        <div className="absolute top-full right-0 mt-2 p-3 bg-[#0B130E]/95 border border-[#D4AF37]/30 rounded-xl shadow-2xl backdrop-blur-md z-50 flex flex-col gap-2 min-w-[140px]">
          <div className="flex justify-between text-[10px] text-[#F4EFE6]/70 uppercase font-semibold">
            <span>{currentLabel.vol}</span>
            <span>{Math.round(masterVolume * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={masterVolume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="w-full accent-[#D4AF37] bg-white/10 rounded-lg cursor-pointer h-1.5"
          />
        </div>
      )}

      {/* Estilos del ecualizador */}
      <style>{`
        @keyframes soundWave {
          0%, 100% { transform: scaleY(0.3); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}
