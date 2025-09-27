📂 **Base de Datos - Proyecto Estaciona Ya** 📂

Este directorio contiene todos los scripts de base de datos del proyecto.
Se organiza por **módulos o features** para que cada desarrollador pueda trabajar de manera independiente sin pisarse.

---

### 🗂 Estructura de carpetas

```
/Database
  /scripts
    /ddl
      /reservas       ← módulo de reservas
      /usuarios       ← módulo de usuarios
      /pagos          ← módulo de pagos
    /trigger           ← triggers
    /store_procedures ← procedimientos almacenados
```

>[!important]
> Cada carpeta dentro de `ddl` corresponde a un módulo o feature y contiene todos los scripts necesarios para crear las tablas, índices y constraints de ese módulo.

---

### 📝 Convenciones de nombres

* **Tablas:** `tb_entity`
  Ejemplo: `tb_users`, `tb_bookings`
* **Índices:** `idx_tabla_columna`
  Ejemplo: `idx_reservas_fecha`
* **Foreign Keys / Constraints:** `fk_tabla_columna_tabla_ref`
  Ejemplo: `fk_reservas_usuario_id_usuarios`
* **Secuencias / Auto-incrementos:** `seq_tabla_columna`
  Ejemplo: `seq_usuarios_id`
* **Triggers:** `tr_name`
  Ejemplo: `tr_calculate_total_amount`

>[!note]
> Estas convenciones ayudan a identificar rápidamente a qué módulo pertenece cada objeto y a evitar conflictos entre desarrolladores.

---

### ⚠️ Control de conflictos

* Cada tabla debe tener un **único responsable** asignado.
* Indicar el responsable en el script con un comentario:
  `-- Responsable: Juan`
* Si dos módulos necesitan relacionarse (por ejemplo, `reservas` y `usuarios`), planificar los **FOREIGN KEY** en un merge coordinado.
* Antes de ejecutar cualquier script local, hacer **pull de los últimos scripts** de los demás módulos para evitar duplicidades o conflictos.
