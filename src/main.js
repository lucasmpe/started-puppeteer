import puppeteer from "puppeteer";
import { login, uploadProperties } from "./utilities/utilities.js";
import properties from "../data/properties.js";

const bootstrap = async () => {
  const browser = await puppeteer.launch({ headless: false });

  const context = browser.defaultBrowserContext();
  context.overridePermissions(process.env.BASE_URL, [
    "geolocation",
    "notifications",
  ]);

  const page = await browser.newPage();

  await login(page);
  await uploadProperties(page, properties);

  await browser.close();
};
bootstrap();
