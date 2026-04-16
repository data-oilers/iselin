# ENCUENTRO 4 - Guia de Estadistica Inferencial, Publicacion y Refresh

## Analisis de Datos con Power BI | ISELIN

### Fecha: 30 de abril de 2026 | Modalidad: Presencial | Duracion: 2 horas

---

## PARTE 1: ESTADISTICA DESCRIPTIVA EN PBI - REPASO APLICADO

### Lo que PBI ya muestra de forma nativa

Cada vez que creamos una medida con `SUM`, `AVERAGE`, `COUNT`, `MIN`, `MAX` estamos haciendo estadistica descriptiva. Repasemos como se visualiza:

| Estadistica | Medida DAX | Visual recomendado |
|---|---|---|
| Promedio | `AVERAGE(Tabla[Campo])` | Tarjeta, Linea de referencia |
| Suma | `SUM(Tabla[Campo])` | Tarjeta, Barras |
| Conteo | `COUNT(Tabla[Campo])` | Tarjeta |
| Minimo/Maximo | `MIN()` / `MAX()` | Tarjeta, Tabla |
| Desviacion estandar | Quick Measure o formula manual | Tarjeta, Linea de referencia |
| Mediana | Quick Measure o `MEDIAN()` | Tarjeta |
| Percentiles | `PERCENTILEX.INC()` | Tabla, Referencia |

### Histograma en PBI

El histograma muestra como se **distribuyen** los valores de una variable. No existe como visual nativo directo, pero se puede construir:

**Metodo: grafico de columnas agrupadas con rangos (bins)**

1. Crear una columna calculada que clasifique cada valor en un rango:
```dax
Rango Km = 
SWITCH(
    TRUE(),
    Viajes[Km] < 200, "0-199",
    Viajes[Km] < 300, "200-299",
    Viajes[Km] < 400, "300-399",
    Viajes[Km] < 500, "400-499",
    "500+"
)
```

2. Crear un grafico de columnas con "Rango Km" en el eje X y `COUNT(Viajes[ID_Viaje])` en el eje Y.

**Que buscar en un histograma:**
- **Forma simetrica (campana):** los datos se distribuyen normalmente alrededor del promedio. Proceso estable.
- **Sesgo a la derecha:** la cola se extiende hacia valores altos. Ejemplo: tiempos de demora (la mayoria es corta, pero algunos son muy largos).
- **Sesgo a la izquierda:** la cola se extiende hacia valores bajos.
- **Bimodal (dos picos):** posiblemente hay dos grupos mezclados que deberian analizarse por separado.

### Diagrama de caja (Box Plot)

Util para ver la **mediana, cuartiles y outliers** de una distribucion. PBI no lo tiene nativamente pero existe como visual personalizado descargable desde AppSource.

```
          Outlier
            o
            |
    +-------+-------+   <- Q3 (percentil 75)
    |               |
    |       |       |   <- Mediana (Q2, percentil 50)
    |               |
    +-------+-------+   <- Q1 (percentil 25)
            |
            o
          Outlier
```

---

## PARTE 2: ESTADISTICA INFERENCIAL - CONCEPTOS PARA INTERPRETAR RESULTADOS

### De describir a inferir

| Estadistica descriptiva | Estadistica inferencial |
|---|---|
| Describe lo que **ya paso** | Permite hacer **conclusiones** sobre datos futuros o poblaciones |
| Resume datos existentes | Generaliza a partir de una muestra |
| "El promedio de km fue 335" | "Con 95% de confianza, el promedio de km esta entre 320 y 350" |
| Media, mediana, desviacion | Intervalos de confianza, tendencias, predicciones |

### Poblacion vs. Muestra

```
POBLACION                           MUESTRA
Todos los viajes de todos           Los viajes de marzo 2026
los tiempos
                                    
+---------------------------+       +---------------------------+
|  o o o o o o o o o o o o  |       |                           |
|  o o o o o o o o o o o o  |       |     o o o o o o           |
|  o o o o o o o o o o o o  |  -->  |     o o o o               |
|  o o o o o o o o o o o o  |       |     o o o o o             |
|  o o o o o o o o o o o o  |       |                           |
+---------------------------+       +---------------------------+

Analizar la muestra nos permite hacer conclusiones
sobre la poblacion (con cierto margen de error)
```

