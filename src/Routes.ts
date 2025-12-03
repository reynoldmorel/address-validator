import { Express } from "express";
import { validateAddress } from "./controllers/AddressController";

export const setupRoutes = (app: Express) => {
  app.post("/validate-address", async (req, res) => {
    const addressResponse = await validateAddress(req.body.address);

    res.status(200).json(addressResponse).end();
  });
};
