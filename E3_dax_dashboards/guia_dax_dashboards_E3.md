# ENCUENTRO 3 - Guia de DAX Intermedio, Dashboards y Storytelling

## Analisis de Datos con Power BI | ISELIN

### Fecha: 23 de abril de 2026 | Modalidad: Virtual | Duracion: 2 horas

---

## PARTE 1: DAX INTERMEDIO

### Repaso rapido: que sabemos hasta ahora

En el Encuentro 2 vimos las funciones basicas de DAX:
- `SUM()`, `COUNT()`, `AVERAGE()`, `DISTINCTCOUNT()`, `MIN()`, `MAX()`
- `CALCULATE()` para modificar el contexto de filtro

Ahora vamos a profundizar con patrones mas potentes.

---

### Variables en DAX: VAR / RETURN

Las variables permiten **descomponer una medida compleja en partes legibles** y ademas mejoran el rendimiento (el valor se calcula una sola vez).

**Sintaxis:**
```dax
Nombre_Medida = 
VAR NombreVariable1 = <expresion1>
VAR NombreVariable2 = <expresion2>
RETURN
    <expresion final que usa las variables>
```

**Ejemplo practico: Variacion porcentual de Km mes actual vs. mes anterior**

Sin variables (dificil de leer):
```dax
Variacion Km % = 
DIVIDE(
    SUM(Viajes[Km]) - CALCULATE(SUM(Viajes[Km]), DATEADD(Calendario[Fecha], -1, MONTH)),
    CALCULATE(SUM(Viajes[Km]), DATEADD(Calendario[Fecha], -1, MONTH))
)
```

Con variables (claro y mantenible):
```dax
Variacion Km % = 
VAR KmActual = SUM(Viajes[Km])
VAR KmAnterior = CALCULATE(SUM(Viajes[Km]), DATEADD(Calendario[Fecha], -1, MONTH))
RETURN
    DIVIDE(KmActual - KmAnterior, KmAnterior)
```

**Reglas de VAR/RETURN:**
- Se pueden declarar tantas variables como se necesiten.
- Las variables son de solo lectura (no cambian despues de definirse).
- RETURN es obligatorio: es donde se define el resultado final.
- Una variable puede referenciar otra variable declarada antes que ella.

---

### Funciones de inteligencia de tiempo (Time Intelligence)

**Requisito previo:** tener una **tabla de calendario** marcada como tabla de fechas. Si no la tienen, la creamos primero (ver seccion Tabla de Calendario mas abajo).

#### TOTALYTD - Acumulado del anio

Calcula el acumulado desde el 1 de enero hasta la fecha filtrada.

```dax
Km Acumulado Anio = TOTALYTD(SUM(Viajes[Km]), Calendario[Fecha])
```

```
Mes        Km Mes     Km Acumulado
Enero      10,000     10,000
Febrero    12,000     22,000
Marzo      11,500     33,500   <- suma de ene + feb + mar
```

#### SAMEPERIODLASTYEAR - Mismo periodo del anio anterior

Permite comparar el valor actual con el del anio pasado.

```dax
Km Anio Anterior = CALCULATE(SUM(Viajes[Km]), SAMEPERIODLASTYEAR(Calendario[Fecha]))
```

**Uso combinado con VAR para calcular variacion interanual:**
```dax
Variacion Interanual % = 
VAR KmActual = SUM(Viajes[Km])
VAR KmAnterior = CALCULATE(SUM(Viajes[Km]), SAMEPERIODLASTYEAR(Calendario[Fecha]))
RETURN
    DIVIDE(KmActual - KmAnterior, KmAnterior)
```

#### DATEADD - Desplazar periodos

Mueve el contexto de fecha una cantidad de periodos hacia atras o adelante.

```dax
// Km del mes anterior
Km Mes Anterior = CALCULATE(SUM(Viajes[Km]), DATEADD(Calendario[Fecha], -1, MONTH))

// Km de hace 3 meses
Km Hace 3 Meses = CALCULATE(SUM(Viajes[Km]), DATEADD(Calendario[Fecha], -3, MONTH))

// Km de la semana anterior
Km Semana Anterior = CALCULATE(SUM(Viajes[Km]), DATEADD(Calendario[Fecha], -7, DAY))
```

---

### Iteradores: SUMX, AVERAGEX, COUNTX

Los iteradores recorren una tabla **fila por fila**, calculan una expresion para cada fila, y luego agregan el resultado.

**Diferencia con SUM/AVERAGE:**

| Funcion | Que hace |
|---|---|
| `SUM(Tabla[Columna])` | Suma una columna existente |
| `SUMX(Tabla, Expresion)` | Recorre cada fila, calcula la expresion, suma los resultados |

