import Address from "./Address";
import Status from "./Status";

export default interface AddressResponse {
  status: Status;
  normalizedAddress?: Address;
}
