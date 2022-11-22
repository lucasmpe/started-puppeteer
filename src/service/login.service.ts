import { Page } from "puppeteer";
import { BUTTON, DEFAULT_DELAY } from "../constants";

export class LoginService {
  private readonly url: string = `${process.env.BASE_URL}`;

  private readonly email: string = `${process.env.FB_EMAIL}`;

  private password: string = `${process.env.FB_PASSWORD}`;

  async login(page: Page): Promise<void> {
    await page.goto(this.url);
    await page.type("#email", this.email, { delay: DEFAULT_DELAY });
    await page.type("#pass", this.password, { delay: DEFAULT_DELAY });
    await Promise.all([page.waitForNavigation(), page.click(BUTTON.LOGIN)]);
  }
}
