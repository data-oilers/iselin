# ISELIN - Capacitación en Análisis de Datos con Power BI

## Cronograma, Roadmap y Guía de Aprendizaje

---

## 1. INFORMACIÓN GENERAL

| Campo | Detalle |
|---|---|
| **Empresa** | ISELIN (Transporte) |
| **Participantes** | ~25 personas  |
| **Nivel inicial** | Mixto (desde cero hasta perfiles técnicos avanzados) |
| **Modalidad** | Presencial (E1, E4) / Virtual (E2, E3) |
| **Duración por encuentro** | 2 horas |
| **Herramienta principal** | Power BI Desktop + Power BI Service |
| **Datos** | Archivos Excel reales de ISELIN |

### Calendario

| Encuentro | Fecha | Día | Modalidad | Título |
|---|---|---|---|---|
| E1 | 16/04/2026 | Jueves | Presencial | Fundamentos, Calidad y Primer Contacto con PBI |
| E2 | 21/04/2026 | Martes | Virtual | Modelo de Datos, Power Query y Primeras Visualizaciones |
| E3 | 23/04/2026 | Jueves | Virtual | Fórmulas DAX, Dashboards Avanzados y Storytelling con Datos |
| E4 | 30/04/2026 | Jueves | Presencial | Interpretación de Datos, Publicación y Actualización Automática |

---

## 2. OBJETIVO GENERAL

Que los participantes de ISELIN incorporen el uso de Power BI como herramienta cotidiana para transformar datos en información útil, facilitando la toma de decisiones basada en evidencia y fortaleciendo la cultura de mejora continua en todas las áreas de la empresa.

---

## 3. DETALLE POR ENCUENTRO

---

### ENCUENTRO 1: Fundamentos, Calidad y Primer Contacto con PBI

**Fecha:** Jueves 16/04/2026 | **Modalidad:** Presencial | **Duración:** 2 horas

#### Objetivo específico
Establecer el "para qué" del análisis de datos conectándolo con la cultura de calidad de ISELIN, introducir los conceptos fundamentales de Power BI y lograr la primera carga de datos real.

#### Agenda detallada

| Bloque | Duración | Tema | Detalle |
|---|---|---|---|
| 1 | 10 min | **Apertura y contexto** | Presentación del programa, objetivos de los 4 encuentros, qué van a lograr al final. Mostrar un dashboard terminado como "destino" para generar expectativa. |
| 2 | 25 min | **Análisis de datos y calidad: por qué importa** | Conectar análisis de datos con la cultura de calidad de ISELIN. Presentar el ciclo de mejora continua (Planificar-Hacer-Verificar-Actuar) y cómo PBI se inserta en la etapa de "Verificar". Mencionar que muchos análisis de calidad se pueden hacer directamente en PBI. |
| 3 | 25 min | **Conceptos fundamentales** | Definir con ejemplos simples y analogías de transporte: **Proceso de carga (ETL)**: sacar datos del Excel, limpiarlos y meterlos en PBI. **Tablas de datos principales** (registros de viajes, boletos, siniestros) vs. **Tablas de referencia** (choferes, rutas, colectivos, fechas). Cómo funciona PBI: cada fila es un dato individual, y cuando aplicamos un filtro, PBI recalcula todo automáticamente. **Estadísticas básicas**: promedio, mediana y dispersión. Qué nos dicen y por qué importan para los indicadores de ISELIN. |
| 4 | 35 min | **Power BI: conociendo la herramienta (demo en vivo)** | Recorrido por la interfaz de PBI Desktop: las 3 vistas (Informe, Datos, Modelo). Cinta de opciones, panel de campos, panel de visualizaciones, panel de filtros. **Práctica en vivo**: cargar el primer archivo Excel real de ISELIN. Mostrar la vista previa en Power Query. Ajustar tipos de datos. Cerrar y aplicar. Crear la primera visualización simple (gráfico de barras con un KPI real). |
| 5 | 15 min | **Cierre: mapa de ruta y tarea** | Resumen de lo visto, presentar el roadmap de los 4 encuentros. Tarea para E2: que cada referente de área abra PBI Desktop e intente cargar un Excel de su área. Preguntas. |
| -- | 10 min | **Tiempo extra** | Tiempo flexible para preguntas adicionales o dificultades técnicas. |

