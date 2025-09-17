# 📋 Tabla de Requisitos – Estaciona Ya

<!-- | RF-004 | El sistema debe permitir ordenar o filtrar por distancia al destino del usuario.     | -->

| ID     | Requisito Funcional Desglosado                                                       |
| ------ | ------------------------------------------------------------------------------------ |
| RF-001 | El sistema debe permitir buscar estacionamientos por distrito.                       |
| RF-002 | El sistema debe permitir buscar estacionamientos por precio.                         |
| RF-003 | El sistema debe mostrar disponibilidad de los estacionamientos.                      |
| RF-005 | El sistema debe mostrar fotos del estacionamiento.                                   |
| RF-006 | El sistema debe mostrar restricciones de uso (horario, tamaño de auto).              |
| RF-007 | El sistema debe mostrar la ubicación exacta en un mapa o dirección.                  |
| RF-008 | El sistema debe permitir ingresar precio del espacio.                                |
| RF-009 | El sistema debe permitir agregar fotos del espacio.                                  |
| RF-010 | El sistema debe permitir ingresar restricciones (ej: horario, tipo de vehículo).     |
| RF-011 | El sistema debe permitir registrar la ubicación exacta.                              |
| RF-012 | El sistema debe permitir publicar múltiples espacios.                                |
| RF-013 | El sistema debe generar confirmación inmediata tras la reserva.                      |
| RF-014 | El sistema debe enviar notificación al cliente cuando es aceptado o rechazado(app).  |
| RF-015 | El sistema debe calcular el monto a cobrar por arrendador.                           |
| RF-016 | El sistema debe permitir seleccionar método de cobro (ej: Yape, pasarela).           |
| RF-017 | El sistema debe procesar el cobro de manera segura.                                  |
| RF-018 | El sistema debe permitir a propietarios aceptar una solicitud.                       |
| RF-019 | El sistema debe permitir a propietarios rechazar una solicitud.                      |
| RF-020 | El sistema debe notificar al arrendatario sobre la decisión.                         |
| RF-021 | El sistema debe permitir registrar un arrendatario.                                  |
| RF-022 | El sistema debe permitir registrar un arrendador.                                    |
| RF-023 | El sistema debe diferenciar roles al iniciar sesión.                                 |
| RF-024 | El sistema debe permitir editar nombre, correo y teléfono.                           |
| RF-025 | El sistema debe permitir cambiar contraseña.                                         |
| RF-026 | El sistema debe permitir gestionar foto de perfil.                                   |
| RF-027 | El sistema debe mostrar historial de actividad (opcional).                           |
| RF-028 | El sistema debe mostrar la calificación promedio del usuario.                        |
| RF-029 | El sistema debe mostrar número de reseñas recibidas.                                 |
| RF-030 | El sistema debe mostrar comentarios textuales de clientes previos.                   |
| RF-031 | El sistema debe permitir filtrar estacionamientos techados.                          |
| RF-032 | El sistema debe permitir filtrar estacionamientos con cámaras.                       |
| RF-033 | El sistema debe permitir filtrar estacionamientos en “zona segura”.                  |
| RF-034 | El sistema debe mostrar el promedio de calificación en la vista del estacionamiento. |
| RF-035 | El sistema debe mostrar comentarios escritos de clientes.                            |
| RF-036 | El sistema debe ordenar reseñas (ej: más recientes, más útiles).                     |
| RF-037 | El sistema debe permitir seleccionar un espacio específico.                          |
| RF-038 | El sistema debe mostrar disponibilidad del espacio seleccionado.                     |
| RF-039 | El sistema debe permitir confirmar la reserva.                                       |
| RF-040 | El sistema debe bloquear el espacio reservado para evitar doble reserva.             |
| RF-041 | El sistema debe integrar una pasarela de pagos en línea.                             |
| RF-042 | El sistema debe validar la transacción de pago.                                      |
| RF-043 | El sistema debe registrar la transacción asociada a la reserva.                      |
| RF-044 | El sistema debe permitir manejar errores de pago (falla, cancelación).               |
| RF-045 | El sistema debe mostrar la política de cancelación.                                  |
| RF-046 | El sistema debe aplicar la política al momento de cancelar.                          |
| RF-047 | El sistema debe permitir al cliente dejar una calificación (1-5 estrellas).          |
| RF-048 | El sistema debe permitir al cliente escribir un comentario.                          |
| RF-049 | El sistema debe mostrar la calificación en el perfil del propietario y espacio.      |
| RF-050 | El propietario debe tener acceso a un calendario de disponibilidad.                  |
| RF-051 | El propietario debe poder modificar disponibilidad (bloquear fechas).                |
| RF-052 | El calendario debe sincronizarse con reservas ya realizadas.                         |
| RF-053 | El propietario debe poder visualizar el perfil del arrendatario.                     |
| RF-054 | El propietario debe poder ver calificación previa del arrendatario.                  |
| RF-055 | El sistema debe calcular la comisión de la plataforma por reserva.                   |
| RF-059  | El sistema debe mostrar la ganancia neta al propietario.                             |
| RF-057 | El sistema debe procesar transferencias de ganancias al propietario.                 |
| RF-058 | El sistema debe soportar múltiples métodos de pago configurables.                    |
| RF-059 | El sistema debe notificar al propietario al completar la transferencia.              |