**En ISELIN:** cuando analizamos los datos de un mes o un trimestre, estamos trabajando con una **muestra** del comportamiento general. Las conclusiones que saquemos aplican al periodo analizado y nos dan indicios sobre el comportamiento futuro, pero con un margen de incertidumbre.

### Distribucion Normal (Campana de Gauss)

La distribucion normal es el patron mas comun en datos naturales. Si los datos siguen una distribucion normal:

```
                    68% de los datos
                   |<----------->|
              95% de los datos
           |<--------------------->|
        99.7% de los datos
     |<------------------------------->|
     
     |         .  *  *  *  .          |
     |      *                 *       |
     |   *                       *    |
     | *                           *  |
     *                               *
   --+---+---+---+---+---+---+---+---+--
    -3σ -2σ  -1σ  μ  +1σ +2σ +3σ
   
   μ = media (promedio)
   σ = desviacion estandar
```

**Regla empirica:**
- El **68%** de los datos cae dentro de 1 desviacion estandar de la media.
- El **95%** cae dentro de 2 desviaciones estandar.
- El **99.7%** cae dentro de 3 desviaciones estandar.

**Ejemplo ISELIN:** si el consumo promedio de gasoil es 50 litros (μ = 50) con desviacion estandar de 5 litros (σ = 5):
- El 68% de los colectivos consume entre 45 y 55 litros.
- El 95% consume entre 40 y 60 litros.
- Un colectivo que consume 70 litros esta a +4σ: es un **outlier** que merece investigacion.

### Correlacion: relacion entre dos variables

La correlacion mide **que tan fuerte es la relacion lineal** entre dos variables. Se expresa con el coeficiente de correlacion (r) que va de -1 a +1.

```
r = +1 (Correlacion positiva perfecta)    r = 0 (Sin correlacion)
    |  .                                       |  .    .
    | . .                                      | .  .
    |.   .                                     |    .  .  .
    .     .                                    | .    .
   .       .                                   |.      .
  +----------->                                +----------->

r = -1 (Correlacion negativa perfecta)    r = +0.7 (Correlacion positiva fuerte)
    .                                          |     . .
    .                                          |   . .
     .                                         |  . .  .
      .                                        | . .
       .  .                                    |.  .
        . . .                                  +----------->
  +----------->
```

**Como ver correlacion en PBI:**
1. Crear un **grafico de dispersion** (Scatter Plot).
2. Poner una variable en el eje X y otra en el eje Y.
3. Agregar una **linea de tendencia**: click en el visual > Formato > Linea de tendencia > Activar.
4. Opcional: mostrar la ecuacion y el valor R-cuadrado (R²).

**Interpretacion de R²:**

| R² | Interpretacion |
|---|---|
| 0.00 - 0.25 | Relacion debil o inexistente |
| 0.25 - 0.50 | Relacion moderada |
| 0.50 - 0.75 | Relacion fuerte |
| 0.75 - 1.00 | Relacion muy fuerte |

**Ejemplo ISELIN:** Scatter plot de Km recorridos (X) vs. Consumo de gasoil (Y). Si R² = 0.85, el 85% de la variacion en consumo se explica por los km recorridos. Los puntos que estan lejos de la linea merecen investigacion (pueden indicar fugas, conduccion ineficiente, etc.).

### IMPORTANTE: Correlacion NO es causalidad

```
Correlacion:                        Causalidad:
"Dos cosas se mueven juntas"        "Una cosa PROVOCA la otra"

Helado vendido   <--->  Ahogamientos     Helado vendido   -/->  Ahogamientos
(correlacion positiva)                    (NO hay causalidad)
                                          
Ambos aumentan en verano (variable       El calor aumenta ambos
oculta: temperatura)                     independientemente
```

**Regla practica:** antes de decir "A causa B", preguntarse:
1. Hay una explicacion logica de por que A causaria B?
2. Puede haber una tercera variable que afecte a ambas?
3. Se ha controlado esa tercera variable?

**Ejemplo ISELIN:** si encontramos correlacion entre "antigueedad del chofer" y "cantidad de siniestros", no podemos concluir automaticamente que la antigueedad causa siniestros. Puede haber una variable oculta (ej: los choferes nuevos hacen rutas mas peligrosas).

### Lineas de tendencia en PBI

PBI puede agregar lineas de tendencia a graficos de lineas y de dispersion.

**Tipos disponibles:**
- **Lineal**: recta que mejor se ajusta a los datos.
- **Exponencial**: curva que crece/decrece de forma acelerada.
- **Logaritmica**: curva que se aplana con el tiempo.
- **Polinomial**: curva con inflexiones.