#### Conceptos clave del Encuentro 1

| Concepto | Definición simplificada | Analogía ISELIN |
|---|---|---|
| Proceso de carga (ETL) | Sacar datos, limpiarlos y meterlos en PBI | Sacar datos de Wara/Excel, limpiarlos, meterlos en PBI |
| Tabla de datos principales | Tabla con registros de eventos | Cada viaje realizado, cada boleto vendido, cada siniestro |
| Tabla de referencia | Tabla con datos descriptivos | Lista de choferes, rutas, colectivos, agencias |
| Filtros en PBI | Al filtrar, PBI recalcula todos los valores | Si filtro por "Ruta 5", solo veo indicadores de esa ruta |
| Estadísticas básicas | Promedio, mediana y dispersión | Km promedio por colectivo, tiempo mediano de demora, variabilidad del consumo de gasoil |
| Ciclo de mejora continua | Planificar-Hacer-Verificar-Actuar | PBI es la herramienta de "Verificar" dentro del ciclo de mejora |

#### Entregables del Encuentro 1

| # | Entregable | Formato | Descripción |
|---|---|---|---|
| 1.1 | Archivo PBI base | `.pbix` | Archivo con la primera tabla cargada desde Excel real de ISELIN, con una visualización básica. |
| 1.2 | Guía de conceptos fundamentales | PDF | Documento con todos los conceptos del encuentro: ETL, tablas principales y de referencia, filtros, estadísticas básicas y nociones de calidad y mejora continua. |
| 1.3 | Guía de instalación de PBI Desktop | PDF | Paso a paso de instalación y primer inicio para que puedan practicar por su cuenta. |

---

### ENCUENTRO 2: Modelo de Datos, Power Query y Primeras Visualizaciones

**Fecha:** Martes 21/04/2026 | **Modalidad:** Virtual | **Duración:** 2 horas

#### Objetivo específico
Conectar múltiples tablas entre sí, aprender a limpiar datos con Power Query y generar las primeras visualizaciones con fórmulas propias.

#### Agenda detallada

| Bloque | Duración | Tema | Detalle |
|---|---|---|---|
| 1 | 10 min | **Recap y resolución de dudas** | Revisar brevemente E1. Resolver dudas de la tarea (cargar un Excel propio). Mostrar errores comunes al cargar datos. |
| 2 | 25 min | **Power Query: limpieza de datos (demo en vivo)** | Concepto: Power Query es el "taller mecánico" donde se preparan los datos antes de usarlos. **Operaciones clave**: eliminar filas vacías, definir encabezados, cambiar tipos de datos, eliminar columnas innecesarias, reemplazar valores, dividir columnas, combinar columnas. **Cruzar tablas**: unir dos tablas por una columna en común (ej: tabla de viajes + tabla de choferes). **Apilar tablas**: juntar datos de varios meses o fuentes similares. Concepto de **pasos aplicados**: cada transformación queda grabada y es reproducible. |
| 3 | 25 min | **Conectar tablas entre sí** | Cargar 3-4 tablas Excel de ISELIN (ej: datos operativos, choferes, rutas, calendario). Crear relaciones en la vista de Modelo: las tablas se conectan por campos en común (ej: ID de chofer). **Estructura recomendada**: la tabla principal de datos al centro, las tablas de referencia alrededor. Buenas prácticas: nombrar tablas con claridad y evitar conexiones confusas. |
| 4 | 25 min | **Primeros cálculos con DAX** | Diferencia entre **cálculo automático** (arrastrar un campo y PBI lo resuelve solo) y **fórmula propia** (escribir una fórmula DAX). Fórmulas básicas: `SUM()`, `COUNT()`, `AVERAGE()`, `DISTINCTCOUNT()`, `MIN()`, `MAX()`. Introducción a `CALCULATE()`: la función más importante de DAX. Ejemplo práctico: calcular "Total de viajes del mes" y "Viajes promedio por chofer". Dónde se escriben las fórmulas: barra de fórmulas y tabla de medidas. |
| 5 | 25 min | **Primeras visualizaciones (demo en vivo)** | Tipos de gráficos y cuándo usar cada uno: **Tarjeta/Card**: KPI individual (total viajes, facturación mensual). **Gráfico de barras**: comparar categorías (viajes por ruta, defectos por tipo). **Gráfico de líneas**: tendencias en el tiempo (viajes mensuales). **Tabla/Matriz**: detalle con desglose por niveles. **Gráfico circular**: solo si hay pocas categorías (máximo 5-6). Agregar **segmentadores (slicers)** para filtrar por fecha, área, chofer. Formateo básico: títulos, colores corporativos de ISELIN, etiquetas de datos. |
| 6 | 10 min | **Cierre y tarea** | Resumen. Tarea para E3: cada referente intente agregar una medida y un gráfico nuevo al .pbix. |

