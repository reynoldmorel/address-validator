import { Express } from "express";
import { validateAddress } from "./controllers/AddressController";

export const setupRoutes = (app: Express) => {
  app.post("/validate-address", (req, res) => {
    const addressResponse = validateAddress(req.body.address);

    res.status(200).json(addressResponse).end();
  });
};
