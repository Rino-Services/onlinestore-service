import { DequeueMessage } from "../../../../common/aws/sqs/dequeue-message";
import { AutoSalesOnlineStoreServiceUpdateProductStore as constants } from "./store-urls-sqs.constants";
import { ProductStoreService } from "../../services/product-store.service";
import { Inject } from "typescript-ioc";
import { AwsMessage } from "../../../../common/aws/message.model";
import { logger } from "../../../../common/logger";

export class UpdateProductStoreDequeueMessage extends DequeueMessage {
  @Inject productStoreService: ProductStoreService;
  constructor() {
    super(constants.queueUrl, constants.dequeueServiceName);
  }

  public async processMessage(message: AwsMessage): Promise<any> {
    const values = {
      productModelId: message.MessageAttributes.ProductModelId.Value,
      pperation: message.MessageAttributes.Operation.Value,
      qty: message.MessageAttributes.Qty.Value,
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
