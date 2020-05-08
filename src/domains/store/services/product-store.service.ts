import { IModelService } from "../interfaces/model-service.interface";
import { MongoConnection } from "../../../mongo.conection";
import { ProductStore } from "../../../models/store/product-store.model";
import { logger } from "../../../common/logger";

export class ProductStoreService implements IModelService {
  private readonly collection: string = "productStore";
  private readonly db = () =>
    MongoConnection.client.db().collection(this.collection);
  private readonly logMessage: string = "ProductStoreService :: ";

  public findById<T>(id: T): Promise<ProductStore> {
    const logMethodMessage: string = `${this.logMessage} findById ->`;
    return new Promise((resolve, reject) => {
      this.db().findOne({ productId: id }, (err, result) => {
        if (result) {
          logger.debug(`${logMethodMessage} -> ${JSON.stringify(result)}`);
          resolve(result);
        } else {
          logger.error(`${logMethodMessage} -> ${JSON.stringify(err)}`);
          reject(null);
        }
      });
    });
  }
  public async findAll(): Promise<Array<ProductStore>> {
    const logMethodMessage: string = `${this.logMessage} findById ->`;
    const result: Array<ProductStore> = await this.db().find().toArray();
    logger.debug(`${logMethodMessage} -> ${JSON.stringify(result)}`);
    return result;
  }

  // not implement yet
  /**
   *
   * @param modelDto
   */
  addNew(modelDto: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  update<T>(id: T, model: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
