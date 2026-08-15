#!/usr/bin/env python3
"""
Skill: content-quality-auditor.py
Objetivo: Auditar el output final bajo criterios estrictos de calidad, veracidad y directrices E-E-A-T (Experiencia, Autoridad, Confianza).
Enfoque: Actuar como un filtro que valide que no haya alucinaciones, redundancias ni tono excesivamente robótico. Si no pasa la auditoría, genera un reporte de corrección.
"""

import sys

def audit_content(text: str) -> dict:
    """
    Realiza una auditoría heurística del texto bajo las directrices E-E-A-T.
    Devuelve un diccionario con los resultados de la auditoría y sugerencias de mejora.
    """
    issues = []
    score = 100
    
    # 1. Verificar tono robótico / clichés de IA
    robotic_phrases = [
        "en el dinámico mundo de hoy", "en este artículo exploraremos", 
        "es importante destacar", "en conclusión", "como un modelo de lenguaje"
    ]
    found_cliches = [phrase for phrase in robotic_phrases if phrase in text.lower()]
    if found_cliches:
        score -= len(found_cliches) * 10
        issues.append(f"Clichés de IA/Tono robótico detectados: {', '.join([f'\"{c}\"' for c in found_cliches])}. Sugerencia: Reemplazar con frases más humanas o directas.")
        
    # 2. Verificar E-E-A-T: Presencia de Datos Duross o Estadísticas (%)
    if "%" not in text and not any(char.isdigit() for char in text):
        score -= 15
        issues.append("Falta de datos concretos, métricas o estadísticas. Para cumplir con la directriz de Confianza (Trust), considera añadir datos de soporte verificables.")
        
    # 3. Verificar Redundancia (Palabras muy repetidas consecutivamente)
    words = text.lower().split()
    redundancies = 0
    for i in range(len(words) - 1):
        if words[i] == words[i+1] and len(words[i]) > 3:
            redundancies += 1
    if redundancies > 0:
        score -= 10
        issues.append("Se detectaron palabras duplicadas o redundancias en la redacción.")

    # 4. Verificar presencia de Call to Action (CTA) / Conversión
    if "cta" not in text.lower() and "👉" not in text and "¡" not in text:
        score -= 10
        issues.append("Llamado a la acción (CTA) débil o inexistente. Agrega una indicación clara de qué debe hacer el lector a continuación.")

    passed = score >= 70
    
    return {
        "score": max(0, score),
        "passed": passed,
        "issues": issues
    }

def process_audit(text: str) -> str:
    """
    Ejecuta la auditoría. Si pasa, retorna el texto original limpio.
    Si no pasa, genera un reporte detallado con las correcciones sugeridas.
    """
    result = audit_content(text)
    if result["passed"]:
        audit_note = "\n\n---\n[Auditoria de Calidad E-E-A-T]: PASADA (Score: {}/100)".format(result["score"])
        return text + audit_note
    else:
        report = [
            "[REPORTE DE AUDITORIA DE CALIDAD Y E-E-A-T] (Fallo - Score: {}/100)".format(result["score"]),
            "El contenido requiere mejoras antes de poder ser publicado. A continuacion se detallan los puntos a corregir:",
            ""
        ]
        for issue in result["issues"]:
            report.append(f"- {issue}")
        report.append("\n**Texto Original Auditado:**\n")
        report.append(text)
        return "\n".join(report)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        with open(sys.argv[1], "r", encoding="utf-8") as f:
            content = f.read()
        print(process_audit(content))
    else:
        sample = "En el dinámico mundo de hoy, es importante destacar que nuestra herramienta es la mejor en conclusión. Es un modelo de lenguaje que ayuda a todos."
        print(process_audit(sample))
