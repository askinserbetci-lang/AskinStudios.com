import { Album } from "../../types/music";
import { theMeetingOfTheLegends } from "./theMeetingOfTheLegends";
import { playYourCymbals } from "./playYourCymbals";
import { meetingOfTheLegendsRemix, journeyToUnknown } from "./legacy";
import { deliGonul } from "../singles/deliGonul";

export const albums: Album[] = [
  theMeetingOfTheLegends,
  playYourCymbals,
  deliGonul as unknown as Album, // Casting as Album since it's a Single but compatible
  journeyToUnknown,
  meetingOfTheLegendsRemix
];

export { theMeetingOfTheLegends, playYourCymbals, meetingOfTheLegendsRemix, journeyToUnknown };