#### Conceptos clave del Encuentro 2

| Concepto | Definición simplificada | Ejemplo práctico |
|---|---|---|
| Power Query | Herramienta para limpiar y preparar datos | Limpiar columnas vacías del Excel de choferes |
| Combinar tablas | Unir o apilar datos de distintas fuentes | Cruzar viajes con rutas por "ID_Ruta", o juntar datos de varios meses |
| Pasos aplicados | Historial grabado de cada cambio | Cada limpieza en Power Query queda registrada y se repite sola |
| Modelo de datos | Las tablas conectadas entre sí por campos en común | Viajes al centro, conectada con Choferes, Rutas y Fechas |
| Cálculo automático vs. fórmula | PBI calcula solo al arrastrar un campo, o escribimos nuestra propia fórmula | Arrastrar "Importe" (PBI suma solo) vs. escribir `Total Viajes = COUNT(Viajes[ID_Viaje])` |
| CALCULATE | Función DAX que permite filtrar dentro de una fórmula | `Viajes Ruta 5 = CALCULATE(COUNT(Viajes[ID]), Rutas[Nombre]="Ruta 5")` |
| Segmentador / Slicer | Filtro visual interactivo en el reporte | Dropdown para seleccionar mes o ruta |

#### Entregables del Encuentro 2

| # | Entregable | Formato | Descripción |
|---|---|---|---|
| 2.1 | Archivo PBI con tablas conectadas | `.pbix` | Archivo con 3-4 tablas relacionadas, fórmulas básicas creadas y primeras visualizaciones funcionales. |
| 2.2 | Guía de Power Query | PDF | Paso a paso de las operaciones de limpieza más comunes, con capturas de pantalla. |
| 2.3 | Guía de relaciones y modelo de datos | PDF | Explicación visual de cómo se conectan las tablas de ISELIN entre sí. |

---

### ENCUENTRO 3: Fórmulas DAX, Dashboards Avanzados y Storytelling con Datos

**Fecha:** Jueves 23/04/2026 | **Modalidad:** Virtual | **Duración:** 2 horas

#### Objetivo específico
Profundizar en fórmulas DAX para crear indicadores de negocio, construir un dashboard completo multipágina y aprender a contar una historia con los datos.

#### Agenda detallada

