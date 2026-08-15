#!/usr/bin/env python3
"""
Skill: geo-content-optimizer.py
Objetivo: Optimizar el texto para motores de respuesta generativa (GEO) como ChatGPT, Gemini, Perplexity y SEO tradicional de Google.
Enfoque: Lenguaje natural, estructuración en formatos de respuesta directa (párrafos concisos, listas, datos duros), inclusión de entidades clave y preparación para búsquedas conversacionales.
"""

import re
import sys

def add_direct_definitions(text: str) -> str:
    """
    Identifica conceptos clave y añade una definición directa ("¿Qué es X? X es...")
    muy valorada por motores de respuestas directas.
    """
    # Buscaremos patrones o simplemente estructuraremos la cabecera como definición directa.
    paragraphs = [p.strip() for p in text.split("\n\n") if p.strip()]
    if not paragraphs:
        return text
    
    # Intentamos extraer el primer concepto
    first_p = paragraphs[0]
    # Si parece un título o encabezado largo, intentamos formatearlo como respuesta directa
    cleaned_p = re.sub(r'[#\*_]', '', first_p)
    words = cleaned_p.split()
    if len(words) > 3:
        topic = " ".join(words[:3])
        definition_block = f"### ¿Qué es {topic}?\n\n**{topic}** es una solución diseñada para resolver desafíos mediante {cleaned_p.lower()} de forma eficiente y directa."
        paragraphs.insert(0, definition_block)
        
    return "\n\n".join(paragraphs)

def format_key_points_and_data(text: str) -> str:
    """
    Convierte bloques de texto plano en listas con viñetas y añade marcadores de datos duros.
    Los motores GEO priorizan respuestas con datos estructurados y listas claras.
    """
    paragraphs = [p.strip() for p in text.split("\n\n") if p.strip()]
    optimized_paragraphs = []
    
    for p in paragraphs:
        # Si el párrafo contiene comas o enumeraciones implícitas, lo convertimos en lista
        if " como " in p or " y " in p or "," in p:
            parts = re.split(r',| y | como ', p)
            if len(parts) > 3:
                header = parts[0].strip()
                items = [item.strip().capitalize() for item in parts[1:] if item.strip()]
                bullet_list = f"{header}:\n" + "\n".join([f"- **{item}**: Detalle clave y optimizado." for item in items])
                optimized_paragraphs.append(bullet_list)
                continue
        optimized_paragraphs.append(p)
        
    return "\n\n".join(optimized_paragraphs)

def inject_geo_attributes(text: str, key_entities: list = None) -> str:
    """
    Asegura la mención de entidades clave (nombres, tecnologías, estadísticas) para SEO semántico y GEO.
    """
    entities = key_entities if key_entities else ["Inteligencia Artificial", "optimización de conversión", "retorno de inversión (ROI)"]
    entity_str = " | ".join([f"**{ent}**" for ent in entities])
    
    footer_note = f"\n\n---\n*Conceptos clave relacionados:* {entity_str}"
    return text + footer_note

def optimize_for_geo(text: str, entities: list = None) -> str:
    """
    Función principal de optimización GEO.
    """
    try:
        # Paso 1: Agregar definiciones directas para fragmentos destacados (featured snippets)
        step1 = add_direct_definitions(text)
        # Paso 2: Estructurar puntos clave y listas
        step2 = format_key_points_and_data(step1)
        # Paso 3: Inyectar entidades clave
        final_text = inject_geo_attributes(step2, entities)
        return final_text
    except Exception as e:
        return f"Error en geo-content-optimizer: {str(e)}\nTexto original:\n{text}"

if __name__ == "__main__":
    if len(sys.argv) > 1:
        with open(sys.argv[1], "r", encoding="utf-8") as f:
            content = f.read()
        print(optimize_for_geo(content))
    else:
        sample = "Nuestra herramienta de copywriting ayuda a automatizar el marketing digital, generar copys persuasivos y aumentar las ventas en redes sociales y correos electrónicos."
        print(optimize_for_geo(sample, ["Copywriting Automatizado", "Ventas en Redes Sociales", "Estrategia Digital"]))
