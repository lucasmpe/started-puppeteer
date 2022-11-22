import path from "path";
import url from "url";
import * as dotenv from "dotenv";
import { default as fields, DEFAULT_DELAY } from "../constants.js";

dotenv.config();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createNewListing = async (page, property) => {
  const PATH_URL = "/marketplace/create/rental";
  const BASE_FIELD_CHOOSER = 'div[role="form"][aria-label="Marketplace"]';

  await page.goto(`${process.env.BASE_URL + PATH_URL}`);

  await page.waitForSelector(BASE_FIELD_CHOOSER);

  const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    page.click(`${BASE_FIELD_CHOOSER} div[role="button"][tabindex="0"]`),
  ]);

  await fileChooser.accept([
    path.join(__dirname, "..", "..", "data", property.imageUrl),
  ]);

  await page.click(
    `${BASE_FIELD_CHOOSER} label[aria-label="${fields.PROPERTY_FOR_SALE_OR_RENT}"]`
  );

  await page.keyboard.press(property.rent, { delay: DEFAULT_DELAY });
  await page.keyboard.press("Enter", { delay: DEFAULT_DELAY });

  await page.click(
    `${BASE_FIELD_CHOOSER} label[aria-label="${fields.TYPE_OF_PROPERTY_FOR_RENT}"]`
  );

  await page.keyboard.press(property.type, { delay: DEFAULT_DELAY });
  await page.keyboard.press("Enter", { delay: DEFAULT_DELAY });

  await page.type(
    `${BASE_FIELD_CHOOSER} label[aria-label="${fields.NUMBER_OF_BEDROOMS}"]`,
    property.numberOfBedrooms,
    { delay: DEFAULT_DELAY }
  );

  await page.type(
    `${BASE_FIELD_CHOOSER} label[aria-label="${fields.NUMBER_OF_BATHROOMS}"]`,
    property.numberOfBathrooms,
    { delay: DEFAULT_DELAY }
  );

  await page.type(
    `${BASE_FIELD_CHOOSER} label[aria-label="${fields.PRICE_PER_MONTH}"]`,
    property.pricePerMonth,
    { delay: DEFAULT_DELAY }
  );

  await page.type(
    `${BASE_FIELD_CHOOSER} label[aria-label="${fields.ADDRESS_OF_PROPERTY_FOR_RENT}"]`,
    property.address,
    { delay: DEFAULT_DELAY }
  );

  await page.waitForSelector(
    `${BASE_FIELD_CHOOSER} label[aria-label="${fields.ADDRESS_OF_PROPERTY_FOR_RENT}"] input[aria-expanded="true"]`
  );

  await page.keyboard.press("ArrowDown", { delay: DEFAULT_DELAY });
  await page.keyboard.press("Enter", { delay: DEFAULT_DELAY });

  await page.type(
    `${BASE_FIELD_CHOOSER} label[aria-label="${fields.PROPERTY_FOR_RENT_DESCRIPTION}"]`,
    property.description,
    { delay: DEFAULT_DELAY }
  );

  await page.waitForSelector(
    'div[role="button"][aria-label="Next"][tabindex="0"]'
  );
  await page.click('div[role="button"][aria-label="Next"]');

  await page.waitForSelector(
    'div[role="button"][aria-label="Publish"][tabindex="0"]'
  );
  await page.click('div[role="button"][aria-label="Publish"]');
};

export const uploadProperties = async (page, properties) => {
  for (const property of properties) {
    await createNewListing(page, property);
  }
};
