import postal from "node-postal";
import resources from "../resources/resources";
import UspsAddressReq from "../types/UspsAddressReq";

export const buildUSPSRequest = (address: UspsAddressReq) => `
    <AddressValidateRequest USERID="${resources.USPS_USER_ID}">
      <Revision>1</Revision>
      <Address ID="0">
        <Address1>${address.address1 || ""}</Address1>
        <Address2>${address.address2 || ""}</Address2>
        <City>${address.city || ""}</City>
        <State>${address.state || ""}</State>
        <Zip5>${address.zip5 || ""}</Zip5>
        <Zip4>${address.zip4 || ""}</Zip4>
      </Address>
    </AddressValidateRequest>
  `;

export const parseAddressInput = (addressInput: string): UspsAddressReq => {
  const parsedAddressComponents = postal.parser.parse_address(addressInput);
  const addressParts: Record<string, string> = {};
  parsedAddressComponents.forEach((c) => (addressParts[c.component] = c.value));

  return {
    address1: addressParts.unit || "",
    address2:
      addressParts.house_number && addressParts.road
        ? `${addressParts.house_number} ${addressParts.road}`
        : addressParts.road || addressParts.house_number || "",
    city: addressParts.city || "",
    state: addressParts.state ? addressParts.state.toUpperCase() : "",
    zip5: addressParts.postcode ? addressParts.postcode.substring(0, 5) : "",
    zip4:
      addressParts.postcode && addressParts.postcode.length > 5
        ? addressParts.postcode.substring(5)
        : "",
  };
};
