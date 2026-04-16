# Guia de Diseno de Dashboards

## Principios de Storytelling con Datos | ISELIN

---

## 1. PRINCIPIOS FUNDAMENTALES

### El dashboard no es decoracion, es comunicacion

Un buen dashboard responde preguntas de negocio de forma inmediata. Si el usuario necesita mas de 5 segundos para entender que esta mirando, el diseno necesita mejoras.

### Regla de oro: Una pagina = Una pregunta

| Pagina | Pregunta que responde |
|---|---|
| Resumen Ejecutivo | Como estamos en general este periodo? |
| Operaciones | Cuantos viajes hicimos y con que eficiencia? |
| Calidad | Estamos cumpliendo los objetivos? |
| Detalle (drillthrough) | Que paso especificamente con [este elemento]? |

---

## 2. LAYOUT Y JERARQUIA VISUAL

### Patron de lectura

Las personas leen un dashboard siguiendo un patron en **Z** o en **F**:

```
Patron Z:                           Patron F:
+---->-------->--+                  +---->-------->--+
|                |                  |                |
|                v                  +---->-----+    |
|                |                  |           |    |
v                |                  +---->--+   |    |
|                |                  |       |   |    |
+---->-------->--+                  |       |   |    |
                                   +-------+---+----+
```

**Consecuencia practica:** lo mas importante va arriba a la izquierda.

### Estructura recomendada

```
+------------------------------------------------------------------+
| ENCABEZADO: Titulo del reporte + Fecha de actualizacion          |
+------------------------------------------------------------------+
| [KPI 1]     [KPI 2]     [KPI 3]     [KPI 4]                     |
|  Tarjetas con los indicadores mas importantes                    |
+------------------------------------------------------------------+
|                              |                                    |
|  VISUAL PRINCIPAL            |  VISUAL SECUNDARIO                |
|  (tendencia en el tiempo     |  (comparacion entre categorias   |
|   o el grafico mas           |   o ranking)                     |
|   relevante)                 |                                   |
|                              |                                   |
+------------------------------+------------------------------------+
|                                                                    |
|  DETALLE (tabla, matriz o grafico complementario)                 |
|                                                                    |
+------------------------------------------------------------------+
| [Slicer 1]  [Slicer 2]  [Slicer 3]        [Logo] [Navegacion]   |
+------------------------------------------------------------------+
```

### Proporciones sugeridas

| Zona | Porcentaje de la pagina | Contenido |
|---|---|---|
| Encabezado | 5-8% | Titulo, fecha, logo |
| KPIs (tarjetas) | 10-15% | 3-5 metricas clave |
| Visuales principales | 50-60% | 2-3 graficos |
| Detalle/tabla | 15-20% | Tabla o matriz |
| Filtros/navegacion | 5-10% | Slicers, botones |

---

## 3. COLOR

### Reglas de color

1. **Maximo 3-4 colores** en todo el reporte (mas gris como neutro).
2. **Significado consistente**: si rojo = alerta en una pagina, rojo = alerta en todas.
3. **Paleta corporativa** de ISELIN como base.
4. **Accesibilidad**: no depender solo del color. Usar iconos o texto ademas del color.

### Paleta sugerida

```
Color principal:     [COMPLETAR con color corporativo ISELIN]
Color secundario:    [COMPLETAR]
Color de acento:     [COMPLETAR]
Gris neutro:         #E0E0E0 (fondos, lineas)
Verde positivo:      #2E7D32 (cumple, bueno)
Amarillo precaucion: #F9A825 (cerca del limite)
Rojo alerta:         #C62828 (no cumple, critico)
Fondo:               #FFFFFF (blanco) o #F5F5F5 (gris claro)
```

### Que evitar

- Colores neon o muy saturados.
- Mas de 6 colores en un grafico (si tiene mas categorias, agrupar las menores como "Otros").
- Rojo y verde como unica diferenciacion (daltonismo afecta al 8% de los hombres).
- Fondos oscuros (dificultan la lectura en proyecciones y pantallas con brillo bajo).

---

## 4. TIPOGRAFIA

| Elemento | Tamano sugerido | Peso |
|---|---|---|
| Titulo del reporte | 18-22 pt | Bold |
| Titulo de seccion/visual | 12-14 pt | Bold |
| Valor de tarjeta KPI | 24-32 pt | Bold |
| Etiqueta de tarjeta KPI | 10-12 pt | Regular |
| Datos en tablas | 9-11 pt | Regular |
| Etiquetas de ejes | 9-10 pt | Regular |
| Texto de tooltips | 10-12 pt | Regular |

