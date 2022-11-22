import dotenv from "dotenv";

dotenv.config();

const BASE_SELECTOR = 'div[role="form"][aria-label="Marketplace"]';

export const CREATE_URL = `${process.env.BASE_URL}/marketplace/create/rental`;

export const FORM = {
  BASE_SELECTOR,
  ADD_PHOTO_FIELD: `${BASE_SELECTOR} div[role="button"][tabindex="0"]`,
  PROPERTY_FOR_SALE_OR_RENT_FIELD: `${BASE_SELECTOR} label[aria-label="Property for sale or rent"]`,
  TYPE_OF_PROPERTY_FOR_RENT_FIELD: `${BASE_SELECTOR} label[aria-label="Type of property for rent"]`,
  NUMBER_OF_BEDROOMS_FIELD: `${BASE_SELECTOR} label[aria-label="Number of bedrooms"]`,
  NUMBER_OF_BATHROOMS_FIELD: `${BASE_SELECTOR} label[aria-label="Number of bathrooms"]`,
  PRICE_PER_MONTH_FIELD: `${BASE_SELECTOR} label[aria-label="Price per month"]`,
  ADDRESS_OF_PROPERTY_FOR_RENT_FIELD: `${BASE_SELECTOR} label[aria-label="Address of property for rent"]`,
  ADDRESS_OF_PROPERTY_FOR_RENT_FIELD_OPTIONS: `${BASE_SELECTOR} label[aria-label="Address of property for rent"] input[aria-expanded="true"]`,
  PROPERTY_FOR_RENT_DESCRIPTION_FIELD: `${BASE_SELECTOR} label[aria-label="Property for rent description"]`,
};

export const BUTTON = {
  LOGIN: 'button[name="login"]',
  NEXT: '[role="button"][aria-label="Next"][tabindex="0"]',
  PUBLISH: 'div[role="button"][aria-label="Publish"][tabindex="0"]',
};

export const DEFAULT_DELAY: number = 10;
