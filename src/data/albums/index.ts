import { Album } from "../../types/music";
import { theMeetingOfTheLegends } from "./theMeetingOfTheLegends";
import { playYourCymbals } from "./playYourCymbals";
import { meetingOfTheLegendsRemix, journeyToUnknown } from "./legacy";
import { deliGonul } from "../singles/deliGonul";
import { beMineTonight } from "./beMineTonight";

export const albums: Album[] = [
  beMineTonight, // newest release first: it's also the one featured on Home
  theMeetingOfTheLegends,
  playYourCymbals,
  deliGonul as unknown as Album, // Casting as Album since it's a Single but compatible
  journeyToUnknown,
  meetingOfTheLegendsRemix
];

export { beMineTonight, theMeetingOfTheLegends, playYourCymbals, meetingOfTheLegendsRemix, journeyToUnknown };
