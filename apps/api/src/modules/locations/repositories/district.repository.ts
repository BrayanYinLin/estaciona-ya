import { Repository } from 'typeorm'
import { District } from '../entities/district.entity'
import { AppDataSource } from '@shared/database/data-source'

/**
 * @class DistrictRepository
 * @description Esta clase es responsable de la comunicación directa con la base de datos
 * para todas las operaciones relacionadas con la entidad `District`.
 */
export class DistrictRepository {
  // Declara una propiedad privada para almacenar el repositorio de TypeORM.
  private Districtrepository: Repository<District>

  constructor() {
    // Inicializa el repositorio utilizando la conexión a la base de datos (AppDataSource)
    // y especificando que es para la entidad `District`.
    this.Districtrepository = AppDataSource.getRepository(District)
  }

  /**
   * @method findAll
   * @description Busca y devuelve todos los registros de distritos en la base de datos.
   * @returns {Promise<District[]>} Una promesa que resuelve a un arreglo de entidades `District`.
   */
  async findAll(): Promise<District[]> {
    // Utiliza el método `find()` de TypeORM para ejecutar un `SELECT * FROM ...` en la tabla de distritos.
    return await this.Districtrepository.find()
  }
}
