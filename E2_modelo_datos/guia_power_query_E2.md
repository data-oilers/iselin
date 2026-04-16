# ENCUENTRO 2 - Guia de Power Query y Modelo Semantico

## Analisis de Datos con Power BI | ISELIN

### Fecha: 21 de abril de 2026 | Modalidad: Virtual | Duracion: 2 horas

---

## PARTE 1: POWER QUERY - EL TALLER DE PREPARACION DE DATOS

### Que es Power Query

Power Query es el editor de transformacion de datos integrado en Power BI. Es donde se realiza la **"T" del ETL** (Transformar). Piensen en Power Query como un taller mecanico: los datos entran "sucios" (con errores, vacios, formatos incorrectos) y salen listos para el analisis.

**Caracteristica clave:** cada transformacion que se realiza queda grabada como un "paso aplicado". Esto significa que:
- El proceso es **reproducible**: la proxima vez que se actualicen los datos, todas las transformaciones se aplican automaticamente.
- Es **auditable**: se puede ver exactamente que se hizo en cada paso.
- Es **reversible**: se puede eliminar o modificar cualquier paso.

### Como acceder a Power Query

```
Power BI Desktop > Inicio > Transformar datos
                          (se abre el Editor de Power Query)
```

### Interfaz del Editor de Power Query

```
+------------------------------------------------------------------+
|  Archivo  Inicio  Transformar  Agregar columna  Vista             |
+------------------------------------------------------------------+
|  CONSULTAS    |  VISTA PREVIA DE DATOS                           |
|  (lista de    |  (aqui se ven los datos y se aplican             |
|   tablas)     |   transformaciones)                              |
|               |                                                   |
|  - Viajes     |  Col1    | Col2     | Col3    | Col4             |
|  - Choferes   |  dato    | dato     | dato    | dato             |
|  - Rutas      |  dato    | dato     | null    | dato             |
|               |  dato    | dato     | dato    | error            |
|               |                                                   |
+---------------+---------------------------+-----------------------+
                                            |  PASOS APLICADOS     |
                                            |  (historial de       |
                                            |   transformaciones)  |
                                            |                      |
                                            |  1. Origen           |
                                            |  2. Encabezados      |
                                            |  3. Tipo cambiado    |
                                            |  4. Filas removidas  |
                                            +-----------------------+
```

### Operaciones fundamentales de Power Query

#### 1. Promover encabezados
**Cuando:** la primera fila de datos contiene los nombres de las columnas pero PBI no los reconocio automaticamente.

**Como:** Inicio > Usar primera fila como encabezado.

#### 2. Cambiar tipos de datos
**Cuando:** PBI interpreto una columna de fechas como texto, o numeros como texto.

**Como:** Click en el icono a la izquierda del nombre de columna > Seleccionar el tipo correcto.

| Tipo | Icono | Ejemplo |
|---|---|---|
| Texto | ABC | "Juan Perez", "Ruta Norte" |
| Numero entero | 123 | 342, 1500 |
| Numero decimal | 1.2 | 34.56, 99.99 |
| Fecha | Calendario | 01/03/2026 |
| Fecha/Hora | Reloj | 01/03/2026 08:30:00 |
| Verdadero/Falso | V/F | TRUE, FALSE |

**IMPORTANTE:** Cambiar tipos de datos es el paso mas critico. Si los tipos estan mal, las medidas DAX daran resultados incorrectos o errores.

#### 3. Eliminar filas vacias o con errores
**Cuando:** el Excel tiene filas en blanco (tipico al final de los datos o entre secciones).

**Como:** 
- Inicio > Quitar filas > Quitar filas en blanco.
- Para errores: Inicio > Quitar filas > Quitar errores.

#### 4. Eliminar columnas innecesarias
**Cuando:** el Excel tiene columnas auxiliares, notas o datos que no se necesitan para el analisis.

**Como:** Click derecho en la columna > Quitar. O seleccionar las columnas que SI se necesitan > Click derecho > Quitar otras columnas.

