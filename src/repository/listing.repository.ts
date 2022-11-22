import fsPromises from "fs/promises";
import { Listing } from "../entities/listing.entity";
import { fromPropertyJsonToListing } from "../mapper/listing.mapper";

export class ListingRepository {
  private readonly fileSystem = fsPromises;

  private readonly dbFilePath = `${process.env.DATA_PATH}`;

  async getAll(): Promise<Listing[]> {
    const data = await this.getData();
    return data.map((listingData) => fromPropertyJsonToListing(listingData));
  }

  async getData(): Promise<any[]> {
    let parsedContent: any[];
    try {
      const content = await this.fileSystem.readFile(this.dbFilePath);
      parsedContent = JSON.parse(content.toString());
    } catch (err) {
      parsedContent = [];
    }
    return parsedContent;
  }
}
