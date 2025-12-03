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
      addressInput,
      status: Status.INVALID,
    };
  }

  const addressToValidate = parseAddressInput(addressInput);

  const xmlResponse = await validate(addressToValidate);
  const parsedXmlResponse = await xml2js.parseStringPromise(xmlResponse.data, {
    explicitArray: false,
  });

  if (parsedXmlResponse.Error) {
    return {
      addressInput,
      status: Status.INVALID,
    };
  }

  const addressValidationResponse =
    parsedXmlResponse.AddressValidateResponse.Address;

  return {
    addressInput,
    status: Status.VALID,
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
