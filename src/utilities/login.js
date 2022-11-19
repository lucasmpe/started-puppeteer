import * as dotenv from "dotenv";
import DEFAULT_DELAY from "../constants.js";

dotenv.config();

export const login = async (page) => {
  await page.goto(process.env.BASE_URL);
  await page.type("#email", process.env.FB_EMAIL, { delay: DEFAULT_DELAY });
  await page.type("#pass", process.env.FB_PASSWORD, { delay: DEFAULT_DELAY });

  await Promise.all([
    page.waitForNavigation(),
    page.click('button[name="login"]'),
  ]);
};
