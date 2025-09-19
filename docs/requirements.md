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
| RF-059 | El sistema debe mostrar la ganancia neta al propietario.                             |
| RF-057 | El sistema debe procesar transferencias de ganancias al propietario.                 |
| RF-058 | El sistema debe soportar múltiples métodos de pago configurables.                    |
| RF-059 | El sistema debe notificar al propietario al completar la transferencia.              |

<!-- | HU-46      | Cancelar reserva                     | 230           | Como arrendatario, quiero cancelar mi reserva siguiendo la política establecida para recibir reembolso.                | -->

## Historias de usuario

| ID    | Historia de Usuario                                                                                                    | Puntos |
| ----- | ---------------------------------------------------------------------------------------------------------------------- | ------ |
| HU-1  | Como arrendatario, quiero registrarme en la plataforma como cliente para poder reservar estacionamientos.              | 5      |
| HU-2  | Como arrendador, quiero registrarme en la plataforma como propietario para poder ofrecer mis espacios.                 | 10     |
| HU-3  | Como usuario, quiero que el sistema diferencie mi rol al iniciar sesión para acceder a las funciones correctas.        | 15     |
| HU-4  | Como usuario, quiero poder editar mi nombre, correo y teléfono para mantener mi información actualizada.               | 20     |
| HU-5  | Como usuario, quiero poder cambiar mi contraseña para mantener mi cuenta segura.                                       | 25     |
| HU-6  | Como usuario, quiero gestionar mi foto de perfil para personalizar mi cuenta.                                          | 30     |
| HU-7  | Como arrendatario, quiero buscar estacionamientos por distrito para encontrar opciones en la zona que necesito.        | 35     |
| HU-8  | Como arrendatario, quiero buscar estacionamientos por precio para ajustarme a mi presupuesto.                          | 40     |
| HU-9  | Como arrendatario, quiero ver la disponibilidad de los estacionamientos para evitar reservar un espacio ocupado.       | 45     |
| HU-10 | Como arrendatario, quiero ordenar estacionamientos por distancia a mi destino para elegir el más conveniente.          | 50     |
| HU-11 | Como arrendatario, quiero ver fotos del estacionamiento para evaluar si es adecuado para mi vehículo.                  | 55     |
| HU-12 | Como arrendatario, quiero ver las restricciones de uso (horarios, tamaño de auto) para confirmar compatibilidad.       | 60     |
| HU-13 | Como arrendatario, quiero ver la ubicación exacta del estacionamiento en un mapa para saber cómo llegar.               | 65     |
| HU-14 | Como arrendador, quiero ingresar el precio del espacio para definir cuánto cobraré.                                    | 70     |
| HU-15 | Como arrendador, quiero agregar fotos de mi espacio para atraer a potenciales clientes.                                | 75     |
| HU-16 | Como arrendador, quiero especificar restricciones (horario, tipo de vehículo) para evitar malos entendidos.            | 80     |
| HU-17 | Como arrendador, quiero registrar la ubicación exacta del espacio para que los arrendatarios lo encuentren fácilmente. | 85     |
| HU-18 | Como arrendador, quiero publicar múltiples espacios para ofrecer varias opciones en la plataforma.                     | 90     |
| HU-19 | Como arrendatario, quiero recibir una confirmación inmediata tras la reserva para tener tranquilidad.                  | 95     |
| HU-20 | Como arrendatario, quiero recibir una notificación de mi reserva por correo o app para estar informado.                | 100    |
| HU-21 | Como arrendador, quiero que el sistema calcule automáticamente el monto que debo cobrar por mis reservas.              | 105    |
| HU-22 | Como arrendador, quiero elegir el método de cobro (ej: Yape o pasarela) para recibir mis ganancias.                    | 110    |
| HU-23 | Como arrendador, quiero que el sistema procese mis cobros de manera segura para evitar fraudes.                        | 115    |
| HU-24 | Como arrendador, quiero aceptar solicitudes de reserva para decidir quién usa mi espacio.                              | 120    |
| HU-25 | Como arrendador, quiero rechazar solicitudes de reserva para mantener el control de mis espacios.                      | 125    |
| HU-26 | Como arrendatario, quiero recibir una notificación si mi solicitud fue aceptada o rechazada.                           | 130    |
| HU-27 | Como usuario, quiero ver mi historial de actividad para revisar mis interacciones previas en la plataforma.            | 135    |
| HU-28 | Como usuario, quiero que se muestre mi calificación promedio para que otros usuarios confíen en mí.                    | 140    |
| HU-29 | Como usuario, quiero ver el número de reseñas que he recibido para medir mi reputación.                                | 145    |
| HU-30 | Como usuario, quiero ver los comentarios que otros clientes dejaron sobre mí para conocer mi reputación.               | 150    |
| HU-31 | Como arrendatario, quiero filtrar estacionamientos techados para encontrar opciones más seguras.                       | 155    |
| HU-32 | Como arrendatario, quiero filtrar estacionamientos con cámaras para mayor seguridad.                                   | 160    |
| HU-33 | Como arrendatario, quiero filtrar estacionamientos en zonas seguras para mayor confianza.                              | 165    |
| HU-34 | Como arrendatario, quiero ver el promedio de calificación de un estacionamiento en su página de detalle.               | 170    |
| HU-35 | Como arrendatario, quiero ver los comentarios de otros clientes en la página de detalle de un estacionamiento.         | 175    |
| HU-36 | Como arrendatario, quiero ordenar reseñas por fecha o relevancia para encontrar la información más útil.               | 180    |
| HU-37 | Como arrendatario, quiero seleccionar un espacio específico al momento de reservar.                                    | 185    |
| HU-38 | Como arrendatario, quiero ver la disponibilidad del espacio antes de confirmar la reserva.                             | 190    |
| HU-39 | Como arrendatario, quiero confirmar mi reserva para asegurar mi espacio.                                               | 195    |
| HU-40 | Como arrendatario, quiero que el sistema bloquee automáticamente el espacio reservado para evitar duplicidad.          | 200    |
| HU-41 | Como arrendatario, quiero pagar mi reserva mediante pasarela de pagos en línea para mayor comodidad.                   | 205    |
| HU-42 | Como arrendatario, quiero que el sistema valide mi transacción de pago para confirmar que fue exitosa.                 | 210    |
| HU-43 | Como arrendatario, quiero que el sistema registre mi pago junto con la reserva para tener un comprobante.              | 215    |
| HU-44 | Como arrendatario, quiero recibir un mensaje de error claro si mi pago falla o se cancela.                             | 220    |
| HU-45 | Como arrendatario, quiero dejar una calificación (1-5 estrellas) después de usar un estacionamiento.                   | 225    |
| HU-46 | Como arrendatario, quiero escribir un comentario sobre mi experiencia para ayudar a futuros clientes.                  | 230    |
| HU-47 | Como arrendatario, quiero que mi calificación se muestre en el perfil del propietario y del estacionamiento.           | 235    |
| HU-48 | Como arrendador, quiero tener un calendario para definir la disponibilidad de mis espacios.                            | 240    |
| HU-49 | Como arrendador, quiero modificar la disponibilidad de mi espacio para bloquear fechas no disponibles.                 | 245    |
| HU-50 | Como arrendador, quiero que mi calendario se sincronice automáticamente con reservas confirmadas.                      | 250    |
| HU-51 | Como arrendador, quiero ver el perfil del cliente que solicita una reserva para conocerlo antes de aceptar.            | 255    |
| HU-52 | Como arrendador, quiero ver la calificación previa del cliente para tomar decisiones informadas.                       | 260    |
| HU-53 | Como arrendador, quiero que el sistema calcule automáticamente la comisión de cada reserva.                            | 265    |
| HU-54 | Como arrendador, quiero ver la ganancia neta de cada reserva para tener claridad en mis ingresos.                      | 275    |
| HU-55 | Como arrendador, quiero recibir la transferencia de mis ganancias de manera automática.                                | 280    |
| HU-56 | Como arrendador, quiero configurar diferentes métodos de pago para recibir mis ganancias.                              | 285    |
| HU-57 | Como arrendador, quiero recibir una notificación cuando mis ganancias sean transferidas con éxito.                     | 290    |