**Como agregar:**
1. Seleccionar el grafico.
2. Ir a Formato > Linea de tendencia > Activar.
3. Elegir tipo (empezar con lineal).
4. Activar "Mostrar ecuacion" y "Mostrar R²" para interpretar.

### Forecasting (Prediccion) nativo de PBI

PBI tiene una funcion de **prediccion** integrada en los graficos de lineas que proyecta valores futuros basandose en el patron historico.

**Como activar:**
1. Crear un grafico de lineas con una medida en el eje Y y fechas en el eje X.
2. Ir a Formato > Analisis > Pronostico > Activar.
3. Configurar:
   - **Unidades de pronostico**: cuantos periodos hacia adelante proyectar.
   - **Intervalo de confianza**: tipicamente 95%.
   - **Estacionalidad**: si los datos tienen un patron que se repite (mensual, trimestral).

**Como interpretarlo:**

```
Valores reales          Pronostico
|                          .....
|              *          .     .....   <- Limite superior (95%)
|           *    *    ...               
|        *          *..  .              <- Valor proyectado
|     *           ...    .
|  *           ...       .....         <- Limite inferior (95%)
+----------------------------------------->
  Ene  Feb  Mar  Abr  May  Jun  Jul
  
  Datos historicos |  Pronostico
```

**Intervalo de confianza (la "banda gris"):**
- "Con 95% de confianza, el valor real estara dentro de esta banda."
- Cuanto mas ancha la banda, mayor es la incertidumbre.
- La banda se ensancha a medida que el pronostico se aleja en el tiempo (mas incertidumbre a futuro).

**Limitaciones:**
- No reemplaza un analisis estadistico formal.
- Asume que el patron historico se mantiene.
- No considera eventos externos (ej: una nueva ruta, un cambio regulatorio).
- Util como orientacion, no como certeza.

### Outliers (Valores atipicos)

Un outlier es un dato que se aleja significativamente del patron general.

**Como detectarlos visualmente en PBI:**
1. **Scatter plot**: puntos aislados lejos del grupo principal.
2. **Grafico de lineas con limites**: valores por encima de +2σ o debajo de -2σ.
3. **Box plot**: puntos fuera de los bigotes.
4. **Formato condicional en tablas**: resaltar valores extremos.

**Que hacer con un outlier:**
1. **Investigar**: es un error de datos? (tipico: un cero donde deberia haber un valor, un dato con unidades incorrectas).
2. **Contextualizar**: hubo una razon especifica? (ej: un paro de transporte, un evento especial).
3. **Decidir**: si es un error, corregirlo. Si es real pero excepcional, documentarlo. NO eliminarlo solo porque "molesta" en el grafico.

**Ejemplo ISELIN:** un dia con 0 viajes registrados podria ser un feriado (legitimo) o un error en el sistema de registro (hay que investigar).

---

## PARTE 3: PUBLICACION EN POWER BI SERVICE

### Paso a paso para publicar

```
PBI Desktop                        PBI Service
+------------------+               +------------------+
|  Reporte         |   PUBLICAR    |  Workspace       |
|  terminado       | ------------> |  +-- Dataset      |
|  (.pbix)         |               |  +-- Reporte      |
+------------------+               +------------------+
```

1. En PBI Desktop: **Inicio > Publicar**.
2. Iniciar sesion con la cuenta corporativa (si no esta logueado).
3. Seleccionar el **workspace** de destino (ej: "ISELIN - Logistica").
4. Esperar la confirmacion. PBI sube el dataset y el reporte.
5. Hacer click en el enlace para abrir en PBI Service.

### Organizacion con Workspaces

Los workspaces son **espacios de trabajo** donde se organizan los reportes por equipo o area.

**Estructura sugerida para ISELIN:**

| Workspace | Contenido | Acceso |
|---|---|---|
| ISELIN - Direccion | Dashboard ejecutivo general | Alta Direccion |
| ISELIN - Logistica | KPIs de viajes, rutas, demoras | Logistica, Trafico |
| ISELIN - Calidad | Indicadores de calidad, no conformidades | Calidad, todas las areas |
| ISELIN - Capital Humano | Evaluaciones, KPIs choferes | RRHH, Gerencia |
| ISELIN - Seguridad Vial | Siniestralidad, indicadores viales | Seguridad Vial, Gerencia |
| ISELIN - Compras | Stock, faltantes, gastos | Compras, Administracion |