| Bloque | Duración | Tema | Detalle |
|---|---|---|---|
| 1 | 5 min | **Recap rápido** | Resumen del estado del .pbix. Resolver bloqueos críticos. |
| 2 | 30 min | **Fórmulas DAX más potentes (demo en vivo)** | **CALCULATE con múltiples filtros**: `CALCULATE(SUM(Ventas[Importe]), Fecha[Anio]=2026, Ruta[Zona]="Norte")`. **Variables en DAX** (VAR/RETURN): organizar fórmulas complejas de forma más clara. **Funciones para comparar períodos** (requiere tabla de calendario): `TOTALYTD()` (acumulado del año), `SAMEPERIODLASTYEAR()` (mismo período año anterior), `DATEADD()` (desplazar períodos). Mención de funciones avanzadas como `SUMX()` y `AVERAGEX()` para cálculos más complejos. **Ejemplo concreto**: variación porcentual de viajes mes actual vs. mes anterior. KPI de cumplimiento acumulado anual. |
| 3 | 10 min | **Tabla de calendario** | Por qué es necesaria una tabla de fechas dedicada. Crearla con DAX: `CALENDAR()` o `CALENDARAUTO()`. Marcar como tabla de fechas. Agregar columnas: Anio, Mes, NombreMes, Trimestre, Semana. |
| 4 | 30 min | **Visualizaciones avanzadas e interactividad** | **Formato condicional**: colorear celdas según reglas (rojo/amarillo/verde para KPIs). **Información emergente personalizada (tooltips)**: detalle que aparece al pasar el mouse sobre un dato. **Ir al detalle (drillthrough)**: click derecho para ver toda la información de un registro específico. **Vistas guardadas (bookmarks) y botones**: crear navegación entre páginas del reporte. **KPI visual**: indicador con meta, tendencia y estado. **Velocímetro (gauge)**: para mostrar progreso vs. objetivo. Aplicar estos conceptos al dashboard de ISELIN. |
| 5 | 25 min | **Storytelling con datos: diseñar para comunicar** | **Principios de diseño**: menos es más, jerarquía visual, flujo de lectura (Z o F). **Colores**: usar paleta corporativa de ISELIN, máximo 3-4 colores, significado consistente (verde=bueno, rojo=alerta). **Layout**: KPIs arriba (tarjetas), gráficos de tendencia al medio, detalle abajo. **Una página = una pregunta de negocio**: no saturar. **Accesibilidad**: contraste, tamaño de fuente, alt-text en visualizaciones. **Ejemplo**: construir una página de "Resumen Ejecutivo" para la dirección de ISELIN. |
| 6 | 15 min | **Construcción en vivo: dashboard multipágina** | Armar en vivo un reporte de 3 páginas: Página 1 - Resumen ejecutivo (KPIs, tendencias). Página 2 - Detalle operativo (drillthrough). Página 3 - Análisis de calidad (comparativos, indicadores). Agregar navegación con botones. |
| 7 | 5 min | **Cierre y preparación para E4** | Tarea: cada referente complete al menos 2 páginas de su dashboard de área. |

#### Conceptos clave del Encuentro 3

| Concepto | Definición simplificada | Ejemplo práctico |
|---|---|---|
| VAR / RETURN | Variables para organizar fórmulas DAX | `VAR Total = SUM(Viajes[Km])  RETURN Total / 1000` |
| TOTALYTD | Acumulado desde inicio del año | Viajes acumulados del año en curso |
| SAMEPERIODLASTYEAR | Comparar con el mismo período del año anterior | Viajes de marzo 2026 vs. marzo 2025 |
| Tabla de calendario | Tabla de fechas necesaria para comparaciones en el tiempo | Tabla con cada día del 2020 al 2027, con mes, trimestre, etc. |
| Formato condicional | Colores automáticos según reglas | Celda roja si cumplimiento < 80%, verde si >= 100% |
| Información emergente (tooltip) | Detalle que aparece al pasar el mouse | Pasar el mouse sobre una ruta y ver detalle de viajes y choferes |
| Ir al detalle (drillthrough) | Navegar al detalle haciendo click derecho | Click en "Ruta 5" y ver página con todo el detalle de esa ruta |
| Vistas guardadas (bookmarks) | Guardar una vista específica del reporte | Botón "Vista Mensual" vs. "Vista Anual" |
| Storytelling | Diseñar para comunicar, no para decorar | Dashboard ejecutivo que responde: cómo vamos este mes vs. el anterior |

#### Entregables del Encuentro 3

