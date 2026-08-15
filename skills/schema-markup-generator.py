#!/usr/bin/env python3
"""
Skill: schema-markup-generator.py
Objetivo: Analizar el contenido de la página y generar automáticamente los datos estructurados en formato JSON-LD adecuados.
Soporte: WebPage, Article, LocalBusiness o Product.
"""

import json
import re
import sys

def detect_schema_type(text: str) -> str:
    """
    Detecta de forma heurística el tipo de esquema más apropiado para el texto.
    """
    text_lower = text.lower()
    
    # Heurística para Product
    if any(k in text_lower for k in ["precio", "comprar", "envío", "garantía", "producto", "stock", "usd", "€"]):
        return "Product"
    
    # Heurística para LocalBusiness
    if any(k in text_lower for k in ["dirección", "teléfono", "ubicación", "nuestro local", "sucursal", "horario"]):
        return "LocalBusiness"
        
    # Heurística para Article
    if any(k in text_lower for k in ["autor", "publicado", "fecha", "artículo", "blog", "noticia"]):
        return "Article"
        
    # Por defecto
    return "WebPage"

def generate_json_ld(text: str, schema_type: str = None, url: str = "https://example.com/pagina-optimizada") -> str:
    """
    Genera el bloque script JSON-LD adecuado según el tipo detectado o especificado.
    """
    if not schema_type:
        schema_type = detect_schema_type(text)
        
    # Extraemos un título y una descripción básica del texto
    title_match = re.search(r'^(?:#+|\*\*|🔥)\s*(.+)$', text, re.MULTILINE)
    title = title_match.group(1).strip() if title_match else "Página Optimizada con Antigravity"
    
    # Limpiamos markdown para la descripción
    clean_text = re.sub(r'[#\*_`👉📖🏆⚡🔥\-]', '', text).strip()
    description = (clean_text[:150] + "...") if len(clean_text) > 150 else clean_text
    
    schema = {
        "@context": "https://schema.org",
        "@type": schema_type,
        "name": title,
        "description": description,
        "url": url
    }
    
    if schema_type == "Product":
        schema.update({
            "offers": {
                "@type": "Offer",
                "priceCurrency": "USD",
                "price": "99.99",
                "availability": "https://schema.org/InStock"
            }
        })
    elif schema_type == "LocalBusiness":
        schema.update({
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Dirección demo 123",
                "addressLocality": "Ciudad",
                "addressCountry": "ES"
            },
            "telephone": "+34900000000"
        })
    elif schema_type == "Article":
        schema.update({
            "headline": title[:110],
            "author": {
                "@type": "Person",
                "name": "Experto Antigravity"
            },
            "publisher": {
                "@type": "Organization",
                "name": "Antigravity AI"
            }
        })
        
    json_str = json.dumps(schema, indent=2, ensure_ascii=False)
    
    markup = (
        f"<!-- Schema Markup Automático -->\n"
        f"<script type=\"application/ld+json\">\n"
        f"{json_str}\n"
        f"</script>"
    )
    return markup

if __name__ == "__main__":
    if len(sys.argv) > 1:
        with open(sys.argv[1], "r", encoding="utf-8") as f:
            content = f.read()
        print(generate_json_ld(content))
    else:
        sample = "# Producto Revolucionario\nComprar el mejor software del mercado. El precio es excelente y tiene garantía de 2 años."
        print(generate_json_ld(sample))
