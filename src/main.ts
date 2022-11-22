import puppeteer from "puppeteer";
import fsPromises from "fs/promises";
import { login } from "./utilities/login";
import { uploadProperties } from "./utilities/uploadPorperties";

const bootstrap = async () => {
  const browser = await puppeteer.launch({ headless: false });

  const context = browser.defaultBrowserContext();
  context.overridePermissions(`${process.env.BASE_URL}`, [
    "geolocation",
    "notifications",
  ]);

  const page = await browser.newPage();
  await login(page);

  try {
    const data = await fsPromises.readFile(`${process.env.DATA_PATH}`);
    const properties = JSON.parse(data.toString());

    console.log(properties);

    await uploadProperties(page, properties);
  } catch (err) {
    console.log(err);
  }

  // await browser.close();
};
bootstrap();
