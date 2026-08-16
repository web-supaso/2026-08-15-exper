import React, { Component, ErrorInfo, ReactNode } from 'react';
import { MessageCircle, Mail, RotateCw, Sparkles } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  autoReloading: boolean;
}

// Telemetry helper to report client-side runtime errors
const reportErrorTelemetry = (error: Error, errorInfo?: ErrorInfo) => {
  try {
    const payload = {
      message: error?.message || 'Unknown Error',
      stack: error?.stack || errorInfo?.componentStack || '',
      url: window.location.href,
      userAgent: navigator.userAgent,
    };

    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/telemetry/errors', JSON.stringify(payload));
    } else {
      fetch('/api/telemetry/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Silent fail if telemetry endpoint is unreachable
  }
};

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    autoReloading: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, autoReloading: false };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary caught error]:', error, errorInfo);
    reportErrorTelemetry(error, errorInfo);

    const errorMessage = error?.message || '';
    const errorString = error?.toString() || '';
    
    // Specifically target version mismatches and dynamic chunk loading failures
    const isChunkOrVersionError =
      errorMessage.includes('Cannot access') ||
      errorMessage.includes('is not defined') ||
      errorMessage.includes('Failed to fetch dynamically imported module') ||
      errorMessage.includes('Loading chunk') ||
      errorMessage.includes('dynamically imported module') ||
      errorString.includes('ReferenceError');

    // Strict 1-shot reload guard to completely eliminate infinite reload loops
    const reloadKey = 'mkt_chunk_reload_done';
    const hasAlreadyReloaded = sessionStorage.getItem(reloadKey);

    if (isChunkOrVersionError && !hasAlreadyReloaded) {
      sessionStorage.setItem(reloadKey, 'true');
      this.setState({ autoReloading: true });
      
      setTimeout(() => {
        window.location.reload();
      }, 400);
    }
  }

  private handleManualReload = () => {
    sessionStorage.removeItem('mkt_chunk_reload_done');
    window.location.reload();
  };

  public render() {
    if (this.state.autoReloading) {
      return (
        <div className="min-h-screen bg-[#121a16] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-full border-2 border-[#c5a059] border-t-transparent animate-spin mb-4" />
          <h2 className="font-serif-luxury text-xl font-bold text-[#e5c07b]">Sincronizando la última versión...</h2>
          <p className="text-xs text-gray-300 mt-2 font-light">Actualizando el sistema de reservas para ofrecerte la máxima disponibilidad.</p>
        </div>
      );
    }

    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#121a16] text-white flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-[#1c2a23] border border-[#c5a059]/40 rounded-3xl p-8 shadow-2xl text-center relative overflow-hidden">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c5a059]/20 text-[#e5c07b] text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Atención Prioritaria Concierge</span>
            </div>

            <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold mb-3 text-white">
              Gestión Directa de tu Reserva
            </h1>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light mb-8">
              Estamos actualizando nuestras conexiones en tiempo real. Para garantizar tus fechas y recibir asesoramiento exclusivo sin esperas, contáctanos directamente:
            </p>

            <div className="space-y-3 mb-8">
              <a
                href="https://wa.me/34600000000?text=Hola%2C%20quisiera%20consultar%20disponibilidad%20para%20los%20refugios%20de%20Experiencias%20con%20Estilo."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-xl font-bold uppercase tracking-wider text-black bg-[#c5a059] hover:bg-[#e5c07b] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#c5a059]/20 text-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contactar por WhatsApp</span>
              </a>

              <a
                href="mailto:hola@experienciasconestilo.com?subject=Consulta%20de%20Disponibilidad%20Concierge"
                className="w-full py-3.5 px-6 rounded-xl font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all flex items-center justify-center gap-2 text-xs"
              >
                <Mail className="w-4 h-4 text-[#c5a059]" />
                <span>Enviar Email a Concierge</span>
              </a>
            </div>

            <button
              onClick={this.handleManualReload}
              className="inline-flex items-center gap-2 text-[11px] text-gray-400 hover:text-[#e5c07b] transition-colors cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Recargar aplicación web</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
