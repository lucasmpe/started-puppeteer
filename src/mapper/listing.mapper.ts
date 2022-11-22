import { Listing } from "../entities/listing.entity";

export const fromPropertyJsonToListing = (property: any): Listing => {
  return new Listing(
    property.images[0].uri,
    property.features.bedrooms,
    property.features.bathrooms,
    property.priceDetails.longDescription,
    property.address.street,
    property.description
  );
};
