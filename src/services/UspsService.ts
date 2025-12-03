import axios from "axios";
import { buildUSPSRequest } from "../utils/Utils";
import UspsAddressReq from "../types/UspsAddressReq";

const validate = async (address: UspsAddressReq) => {
  const xmlRequest = buildUSPSRequest(address);

  return await axios.get("https://secure.shippingapis.com/ShippingAPI.dll", {
    params: {
      API: "Verify",
      XML: xmlRequest,
    },
  });
};

export default validate;
