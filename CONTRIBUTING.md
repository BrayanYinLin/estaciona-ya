# 🚗 Contribuyendo a **Estaciona Ya** 🚗

---

>[!important]
>- Siempre trabaja desde **main actualizado** para evitar conflictos y “envejecimiento” de tu rama.
>- Mantener tu repositorio limpio ayuda a todos a no perder tiempo con ramas antiguas o duplicadas.
>- Este flujo aplica **para todas las funcionalidades, fixes o mejoras**, no solo para features grandes.

>[!warning]
>Tú rama no será fusionada con la rama main si presenta problemas de fusión por no seguir la reglas del flujo de trabajo, queda a responsabilidad el tiempo extra necesario para cumplir con el entregable

### 🔧 Flujo de trabajo

1. **Clona** el repositorio (solo la primera vez):

   ```bash
   git clone https://github.com/BrayanYinLin/estaciona-ya.git
   cd estaciona-ya
   ```

2. **Actualiza tu rama main antes de trabajar**
   Siempre que vayas a empezar una nueva funcionalidad o cambio:

   ```bash
   git checkout main # Para asegurarte que la nueva funcionalidad parte de main
   git pull origin main # Esto para asegurarte de que estas trabajando sobre los cambios más recientes
   ```

3. **Crea tu rama** a partir de main actualizada:

   ```bash
   git checkout -b nombre-de-rama # e.g. feat-reservar-estacionamiento, fix-fechas-reserva, etc.
   ```

4. **Trabaja en tu funcionalidad o fix**
   - Haz cambios pequeños y claros.
   - Si hay tests para tu módulo, ejecútalos antes del commit.  
     Si no hay tests, documenta tus cambios (diagramas, comentarios, etc.). Puedes apoyarte en IA para generar diagramas o resúmenes visuales que guardaras en la carpeta `docs`.
   - Haz commits siguiendo el **formato de Conventional Commits**

5. **Sube tu rama** al repositorio remoto:

   ```bash
   git push origin nombre-de-rama
   ```

6. **Abre un Pull Request (PR)**
   - Describe claramente qué problema resuelve o qué funcionalidad agrega.
   - Espera la revisión y aprobación del equipo.

7. **Después de mergear tu PR**
   - Ve a la rama `main` y trae los últimos cambios:

     ```bash
     git checkout main
     git pull origin main
     ```

   - **Elimina tu rama de funcionalidad** localmente:

     ```bash
     git branch -d nombre-de-rama         # local
     ```

---

### 📝 Formato de commits

Usamos **Conventional Commits** para mantener claridad en la historia del proyecto.

Estructura:
`tipo(área): mensaje`

Ejemplos:

- `feat(api): autenticación agregada`
- `fix(ui): corregido error en el buscador`
- `chore(config): agregado eslint`
- `docs(readme): actualización de instrucciones`

Tipos principales:

- 🚀 **feat** → nueva funcionalidad
- 🐞 **fix** → corrección de errores
- 📖 **docs** → documentación
- 🎨 **ui** → cambios en la interfaz de usuario que no afecten la lógica
- 🛠 **refactor** → reestructuración interna de código, es decir, rescribiste codigo ya hecho
- ✅ **test** → pruebas
- ⚙️ **chore** → mantenimiento y configuración (archivos .env, configuraciones para la base de datos, etc)

---

### ✅ Buenas prácticas

- Código **limpio y formateado** (ESLint).
- Commits **pequeños y descriptivos**.
- Ramas **enfocadas en un cambio específico**.
- Documenta lo necesario en tu PR para que otros entiendan rápido.