**Fuente recomendada:** Segoe UI (fuente por defecto de PBI, consistente en todos los dispositivos) o la fuente corporativa de ISELIN si la tienen definida.

---

## 5. TIPOS DE GRAFICOS: CUANDO USAR CADA UNO

### Guia de seleccion rapida

| Quiero mostrar... | Grafico recomendado | Evitar |
|---|---|---|
| Un valor individual (KPI) | Tarjeta (Card) | Gauge si no hay meta clara |
| Tendencia en el tiempo | Lineas | Barras (ocupan mas espacio) |
| Comparacion entre categorias | Barras horizontales | Circular si hay mas de 5 categorias |
| Proporcion de un total | Circular/Donut (max 5 categorias) | Circular con muchas categorias |
| Relacion entre 2 variables | Dispersion (Scatter) | Lineas (implica orden temporal) |
| Ranking | Barras horizontales ordenadas | Tabla sin orden |
| Detalle con drill-down | Matriz | Tabla plana (no permite drill) |
| Cumplimiento vs. meta | KPI visual o Gauge | Barras (no muestra meta claramente) |
| Distribucion de datos | Histograma (columnas agrupadas) | Lineas (implica continuidad) |
| Datos geograficos | Mapa | Solo si aporta informacion util |

### Graficos a usar con cautela

| Grafico | Problema | Alternativa |
|---|---|---|
| Grafico circular con > 5 categorias | Ilegible, dificil comparar segmentos | Barras horizontales ordenadas |
| Grafico 3D | Distorsiona la percepcion de los valores | Version 2D del mismo grafico |
| Gauge multiple (muchos velocimetros) | Ocupa mucho espacio, poca informacion | Tabla con formato condicional |
| Grafico de area | Puede ocultar series detras de otras | Lineas (mas claras) |

---

## 6. INTERACTIVIDAD

### Filtros y Slicers

| Tipo | Cuando usarlo | Formato sugerido |
|---|---|---|
| Slicer de lista | Pocas opciones (< 10) | Lista con checkbox |
| Slicer dropdown | Muchas opciones (> 10) | Menu desplegable |
| Slicer de fecha | Filtrar por periodo | Rango de fechas o slider |
| Slicer de boton | Opciones mutuamente excluyentes | Botones horizontales |

### Buenas practicas de interactividad

- **Ubicar slicers en una posicion consistente** en todas las paginas (ej: siempre arriba o siempre a la izquierda).
- **Sincronizar slicers** entre paginas (un filtro de fecha aplica a todas las paginas).
- **Mostrar la seleccion activa** claramente (el usuario debe saber que filtro esta aplicado).
- **Incluir opcion "Todos"** en cada slicer.
- **Fecha de ultima actualizacion** visible en alguna parte del reporte.

---

## 7. CHECKLIST DE DISENO

Usar esta lista antes de publicar un dashboard:

### Contenido
- [ ] Cada pagina tiene un titulo descriptivo.
- [ ] Cada pagina responde a una pregunta de negocio clara.
- [ ] Las metricas principales estan visibles sin necesidad de hacer scroll.
- [ ] Se muestra la fecha de ultima actualizacion de los datos.
- [ ] Las medidas tienen nombres descriptivos que el usuario final entiende.

### Visual
- [ ] Maximo 6-8 visualizaciones por pagina.
- [ ] Hay espacio en blanco entre los graficos (no estan pegados).
- [ ] Los colores tienen significado consistente en todo el reporte.
- [ ] Se usan maximo 3-4 colores (mas gris como neutro).
- [ ] Los titulos de los graficos son descriptivos.
- [ ] El tamano de fuente es legible (minimo 9pt).

### Interactividad
- [ ] Los slicers permiten filtrar por los campos mas relevantes.
- [ ] La navegacion entre paginas es intuitiva (botones o pestanas).
- [ ] El drillthrough funciona correctamente (y tiene boton de "Volver").
- [ ] Los tooltips agregan informacion util (no repiten lo que ya se ve).

### Accesibilidad
- [ ] El contraste entre texto y fondo es suficiente.
- [ ] No se depende solo del color para transmitir informacion.
- [ ] Los graficos tienen texto alternativo (alt-text) configurado.
- [ ] El reporte es funcional en una pantalla de 1366x768 (resolucion comun).

---

*Guia de diseno de dashboards - Capacitacion ISELIN en Analisis de Datos con Power BI*
*Abril 2026*
