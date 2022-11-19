import puppeteer from "puppeteer";
import properties from "../data/properties.js";
import { login } from "./utilities/login.js";
import { uploadProperties } from "./utilities/uploadPorperties.js";

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
