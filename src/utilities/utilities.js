import path from "path";
import url from "url";
import * as dotenv from "dotenv";
import fields from "../constants.js";

dotenv.config();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const login = async (page) => {
  await page.goto(process.env.BASE_URL);
  await page.type("#email", process.env.EMAIL, { delay: 10 });
  await page.type("#pass", process.env.PASSWORD, { delay: 10 });

  await Promise.all([
    page.waitForNavigation(),
    page.click('button[name="login"]'),
  ]);
};

export const createNewListing = async (page, property) => {
  const BASE_FIELD_CHOOSER = 'div[role="form"][aria-label="Marketplace"]';

  await page.goto(`${process.env.BASE_URL}/marketplace/create/rental`);

  await new Promise(function (resolve) {
    setTimeout(resolve, 2000);
  });

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

  await page.keyboard.press(property.rent, { delay: true });
  await page.keyboard.press("Enter", { delay: true });

  await page.click(
    `${BASE_FIELD_CHOOSER} label[aria-label="${fields.TYPE_OF_PROPERTY_FOR_RENT}"]`
  );

  await page.keyboard.press(property.type, { delay: true });
  await page.keyboard.press("Enter", { delay: true });

  await page.type(
    `${BASE_FIELD_CHOOSER} label[aria-label="${fields.NUMBER_OF_BEDROOMS}"]`,
    property.numberOfBedrooms,
    { delay: true }
  );

  await page.type(
    `${BASE_FIELD_CHOOSER} label[aria-label="${fields.NUMBER_OF_BATHROOMS}"]`,
    property.numberOfBathrooms,
    { delay: true }
  );

  await page.type(
    `${BASE_FIELD_CHOOSER} label[aria-label="${fields.PRICE_PER_MONTH}"]`,
    property.pricePerMonth,
    { delay: true }
  );

  await page.click(
    `${BASE_FIELD_CHOOSER} label[aria-label="${fields.ADDRESS_OF_PROPERTY_FOR_RENT}"]`
  );

  await page.keyboard.type(property.address, {
    delay: 10,
  });

  await new Promise(function (resolve) {
    setTimeout(resolve, 2000);
  });

  await page.keyboard.press("ArrowDown", { delay: true });
  await page.keyboard.press("Enter", { delay: true });

  await page.type(
    `${BASE_FIELD_CHOOSER} label[aria-label="${fields.PROPERTY_FOR_RENT_DESCRIPTION}"]`,
    property.description,
    { delay: true }
  );

  await new Promise(function (resolve) {
    setTimeout(resolve, 1000);
  });

  await page.click('div[role="button"][aria-label="Next"]');

  await new Promise(function (resolve) {
    setTimeout(resolve, 1000);
  });

  await page.click('div[role="button"][aria-label="Publish"]');
};

export const uploadProperties = async (page, properties) => {
  for (let property of properties) {
    await createNewListing(page, property);
  }
};
