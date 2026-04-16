# ENCUENTRO 1 - Guia de Conceptos Fundamentales

## Analisis de Datos con Power BI | ISELIN

### Fecha: 16 de abril de 2026 | Modalidad: Presencial | Duracion: 2 horas

---

## PARTE 1: POR QUE ANALIZAR DATOS

### El dato como materia prima de las decisiones

En ISELIN, cada dia se generan datos: viajes realizados, km recorridos, boletos emitidos, consumo de gasoil, siniestros, tiempos de demora, evaluaciones de desempeno. Estos datos, en su estado crudo (archivos Excel, sistemas como Wara, Micronauta, FICS), son como piezas sueltas de un rompecabezas.

**El analisis de datos es el proceso de convertir esos datos en informacion util para tomar mejores decisiones.**

```
DATOS CRUDOS          ANALISIS           INFORMACION          DECISION
(Excel, sistemas) --> (Limpiar,     --> (Dashboards,     --> (Acciones de
                       transformar,      KPIs, tendencias)    mejora)
                       relacionar)
```

### De la intuicion a la evidencia

| Sin analisis de datos | Con analisis de datos |
|---|---|
| "Me parece que las demoras aumentaron" | "Las demoras aumentaron un 12% en marzo vs. febrero, concentradas en la Ruta 5" |
| "Creo que gastamos mucho en repuestos" | "El 80% del gasto en repuestos se concentra en 3 de 45 colectivos" |
| "Los choferes nuevos tienen mas siniestros" | "Los choferes con menos de 6 meses tienen 2.3x mas incidentes que el promedio" |

---

## PARTE 2: CALIDAD Y ANALISIS DE DATOS

### El ciclo PDCA y donde entra Power BI

El ciclo de mejora continua PDCA (tambien llamado ciclo de Deming) es el corazon de cualquier sistema de gestion de calidad:

```
        PLANIFICAR (Plan)
       /  Definir objetivos,  \
      /   KPIs, metas           \
     /                            \
ACTUAR (Act)              HACER (Do)
Tomar acciones            Ejecutar los
correctivas,              procesos,
estandarizar     <---     recopilar datos
lo que funciona
     \                            /
      \                          /
       \  VERIFICAR (Check)    /
        \ Analizar datos,     /
          medir resultados,
          comparar vs. meta
```

**Power BI se inserta principalmente en la fase de VERIFICAR**: nos permite medir, comparar, visualizar y detectar desvios. Pero tambien apoya la fase de PLANIFICAR (establecer lineas base) y ACTUAR (identificar donde intervenir).

### Las 7 herramientas de la calidad y su equivalente en Power BI

Estas herramientas, propuestas por Kaoru Ishikawa, permiten resolver el 95% de los problemas de calidad. Cada una tiene un equivalente directo o indirecto en Power BI:

#### 1. Diagrama de Pareto
**Que es:** Grafico de barras ordenadas de mayor a menor con linea de porcentaje acumulado. Aplica la regla 80/20: el 80% de los problemas viene del 20% de las causas.

**En PBI:** Grafico de barras ordenado + medida acumulada. Sirve para priorizar: en que concentrar los esfuerzos.

**Ejemplo ISELIN:** De todos los tipos de siniestros, cuales representan el 80% del total? De todos los motivos de demora, cuales son los mas frecuentes?

#### 2. Histograma
**Que es:** Grafico que muestra como se distribuyen los datos en rangos (bins). Permite ver si los datos son "normales", si hay sesgo, si hay valores extremos.

**En PBI:** Grafico de columnas con rangos agrupados (se puede crear con medidas DAX o con la visualizacion nativa de histograma).

**Ejemplo ISELIN:** Como se distribuyen los tiempos de viaje? La mayoria esta cerca del promedio o hay mucha variabilidad?

#### 3. Diagrama de Dispersion (Scatter Plot)
**Que es:** Grafica que muestra la relacion entre dos variables numericas. Cada punto es una observacion.

**En PBI:** Visualizacion de tipo "Scatter Chart" con linea de tendencia.

**Ejemplo ISELIN:** Existe relacion entre km recorridos y consumo de gasoil? Entre antigueedad del chofer y cantidad de siniestros?

