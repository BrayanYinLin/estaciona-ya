# 📋 Tabla de Requisitos – Estaciona Ya

| ID   | Tipo      | Requisito                                                                  |
| ---- | --------- | -------------------------------------------------------------------------- |
| RF1  | Funcional | El usuario debe poder registrarse, iniciar sesión y gestionar su perfil.   |
| RF2  | Funcional | El arrendador puede crear, editar y eliminar publicaciones de garages.     |
| RF3  | Funcional | El usuario puede buscar garages por ubicación, precio y tipo de renta.     |
| RF4  | Funcional | El usuario puede solicitar una reserva (hora, día o mes).                  |
| RF5  | Funcional | El sistema debe calcular el precio de la reserva y agregar una comisión.   |
| RF6  | Funcional | Cada reserva inicia con estado **Pendiente**.                              |
| RF7  | Funcional | El arrendador debe confirmar o rechazar la solicitud de reserva.           |
| RF8  | Funcional | Si la reserva es aceptada → pasa a estado **Sin pagar**.                   |
| RF9  | Funcional | El usuario debe poder realizar el pago después de la aceptación.           |
| RF10 | Funcional | Tras pago exitoso → estado cambia a **Pagado**.                            |
| RF11 | Funcional | El usuario obtiene acceso al garage según modalidad (mes, día, hora).      |
| RF12 | Funcional | El usuario puede calificar el garage después de usarlo.                    |
| RF13 | Funcional | El sistema debe mostrar un **feed personalizado** con espacios relevantes. |

---

## ⚙️ Requisitos no funcionales

| ID   | Tipo         | Requisito                                                                  |
| ---- | ------------ | -------------------------------------------------------------------------- |
| RNF1 | No funcional | El sistema debe tener interfaz web responsiva y accesible.                 |
| RNF2 | No funcional | La plataforma debe soportar múltiples usuarios concurrentes.               |
| RNF3 | No funcional | La seguridad de credenciales debe manejarse con encriptación (ej. bcrypt). |
| RNF4 | No funcional | La comunicación cliente-servidor debe ser mediante API REST.               |
| RNF5 | No funcional | El sistema debe manejar los estados de la reserva de forma consistente.    |
| RNF7 | No funcional | El sistema debe registrar logs básicos de errores y transacciones.         |
| RNF8 | No funcional | El sistema debe usar JWT para autenticar                                   |