<!-- | HU-46      | Cancelar reserva                     | 230           | Como arrendatario, quiero cancelar mi reserva siguiendo la política establecida para recibir reembolso.                | -->
## Historias de usuario

| Código     | Título                               | Prioridad     | Descripción                                                                                                            |
| ---------- | ------------------------------------ | ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| HU-01      | Buscar por distrito                  | 5             | Como arrendatario, quiero buscar estacionamientos por distrito para encontrar opciones en la zona que necesito.        |
| HU-02      | Buscar por precio                    | 10            | Como arrendatario, quiero buscar estacionamientos por precio para ajustarme a mi presupuesto.                          |
| HU-03      | Ver disponibilidad                   | 15            | Como arrendatario, quiero ver la disponibilidad de los estacionamientos para evitar reservar un espacio ocupado.       |
| HU-04      | Ordenar por distancia                | 20            | Como arrendatario, quiero ordenar estacionamientos por distancia a mi destino para elegir el más conveniente.          |
| HU-05      | Ver fotos                            | 25            | Como arrendatario, quiero ver fotos del estacionamiento para evaluar si es adecuado para mi vehículo.                  |
| HU-06      | Ver restricciones                    | 30            | Como arrendatario, quiero ver las restricciones de uso (horarios, tamaño de auto) para confirmar compatibilidad.       |
| HU-07      | Ver ubicación exacta                 | 35            | Como arrendatario, quiero ver la ubicación exacta del estacionamiento en un mapa para saber cómo llegar.               |
| HU-08      | Ingresar precio                      | 40            | Como arrendador, quiero ingresar el precio del espacio para definir cuánto cobraré.                                    |
| HU-09      | Agregar fotos                        | 45            | Como arrendador, quiero agregar fotos de mi espacio para atraer a potenciales clientes.                                |
| HU-10      | Especificar restricciones            | 50            | Como arrendador, quiero especificar restricciones (horario, tipo de vehículo) para evitar malos entendidos.            |
| HU-11      | Registrar ubicación                  | 55            | Como arrendador, quiero registrar la ubicación exacta del espacio para que los arrendatarios lo encuentren fácilmente. |
| HU-12      | Publicar múltiples espacios          | 60            | Como arrendador, quiero publicar múltiples espacios para ofrecer varias opciones en la plataforma.                     |
| HU-13      | Confirmación inmediata               | 65            | Como arrendatario, quiero recibir una confirmación inmediata tras la reserva para tener tranquilidad.                  |
| HU-14      | Notificación de reserva              | 70            | Como arrendatario, quiero recibir una notificación de mi reserva por correo o app para estar informado.                |
| HU-15      | Calcular monto a cobrar              | 75            | Como arrendador, quiero que el sistema calcule automáticamente el monto que debo cobrar por mis reservas.              |
| HU-16      | Elegir método de cobro               | 80            | Como arrendador, quiero elegir el método de cobro (ej: Yape o pasarela) para recibir mis ganancias.                    |
| HU-17      | Procesar cobro seguro                | 85            | Como arrendador, quiero que el sistema procese mis cobros de manera segura para evitar fraudes.                        |
| HU-18      | Aceptar solicitud                    | 90            | Como arrendador, quiero aceptar solicitudes de reserva para decidir quién usa mi espacio.                              |
| HU-19      | Rechazar solicitud                   | 95            | Como arrendador, quiero rechazar solicitudes de reserva para mantener el control de mis espacios.                      |
| HU-20      | Notificación de decisión             | 100           | Como arrendatario, quiero recibir una notificación si mi solicitud fue aceptada o rechazada.                           |
| HU-21      | Registro de arrendatario             | 105           | Como arrendatario, quiero registrarme en la plataforma como cliente para poder reservar estacionamientos.              |
| HU-22      | Registro de arrendador               | 110           | Como arrendador, quiero registrarme en la plataforma como propietario para poder ofrecer mis espacios.                 |
| HU-23      | Diferenciar roles                    | 115           | Como usuario, quiero que el sistema diferencie mi rol al iniciar sesión para acceder a las funciones correctas.        |
| HU-24      | Editar datos personales              | 120           | Como usuario, quiero poder editar mi nombre, correo y teléfono para mantener mi información actualizada.               |
| HU-25      | Cambiar contraseña                   | 125           | Como usuario, quiero poder cambiar mi contraseña para mantener mi cuenta segura.                                       |
| HU-26      | Gestionar foto de perfil             | 130           | Como usuario, quiero gestionar mi foto de perfil para personalizar mi cuenta.                                          |
| HU-27      | Ver historial de actividad           | 135           | Como usuario, quiero ver mi historial de actividad para revisar mis interacciones previas en la plataforma.            |
| HU-28      | Mostrar calificación promedio        | 140           | Como usuario, quiero que se muestre mi calificación promedio para que otros usuarios confíen en mí.                    |
| HU-29      | Mostrar número de reseñas            | 145           | Como usuario, quiero ver el número de reseñas que he recibido para medir mi reputación.                                |
| HU-30      | Mostrar comentarios recibidos        | 150           | Como usuario, quiero ver los comentarios que otros clientes dejaron sobre mí para conocer mi reputación.               |
| HU-31      | Filtrar por techado                  | 155           | Como arrendatario, quiero filtrar estacionamientos techados para encontrar opciones más seguras.                       |
| HU-32      | Filtrar por cámaras                  | 160           | Como arrendatario, quiero filtrar estacionamientos con cámaras para mayor seguridad.                                   |
| HU-33      | Filtrar por zona segura              | 165           | Como arrendatario, quiero filtrar estacionamientos en zonas seguras para mayor confianza.                              |
| HU-34      | Ver promedio de calificación         | 170           | Como arrendatario, quiero ver el promedio de calificación de un estacionamiento en su página de detalle.               |
| HU-35      | Ver comentarios de clientes          | 175           | Como arrendatario, quiero ver los comentarios de otros clientes en la página de detalle de un estacionamiento.         |
| HU-36      | Ordenar reseñas                      | 180           | Como arrendatario, quiero ordenar reseñas por fecha o relevancia para encontrar la información más útil.               |
| HU-37      | Seleccionar espacio específico       | 185           | Como arrendatario, quiero seleccionar un espacio específico al momento de reservar.                                    |
| HU-38      | Ver disponibilidad antes de reservar | 190           | Como arrendatario, quiero ver la disponibilidad del espacio antes de confirmar la reserva.                             |
| HU-39      | Confirmar reserva                    | 195           | Como arrendatario, quiero confirmar mi reserva para asegurar mi espacio.                                               |
| HU-40      | Bloqueo automático de espacio        | 200           | Como arrendatario, quiero que el sistema bloquee automáticamente el espacio reservado para evitar duplicidad.          |
| HU-41      | Pagar reserva en línea               | 205           | Como arrendatario, quiero pagar mi reserva mediante pasarela de pagos en línea para mayor comodidad.                   |
| HU-42      | Validar pago                         | 210           | Como arrendatario, quiero que el sistema valide mi transacción de pago para confirmar que fue exitosa.                 |
| HU-43      | Registrar pago con reserva           | 215           | Como arrendatario, quiero que el sistema registre mi pago junto con la reserva para tener un comprobante.              |
| HU-44      | Manejar errores de pago              | 220           | Como arrendatario, quiero recibir un mensaje de error claro si mi pago falla o se cancela.                             |
| HU-46      | Calificar estacionamiento            | 230           | Como arrendatario, quiero dejar una calificación (1-5 estrellas) después de usar un estacionamiento.                   |
| HU-47      | Escribir reseña                      | 235           | Como arrendatario, quiero escribir un comentario sobre mi experiencia para ayudar a futuros clientes.                  |
| HU-48      | Mostrar calificación en perfil       | 240           | Como arrendatario, quiero que mi calificación se muestre en el perfil del propietario y del estacionamiento.           |
| HU-49      | Calendario de disponibilidad         | 245           | Como arrendador, quiero tener un calendario para definir la disponibilidad de mis espacios.                            |
| HU-50      | Modificar disponibilidad             | 250           | Como arrendador, quiero modificar la disponibilidad de mi espacio para bloquear fechas no disponibles.                 |
| HU-51      | Sincronizar calendario               | 255           | Como arrendador, quiero que mi calendario se sincronice automáticamente con reservas confirmadas.                      |
| HU-52      | Ver perfil de arrendatario           | 260           | Como arrendador, quiero ver el perfil del cliente que solicita una reserva para conocerlo antes de aceptar.            |
| HU-53      | Ver calificación de arrendatario     | 265           | Como arrendador, quiero ver la calificación previa del cliente para tomar decisiones informadas.                       |
| HU-54      | Calcular comisión                    | 270           | Como arrendador, quiero que el sistema calcule automáticamente la comisión de cada reserva.                            |
| HU-55      | Mostrar ganancia neta                | 275           | Como arrendador, quiero ver la ganancia neta de cada reserva para tener claridad en mis ingresos.                      |
| HU-57      | Transferencia automática             | 280           | Como arrendador, quiero recibir la transferencia de mis ganancias de manera automática.                                |
| HU-58      | Configurar métodos de pago           | 285           | Como arrendador, quiero configurar diferentes métodos de pago para recibir mis ganancias.                              |
| HU-59      | Notificación de transferencia        | 290           | Como arrendador, quiero recibir una notificación cuando mis ganancias sean transferidas con éxito.                     |


<!-- | RF-047 | El sistema debe procesar reembolsos según la política.                               | -->
<!-- | HU-46      | Procesar reembolso                   | 235           | Como arrendatario, quiero que el sistema procese mi reembolso automáticamente según la política.                       | -->