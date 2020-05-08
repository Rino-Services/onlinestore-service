import { Path, GET } from "typescript-rest";
import { Tags } from "typescript-rest-swagger";
import { Inject } from "typescript-ioc";
import { ProductStoreService } from "../services/product-store.service";

@Tags("Products")
@Path("/store/products")
export class ProductStoreController {
  @Inject productStoreService: ProductStoreService;

  @GET
  @Path("/all")
  public async getAll() {
    // investigar sobre caching
    return this.productStoreService.findAll();
  }
}
