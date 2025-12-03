import xml2js from "xml2js";
import Status from "../types/Status";
import AddressResponse from "../types/AddressResponse";
import validate from "../services/UspsService";
import { parseAddressInput } from "../utils/Utils";

export const validateAddress = async (
  addressInput: string
): Promise<AddressResponse> => {
  if (!addressInput || !addressInput.trim()) {
    return {
      status: Status.UNVERIFIABLE,
    };
  }

  const addressToValidate = parseAddressInput(addressInput);

  const xmlResponse = await validate(addressToValidate);
  const parsedXmlResponse = await xml2js.parseStringPromise(xmlResponse.data, {
    explicitArray: false,
  });

  if (parsedXmlResponse.Error) {
    return {
      status: Status.UNVERIFIABLE,
    };
  }

  const addressValidationResponse =
    parsedXmlResponse.AddressValidateResponse.Address;

  return {
    status: addressValidationResponse.ReturnText
      ? Status.CORRECTED
      : Status.VALID,
    normalizedAddress: {
      street: addressValidationResponse.Address2,
      number: addressValidationResponse.Address2
        ? addressValidationResponse.Address2.split(" ")[0]
        : "",
      city: addressValidationResponse.City,
      state: addressValidationResponse.State,
      zipCode: addressValidationResponse.Zip5,
    },
  };
};