#### 4. Diagrama de Causa y Efecto (Ishikawa)
**Que es:** Diagrama de "espina de pescado" que organiza las posibles causas de un problema en categorias (las 5M+1A: Material, Maquina, Mano de obra, Metodo, Medicion, Ambiente).

**En PBI:** No tiene equivalente nativo, pero el analisis de datos en PBI permite validar o descartar las causas hipoteticas que se identifican en un Ishikawa. Se complementan.

**Ejemplo ISELIN:** Si el Ishikawa identifica "exceso de km sin mantenimiento" como posible causa de siniestros, PBI permite validar esa hipotesis con datos reales.

#### 5. Graficos de Control
**Que es:** Grafico de lineas con un valor central (media) y limites superior e inferior. Si un punto sale de los limites, el proceso esta "fuera de control".

**En PBI:** Grafico de lineas con lineas de referencia constantes (media, +2sigma, -2sigma). Tambien existe visual personalizado de graficos de control.

**Ejemplo ISELIN:** El consumo de gasoil diario esta dentro de los limites esperados? Hubo algun dia anomalo?

#### 6. Diagrama de Flujo
**Que es:** Representacion grafica de los pasos de un proceso, con decisiones y bifurcaciones.

**En PBI:** No tiene equivalente nativo. Se complementa con herramientas como Visio o se documenta por separado.

**Ejemplo ISELIN:** El flujo del proceso de gestion de siniestros se documenta por fuera y se vincula al dashboard.

#### 7. Hoja de Verificacion
**Que es:** Formato estructurado para recolectar datos de forma ordenada. Es la base de todo: sin buena recoleccion no hay buen analisis.

**En PBI:** Las tablas y matrices con formato condicional funcionan como "hojas de verificacion digitales" que se actualizan automaticamente.

**Ejemplo ISELIN:** Checklist de cumplimiento de objetivos por area, con semaforo rojo/amarillo/verde.

---

## PARTE 3: CONCEPTOS FUNDAMENTALES DE POWER BI

### Que es Power BI

Power BI es un conjunto de herramientas de Microsoft para analisis de datos y visualizacion:

```
+-------------------+     +-------------------+     +-------------------+
|  PBI DESKTOP      |     |  PBI SERVICE      |     |  PBI MOBILE       |
|  (aplicacion PC)  | --> |  (web: app.       | --> |  (celular/tablet) |
|                   |     |   powerbi.com)    |     |                   |
|  Donde se         |     |  Donde se         |     |  Donde se         |
|  CONSTRUYEN       |     |  PUBLICAN y       |     |  CONSULTAN        |
|  los reportes     |     |  COMPARTEN        |     |  en movimiento    |
+-------------------+     +-------------------+     +-------------------+
```

En esta capacitacion trabajaremos principalmente con **PBI Desktop** (donde se construye) y **PBI Service** (donde se publica y programa la actualizacion).

### ETL: Extraer, Transformar, Cargar

ETL es el proceso de preparar los datos antes de analizarlos:

```
EXTRAER (Extract)          TRANSFORMAR (Transform)       CARGAR (Load)
Traer datos desde          Limpiar, ordenar,             Meter los datos
la fuente original         corregir, combinar            listos en el modelo
                                                         de PBI
+------------------+       +------------------+          +------------------+
| Excel de Wara    |       | Eliminar vacios  |          | Tabla lista      |
| Google Sheets    | ----> | Corregir tipos   | -------> | para crear       |
| Archivos locales |       | Renombrar cols   |          | graficos y       |
+------------------+       | Combinar tablas  |          | medidas          |
                           +------------------+          +------------------+

        En PBI, la "T" la hace POWER QUERY
```

### Tablas de Hechos vs. Tablas de Dimensiones

Esta es una de las distinciones mas importantes en el analisis de datos:

**Tabla de hechos (Fact table)**
- Contiene los **registros de eventos o transacciones**
- Tiene muchas filas (una por cada evento)
- Contiene numeros que se pueden sumar, promediar, contar
- Cambia constantemente (se agregan filas nuevas)

