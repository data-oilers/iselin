#!/usr/bin/env python3
"""
md2pdf.py - Convierte Markdown a PDF con formato profesional DATAOILERS.

Uso:
    python3 md2pdf.py archivo.md
    python3 md2pdf.py archivo.md -o salida.pdf
    python3 md2pdf.py archivo.md --titulo "Título custom" --subtitulo "Subtítulo custom"

Requisitos: pip install markdown weasyprint pygments
"""

import argparse
import re
import sys
from datetime import datetime
from pathlib import Path

import markdown
from weasyprint import HTML

MESES_ES = {
    1: "Enero", 2: "Febrero", 3: "Marzo", 4: "Abril",
    5: "Mayo", 6: "Junio", 7: "Julio", 8: "Agosto",
    9: "Septiembre", 10: "Octubre", 11: "Noviembre", 12: "Diciembre",
}


# ─────────────────────────────────────────────
# Extracción de títulos desde el markdown
# ─────────────────────────────────────────────

def extract_titles(md_text: str) -> tuple:
    """Extrae el título (primer H1) y subtítulo (primer H2) del markdown."""
    title = ""
    subtitle = ""

    h1 = re.search(r"^#\s+(.+)$", md_text, re.MULTILINE)
    if h1:
        title = h1.group(1).strip()

    h2 = re.search(r"^##\s+(.+)$", md_text, re.MULTILINE)
    if h2:
        subtitle = h2.group(1).strip()

    return title, subtitle


def strip_cover_headings(md_text: str) -> str:
    """Elimina el primer H1 y el primer H2 del markdown (ya están en la portada)."""
    # Eliminar primer H1
    md_text = re.sub(r"^#\s+.+$", "", md_text, count=1, flags=re.MULTILINE)
    # Eliminar primer H2
    md_text = re.sub(r"^##\s+.+$", "", md_text, count=1, flags=re.MULTILINE)
    # Limpiar líneas vacías consecutivas al inicio
    md_text = md_text.lstrip("\n")
    return md_text


# ─────────────────────────────────────────────
# Portada
# ─────────────────────────────────────────────

def build_cover(title: str, subtitle: str, date_str: str) -> str:
    return f"""
    <div class="cover">
        <div class="cover-sidebar"></div>
        <div class="cover-main">
            <div class="cover-top">
                <div class="cover-logo">
                    <div class="logo-bracket-left"></div>
                    <span class="logo-data">data</span>&nbsp;<span class="logo-oilers">oilers</span>
                    <div class="logo-bracket-right"></div>
                </div>
            </div>
            <div class="cover-center">
                <div class="cover-accent"></div>
                <h1 class="cover-title">{title}</h1>
                <p class="cover-subtitle">{subtitle}</p>
            </div>
            <div class="cover-bottom">
                <p class="cover-date">{date_str}</p>
            </div>
        </div>
    </div>
    """


# ─────────────────────────────────────────────
# Post-procesamiento del HTML
# ─────────────────────────────────────────────

def postprocess_html(html: str) -> str:
    """Mejora el HTML generado por markdown."""
    # Agregar page-break antes de cada ENCUENTRO (h3 que empieza con "ENCUENTRO")
    html = re.sub(
        r'<h3>(ENCUENTRO\s)',
        r'<h3 class="encuentro">\1',
        html,
    )

    # Eliminar <hr> redundantes (los --- del markdown generan ruido visual)
    html = re.sub(r"<hr\s*/?>", "", html)

    return html


# ─────────────────────────────────────────────
# CSS completo
# ─────────────────────────────────────────────

