import { Request, Response } from 'express'
import { DistrictService } from '@locations/services/district.service'

// Se crea una instancia del servicio para que el controlador pueda usarla.
const districtService = new DistrictService()

/**
 * @class DistrictController
 * @description Maneja las peticiones HTTP entrantes (requests) y envía las respuestas (responses)
 * para el recurso de distritos.
 */
export class DistrictController {
  /**
   * @method getAll
   * @description Maneja la petición GET para obtener todos los distritos.
   * @param {Request} req - El objeto de la solicitud Express.
   * @param {Response} res - El objeto de la respuesta Express.
   * @returns {Promise<Response>} Una promesa que resuelve a un objeto de respuesta Express.
   */
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      // Llama al servicio para obtener la lista de todos los distritos.
      const districts = await districtService.getAll()

      // Comprueba si la respuesta del servicio está vacía o es nula.
      if (!districts || districts.length === 0) {
        // Si no se encuentran distritos, devuelve un código de estado 404 (Not Found).
        return res.status(404).json({ message: 'No se encontraron distritos' })
      }

      // Si todo sale bien, devuelve un código de estado 200 (OK) y la lista de distritos.
      return res.status(200).json(districts)
    } catch (error: unknown) {
      // Si ocurre cualquier error en el servicio o el repositorio, se captura aquí.
      // Devuelve un código de estado 500 (Internal Server Error) para indicar un fallo.
      return res.status(500).json({
        message: 'Error al obtener los distritos',
        // Incluye el mensaje de error para facilitar la depuración.
        error: error instanceof Error ? error.message : String(error)
      })
    }
  }
}
