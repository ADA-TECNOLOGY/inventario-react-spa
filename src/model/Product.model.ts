export class ProductModel {
  name: string;
  supplier: number;
  category: string;
  unitOfMeasure: string;
  stockQuantity: number;
  minimumStock: number;
  expirationDate?: string ;
  batch: string;
  purchasePrice: string;
  salePrice: string;
  observation: string;
  typeUnitMeasure: string;

  constructor(
    name: string,
    supplier: number,
    category: string,
    unitOfMeasure: string,
    stockQuantity: number,
    minimumStock: number,
    batch: string,
    purchasePrice: string,
    salePrice: string,
    observation: string,
    typeUnitMeasure: string,
    expirationDate: string,
  ) {
    this.name = name;
    this.supplier = supplier;
    this.category = category;
    this.unitOfMeasure = unitOfMeasure;
    this.stockQuantity = stockQuantity;
    this.minimumStock = minimumStock;
    this.expirationDate = expirationDate;
    this.batch = batch;
    this.purchasePrice = purchasePrice;
    this.salePrice = salePrice;
    this.observation = observation;
    this.typeUnitMeasure = typeUnitMeasure;

  }
}