| # | Entregable | Formato | Descripción |
|---|---|---|---|
| 3.1 | Dashboard multipágina completo | `.pbix` | Reporte con 3+ páginas, fórmulas DAX, formato condicional, navegación e información emergente. |
| 3.2 | Guía de fórmulas DAX | PDF | Referencia rápida de funciones DAX usadas, con sintaxis y ejemplos aplicados a ISELIN. |
| 3.3 | Guía de diseño de dashboards | PDF | Principios de storytelling con datos, paleta de colores, layouts recomendados, checklist de diseño. |

---

### ENCUENTRO 4: Interpretación de Datos, Publicación y Actualización Automática

**Fecha:** Jueves 30/04/2026 | **Modalidad:** Presencial | **Duración:** 2 horas

#### Objetivo específico
Aprender a interpretar tendencias y proyecciones en los datos, publicar el dashboard en Power BI Service y configurar la actualización automática programada.

#### Agenda detallada

| Bloque | Duración | Tema | Detalle |
|---|---|---|---|
| 1 | 5 min | **Recap y estado de dashboards** | Revisión rápida del progreso. Mostrar 1-2 dashboards construidos por referentes como caso de éxito interno. |
| 2 | 15 min | **Números clave en PBI: repaso práctico** | Repasar rápidamente cómo PBI ya muestra números clave: promedios, medianas en tarjetas. Gráficos para ver cómo se reparten los datos (ej: km recorridos por chofer). Diagrama de caja (si aplica). Medidas rápidas de PBI. |
| 3 | 25 min | **Interpretar datos: tendencias, proyecciones y datos fuera de lo normal** | **Relación entre variables**: cuando dos variables se mueven juntas (ej: km y consumo de gasoil), pero eso no siempre significa que una cause la otra. **Líneas de tendencia en PBI**: cómo agregarlas a un gráfico y qué nos dicen. **Proyección automática de PBI**: cómo PBI proyecta valores futuros basándose en datos históricos, y cómo leer la "banda gris" (rango probable). **Datos fuera de lo normal**: cómo detectarlos visualmente (ejemplo: un día con cantidad anómala de siniestros) y qué hacer. **Ejemplo integrador**: gráfico de dispersión Km vs. Consumo de Gasoil con línea de tendencia. Interpretar: ¿hay relación? ¿es fuerte? ¿qué nos dice para tomar decisiones? |
| 4 | 25 min | **Publicación en Power BI Service (demo en vivo)** | Paso a paso de publicación desde PBI Desktop. Recorrido por PBI Service: **Workspaces**: qué son, cómo organizar por área. **Dashboards vs. Reportes** en el servicio (diferencia clave). **Compartir**: compartir con colegas, permisos de visualización vs. edición. **Aplicaciones**: empaquetar reportes para distribución masiva. **Alertas de datos**: configurar notificaciones cuando un KPI supere un umbral. |
| 5 | 20 min | **Actualización programada (Scheduled Refresh)** | **El problema**: los datos en Excel cambian, pero el dashboard muestra datos viejos. **La solución**: actualización programada. **Opción recomendada para ISELIN**: mover los archivos Excel a **OneDrive for Business o SharePoint** (ya incluido en la licencia). Esto permite refresh automático sin necesidad de gateway. **Demo**: subir un Excel a OneDrive, conectar PBI a esa ubicación, publicar, configurar refresh cada X horas. **Alternativa futura**: On-Premises Data Gateway para archivos que deban permanecer en red local. Explicar qué es, cuándo se necesita y cómo solicitarlo a IT. **Monitoreo**: cómo ver si el refresh falló y por qué (historial de actualizaciones en PBI Service). |
| 6 | 20 min | **Cierre: hoja de ruta post-capacitación y buenas prácticas** | **Orden básico de datos**: nomenclatura de archivos, versionado de .pbix, documentar fórmulas. **Roles post-capacitación**: sugerencia de estructura -> Referente de datos por área (mantiene el Excel limpio) + Analista PBI (construye/mantiene dashboards) + Consumidor (consulta dashboards). **Recursos para seguir aprendiendo**: Microsoft Learn (gratuito), comunidad de PBI, documentación DAX. Los dashboards también sirven como herramienta de mejora continua y evidencia para auditorías. **Feedback y preguntas finales**. |
| -- | 10 min | **Tiempo extra** | Tiempo para preguntas y cierre informal. |