**Tabla de dimensiones (Dimension table)**
- Contiene **atributos descriptivos** que dan contexto a los hechos
- Tiene menos filas (una por cada entidad unica)
- Contiene textos, categorias, descripciones
- Cambia poco (se agrega un chofer nuevo, una ruta nueva)

**Ejemplo con datos de ISELIN:**

```
TABLA DE HECHOS: Viajes                 TABLAS DE DIMENSIONES
+--------+--------+-------+------+     +--------+----------------+
| ID_Via | Fecha  | ID_Ch | Km   |     | ID_Ch  | Nombre_Chofer  |
|--------|--------|-------|------|     |--------|----------------|
| 001    | 01/03  | C-12  | 342  |     | C-12   | Juan Perez     |
| 002    | 01/03  | C-05  | 289  |     | C-05   | Maria Lopez    |
| 003    | 02/03  | C-12  | 310  |     | C-08   | Pedro Gomez    |
| 004    | 02/03  | C-08  | 401  |     +--------+----------------+
| ...    | ...    | ...   | ...  |
+--------+--------+-------+------+     +--------+----------------+
                                       | ID_Rut | Nombre_Ruta    |
Se suman, promedian, cuentan           |--------|----------------|
                                       | R-01   | Ruta Norte     |
                                       | R-02   | Ruta Sur       |
                                       +--------+----------------+
                                       Describen, clasifican, filtran
```

### Contexto de Fila y Contexto de Filtro

Estos dos conceptos son fundamentales para entender como PBI calcula los valores que muestra:

**Contexto de fila (Row Context)**
- PBI evalua **cada fila de la tabla de forma individual**
- Es como recorrer un listado linea por linea
- Se activa en columnas calculadas y en funciones iteradoras (SUMX, AVERAGEX)

```
Ejemplo: Si creo una columna calculada "Costo = Km * TarifaPorKm"
PBI calcula fila por fila:
  Fila 1: 342 * 1.5 = 513
  Fila 2: 289 * 1.5 = 433.5
  Fila 3: 310 * 1.5 = 465
```

**Contexto de filtro (Filter Context)**
- Es el **conjunto de filtros activos** que determinan que datos se consideran para un calculo
- Cada visual, slicer, filtro de pagina o filtro de reporte modifica el contexto de filtro
- Las medidas DAX responden al contexto de filtro

```
Ejemplo: Medida "Total Km = SUM(Viajes[Km])"

Sin filtro:           Total Km = 342 + 289 + 310 + 401 = 1342
Filtro: Chofer C-12:  Total Km = 342 + 310 = 652
Filtro: Fecha 01/03:  Total Km = 342 + 289 = 631
```

**La interaccion entre ambos contextos es lo que hace poderoso a PBI.** No es necesario memorizarlo ahora; lo iremos viendo en la practica a lo largo de los 4 encuentros.

---

## PARTE 4: ESTADISTICA DESCRIPTIVA BASICA

La estadistica descriptiva nos permite **resumir y describir** un conjunto de datos. Estos son los conceptos que usaremos constantemente en PBI:

### Medidas de tendencia central (donde se concentran los datos)

| Medida | Que es | Cuando usarla | Ejemplo ISELIN |
|---|---|---|---|
| **Media (promedio)** | Suma de todos los valores / cantidad de valores | Cuando los datos no tienen valores extremos | Km promedio por viaje = 335.5 |
| **Mediana** | El valor que queda justo en el medio al ordenar los datos | Cuando hay valores extremos que distorsionan el promedio | Tiempo mediano de demora (no se infla por un caso atipico) |
| **Moda** | El valor que mas se repite | Para datos categoricos o discretos | Tipo de siniestro mas frecuente |

### Medidas de dispersion (que tan dispersos estan los datos)

| Medida | Que es | Que nos dice | Ejemplo ISELIN |
|---|---|---|---|
| **Rango** | Valor maximo - valor minimo | La amplitud total de los datos | Diferencia entre el viaje mas largo y el mas corto |
| **Desviacion estandar** | Cuanto se alejan los datos del promedio, en promedio | Si los datos son consistentes o muy variables | Si la desviacion del consumo de gasoil es alta, hay colectivos con consumo anomalo |
| **Varianza** | Desviacion estandar al cuadrado | Misma idea que la desviacion pero en unidades cuadradas | Se usa mas en calculos estadisticos que en interpretacion directa |

