import { useState, useEffect } from 'react';

interface Lead {
  id: number;
  experiencia_slug?: string;
  nombre: string;
  email: string;
  telefono: string | null;
  fecha_checkin: string | null;
  num_huespedes: number;
  idioma: 'es' | 'ca' | 'fr' | 'en';
  estado: 'nuevo' | 'contactado' | 'confirmado' | 'cancelado';
  canal: string;
  mensaje: string | null;
  recibido: string;
}

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [experienciaFilter, setExperienciaFilter] = useState('');
  const [estadoFilter, setEstadoFilter] = useState('');
  const [idiomaFilter, setIdiomaFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/backend/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsLoggedIn(true);
      } else {
        setLoginError(data.error || 'Credenciales inválidas');
      }
    } catch {
      setLoginError('Error al conectar con el servidor');
    }
  };

  const fetchLeads = async () => {
    if (!isLoggedIn) return;
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: page.toString(),
        ...(experienciaFilter && { experiencia: experienciaFilter }),
        ...(estadoFilter && { estado: estadoFilter }),
        ...(idiomaFilter && { idioma: idiomaFilter }),
      });
      const res = await fetch(`/backend/get_leads.php?${query.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setLeads(data.data || []);
        setTotalPages(data.pagination?.total_pages || 1);
      } else if (res.status === 401) {
        setIsLoggedIn(false);
      }
    } catch {
      console.error('Error al obtener leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [isLoggedIn, experienciaFilter, estadoFilter, idiomaFilter, page]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0B130E] flex items-center justify-center px-4">
        <div className="bg-white/5 border border-[#D4AF37]/20 p-8 rounded-2xl max-w-md w-full backdrop-blur-md">
          <div className="text-center mb-6">
            <h1 className="text-[#F4EFE6] font-bold text-2xl mb-1">CRM Admin</h1>
            <p className="text-[#D4AF37]/70 text-xs tracking-widest uppercase">Experiencias con Estilo</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[#F4EFE6]/70 text-xs font-medium uppercase mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-[#F4EFE6]/10 rounded-xl px-4 py-2.5 text-sm text-[#F4EFE6] focus:outline-none focus:border-[#D4AF37]"
                placeholder="admin@experienciasconestilo.com"
              />
            </div>
            <div>
              <label className="block text-[#F4EFE6]/70 text-xs font-medium uppercase mb-1">Contraseña</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-[#F4EFE6]/10 rounded-xl px-4 py-2.5 text-sm text-[#F4EFE6] focus:outline-none focus:border-[#D4AF37]"
                placeholder="••••••••"
              />
            </div>
            {loginError && (
              <p className="text-red-400 text-xs text-center">{loginError}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#E5A93C] text-[#0B130E] font-bold rounded-xl text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Iniciar Sesión
            </button>
          </form>
          <div className="mt-6 text-center">
            <a href="/" className="text-xs text-[#F4EFE6]/40 hover:text-[#D4AF37]">← Volver al sitio web</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B130E] text-[#F4EFE6]">
      {/* Header Admin */}
      <header className="border-b border-[#F4EFE6]/10 bg-black/40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[#D4AF37] font-bold tracking-wider text-lg">CRM EXPERIENCIAS</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/backend/export_csv.php"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] rounded-lg text-xs font-semibold hover:bg-[#D4AF37]/20 transition-all"
          >
            📥 Exportar CSV
          </a>
          <a
            href="/"
            className="text-xs text-[#F4EFE6]/60 hover:text-[#F4EFE6]"
          >
            Ver Web
          </a>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="text-xs text-red-400/80 hover:text-red-400"
          >
            Salir
          </button>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Filtros */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white/5 border border-[#F4EFE6]/10 p-4 rounded-xl">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="block text-[10px] uppercase text-[#F4EFE6]/50 mb-1">Experiencia</label>
              <select
                value={experienciaFilter}
                onChange={(e) => { setExperienciaFilter(e.target.value); setPage(1); }}
                className="bg-[#0B130E] border border-[#F4EFE6]/20 rounded-lg px-3 py-1.5 text-xs text-[#F4EFE6] focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="">Todas las experiencias</option>
                <option value="canigo">Canigó Glamping</option>
                <option value="gibraltar">Gibraltar</option>
                <option value="tramuntana">Tramuntana</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase text-[#F4EFE6]/50 mb-1">Estado</label>
              <select
                value={estadoFilter}
                onChange={(e) => { setEstadoFilter(e.target.value); setPage(1); }}
                className="bg-[#0B130E] border border-[#F4EFE6]/20 rounded-lg px-3 py-1.5 text-xs text-[#F4EFE6] focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="">Todos los estados</option>
                <option value="nuevo">Nuevo</option>
                <option value="contactado">Contactado</option>
                <option value="confirmado">Confirmado</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase text-[#F4EFE6]/50 mb-1">Idioma</label>
              <select
                value={idiomaFilter}
                onChange={(e) => { setIdiomaFilter(e.target.value); setPage(1); }}
                className="bg-[#0B130E] border border-[#F4EFE6]/20 rounded-lg px-3 py-1.5 text-xs text-[#F4EFE6] focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="">Todos los idiomas</option>
                <option value="es">Español (ES)</option>
                <option value="ca">Catalán (CA)</option>
                <option value="fr">Francés (FR)</option>
              </select>
            </div>
          </div>
          <button
            onClick={fetchLeads}
            className="text-xs text-[#D4AF37] hover:underline"
          >
            🔄 Actualizar
          </button>
        </div>

        {/* Tabla */}
        <div className="bg-white/5 border border-[#F4EFE6]/10 rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-[#F4EFE6]/50 text-sm">Cargando reservas...</div>
          ) : leads.length === 0 ? (
            <div className="p-8 text-center text-[#F4EFE6]/50 text-sm">No hay leads registrados aún.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-black/40 text-[#D4AF37] uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3">Recibido</th>
                    <th className="p-3">Landing</th>
                    <th className="p-3">Nombre</th>
                    <th className="p-3">Email / Teléfono</th>
                    <th className="p-3">Check-in</th>
                    <th className="p-3">Huéspedes</th>
                    <th className="p-3">Idioma</th>
                    <th className="p-3">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F4EFE6]/5">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-3 text-[#F4EFE6]/50 whitespace-nowrap">{lead.recibido}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 rounded text-[10px] uppercase font-bold">
                          {lead.experiencia_slug || 'canigo'}
                        </span>
                      </td>
                      <td className="p-3 font-semibold text-[#F4EFE6]">{lead.nombre}</td>
                      <td className="p-3 space-y-0.5">
                        <div className="text-[#F4EFE6]/90">{lead.email}</div>
                        {lead.telefono && <div className="text-[#D4AF37]/80 text-[11px]">{lead.telefono}</div>}
                      </td>
                      <td className="p-3 text-[#F4EFE6]/80">{lead.fecha_checkin || '-'}</td>
                      <td className="p-3 text-center">{lead.num_huespedes}</td>
                      <td className="p-3 uppercase text-[#F4EFE6]/70">{lead.idioma}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                          lead.estado === 'nuevo' ? 'bg-blue-500/20 text-blue-300' :
                          lead.estado === 'contactado' ? 'bg-yellow-500/20 text-yellow-300' :
                          lead.estado === 'confirmado' ? 'bg-green-500/20 text-green-300' :
                          'bg-red-500/20 text-red-300'
                        }`}>
                          {lead.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 items-center text-xs">
            <button
              disabled={page <= 1}
              onClick={() => setPage(p => p - 1)}
              className="px-3 py-1 bg-white/5 border border-[#F4EFE6]/10 rounded disabled:opacity-30"
            >
              Anterior
            </button>
            <span className="text-[#F4EFE6]/60">Página {page} de {totalPages}</span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(p => p + 1)}
              className="px-3 py-1 bg-white/5 border border-[#F4EFE6]/10 rounded disabled:opacity-30"
            >
              Siguiente
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
