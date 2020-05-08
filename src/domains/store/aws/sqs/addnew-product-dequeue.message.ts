import { DequeueMessage } from "../../../../common/aws/sqs/dequeue-message";
import { AutoSalesOnlineStoreAddnewProductStore as constants } from "./store-urls-sqs.constants";
import { AwsMessage } from "../../../../common/aws/message.model";
import { Inject } from "typescript-ioc";
import { ProductStoreService } from "../../services/product-store.service";
import { logger } from "../../../../common/logger";

export class AddNewProductDequeueMessage extends DequeueMessage {
  @Inject productStoreService: ProductStoreService;
  constructor() {
    super(constants.queueUrl, constants.dequeueServiceName);
  }

  public async processMessage(message: AwsMessage): Promise<any> {
    const values = {
      productId: message.MessageAttributes.ProductId.Value,
      productTitle: message.MessageAttributes.ProductTitle.Value,
      productModel: message.MessageAttributes.ProductModel.Value,
      productDescription: message.MessageAttributes.ProductDescription.Value,
      productDatePublished:
        message.MessageAttributes.ProductDatePublished.Value,
      productStock: message.MessageAttributes.ProductStock.Value,
    };

    logger.debug(
      `${constants.dequeueServiceName} :: processMessage -> ${JSON.stringify(
        values
      )}`
    );

    await this.wait(5000);
  }

  private wait = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));
}