**Ejemplo: calcular ingreso por viaje cuando no existe una columna de ingreso**

```dax
// No existe columna "Ingreso", pero tenemos Km y Tarifa por Km
Ingreso Total = SUMX(Viajes, Viajes[Km] * Viajes[Tarifa_Km])
```

Lo que hace internamente:
```
Fila 1: 342 * 1.5 = 513.0
Fila 2: 289 * 1.2 = 346.8
Fila 3: 310 * 1.5 = 465.0
Fila 4: 401 * 1.8 = 721.8
                     ------
SUMX resultado:      2,046.6
```

**Mas ejemplos:**
```dax
// Promedio de ingreso por viaje
Ingreso Promedio = AVERAGEX(Viajes, Viajes[Km] * Viajes[Tarifa_Km])

// Cantidad de viajes con demora mayor a 15 minutos
Viajes con Demora = COUNTX(FILTER(Viajes, Viajes[Demora_Min] > 15), Viajes[ID_Viaje])
```

---

### CALCULATE con multiples filtros

`CALCULATE` puede recibir varios filtros separados por coma. Todos los filtros se aplican simultaneamente (AND logico).

```dax
// Viajes de la zona Norte en el primer trimestre
Viajes Norte Q1 = CALCULATE(
    COUNT(Viajes[ID_Viaje]),
    Rutas[Zona] = "Norte",
    Calendario[Trimestre] = 1
)
```

**Combinar con funciones de agregacion:**
```dax
// Km promedio de choferes con mas de 2 anios de antigueedad
Km Prom Expertos = CALCULATE(
    AVERAGE(Viajes[Km]),
    Choferes[Antigueedad_Anios] > 2
)
```

---

### Tabla de Calendario

La tabla de calendario es una tabla de dimension que contiene **una fila por cada fecha** en un rango continuo. Es requisito para usar funciones de inteligencia de tiempo.

**Crear la tabla:**
```dax
Calendario = 
VAR FechaInicio = DATE(2020, 1, 1)
VAR FechaFin = DATE(2027, 12, 31)
RETURN
ADDCOLUMNS(
    CALENDAR(FechaInicio, FechaFin),
    "Anio", YEAR([Date]),
    "Mes", MONTH([Date]),
    "NombreMes", FORMAT([Date], "MMMM"),
    "MesCorto", FORMAT([Date], "MMM"),
    "Trimestre", "Q" & QUARTER([Date]),
    "DiaSemana", WEEKDAY([Date]),
    "NombreDia", FORMAT([Date], "DDDD"),
    "AnioMes", FORMAT([Date], "YYYY-MM")
)
```

**Marcar como tabla de fechas:**
1. Seleccionar la tabla Calendario en el panel de campos.
2. Click derecho > Marcar como tabla de fechas.
3. Seleccionar la columna [Date] como columna de fecha.

**Relacionar con la tabla de hechos:**
- Crear relacion: Calendario[Date] -> Viajes[Fecha] (1 a muchos).

---

## PARTE 2: VISUALIZACIONES AVANZADAS

### Formato condicional

Permite cambiar el color de fondo, fuente, iconos o barras de datos de una tabla/matriz segun reglas.

**Como:**
1. Seleccionar una tabla o matriz.
2. En el panel de formato > Valores especificos de celda > Formato condicional.
3. Elegir tipo: Escala de colores, Reglas o Valores de campo.

**Ejemplo: semaforo de cumplimiento**

| Regla | Color | Significado |
|---|---|---|
| Valor < 80% | Rojo | Alerta: debajo del objetivo |
| Valor >= 80% y < 100% | Amarillo | Precaucion: cerca pero no cumple |
| Valor >= 100% | Verde | Cumple o supera el objetivo |

### Tooltips personalizados

Un tooltip es la informacion que aparece al **pasar el mouse** sobre un elemento del grafico. Se puede crear una pagina completa como tooltip.

**Como:**
1. Crear una nueva pagina en el reporte.
2. Ir a Formato de pagina > Informacion de la pagina > Permitir uso como tooltip = SI.
3. Ajustar el tamano de pagina a "Tooltip" (preconfigurado).
4. Disenar el contenido (graficos pequenos, KPIs, texto).
5. En el visual principal, ir a Formato > Tooltip > Tipo = Pagina de informe > Seleccionar la pagina creada.

**Ejemplo ISELIN:** pasar el mouse sobre una ruta en un mapa o grafico de barras y ver: total de viajes, km promedio, demora promedio, choferes asignados.

### Drillthrough (navegacion al detalle)

Permite hacer click derecho en un valor y **navegar a una pagina de detalle** filtrada por ese valor.