**Tip:** Es mejor seleccionar las que se necesitan y "Quitar otras columnas" que eliminar una por una. Si se agrega una columna nueva al Excel en el futuro, no aparecera automaticamente (lo cual previene datos no deseados).

#### 5. Reemplazar valores
**Cuando:** hay inconsistencias en los datos (ej: "Bs As", "Buenos Aires", "BsAs" deberian ser lo mismo).

**Como:** Seleccionar columna > Inicio > Reemplazar valores.

#### 6. Dividir columnas
**Cuando:** una columna tiene informacion combinada que deberia estar separada.

**Como:** Seleccionar columna > Transformar > Dividir columna > Por delimitador.

**Ejemplo:** Columna "Nombre_Completo" = "Perez, Juan" -> Dividir por coma -> "Perez" y "Juan".

#### 7. Combinar columnas
**Cuando:** se necesita unir dos columnas en una (ej: crear un identificador unico).

**Como:** Seleccionar columnas > Transformar > Combinar columnas.

**Ejemplo:** "Anio" + "Mes" -> "Periodo" = "2026-03".

#### 8. Filtrar filas
**Cuando:** se necesita excluir datos que no son relevantes.

**Como:** Click en la flecha desplegable del encabezado de columna > Desmarcar valores no deseados.

---

### Merge de consultas (JOIN)

El merge permite **unir dos tablas** por una columna en comun. Es el equivalente a un BUSCARV de Excel, pero mucho mas robusto.

```
TABLA A: Viajes                    TABLA B: Choferes
+--------+--------+-------+       +--------+----------------+
| ID_Via | ID_Ch  | Km    |       | ID_Ch  | Nombre_Chofer  |
|--------|--------|-------|       |--------|----------------|
| 001    | C-12   | 342   |       | C-12   | Juan Perez     |
| 002    | C-05   | 289   |       | C-05   | Maria Lopez    |
| 003    | C-12   | 310   |       | C-08   | Pedro Gomez    |
+--------+--------+-------+       +--------+----------------+

MERGE por ID_Ch (Left Outer Join):

RESULTADO:
+--------+--------+-------+----------------+
| ID_Via | ID_Ch  | Km    | Nombre_Chofer  |
|--------|--------|-------|----------------|
| 001    | C-12   | 342   | Juan Perez     |
| 002    | C-05   | 289   | Maria Lopez    |
| 003    | C-12   | 310   | Juan Perez     |
+--------+--------+-------+----------------+
```

**Como:**
1. En Power Query, seleccionar la tabla principal.
2. Inicio > Combinar > Combinar consultas.
3. Seleccionar la segunda tabla.
4. Hacer click en la columna comun de cada tabla.
5. Elegir el tipo de combinacion (generalmente "Externa izquierda").
6. Expandir la columna resultante para elegir que campos traer.

**Tipos de combinacion:**

| Tipo | Que trae |
|---|---|
| Externa izquierda (Left Outer) | Todos los registros de la tabla A + los que coincidan de B |
| Externa derecha (Right Outer) | Todos los registros de la tabla B + los que coincidan de A |
| Externa completa (Full Outer) | Todos los registros de ambas tablas |
| Interna (Inner) | Solo los registros que coinciden en ambas tablas |

**Para la mayoria de los casos en ISELIN usaremos "Externa izquierda".**

---

### Append de consultas (APILAR)

El append permite **apilar filas** de tablas que tienen la misma estructura. Es como "pegar" una tabla debajo de otra.

```
TABLA: Viajes_Enero              TABLA: Viajes_Febrero
+--------+--------+-------+     +--------+--------+-------+
| ID_Via | ID_Ch  | Km    |     | ID_Via | ID_Ch  | Km    |
|--------|--------|-------|     |--------|--------|-------|
| 001    | C-12   | 342   |     | 004    | C-08   | 401   |
| 002    | C-05   | 289   |     | 005    | C-12   | 355   |
+--------+--------+-------+     +--------+--------+-------+

APPEND:

RESULTADO: Viajes_Completo
+--------+--------+-------+
| ID_Via | ID_Ch  | Km    |
|--------|--------|-------|
| 001    | C-12   | 342   |
| 002    | C-05   | 289   |
| 004    | C-08   | 401   |
| 005    | C-12   | 355   |
+--------+--------+-------+
```