**Como crear un workspace:**
1. En PBI Service > Workspaces > Crear un area de trabajo.
2. Nombrar el workspace.
3. Agregar miembros y asignar roles (Admin, Miembro, Colaborador, Lector).

### Dashboards vs. Reportes en PBI Service

| Concepto | Reporte | Dashboard |
|---|---|---|
| Que es | Lo que se publica desde PBI Desktop | Un lienzo personalizado creado en PBI Service |
| Paginas | Multiples paginas | Una sola pagina |
| Fuente | Un solo dataset | Puede combinar tiles de multiples reportes |
| Interactividad | Total (filtros, slicers, drillthrough) | Limitada (click lleva al reporte) |
| Uso tipico | Analisis detallado | Vista resumen ejecutiva de alto nivel |

### Compartir reportes

**Opciones de compartir:**

1. **Compartir directo**: Click en "Compartir" > Ingresar correo del destinatario > Enviar.
2. **App**: empaquetar multiples reportes en una "App" que se instala con un click.
3. **Link**: generar un enlace para usuarios internos.

**Roles y permisos:**

| Rol | Puede ver | Puede editar | Puede compartir | Puede publicar |
|---|---|---|---|---|
| Lector | Si | No | No | No |
| Colaborador | Si | Si | No | Si |
| Miembro | Si | Si | Si | Si |
| Admin | Si | Si | Si | Si |

### Seguridad a nivel de fila (RLS) - Concepto basico

RLS permite que **cada usuario vea solo los datos que le corresponden**, usando el mismo reporte.

**Ejemplo:** el jefe de Logistica ve datos de todas las rutas, pero un chofer solo ve sus propios datos.

**Como funciona (simplificado):**
1. En PBI Desktop > Modelado > Administrar roles.
2. Crear un rol (ej: "Chofer") con un filtro DAX: `[Email_Chofer] = USERPRINCIPALNAME()`.
3. Publicar.
4. En PBI Service, asignar usuarios a cada rol.

**Nota:** la configuracion completa de RLS requiere conocimiento tecnico adicional. Para esta capacitacion solo se explica el concepto para que sepan que es posible.

### Alertas de datos

Se pueden configurar alertas para que PBI envie una **notificacion** cuando un KPI supere o baje de un umbral.

**Como:**
1. Anclar un tile (tarjeta con KPI) a un dashboard en PBI Service.
2. Click en los "..." del tile > Administrar alertas.
3. Configurar: "Notificarme cuando el valor sea mayor/menor que X".
4. Elegir frecuencia de verificacion (cada hora, diaria).

**Ejemplo ISELIN:** alerta cuando los siniestros del mes superen 5, o cuando el cumplimiento de objetivos baje del 80%.

---

## PARTE 4: ACTUALIZACION PROGRAMADA (SCHEDULED REFRESH)

### El problema

Los datos en los archivos Excel cambian (se agregan filas nuevas, se actualizan valores), pero el dashboard en PBI Service muestra los datos del momento en que se publico. Si no se actualiza, el dashboard queda desactualizado.

### La solucion: Scheduled Refresh

```
FLUJO DE ACTUALIZACION AUTOMATICA:

1. Excel en OneDrive/SharePoint
   (los usuarios actualizan el Excel normalmente)
        |
        v
2. PBI Service detecta cambios segun la programacion
        |
        v
3. Power Query aplica las transformaciones automaticamente
        |
        v
4. El dataset se actualiza
        |
        v
5. Los reportes y dashboards muestran datos frescos
```

### Ruta recomendada para ISELIN: OneDrive / SharePoint

Dado que ISELIN no tiene gateway configurado, la forma mas simple de lograr actualizacion automatica es:

**Paso 1: Subir los archivos Excel a OneDrive for Business o SharePoint**
- OneDrive for Business: espacio personal de almacenamiento en la nube (incluido en Microsoft 365).
- SharePoint: espacio compartido del equipo (tambien incluido).
- **Recomendacion**: usar SharePoint para archivos compartidos (varios usuarios los actualizan) y OneDrive para archivos individuales.

**Paso 2: Conectar PBI Desktop a los archivos en la nube**
1. En PBI Desktop: Inicio > Obtener datos > Web (o SharePoint folder).
2. Pegar la URL del archivo en OneDrive/SharePoint.
3. Alternativa: Obtener datos > SharePoint Online List.
4. Realizar las transformaciones en Power Query como siempre.
5. Cerrar y aplicar.

