export class AutoSalesOnlineStoreServiceUpdateProductStore {
  public static readonly dequeueServiceName =
    "UpdateProductStoreDequeueMessage";
  public static readonly queueUrl =
    "https://sqs.us-west-2.amazonaws.com/615953265037/AutopartsSalesUpdateProductStoreQueue";
}

export class AutoSalesOnlineStoreAddnewProductStore {
  public static readonly dequeueServiceName = "AddNewProductDequeueMessage";
  public static readonly queueUrl =
    "https://sqs.us-west-2.amazonaws.com/615953265037/AutopartsSalesAddNewProductStoreQueue";
}

export class AutoSalesOnlineStoreAddnewProductModelStore {
  public static readonly dequeueServiceName =
    "AddNewProductModelDequeueMessage";
  public static readonly queueUrl =
    "https://sqs.us-west-2.amazonaws.com/615953265037/AutopartsSalesAddNewProductModelStoreQueue";
}