**Como:**
1. En Power Query, seleccionar la primera tabla.
2. Inicio > Anexar consultas.
3. Seleccionar la segunda tabla (o "Tres o mas tablas" si son varias).
4. Aceptar.

**Uso tipico en ISELIN:** cuando los datos vienen separados por mes (un Excel por mes) y se necesitan todos juntos.

---

### Pasos aplicados: el historial reproducible

Cada operacion que se realiza en Power Query se graba automaticamente en el panel **"Pasos aplicados"** (APPLIED STEPS) a la derecha.

```
Pasos aplicados:
  1. Origen                    <- Conexion al Excel
  2. Navegacion                <- Seleccion de la hoja
  3. Encabezados promovidos    <- Primera fila como encabezado
  4. Tipo cambiado             <- Ajuste de tipos de datos
  5. Filas en blanco quitadas  <- Eliminacion de vacios
  6. Columnas quitadas         <- Solo las columnas necesarias
  7. Valores reemplazados      <- Correccion de inconsistencias
```

**Cada paso se puede:**
- Eliminar (click en la X)
- Reordenar (arrastrar)
- Renombrar (click derecho > Cambiar nombre)
- Inspeccionar (click para ver el estado de los datos en ese punto)

**IMPORTANTE:** Al cerrar Power Query ("Cerrar y aplicar"), todos los pasos se ejecutan en secuencia cada vez que se actualizan los datos. Esto es lo que hace que el proceso sea automatico.

---

## PARTE 2: MODELO SEMANTICO

### Que es un modelo semantico

El modelo semantico es el **conjunto de tablas, relaciones entre ellas y medidas** que forman la estructura logica del analisis. Es el "cerebro" del reporte: define como se conectan los datos y como se calculan los indicadores.

```
Sin modelo semantico:          Con modelo semantico:
Un solo Excel enorme           Tablas organizadas y conectadas
con todo mezclado              con roles claros

+---------------------+        +----------+     +----------+
| Fecha | Chofer |    |        | VIAJES   |---->| CHOFERES |
| Ruta  | Km     |    |        | (hechos) |     | (dim)    |
| Gasoil| Nombre |    |        +----------+     +----------+
| Turno | Zona   |    |             |
| ...   | ...    |    |             v
+---------------------+        +----------+     +----------+
                               | CALENDARIO|    | RUTAS    |
Dificil de analizar,           | (dim)    |     | (dim)    |
lento, propenso a errores      +----------+     +----------+
                               
                               Organizado, rapido, confiable
```

### Esquema estrella

El esquema estrella es la forma recomendada de organizar un modelo semantico:

```
                    +-------------+
                    |  CALENDARIO |
                    |  (Dimension)|
                    |  Fecha      |
                    |  Mes        |
                    |  Anio       |
                    |  Trimestre  |
                    +------+------+
                           |
                           | 1:N
                           |
+-------------+    +-------+-------+    +-------------+
|  CHOFERES   |    |    VIAJES     |    |   RUTAS     |
|  (Dimension)|----| (Tabla de     |----|  (Dimension)|
|  ID_Chofer  | N:1|   Hechos)     | N:1|  ID_Ruta    |
|  Nombre     |    |  ID_Viaje     |    |  Nombre     |
|  Antigueedad|    |  Fecha        |    |  Zona       |
|  Categoria  |    |  ID_Chofer    |    |  Km_Total   |
+-------------+    |  ID_Ruta      |    +-------------+
                   |  Km           |
                   |  Demora_Min   |
                   |  Gasoil_Lts   |
                   +---------------+
```