CSS = """
/* ── Fuentes ── */
@import url('https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=Fira+Code:wght@400;500&display=swap');

/* ── Página ── */
@page {
    size: A4;
    margin: 2cm 2cm 2.5cm 2cm;

    @bottom-left {
        content: "DATAOILERS";
        font-family: Barlow, sans-serif;
        font-size: 7.5pt;
        font-weight: 600;
        color: #b0b0b0;
        letter-spacing: 0.15em;
    }

    @bottom-right {
        content: counter(page) " / " counter(pages);
        font-family: Barlow, sans-serif;
        font-size: 7.5pt;
        color: #b0b0b0;
    }

    @top-right {
        content: "";
        border-bottom: 0.5pt solid #e0e0e0;
    }
}

/* Sin header/footer en la portada */
@page :first {
    margin: 0;
    @bottom-left  { content: none; }
    @bottom-right { content: none; }
    @top-right    { content: none; }
}

/* ══════════════════════════════════════════════
   PORTADA
   ══════════════════════════════════════════════ */

.cover {
    width: 210mm;
    height: 297mm;
    display: flex;
    flex-direction: row;
    background: #0f1b2d;
    color: white;
    page-break-after: always;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    overflow: hidden;
}

.cover-sidebar {
    width: 8mm;
    min-height: 100%;
    background: linear-gradient(180deg, #3498db 0%, #2980b9 50%, #1a5276 100%);
    flex-shrink: 0;
}

.cover-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0;
}

.cover-top {
    padding: 55px 55px 0 50px;
}

.cover-logo {
    display: inline-block;
    position: relative;
    padding: 5px 8px 5px 10px;
    font-family: Barlow, sans-serif;
    font-weight: 800;
    font-size: 24pt;
    letter-spacing: 0.01em;
    line-height: 1;
    opacity: 0.7;
}

.logo-bracket-left {
    position: absolute;
    left: 0;
    bottom: -1px;
    width: 13px;
    height: 26px;
    border-left: 5px solid #4aada4;
    border-bottom: 5px solid #4aada4;
}

.logo-bracket-right {
    position: absolute;
    right: 0;
    top: -1px;
    width: 13px;
    height: 26px;
    border-right: 5px solid #8494a7;
    border-top: 5px solid #8494a7;
}

.logo-data {
    color: #8494a7;
}

.logo-oilers {
    color: #4aada4;
}

.cover-center {
    padding: 0 55px 0 50px;
}

.cover-accent {
    width: 60px;
    height: 4px;
    background: #3498db;
    margin-bottom: 28px;
    border-radius: 2px;
}

.cover-title {
    font-family: Barlow, sans-serif;
    font-weight: 700;
    font-size: 30pt;
    line-height: 1.15;
    color: #ffffff;
    margin: 0 0 22px 0;
    padding: 0;
    border: none;
}

.cover-subtitle {
    font-family: Barlow, sans-serif;
    font-weight: 300;
    font-size: 13pt;
    line-height: 1.5;
    color: #8fa8bf;
    margin: 0;
}

.cover-bottom {
    padding: 0 55px 50px 50px;
}

.cover-date {
    font-family: Barlow, sans-serif;
    font-weight: 400;
    font-size: 10pt;
    color: #5a7a94;
    margin: 0;
}

/* ══════════════════════════════════════════════
   CONTENIDO GENERAL
   ══════════════════════════════════════════════ */

body {
    font-family: Barlow, sans-serif;
    font-size: 10pt;
    line-height: 1.65;
    padding: 0;
    margin: 0;
    color: #2d3436;
}

.content {
    padding: 0;
}

/* ── Títulos ── */
h2, h3.encuentro {
    position: relative;
    padding-left: 14px;
}

/* Barra azul en títulos principales (h2) y encuentros */
h2::before, h3.encuentro::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 1.3em;
    background: #3498db;
}

h3.encuentro::before {
    background: #2980b9;
}

h1 {
    font-size: 1.9em;
    font-weight: 700;
    color: #0f1b2d;
    border: none;
    border-bottom: 2px solid #eee;
    padding: 0 0 0.5rem 0;
    margin: 2rem 0 1rem 0;
}

h2 {
    font-size: 1.5em;
    font-weight: 700;
    color: #1a2a3a;
    border: none;
    margin: 2.5rem 0 1rem 0;
}

h3 {
    font-size: 1.25em;
    font-weight: 600;
    color: #2c3e50;
    margin: 1.8rem 0 0.8rem 0;
}

h4 {
    font-size: 1.05em;
    font-weight: 600;
    color: #34495e;
    margin: 1.2rem 0 0.5rem 0;
}

/* Cada ENCUENTRO arranca en página nueva */
h3.encuentro {
    page-break-before: always;
    break-before: page;
    padding-top: 0;
    padding-left: 12px;
    font-size: 1.35em;
    color: #0f1b2d;
}

/* ── Párrafos ── */
p {
    margin: 0.5em 0;
}

/* ── Listas ── */
ul, ol {
    padding-left: 1.5em;
}

li {
    margin-bottom: 0.4em;
}

/* ── Código ── */
pre {
    background: #1e272e;
    border-radius: 6px;
    margin: 0.8em 0;
    padding: 14px 16px;
    color: #dcdde1;
    font-size: 0.88em;
    border-left: 3px solid #3498db;
}

code {
    font-family: 'Fira Code', Consolas, Monaco, monospace;
    font-size: 0.88em;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-wrap: anywhere;
}

:not(pre) > code {
    background: #eef2f7;
    padding: 1px 5px;
    border-radius: 3px;
    color: #2980b9;
    font-size: 0.85em;
}

/* ── Imágenes ── */
img {
    max-width: 100%;
}

/* ── Tablas ── */
table {
    border-collapse: collapse;
    width: 100%;
    margin: 0.8em 0 1.2em 0;
    font-size: 0.88em;
    line-height: 1.45;
    page-break-inside: auto;
    break-inside: auto;
}

thead {
    display: table-header-group;
}

th {
    background: #1a2a3a;
    color: #ffffff;
    font-weight: 600;
    padding: 9px 10px;
    border: 1px solid #1a2a3a;
    text-align: left;
    font-size: 0.92em;
    letter-spacing: 0.01em;
}

td {
    padding: 8px 10px;
    border: 1px solid #e0e4e8;
    vertical-align: top;
    color: #2d3436;
}

/* Filas alternadas */
tbody tr:nth-child(even) {
    background: #f7f9fb;
}

tbody tr:nth-child(odd) {
    background: #ffffff;
}

/* Hover-like subtle emphasis para la primera columna */
td:first-child {
    font-weight: 500;
    color: #1a2a3a;
}

tr {
    page-break-inside: avoid;
    break-inside: avoid;
}

/* ── Citas ── */
blockquote {
    border-left: 4px solid #3498db;
    padding: 0.5em 0 0.5em 1em;
    margin: 1em 0;
    color: #555;
    background: #f7f9fb;
    border-radius: 0 6px 6px 0;
}

/* ── Separadores (desactivados, los quitamos en post-proceso) ── */
hr {
    display: none;
}

/* ── Negrita dentro de tablas ── */
td strong {
    color: #1a2a3a;
    font-weight: 600;
}

/* ── Control de saltos de página ── */
h1, h2, h3, h4 {
    page-break-after: avoid;
    break-after: avoid;
    break-inside: avoid;
}

/*
 * Truco para WeasyPrint: un bloque invisible después de cada título
 * garantiza que haya al menos ~5em de contenido debajo.
 * Si no entra en la página, el título salta a la siguiente.
 */
h1::after, h2::after, h3::after, h4::after {
    content: "";
    display: block;
    height: 5em;
    margin-bottom: -5em;
}

h1 + *, h2 + *, h3 + *, h4 + * {
    page-break-before: avoid;
    break-before: avoid;
}

pre, blockquote, figure {
    page-break-inside: avoid;
    break-inside: avoid;
}
"""