**Como:**
1. Crear una pagina de detalle (ej: "Detalle Chofer").
2. En esa pagina, arrastrar el campo "Nombre_Chofer" al area de "Drillthrough" en el panel de filtros.
3. Disenar la pagina con el detalle del chofer (graficos, tablas, KPIs).
4. En cualquier otra pagina, click derecho en un nombre de chofer > Drillthrough > Detalle Chofer.

PBI agrega automaticamente un **boton de "Volver"** en la pagina de detalle.

### Bookmarks y botones de navegacion

Los bookmarks (marcadores) guardan un **estado especifico del reporte** (filtros, visibilidad de visuales, pagina actual). Los botones permiten navegar entre bookmarks.

**Caso de uso: crear un menu de navegacion**

```
+------------------------------------------------------------------+
|  [Resumen Ejecutivo]  [Operaciones]  [Calidad]  [RRHH]          |
+------------------------------------------------------------------+
|                                                                    |
|  Contenido de la pagina seleccionada                              |
|                                                                    |
+------------------------------------------------------------------+
```

**Como crear navegacion:**
1. Crear cada pagina del reporte.
2. En cada pagina, agregar botones (Insertar > Botones > En blanco).
3. En la propiedad "Accion" del boton, seleccionar Tipo = Navegacion de pagina, Destino = [pagina deseada].
4. Formatear los botones con texto y colores consistentes.

### Visual de KPI

El visual de KPI muestra un valor, una meta y una tendencia en un solo elemento.

**Campos necesarios:**
- **Indicador**: la medida actual (ej: Total Km del mes).
- **Objetivo de tendencia**: la meta (ej: Meta Km del mes).
- **Eje de tendencia**: la dimension temporal (ej: Fecha o Mes).

El visual muestra automaticamente si se esta por encima o por debajo de la meta y la tendencia historica.

### Gauge (Velocimetro)

Muestra un valor dentro de un rango con zonas de color.

**Campos:**
- **Valor**: la medida actual.
- **Valor minimo**: el limite inferior (puede ser 0).
- **Valor maximo**: el limite superior o meta.
- **Valor objetivo**: la meta (se muestra como una linea).

**Ejemplo ISELIN:** cumplimiento de objetivos de calidad. Meta = 100%, valor actual = 87%, mostrado en un velocimetro con zonas rojo/amarillo/verde.

---

## PARTE 3: STORYTELLING CON DATOS

### Principios de diseno de dashboards

#### 1. Menos es mas
- No saturar la pagina con graficos.
- Maximo 6-8 visualizaciones por pagina.
- Dejar espacio en blanco (white space) para que "respire".

#### 2. Jerarquia visual
- Lo mas importante va arriba a la izquierda (KPIs en tarjetas).
- Graficos de tendencia al centro.
- Detalle y tablas abajo.

```
+------------------------------------------------------------------+
|  [KPI 1]    [KPI 2]    [KPI 3]    [KPI 4]     <- TARJETAS      |
+------------------------------------------------------------------+
|                          |                                        |
|  GRAFICO DE TENDENCIA    |  GRAFICO DE COMPARACION               |
|  (lineas/barras)         |  (barras/columnas)                    |
|                          |                                        |
+--------------------------+----------------------------------------+
|                                                                    |
|  TABLA DE DETALLE / MATRIZ                                        |
|                                                                    |
+------------------------------------------------------------------+
|  [Slicer Fecha]  [Slicer Area]  [Slicer Ruta]  <- FILTROS       |
+------------------------------------------------------------------+
```

#### 3. Color con proposito
- Usar la **paleta corporativa de ISELIN** como base.
- Maximo **3-4 colores** en el reporte.
- Significado consistente: verde = positivo/cumple, rojo = negativo/no cumple, gris = neutro.
- No usar rojo y verde juntos sin otra diferenciacion (accesibilidad para daltonismo).
- Evitar colores saturados o neon.

#### 4. Una pagina = una pregunta de negocio
Cada pagina del reporte deberia responder a una pregunta concreta:

| Pagina | Pregunta que responde |
|---|---|
| Resumen Ejecutivo | Como estamos este mes en general? |
| Operaciones | Cuantos viajes hicimos y con que eficiencia? |
| Calidad | Estamos cumpliendo los objetivos de calidad? |
| Seguridad Vial | Como evoluciona la siniestralidad? |
| Capital Humano | Como esta el desempeno de los choferes? |

#### 5. Contexto siempre visible
- Incluir siempre el **periodo** que se esta mostrando (titulo o slicer de fecha).
- Mostrar la **fecha de ultima actualizacion** de los datos.
- Incluir **subtitulos** que expliquen las metricas si no son obvias.