#### Conceptos clave del Encuentro 4

| Concepto | Definición simplificada | Aplicación en ISELIN |
|---|---|---|
| Relación entre variables | Que dos variables se muevan juntas no significa que una cause la otra | Más km y más gasoil van juntos, pero más lluvia y más siniestros no significa que la lluvia los cause |
| Línea de tendencia | Línea que resume la relación entre dos variables en un gráfico | Línea de tendencia en gráfico de Km vs. Gasoil |
| Proyección automática | PBI proyecta valores futuros basándose en datos anteriores | PBI proyecta los viajes del próximo trimestre basándose en el histórico |
| Rango probable ("banda gris") | Rango donde probablemente caerá el valor real | "Los viajes del próximo mes estarán entre X e Y" |
| Dato atípico | Dato fuera de lo normal | Un día con 50 siniestros cuando el promedio es 3 |
| Workspace | Espacio de trabajo compartido en PBI Service | Workspace "Logística", workspace "Calidad" |
| Actualización programada | PBI actualiza los datos automáticamente según un horario | Actualización diaria a las 7am desde OneDrive |

#### Entregables del Encuentro 4

| # | Entregable | Formato | Descripción |
|---|---|---|---|
| 4.1 | Dashboard publicado en PBI Service | PBI Service | Reporte completo publicado y compartido en el workspace de ISELIN. |
| 4.2 | Guía de interpretación de datos en PBI | PDF | Conceptos de interpretación de datos aplicados, con ejemplos de cómo leer gráficos y tomar decisiones. |
| 4.3 | Guía de publicación y refresh | PDF | Paso a paso para publicar, compartir, configurar refresh programado y monitorear actualizaciones. |
| 4.4 | Documento de buenas prácticas y organización | PDF | Nomenclatura, versionado, roles sugeridos, checklist de mantenimiento de dashboards. |
| 4.5 | Hoja de ruta post-capacitación | PDF | Plan sugerido para los siguientes 30-60-90 días después de la capacitación. |

---

## 4. FUERA DE ALCANCE

Los siguientes temas no se abordan en esta capacitación ya que requieren un nivel técnico más avanzado o exceden el alcance de estos 4 encuentros. Se mencionan como referencia para futuras instancias de formación:

| Tema | Motivo |
|---|---|
| **Permisos por área (RLS - Row Level Security)** | Configurar que cada usuario vea solo los datos de su área requiere conocimientos de modelado avanzado y administración de PBI Service. |
| **On-Premises Data Gateway** | La instalación y configuración del gateway para conectar fuentes de datos locales requiere coordinación con el área de IT e infraestructura de red. |
| **Conexión a bases de datos (SQL Server, etc.)** | Conectar PBI directamente a bases de datos en vez de archivos Excel implica conocimientos de SQL y permisos de acceso a servidores. |
| **DAX avanzado (SWITCH, tablas virtuales, cálculo dinámico)** | Fórmulas complejas que requieren una base sólida de DAX intermedio y práctica sostenida. |
| **Dataflows y pipelines de datos** | Procesos de transformación de datos centralizados en la nube, orientados a equipos de datos con experiencia técnica. |
| **Integración con otras herramientas (Python, R, Azure)** | Ampliar PBI con scripts o servicios en la nube requiere conocimientos de programación y arquitectura de datos. |
| **Administración de capacidades y licenciamiento avanzado** | Gestión de licencias Premium/Fabric, capacidades dedicadas y gobierno a nivel organizacional. |
| **Modelado avanzado (muchos a muchos, tablas puente, grupos de cálculo)** | Patrones de modelado que resuelven casos complejos pero requieren dominio previo de relaciones y DAX. |

Estos temas podrán incorporarse en futuras capacitaciones una vez que los participantes tengan práctica con los contenidos de esta primera etapa.
