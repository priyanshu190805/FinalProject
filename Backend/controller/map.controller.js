import { validationResult } from "express-validator";
import {
  autoCompleteSuggestions,
  getCoordinateAddress,
  getTimeDistance,
} from "../services/maps.service.js";

const getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { address } = req.query;

  try {
    const coordinates = await getCoordinateAddress(address);
    res.status(200).json(coordinates);
  } catch (error) {
    res.status(404).json({ message: "Coordinates not found" });
  }
};

const getDistanceTime = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { origin, destination } = req.query;
    const distanceTime = await getTimeDistance(origin, destination);
    res.status(200).json(distanceTime);
  } catch (error) {
    res.status(400).json({ message: "Distance and time not found" });
  }
};

const getAutoCompleteSuggestion = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { input } = req.query;

    const suggestions = await autoCompleteSuggestions(input);
    res.status(200).json(suggestions);
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: "Similar locations not found" });
  }
};

export { getCoordinates, getDistanceTime, getAutoCompleteSuggestion };
