import { KeyInput } from "puppeteer";
import { PropertyType } from "./property-type.enum";

export class Listing {
  constructor(
    public imageUrl: string,
    public numberOfBedrooms: string,
    public numberOfBathrooms: string,
    public pricePerMonth: string,
    public address: string,
    public description: string,
    public listingType: KeyInput = "R",
    public propertyType: KeyInput = PropertyType.FLAT_OR_APARTMENT as KeyInput
  ) {
    this.imageUrl = imageUrl;
    this.numberOfBedrooms = numberOfBedrooms;
    this.numberOfBathrooms = numberOfBathrooms;
    this.pricePerMonth = pricePerMonth;
    this.address = address;
    this.description = description;
    this.listingType = listingType;
    this.propertyType = propertyType;
  }
}
