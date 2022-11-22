import dotenv from "dotenv";
import puppeteer from "puppeteer";
import { LoginService } from "./service/login.service";
import { ListingService } from "./service/listing.service";

dotenv.config();

const bootstrap = async () => {
  const loginService = new LoginService();
  const listingService = new ListingService();

  const browser = await puppeteer.launch({ headless: false });
  const context = browser.defaultBrowserContext();
  context.overridePermissions(`${process.env.BASE_URL}`, [
    "geolocation",
    "notifications",
  ]);

  const page = await browser.newPage();

  await loginService.login(page);

  const listings = await listingService.getAll();

  await listingService.publish(page, listings);

  await browser.close();
};
bootstrap();
