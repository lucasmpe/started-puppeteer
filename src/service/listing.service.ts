import path from "path";
import { Page } from "puppeteer";
import { BUTTON, CREATE_URL, DEFAULT_DELAY, FORM } from "../constants.js";
import { Listing } from "../entities/listing.entity";
import { ListingRepository } from "../repository/listing.repository";

export class ListingService {
  private readonly repository = new ListingRepository();

  async getAll(): Promise<Listing[]> {
    return this.repository.getAll();
  }

  async publish(page: Page, listings: Listing[]): Promise<void> {
    for (const listing of listings) {
      await this.createNewListing(page, listing);
    }
  }

  private async createNewListing(page: Page, listing: Listing): Promise<void> {
    await page.goto(CREATE_URL);

    await page.waitForSelector(FORM.BASE_SELECTOR);

    const [fileChooser] = await Promise.all([
      page.waitForFileChooser(),
      page.click(FORM.ADD_PHOTO_FIELD),
    ]);

    await fileChooser.accept([
      path.join(__dirname, "..", "..", "data", "image-for-listing.jpg"),
    ]);

    await page.click(FORM.PROPERTY_FOR_SALE_OR_RENT_FIELD);
    await page.keyboard.press(listing.listingType, { delay: DEFAULT_DELAY });
    await page.keyboard.press("Enter", { delay: DEFAULT_DELAY });

    await page.click(FORM.TYPE_OF_PROPERTY_FOR_RENT_FIELD);
    await page.keyboard.press(listing.propertyType, { delay: DEFAULT_DELAY });
    await page.keyboard.press("Enter", { delay: DEFAULT_DELAY });

    await page.type(
      FORM.NUMBER_OF_BEDROOMS_FIELD,
      listing.numberOfBedrooms.toString(),
      { delay: DEFAULT_DELAY }
    );

    await page.type(
      FORM.NUMBER_OF_BATHROOMS_FIELD,
      listing.numberOfBathrooms.toString(),
      { delay: DEFAULT_DELAY }
    );

    await page.type(
      FORM.PRICE_PER_MONTH_FIELD,
      listing.pricePerMonth.toString(),
      { delay: DEFAULT_DELAY }
    );

    await page.type(FORM.ADDRESS_OF_PROPERTY_FOR_RENT_FIELD, listing.address, {
      delay: DEFAULT_DELAY,
    });

    await page.waitForSelector(FORM.ADDRESS_OF_PROPERTY_FOR_RENT_FIELD_OPTIONS);
    await page.keyboard.press("ArrowDown", { delay: DEFAULT_DELAY });
    await page.keyboard.press("Enter", { delay: DEFAULT_DELAY });

    await page.type(
      FORM.PROPERTY_FOR_RENT_DESCRIPTION_FIELD,
      listing.description,
      { delay: DEFAULT_DELAY }
    );

    await page.waitForSelector(BUTTON.NEXT);
    await page.click(BUTTON.NEXT);

    await page.waitForSelector(BUTTON.PUBLISH);
    await page.click(BUTTON.PUBLISH);
  }
}
