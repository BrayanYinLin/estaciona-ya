import { DistrictRepository } from '../repositories/district.repository'
import { District } from '../entities/district.entity'

/**
 * @class DistrictService
 * @description Contiene la lógica de negocio para los distritos. Actúa como
 * intermediario entre el controlador y el repositorio.
 */
export class DistrictService {
  // Declara una propiedad privada para mantener una instancia del repositorio.
  private districtRepository: DistrictRepository

  constructor() {
    // Crea una nueva instancia del `DistrictRepository` para poder acceder a la base de datos.
    this.districtRepository = new DistrictRepository()
  }

  /**
   * @method getAll
   * @description Obtiene todos los distritos registrados llamando a la capa del repositorio.
   * @returns {Promise<District[]>} Una promesa que resuelve a una lista de distritos.
   */
  async getAll(): Promise<District[]> {
    // Llama al método `findAll()` del repositorio para obtener los datos.
    return await this.districtRepository.findAll()
  }
}