**Reglas del esquema estrella:**
1. La tabla de hechos va al **centro**.
2. Las tablas de dimensiones van **alrededor**.
3. Las relaciones van de la **dimension (1) al hecho (muchos)**.
4. Los filtros fluyen de las **dimensiones hacia los hechos** (unidireccional).

### Crear relaciones en PBI

**Como:**
1. Ir a la **Vista de Modelo** (tercer icono en la barra lateral izquierda).
2. Arrastrar el campo de una tabla hacia el campo correspondiente de otra tabla.
3. Verificar:
   - **Cardinalidad**: 1 a muchos (lo mas comun) o Muchos a muchos.
   - **Direccion de filtro cruzado**: Unica (recomendado) o Ambas.
4. Aceptar.

**Buenas practicas:**
- Usar IDs o codigos como campos de relacion (no nombres que pueden tener variantes).
- Evitar relaciones bidireccionales a menos que sea estrictamente necesario.
- Si PBI detecta una relacion automaticamente, verificar que sea correcta.
- Nombrar las tablas de forma clara: "Dim_Choferes", "Dim_Rutas", "Fact_Viajes" o simplemente "Choferes", "Rutas", "Viajes".

---

## PARTE 3: PRIMERAS MEDIDAS CON DAX

### Medida implicita vs. medida explicita

| Tipo | Como se crea | Ejemplo | Limitacion |
|---|---|---|---|
| **Implicita** | Arrastrar un campo numerico a un visual | PBI suma automaticamente la columna Km | No se puede reutilizar, no se puede personalizar |
| **Explicita** | Escribir una formula DAX en la barra de formulas | `Total Km = SUM(Viajes[Km])` | Requiere conocer DAX, pero es mucho mas poderosa |

**Recomendacion:** Siempre crear medidas explicitas. Son reutilizables, documentables y se comportan correctamente con los filtros.

### Medidas basicas

```
Total Viajes = COUNT(Viajes[ID_Viaje])
```
Cuenta la cantidad de viajes.

```
Total Km = SUM(Viajes[Km])
```
Suma todos los kilometros.

```
Km Promedio = AVERAGE(Viajes[Km])
```
Promedio de kilometros por viaje.

```
Choferes Activos = DISTINCTCOUNT(Viajes[ID_Chofer])
```
Cuenta choferes unicos (sin repetir).

```
Demora Maxima = MAX(Viajes[Demora_Min])
```
Mayor demora registrada.

```
Demora Minima = MIN(Viajes[Demora_Min])
```
Menor demora registrada.

### Introduccion a CALCULATE

`CALCULATE` es la funcion mas importante de DAX. Permite **modificar el contexto de filtro** de una medida.

**Sintaxis:**
```
CALCULATE( <expresion>, <filtro1>, <filtro2>, ... )
```

**Ejemplo:**
```
Viajes Ruta Norte = CALCULATE(
    COUNT(Viajes[ID_Viaje]),
    Rutas[Zona] = "Norte"
)
```
Cuenta los viajes, pero solo los de la zona Norte, independientemente de los filtros del reporte.

```
Km Marzo = CALCULATE(
    SUM(Viajes[Km]),
    Calendario[Mes] = "Marzo"
)
```
Suma los km solo del mes de marzo.

**CALCULATE es poderosa porque permite calcular un valor en un contexto diferente al que muestra el visual.** Esto sera fundamental en el Encuentro 3 cuando veamos medidas mas complejas.

### Donde crear medidas

1. Seleccionar la tabla donde quiere "vivir" la medida (recomendacion: crear una tabla vacia llamada "Medidas" para organizarlas).
2. Ir a **Inicio > Nueva medida** o **Modelado > Nueva medida**.
3. Escribir la formula en la barra de formulas.
4. Presionar Enter.

---

## PARTE 4: PRIMERAS VISUALIZACIONES

### Tipos de graficos y cuando usarlos

