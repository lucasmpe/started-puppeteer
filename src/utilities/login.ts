import * as dotenv from "dotenv";
import { Page } from "puppeteer";
import { DEFAULT_DELAY } from "../constants";

dotenv.config();

export const login = async (page: Page) => {
  await page.goto(`${process.env.BASE_URL}`);
  await page.type("#email", `${process.env.FB_EMAIL}`, {
    delay: DEFAULT_DELAY,
  });
  await page.type("#pass", `${process.env.FB_PASSWORD}`, {
    delay: DEFAULT_DELAY,
  });

  await Promise.all([
    page.waitForNavigation(),
    page.click('button[name="login"]'),
  ]);
};
