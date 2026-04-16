# Medidas DAX para el Dashboard ISELIN

## Instrucciones

1. Abrir Power BI Desktop
2. Obtener datos → Excel → seleccionar `datos_iselin.xlsx`
3. Cargar las 5 hojas (Viajes, Choferes, Rutas, Colectivos, Calendario)
4. Ir a la vista de Modelo y crear las relaciones:
   - `Viajes[ID_Chofer]` → `Choferes[ID_Chofer]`
   - `Viajes[ID_Ruta]` → `Rutas[ID_Ruta]`
   - `Viajes[ID_Colectivo]` → `Colectivos[ID_Colectivo]`
   - `Viajes[Fecha]` → `Calendario[Fecha]`
5. Marcar la tabla Calendario como "Tabla de fechas" (Fecha como columna de fecha)
6. Crear las medidas a continuación en una tabla de medidas o en la tabla Viajes

---

## Medidas básicas (Encuentro 1)

```dax
Total Viajes = COUNTROWS(Viajes)
```

```dax
Total Km = SUM(Viajes[Km])
```

```dax
Total Gasoil = SUM(Viajes[Gasoil_Lts])
```

```dax
Total Pasajeros = SUM(Viajes[Pasajeros])
```

```dax
Total Siniestros = CALCULATE(COUNTROWS(Viajes), Viajes[Siniestro] = "Sí")
```

---

## Promedios

```dax
Km Promedio por Viaje = AVERAGE(Viajes[Km])
```

```dax
Gasoil Promedio por Viaje = AVERAGE(Viajes[Gasoil_Lts])
```

```dax
Pasajeros Promedio por Viaje = AVERAGE(Viajes[Pasajeros])
```

```dax
Demora Promedio = AVERAGE(Viajes[Demora_Min])
```

---

## Ratios e indicadores

```dax
Consumo por Km = DIVIDE([Total Gasoil], [Total Km], 0)
```

```dax
Pasajeros por Km = DIVIDE([Total Pasajeros], [Total Km], 0)
```

```dax
Tasa de Siniestralidad =
    DIVIDE(
        [Total Siniestros],
        [Total Viajes],
        0
    ) * 100
```

```dax
% Viajes con Demora =
    DIVIDE(
        CALCULATE(COUNTROWS(Viajes), Viajes[Demora_Min] > 5),
        [Total Viajes],
        0
    ) * 100
```

```dax
% Puntualidad =
    DIVIDE(
        CALCULATE(COUNTROWS(Viajes), Viajes[Demora_Min] <= 5),
        [Total Viajes],
        0
    ) * 100
```

---

## Medidas de variabilidad (para slide de estadísticas)

```dax
Mediana Demora =
    MEDIAN(Viajes[Demora_Min])
```

```dax
Desvío Demora =
    VAR Promedio = AVERAGE(Viajes[Demora_Min])
    VAR N = COUNTROWS(Viajes)
    RETURN
        SQRT(
            DIVIDE(
                SUMX(Viajes, (Viajes[Demora_Min] - Promedio) ^ 2),
                N - 1
            )
        )
```

```dax
Rango Gasoil = MAX(Viajes[Gasoil_Lts]) - MIN(Viajes[Gasoil_Lts])
```

---

## Comparaciones en el tiempo (Encuentro 3)

```dax
Viajes Mes Anterior =
    CALCULATE(
        [Total Viajes],
        DATEADD(Calendario[Fecha], -1, MONTH)
    )
```

```dax
Variación Viajes vs Mes Anterior =
    VAR Actual = [Total Viajes]
    VAR Anterior = [Viajes Mes Anterior]
    RETURN
        DIVIDE(Actual - Anterior, Anterior, 0) * 100
```

```dax
Viajes Acumulado Año =
    TOTALYTD([Total Viajes], Calendario[Fecha])
```

```dax
Gasoil Acumulado Año =
    TOTALYTD([Total Gasoil], Calendario[Fecha])
```

---

## Sugerencia de páginas del dashboard

### Página 1: Resumen ejecutivo
- Tarjetas: Total Viajes, Total Km, Total Gasoil, % Puntualidad
- Gráfico de líneas: Viajes por mes
- Gráfico de barras: Viajes por ruta
- Segmentadores: Mes, Tipo de ruta

### Página 2: Detalle operativo
- Tabla: Viajes por chofer con Km, Gasoil, Demora promedio
- Gráfico de barras: Consumo por Km por colectivo
- Gráfico de anillo: Distribución por turno (Mañana/Tarde)
- Segmentadores: Chofer, Ruta, Período

### Página 3: Calidad y siniestros
- Tarjeta: Tasa de Siniestralidad, % Viajes con Demora
- Gráfico de barras: Siniestros por ruta
- Histograma: Distribución de demoras
- Gráfico de dispersión: Km vs Gasoil (para ver correlación)