### Medidas de posicion (donde cae un valor relativo al resto)

| Medida | Que es | Ejemplo ISELIN |
|---|---|---|
| **Percentil** | El X% de los datos cae por debajo de este valor | "El chofer esta en el percentil 90 de puntualidad" = es mas puntual que el 90% |
| **Cuartiles** | Dividen los datos en 4 partes iguales (Q1=25%, Q2=50%=mediana, Q3=75%) | Q1 de km = 289, Q3 = 401: el 50% central de los viajes esta entre 289 y 401 km |

### Visualizacion rapida

```
                    Distribucion de Km por viaje
Frecuencia
|
|         ***
|        *****
|       *******
|      *********
|    ***********
|  ***************
+-------------------------> Km
  200  250  300  350  400  450

  Media = 335     Mediana = 326
  Desviacion estandar = 47
  
  Si la campana es simetrica: media ≈ mediana (proceso estable)
  Si la campana esta sesgada: media ≠ mediana (investigar por que)
```

---

## PARTE 5: LA INTERFAZ DE POWER BI DESKTOP

### Las 3 vistas principales

```
+------------------------------------------------------------------+
|  Archivo  Inicio  Insertar  Modelado  Vista  Ayuda               |
+------------------------------------------------------------------+
|      |                                                            |
|  [1] |    AREA DE TRABAJO                                        |
|  [2] |    (aqui se construyen los graficos                       |
|  [3] |     y se ven los datos)                                   |
|      |                                                            |
|      |                                                            |
+------+---------------------------+-------------------------------+
|  PANEL DE FILTROS               |  PANEL DE VISUALIZACIONES      |
|  (filtrar datos del reporte,    |  (elegir tipo de grafico,      |
|   pagina o visual)              |   configurar campos)           |
|                                 +-------------------------------+
|                                 |  PANEL DE CAMPOS               |
|                                 |  (lista de tablas y columnas   |
|                                 |   del modelo)                  |
+---------------------------------+-------------------------------+

Vistas (iconos a la izquierda):
[1] Vista de Informe  -> Donde se construyen los dashboards
[2] Vista de Datos    -> Ver las tablas con sus datos (como un Excel)
[3] Vista de Modelo   -> Ver las relaciones entre tablas
```

### Flujo de trabajo basico

```
1. OBTENER DATOS         2. TRANSFORMAR           3. MODELAR
   Inicio > Obtener         Power Query Editor       Vista de Modelo
   datos > Excel             (limpiar, ajustar)       (crear relaciones)
        |                         |                         |
        v                         v                         v
4. CREAR MEDIDAS         5. VISUALIZAR            6. PUBLICAR
   Barra de formulas        Arrastrar campos         Inicio > Publicar
   (escribir DAX)            a visualizaciones        (subir a PBI Service)
```

---

## PARTE 6: GLOSARIO RAPIDO

| Termino | Definicion |
|---|---|
| **Power BI Desktop** | Aplicacion gratuita de escritorio donde se construyen los reportes |
| **Power BI Service** | Plataforma web donde se publican y comparten los reportes |
| **Power Query** | Editor de transformacion de datos dentro de PBI (la "T" del ETL) |
| **DAX** | Data Analysis Expressions: lenguaje de formulas para crear medidas y columnas calculadas |
| **Medida** | Calculo dinamico que responde a los filtros (ej: SUM, AVERAGE, COUNT) |
| **Columna calculada** | Columna nueva agregada a una tabla mediante una formula |
| **Modelo semantico** | Conjunto de tablas, relaciones y medidas que forman la base del analisis |
| **Slicer / Segmentador** | Filtro visual interactivo en el reporte |
| **Dataset** | Conjunto de datos publicado en PBI Service |
| **Workspace** | Espacio de trabajo en PBI Service donde se organizan reportes por equipo/area |
| **Scheduled Refresh** | Actualizacion automatica programada de los datos en PBI Service |
| **KPI** | Key Performance Indicator: metrica clave que mide el desempeno de un proceso |

---

*Material de apoyo - Encuentro 1 | Capacitacion ISELIN en Analisis de Datos con Power BI*
*Abril 2026*
