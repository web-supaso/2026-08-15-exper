#!/usr/bin/env python3
"""
Skill: internal-linker-manager.py
Objetivo: Conectar la nueva página de forma lógica con el resto del sitio web.
Enfoque: Mapear palabras clave del texto actual e insertar enlaces internos basados en una estructura o mapa del sitio preestablecido.
"""

import re
import sys

# Mapa del sitio por defecto con palabras clave asociadas a URLs
DEFAULT_SITEMAP = {
    "copywriting": "https://example.com/servicios/copywriting-persuasivo",
    "seo": "https://example.com/blog/guia-seo-moderno",
    "optimización": "https://example.com/herramientas/optimizador-conversiones",
    "inteligencia artificial": "https://example.com/ia-aplicada",
    "ventas": "https://example.com/contacto"
}

def inject_internal_links(text: str, sitemap: dict = None) -> tuple:
    """
    Escanea el texto para encontrar palabras clave del mapa del sitio e inserta enlaces HTML.
    Solo reemplaza la primera coincidencia de cada palabra para evitar saturación de enlaces (over-optimization).
    """
    active_sitemap = sitemap if sitemap else DEFAULT_SITEMAP
    modified_text = text
    suggested_links = []
    
    for kw, url in active_sitemap.items():
        # Buscamos la palabra de forma insensible a mayúsculas, respetando límites de palabra
        pattern = re.compile(rf'\b({re.escape(kw)})\b', re.IGNORECASE)
        match = pattern.search(modified_text)
        
        if match:
            # Reemplazar solo la primera coincidencia
            matched_word = match.group(1)
            link_html = f"<a href=\"{url}\">{matched_word}</a>"
            modified_text = pattern.sub(link_html, modified_text, count=1)
            suggested_links.append((kw, url))
            
    return modified_text, suggested_links

def process_linker(text: str, sitemap: dict = None) -> str:
    """
    Función principal para mapear e inyectar enlaces internos.
    Agrega al final un listado de los enlaces internos mapeados.
    """
    try:
        updated_text, suggestions = inject_internal_links(text, sitemap)
        if suggestions:
            list_str = "\n".join([f"- Mapeado: '{kw}' -> {url}" for kw, url in suggestions])
            note = f"\n\n---\n[Enlaces Internos Sugeridos/Insertados]:\n{list_str}"
            return updated_text + note
        return text
    except Exception as e:
        return f"Error en internal-linker-manager: {str(e)}\nTexto original:\n{text}"

if __name__ == "__main__":
    if len(sys.argv) > 1:
        with open(sys.argv[1], "r", encoding="utf-8") as f:
            content = f.read()
        print(process_linker(content))
    else:
        sample = "Ofrecemos optimización y copywriting utilizando inteligencia artificial para incrementar tus ventas y mejorar el posicionamiento SEO."
        print(process_linker(sample))
