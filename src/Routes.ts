import { Express } from "express";
import { validateAddress } from "./controllers/AddressController";
import Status from "./types/Status";

export const setupRoutes = (app: Express) => {
  app.post("/validate-address", async (req, res) => {
    const addressResponse = await validateAddress(req.body.address);

    res
      .status(addressResponse.status === Status.UNVERIFIABLE ? 400 : 200)
      .json(addressResponse)
      .end();
  });
};