| Visual | Cuando usarlo | Ejemplo ISELIN |
|---|---|---|
| **Tarjeta (Card)** | Mostrar un KPI individual | Total viajes del mes: 1,234 |
| **Tarjeta de varias filas** | Varios KPIs juntos | Viajes, Km, Gasoil en una tarjeta |
| **Grafico de barras** | Comparar categorias | Viajes por ruta, demoras por tipo |
| **Grafico de columnas** | Comparar categorias en el tiempo | Viajes mensuales |
| **Grafico de lineas** | Mostrar tendencias | Evolucion de km recorridos por mes |
| **Grafico circular** | Proporcion de un total (max 5-6 categorias) | Distribucion de siniestros por tipo |
| **Tabla** | Detalle con muchos campos | Listado de viajes con chofer, ruta, km |
| **Matriz** | Tabla con drill-down y subtotales | Viajes por ruta y por mes, con totales |
| **Segmentador (Slicer)** | Filtro interactivo | Selector de mes, selector de area |

### Segmentadores (Slicers)

Los segmentadores son **filtros visuales** que permiten al usuario interactuar con el reporte:

```
+------------------+    +------------------+    +------------------+
|  Seleccionar Mes |    | Seleccionar Ruta |    | Seleccionar Area |
|  [v] Enero       |    |  [v] Todas       |    |  ( ) Todas       |
|  [v] Febrero     |    |  [ ] Ruta Norte  |    |  ( ) Logistica   |
|  [v] Marzo       |    |  [ ] Ruta Sur    |    |  ( ) Calidad     |
|  [ ] Abril       |    |  [ ] Ruta Este   |    |  ( ) RRHH        |
+------------------+    +------------------+    +------------------+
```

**Como crear un slicer:**
1. En el panel de Visualizaciones, seleccionar el icono de Segmentador.
2. Arrastrar el campo deseado (ej: Calendario[Mes]) al area "Campo" del slicer.
3. Formatear: estilo lista, dropdown, o botones.

### Formateo basico

- **Titulo del visual**: siempre descriptivo ("Viajes por Ruta - 2026", no "Chart1").
- **Etiquetas de datos**: activar para barras y columnas, desactivar si satura.
- **Colores**: usar paleta corporativa de ISELIN. Mantener consistencia (mismo color = misma categoria).
- **Tamano de fuente**: legible a distancia en presentaciones (minimo 12pt para datos, 16pt para titulos).

---

## PARTE 5: REFERENCIA RAPIDA

### Checklist de limpieza de datos en Power Query

- [ ] Encabezados correctos (primera fila promovida)
- [ ] Tipos de datos asignados correctamente (fechas, numeros, texto)
- [ ] Filas vacias eliminadas
- [ ] Columnas innecesarias removidas
- [ ] Valores inconsistentes reemplazados
- [ ] Sin errores visibles (columnas sin iconos de error)
- [ ] Nombres de columnas descriptivos y sin caracteres especiales

### Checklist de modelo semantico

- [ ] Tabla de hechos identificada (la que tiene transacciones/eventos)
- [ ] Tablas de dimensiones identificadas (las que describen/clasifican)
- [ ] Relaciones creadas (1 a muchos, dimension -> hecho)
- [ ] Direccion de filtro: unica (de dimension a hecho)
- [ ] No hay relaciones ambiguas (lineas punteadas en el modelo)
- [ ] Tablas nombradas claramente

### Formulas DAX del encuentro

```dax
// Medidas basicas
Total Viajes = COUNT(Viajes[ID_Viaje])
Total Km = SUM(Viajes[Km])
Km Promedio = AVERAGE(Viajes[Km])
Choferes Activos = DISTINCTCOUNT(Viajes[ID_Chofer])
Demora Maxima = MAX(Viajes[Demora_Min])
Demora Minima = MIN(Viajes[Demora_Min])

// Con CALCULATE
Viajes Ruta Norte = CALCULATE(
    COUNT(Viajes[ID_Viaje]),
    Rutas[Zona] = "Norte"
)
```

---

*Material de apoyo - Encuentro 2 | Capacitacion ISELIN en Analisis de Datos con Power BI*
*Abril 2026*