**Paso 3: Publicar en PBI Service**
1. Publicar normalmente (Inicio > Publicar).

**Paso 4: Configurar Scheduled Refresh**
1. En PBI Service, ir al workspace donde se publico.
2. Encontrar el **dataset** (no el reporte).
3. Click en "..." > Configuracion.
4. En "Actualizacion programada":
   - Activar la actualizacion.
   - Elegir frecuencia: diaria, semanal, etc.
   - Elegir hora(s): hasta **8 veces al dia** con licencia Pro.
   - Configurar zona horaria.
   - Opcion: recibir notificacion de error por email.
5. Aplicar.

```
Configuracion ejemplo para ISELIN:
+------------------------------------+
| Actualizacion programada           |
|                                    |
| [x] Mantener los datos actualizados|
|                                    |
| Frecuencia: Diaria                |
| Zona horaria: (UTC-03:00) Buenos Aires |
| Hora: 07:00                       |
|       12:00                        |
|                                    |
| [x] Enviar notificacion de        |
|     error de actualizacion a:      |
|     admin@iselin.com.ar            |
+------------------------------------+
```

### Alternativa futura: On-Premises Data Gateway

Si en el futuro ISELIN necesita conectar PBI Service directamente a archivos Excel que estan en la **red local** (no en la nube), se necesita un gateway.

```
Red local ISELIN              Internet                PBI Service (nube)
+------------------+         +--------+              +------------------+
| Archivos Excel   | <-----> |Gateway | <----------> | Dataset          |
| en servidor/PC   |         |        |              | Reporte          |
+------------------+         +--------+              +------------------+
                          (instalado en un
                           PC de la red local,
                           siempre encendido)
```

**Que es:** un programa que se instala en un PC de la red local y actua como "puente" entre los archivos locales y PBI Service.

**Cuando se necesita:**
- Los archivos Excel deben permanecer en la red local (no se pueden mover a la nube).
- Se necesita conectar a bases de datos locales (SQL Server, etc.) en el futuro.

**Requisitos:**
- Un PC o servidor que este siempre encendido y conectado a la red.
- Instalacion del software gateway (gratuito).
- Configuracion por parte de IT.

**Recomendacion para ISELIN:** empezar con OneDrive/SharePoint (sin gateway) y evaluar la necesidad de gateway mas adelante cuando los requerimientos crezcan.

### Monitoreo de actualizaciones

**Como verificar que el refresh funciona:**
1. En PBI Service > Dataset > Historial de actualizaciones.
2. Se ve el historial con fecha, hora, duracion y estado (exito/error).
3. Si falla, se muestra el motivo del error (ej: archivo movido, credenciales expiradas, timeout).

**Errores comunes y solucion:**

| Error | Causa probable | Solucion |
|---|---|---|
| "Credenciales no validas" | Expiro la sesion de OneDrive | Re-ingresar credenciales en Dataset > Configuracion > Credenciales |
| "No se encontro el archivo" | El Excel fue movido o renombrado | Verificar que el archivo esta en la ubicacion original en OneDrive/SharePoint |
| "Timeout" | El archivo es muy grande o la transformacion es compleja | Optimizar Power Query, reducir filas cargadas |
| "Error en Power Query" | Los datos cambiaron de estructura (nueva columna, fila con formato diferente) | Abrir el .pbix en Desktop, ajustar la consulta, re-publicar |

---

## PARTE 5: BUENAS PRACTICAS Y GOBERNANZA

### Nomenclatura sugerida

| Elemento | Convencion | Ejemplo |
|---|---|---|
| Archivo .pbix | `Area_NombreReporte_vX.pbix` | `Logistica_Panel_Operativo_v3.pbix` |
| Tablas (hechos) | `Fact_NombreEnSingular` o simplemente el nombre | `Viajes`, `Siniestros` |
| Tablas (dimensiones) | `Dim_NombreEnSingular` o simplemente el nombre | `Choferes`, `Rutas`, `Calendario` |
| Medidas | Nombre descriptivo sin abreviaciones | `Total Km`, `Viajes con Demora`, `Cumplimiento %` |
| Columnas calculadas | Prefijo `_` para diferenciar de originales (opcional) | `_Rango_Km`, `_Anio_Mes` |
| Workspaces | `Empresa - Area` | `ISELIN - Logistica` |