#### 6. Accesibilidad
- Tamano de fuente minimo: 10pt para datos, 14pt para titulos.
- Contraste suficiente entre texto y fondo.
- No depender solo del color para transmitir informacion (usar iconos o texto tambien).
- Agregar texto alternativo (alt-text) a cada visual para lectores de pantalla.

---

### Ejemplo: Estructura del dashboard de ISELIN

**Pagina 1: Resumen Ejecutivo**
```
Titulo: "ISELIN - Panel de Control General"
Periodo: [Slicer de mes/anio]

[Total Viajes]  [Km Totales]  [Cumplimiento %]  [Siniestros]
     1,234         45,678         94.2%               3

[Tendencia de viajes - ultimos 12 meses]     [Pareto de demoras]
[Grafico de lineas con meta]                 [Barras + linea acumulada]

[Tabla resumen por area: viajes, km, cumplimiento, tendencia]
```

**Pagina 2: Detalle Operativo (con drillthrough)**
```
Titulo: "Detalle por Ruta / Chofer"
[<- Volver]

[KPIs del elemento seleccionado]
[Grafico de rendimiento en el tiempo]
[Tabla de ultimos 20 viajes]
```

**Pagina 3: Calidad y Mejora Continua**
```
Titulo: "Indicadores de Calidad - ISELIN"

[Gauge: Cumplimiento objetivo 1]  [Gauge: Objetivo 2]  [Gauge: Objetivo 3]

[Grafico de control: metrica clave con limites]
[Pareto: principales no conformidades]
[Semaforo por area: tabla con formato condicional]
```

---

## PARTE 4: FORMULAS DAX DE REFERENCIA (ENCUENTRO 3)

```dax
// === VARIABLES ===
Variacion Km % = 
VAR KmActual = SUM(Viajes[Km])
VAR KmAnterior = CALCULATE(SUM(Viajes[Km]), DATEADD(Calendario[Fecha], -1, MONTH))
RETURN
    DIVIDE(KmActual - KmAnterior, KmAnterior)

// === INTELIGENCIA DE TIEMPO ===
Km Acumulado Anio = TOTALYTD(SUM(Viajes[Km]), Calendario[Fecha])

Km Anio Anterior = CALCULATE(
    SUM(Viajes[Km]), 
    SAMEPERIODLASTYEAR(Calendario[Fecha])
)

Variacion Interanual % = 
VAR KmActual = SUM(Viajes[Km])
VAR KmAnterior = CALCULATE(SUM(Viajes[Km]), SAMEPERIODLASTYEAR(Calendario[Fecha]))
RETURN
    DIVIDE(KmActual - KmAnterior, KmAnterior)

Km Mes Anterior = CALCULATE(
    SUM(Viajes[Km]), 
    DATEADD(Calendario[Fecha], -1, MONTH)
)

// === ITERADORES ===
Ingreso Total = SUMX(Viajes, Viajes[Km] * Viajes[Tarifa_Km])

Ingreso Promedio = AVERAGEX(Viajes, Viajes[Km] * Viajes[Tarifa_Km])

Viajes con Demora = 
COUNTX(
    FILTER(Viajes, Viajes[Demora_Min] > 15), 
    Viajes[ID_Viaje]
)

// === CALCULATE CON MULTIPLES FILTROS ===
Viajes Norte Q1 = CALCULATE(
    COUNT(Viajes[ID_Viaje]),
    Rutas[Zona] = "Norte",
    Calendario[Trimestre] = 1
)

// === TABLA DE CALENDARIO ===
Calendario = 
VAR FechaInicio = DATE(2020, 1, 1)
VAR FechaFin = DATE(2027, 12, 31)
RETURN
ADDCOLUMNS(
    CALENDAR(FechaInicio, FechaFin),
    "Anio", YEAR([Date]),
    "Mes", MONTH([Date]),
    "NombreMes", FORMAT([Date], "MMMM"),
    "MesCorto", FORMAT([Date], "MMM"),
    "Trimestre", "Q" & QUARTER([Date]),
    "DiaSemana", WEEKDAY([Date]),
    "NombreDia", FORMAT([Date], "DDDD"),
    "AnioMes", FORMAT([Date], "YYYY-MM")
)

// === MEDIDA CON FORMATO CONDICIONAL (para iconos) ===
Estado Cumplimiento = 
VAR Actual = [Cumplimiento %]
RETURN
    IF(Actual >= 1, "Cumple",
    IF(Actual >= 0.8, "Precaucion",
    "Alerta"))
```

---

*Material de apoyo - Encuentro 3 | Capacitacion ISELIN en Analisis de Datos con Power BI*
*Abril 2026*
