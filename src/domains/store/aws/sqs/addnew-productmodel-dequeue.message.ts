import { DequeueMessage } from "../../../../common/aws/sqs/dequeue-message";
import { AutoSalesOnlineStoreAddnewProductModelStore as constants } from "./store-urls-sqs.constants";
import { AwsMessage } from "../../../../common/aws/message.model";
import { Inject } from "typescript-ioc";
import { ProductStoreService } from "../../services/product-store.service";
import { logger } from "../../../../common/logger";

export class AddNewProductModelDequeueMessage extends DequeueMessage {
  @Inject productStoreService: ProductStoreService;
  constructor() {
    super(constants.queueUrl, constants.dequeueServiceName);
  }

  public async processMessage(message: AwsMessage): Promise<any> {
    const values = {
      productId: message.MessageAttributes.ProductId.Value,
      productModelId: message.MessageAttributes.ProductModelId.Value,
      productTitle: message.MessageAttributes.ProductModelDescription.Value,
      productDescription: message.MessageAttributes.ProductModelQtyItems.Value,
      productDatePublished:
        message.MessageAttributes.ProductModelTitleSpecs.Value,
      productModelValueSpecs:
        message.MessageAttributes.ProductModelValueSpecs.Value,
      productModelCurrentPrice:
        message.MessageAttributes.ProductModelCurrentPrice.Value,
      productModelMarketing:
        message.MessageAttributes.ProductModelMarketing.Value,
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
