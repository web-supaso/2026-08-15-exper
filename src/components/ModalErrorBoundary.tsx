import React, { Component, ErrorInfo, ReactNode } from 'react';
import { X, MessageCircle, Mail, Sparkles, RotateCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  onClose?: () => void;
  title?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const reportModalErrorTelemetry = (error: Error, errorInfo?: ErrorInfo) => {
  try {
    const payload = {
      message: `[Modal Error]: ${error?.message || 'Unknown'}`,
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
    // Silent fail
  }
};

export class ModalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ModalErrorBoundary caught error]:', error, errorInfo);
    reportModalErrorTelemetry(error, errorInfo);

    const errorMessage = error?.message || '';
    const errorString = error?.toString() || '';
    const isChunkOrVersionError =
      errorMessage.includes('Cannot access') ||
      errorMessage.includes('is not defined') ||
      errorMessage.includes('Failed to fetch dynamically imported module') ||
      errorMessage.includes('Loading chunk') ||
      errorString.includes('ReferenceError');

    const reloadKey = 'mkt_modal_reload_done';
    const hasAlreadyReloaded = sessionStorage.getItem(reloadKey);

    if (isChunkOrVersionError && !hasAlreadyReloaded) {
      sessionStorage.setItem(reloadKey, 'true');
      setTimeout(() => {
        window.location.reload();
      }, 300);
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#121a16] text-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#c5a059]/40 shadow-2xl relative">
            {this.props.onClose && (
              <button
                onClick={this.props.onClose}
                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c5a059]/20 text-[#e5c07b] text-xs font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Atención Personalizada Concierge</span>
              </div>

              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold mb-3">
                {this.props.title || 'Reserva Directa Inmediata'}
              </h2>

              <p className="text-xs text-gray-300 font-light leading-relaxed mb-6">
                Para garantizar la máxima agilidad en tu reserva y asignarte las mejores fechas, nuestro equipo de Concierge está disponible para atenderte en directo:
              </p>

              <div className="space-y-3 mb-6">
                <a
                  href="https://wa.me/34600000000?text=Hola%2C%20quisiera%20consultar%20disponibilidad%20para%20los%20refugios%20de%20Experiencias%20con%20Estilo."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-xl font-bold uppercase tracking-wider text-black bg-[#c5a059] hover:bg-[#e5c07b] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#c5a059]/20 text-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Consultar por WhatsApp</span>
                </a>

                <a
                  href="mailto:hola@experienciasconestilo.com?subject=Consulta%20de%20Disponibilidad%20Concierge"
                  className="w-full py-3.5 px-6 rounded-xl font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all flex items-center justify-center gap-2 text-xs"
                >
                  <Mail className="w-4 h-4 text-[#c5a059]" />
                  <span>Contactar por Email</span>
                </a>
              </div>

              <div className="flex items-center justify-center gap-4 text-[11px] text-gray-400">
                <button
                  onClick={() => window.location.reload()}
                  className="hover:text-[#e5c07b] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Actualizar página</span>
                </button>
                <span>•</span>
                <button
                  onClick={this.handleReset}
                  className="hover:text-white cursor-pointer transition-colors"
                >
                  Cerrar ventana
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