### Versionado

- Guardar una version antes de hacer cambios grandes: `Panel_Operativo_v3_backup.pbix`.
- Usar una carpeta compartida donde se guarde la version "oficial" del .pbix.
- Definir quien tiene permiso para modificar cada .pbix (idealmente 1-2 personas por area).

### Roles post-capacitacion sugeridos

```
+-------------------+     +-------------------+     +-------------------+
| REFERENTE DE DATO |     | ANALISTA PBI      |     | CONSUMIDOR        |
|                   |     |                   |     |                   |
| Mantiene el Excel |     | Construye y       |     | Consulta los      |
| limpio y          |     | mantiene los      |     | dashboards en     |
| actualizado.      |     | dashboards.       |     | PBI Service o     |
| Valida la calidad |     | Crea medidas y    |     | Mobile.           |
| del dato.         |     | visualizaciones.  |     | Interpreta los    |
|                   |     | Publica y         |     | datos para tomar  |
| 1 por area        |     | configura refresh.|     | decisiones.       |
+-------------------+     +-------------------+     +-------------------+
                                                     Toda la organizacion
```

### Conexion con calidad y mejora continua

El dashboard no es un fin en si mismo. Es una **herramienta del sistema de gestion de calidad** de ISELIN.

```
CICLO PDCA CON POWER BI:

PLANIFICAR:
  - Definir KPIs y metas en el dashboard
  - Establecer lineas base con datos historicos

HACER:
  - Ejecutar los procesos normalmente
  - Los datos se generan automaticamente

VERIFICAR:  <-- AQUI ESTA POWER BI
  - El dashboard muestra en tiempo real (o casi) el estado
  - Alertas avisan cuando algo se desvía
  - Paretos identifican las causas principales

ACTUAR:
  - Tomar decisiones basadas en evidencia
  - Documentar acciones correctivas
  - Verificar impacto en el dashboard (cerrar el ciclo)
```

**El dashboard como evidencia para auditorias:**
- Los reportes de PBI pueden servir como **registros de seguimiento** de indicadores.
- La funcion de exportar a PDF permite generar reportes para carpetas de calidad.
- El historial de datos muestra la **trazabilidad** de las mejoras.

---

## PARTE 6: HOJA DE RUTA POST-CAPACITACION

### Primeros 30 dias (Mayo 2026)

- [ ] Cada referente de area sube sus archivos Excel clave a OneDrive/SharePoint.
- [ ] Cada referente construye al menos 1 dashboard basico de su area.
- [ ] Se publican los dashboards en PBI Service.
- [ ] Se configura al menos 1 scheduled refresh funcional.
- [ ] Se comparte el dashboard ejecutivo con la Alta Direccion.

### 30 a 60 dias (Junio 2026)

- [ ] Se refinan los dashboards con feedback de los usuarios.
- [ ] Se agregan medidas de inteligencia de tiempo (comparaciones interanuales).
- [ ] Se implementa formato condicional y semaforos en KPIs criticos.
- [ ] Se configura al menos 1 alerta de datos.
- [ ] Se documenta cada medida DAX (que mide, como se calcula).

### 60 a 90 dias (Julio 2026)

- [ ] Se evalua la necesidad de gateway para fuentes locales.
- [ ] Se implementa RLS si hay necesidad de seguridad por area.
- [ ] Se crean Apps de PBI para distribucion simplificada.
- [ ] Se realiza una sesion interna de "show & tell" donde cada area presenta su dashboard.
- [ ] Se define un responsable de gobernanza de datos (mantenimiento de workspaces, permisos, refresh).

### Recursos para seguir aprendiendo

| Recurso | URL / Referencia | Contenido |
|---|---|---|
| Microsoft Learn - PBI | Buscar "Power BI" en Microsoft Learn | Cursos gratuitos oficiales con certificacion |
| DAX Guide | dax.guide | Referencia completa de funciones DAX |
| SQLBI | sqlbi.com | Articulos avanzados de DAX y modelado (Marco Russo, Alberto Ferrari) |
| Comunidad PBI | community.powerbi.com | Foro de preguntas y respuestas |
| Guy in a Cube | YouTube | Videos practicos de PBI (en ingles) |
| Curbal | YouTube | Tutoriales de PBI (en ingles, algunos en espanol) |

---

*Material de apoyo - Encuentro 4 | Capacitacion ISELIN en Analisis de Datos con Power BI*
*Abril 2026*
