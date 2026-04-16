# Buenas Practicas y Gobernanza de Datos en Power BI

## ISELIN - Documento de referencia post-capacitacion

---

## 1. NOMENCLATURA Y ESTANDARES

### Archivos .pbix

**Formato:** `[Area]_[NombreReporte]_v[Version].pbix`

| Ejemplo | Descripcion |
|---|---|
| `Logistica_Panel_Operativo_v1.pbix` | Primera version del panel operativo de Logistica |
| `Calidad_Indicadores_Mensuales_v3.pbix` | Tercera version del reporte de indicadores de Calidad |
| `RRHH_Evaluacion_Desempeno_v2.pbix` | Segunda version del reporte de evaluacion de RRHH |

### Tablas

| Tipo | Convencion | Ejemplos |
|---|---|---|
| Tabla de hechos | Nombre en plural, descriptivo | `Viajes`, `Siniestros`, `Boletos` |
| Tabla de dimensiones | Nombre en singular o plural, descriptivo | `Choferes`, `Rutas`, `Calendario` |
| Tabla de medidas | `_Medidas` (con guion bajo para que aparezca primera) | `_Medidas` |

### Medidas DAX

| Convencion | Ejemplo |
|---|---|
| Nombre completo, sin abreviaciones | `Total Viajes`, no `TV` o `TotVj` |
| Incluir unidad si aplica | `Km Totales`, `Demora Promedio (min)` |
| Porcentajes con `%` al final | `Cumplimiento %`, `Variacion Km %` |
| Prefijo para medidas auxiliares | `_Aux Km Anterior` (para medidas internas que el usuario final no usa) |

### Columnas

- No usar caracteres especiales (tildes, ene, espacios al inicio/final).
- Usar CamelCase o separar con guion bajo: `Nombre_Chofer` o `NombreChofer`.
- Nombres descriptivos: `Fecha_Viaje` en lugar de `Col1` o `F1`.

---

## 2. ORGANIZACION DE WORKSPACES EN PBI SERVICE

### Estructura recomendada

```
ISELIN (organizacion)
|
+-- ISELIN - Direccion General
|   +-- Dashboard Ejecutivo
|   +-- KPIs Globales
|
+-- ISELIN - Logistica
|   +-- Panel Operativo
|   +-- Detalle por Ruta
|
+-- ISELIN - Calidad
|   +-- Indicadores de Calidad
|   +-- No Conformidades
|
+-- ISELIN - Capital Humano
|   +-- Evaluaciones
|   +-- KPIs Choferes
|
+-- ISELIN - Seguridad Vial
|   +-- Siniestralidad
|
+-- ISELIN - Compras
|   +-- Stock y Faltantes
|
+-- ISELIN - Desarrollo (pruebas)
    +-- Reportes en desarrollo (no compartir)
```

### Reglas de acceso

- Cada area tiene acceso a su propio workspace como **Miembro** (puede ver y editar).
- La Direccion General tiene acceso de **Lector** a todos los workspaces.
- El workspace de "Desarrollo" es solo para pruebas; nunca se comparte con usuarios finales.
- Los analistas PBI son **Admin** de los workspaces que mantienen.

---

## 3. FLUJO DE TRABAJO PARA ACTUALIZACION DE DATOS

### Flujo diario/semanal

```
1. El responsable del dato actualiza el archivo Excel
   (en OneDrive o SharePoint)
         |
         v
2. PBI Service ejecuta el refresh programado
   (automatico, segun la configuracion)
         |
         v
3. Los dashboards se actualizan
         |
         v
4. Los usuarios consultan datos frescos
         |
         v
5. Si falla el refresh, el admin recibe notificacion
   y corrige el problema
```

### Responsabilidades

| Rol | Responsabilidad | Frecuencia |
|---|---|---|
| Referente de dato (area) | Mantener el Excel actualizado y con formato correcto | Segun frecuencia del dato |
| Analista PBI | Verificar que los refresh funcionan, corregir errores | Semanal |
| Analista PBI | Actualizar medidas y visualizaciones segun necesidad | Mensual o a demanda |
| Admin workspace | Gestionar permisos, crear/eliminar workspaces | A demanda |
| Consumidor | Consultar dashboards y reportar anomalias | Continuo |

---

## 4. CHECKLIST DE MANTENIMIENTO MENSUAL

### Para el Analista PBI

- [ ] Verificar que todos los scheduled refresh estan funcionando (Historial de actualizaciones).
- [ ] Revisar si hay errores de datos reportados por usuarios.
- [ ] Verificar que las credenciales de OneDrive/SharePoint no hayan expirado.
- [ ] Revisar si se necesitan nuevas medidas o ajustes a las existentes.
- [ ] Documentar cualquier cambio realizado en los reportes.
- [ ] Hacer backup del .pbix antes de modificaciones importantes.

### Para el Referente de dato

- [ ] Verificar que la estructura del Excel no cambio (mismas columnas, mismo formato).
- [ ] Asegurarse de que no hay filas vacias intermedias.
- [ ] Confirmar que los datos del periodo estan completos.
- [ ] Notificar al Analista PBI si hubo algun cambio en la fuente de datos.

---

## 5. RESOLUCION DE PROBLEMAS COMUNES

| Problema | Diagnostico | Solucion |
|---|---|---|
| El dashboard no muestra datos nuevos | El refresh fallo o no esta programado | Verificar historial de refresh en PBI Service |
| Un grafico muestra "(En blanco)" | Hay valores nulos o la relacion entre tablas es incorrecta | Verificar datos en Power Query y relaciones en el modelo |
| Un KPI muestra un valor incorrecto | La medida DAX tiene un error o el contexto de filtro es inesperado | Abrir el .pbix en Desktop y verificar la formula |
| No se puede publicar | Falta de permisos en el workspace | Contactar al Admin del workspace |
| El reporte se ve diferente en PBI Service que en Desktop | Algunos visuals o fuentes no se renderizan igual en la web | Usar fuentes estandar, verificar compatibilidad de visuals |
| El archivo es muy lento | Demasiadas filas o medidas complejas | Filtrar datos innecesarios en Power Query, optimizar DAX |

---

## 6. SEGURIDAD Y CONFIDENCIALIDAD

- No compartir reportes fuera de la organizacion sin autorizacion.
- Los archivos .pbix contienen los datos completos: tratarlos como informacion confidencial.
- Usar RLS cuando diferentes areas no deben ver datos de otras.
- No incluir datos personales sensibles (DNI, sueldos) en dashboards de acceso general.
- Al exportar a PDF o PowerPoint, considerar quien tendra acceso al archivo resultante.

---

*Documento de buenas practicas - Capacitacion ISELIN en Analisis de Datos con Power BI*
*Abril 2026*