# ─────────────────────────────────────────────
# Conversión MD → HTML → PDF
# ─────────────────────────────────────────────

def md_to_html(md_text: str) -> str:
    """Convierte markdown a HTML con extensiones útiles."""
    extensions = [
        "tables",
        "fenced_code",
        "codehilite",
        "toc",
        "sane_lists",
        "smarty",
    ]
    extension_configs = {
        "codehilite": {
            "css_class": "highlight",
            "guess_lang": True,
        },
    }
    return markdown.markdown(
        md_text,
        extensions=extensions,
        extension_configs=extension_configs,
    )


def build_full_html(body_html: str, cover_html: str) -> str:
    """Arma el documento HTML completo."""
    return f"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <style>{CSS}</style>
</head>
<body>
    {cover_html}
    <div class="content">
        {body_html}
    </div>
</body>
</html>"""


def convert(input_path: str, output_path: str, title: str = "", subtitle: str = ""):
    """Pipeline completo: lee MD, genera HTML con portada, exporta PDF."""
    md_text = Path(input_path).read_text(encoding="utf-8")

    # Títulos: usar los argumentos si se pasaron, si no extraer del markdown
    auto_title, auto_subtitle = extract_titles(md_text)
    title = title or auto_title or Path(input_path).stem.replace("_", " ").title()
    subtitle = subtitle or auto_subtitle or ""

    # Eliminar H1 y primer H2 del cuerpo (ya están en la portada)
    md_body = strip_cover_headings(md_text)

    # Fecha en español
    now = datetime.now()
    date_str = f"{MESES_ES[now.month]} {now.year}"

    # Construir
    cover_html = build_cover(title, subtitle, date_str)
    body_html = md_to_html(md_body)
    body_html = postprocess_html(body_html)
    full_html = build_full_html(body_html, cover_html)

    # Generar PDF
    HTML(string=full_html).write_pdf(output_path)

    return output_path


# ─────────────────────────────────────────────
# CLI
# ─────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Convierte Markdown a PDF con formato DATAOILERS."
    )
    parser.add_argument("input", help="Archivo Markdown de entrada (.md)")
    parser.add_argument(
        "-o", "--output",
        help="Archivo PDF de salida (por defecto: mismo nombre con .pdf)",
    )
    parser.add_argument(
        "--titulo",
        default="",
        help="Título para la portada (por defecto: se extrae del H1 del markdown)",
    )
    parser.add_argument(
        "--subtitulo",
        default="",
        help="Subtítulo para la portada (por defecto: se extrae del primer H2)",
    )

    args = parser.parse_args()

    input_path = Path(args.input)
    if not input_path.exists():
        print(f"Error: no se encontró el archivo '{input_path}'", file=sys.stderr)
        sys.exit(1)

    output_path = args.output or str(input_path.with_suffix(".pdf"))

    print(f"Convirtiendo: {input_path}")
    result = convert(str(input_path), output_path, args.titulo, args.subtitulo)
    print(f"PDF generado: {result}")


if __name__ == "__main__":
    main()
