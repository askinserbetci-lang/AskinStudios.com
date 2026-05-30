import { Album } from "../../types/album";
import { linerNotes } from "../notes/theMeetingOfTheLegends/linerNotes";
import { commentary } from "../notes/theMeetingOfTheLegends/commentary";

export const theMeetingOfTheLegends: Album = {
  slug: "the-meeting-of-the-legends-vol-1-fantasy",
  title: "The Meeting of the Legends – Vol. 1 (Fantasy)",
  year: 2012,
  coverImage: "/2012 The Meeting of the Legends Cover.jpg", // Using existing image path
  description:
    "A landmark fusion album blending Turkish classical heritage with cinematic world-music storytelling.",
  tracks: [
    {
      trackNumber: 1,
      title: "Fantasy",
      duration: "4:23",
      description:
        "A dreamlike overture that opens the album with mystery and elegance. “Fantasy” sets the emotional tone, blending Turkish melodic sensibility with cinematic atmosphere, inviting the listener into a world where imagination leads the way."
    },
    {
      trackNumber: 2,
      title: "Crazy Heart",
      duration: "7:53",
      description:
        "A passionate, expansive composition that moves between tenderness and intensity. The piece captures the restless energy of a heart that feels deeply, loves fiercely, and refuses to be tamed."
    },
    {
      trackNumber: 3,
      title: "Dreamy Eyes",
      duration: "4:25",
      description:
        "Soft, intimate, and hypnotic. This track feels like a quiet moment shared between two souls, expressed through delicate phrasing and warm instrumental colors."
    },
    {
      trackNumber: 4,
      title: "Be Mine Tonight",
      duration: "5:42",
      description:
        "A romantic, slow-burning composition that blends emotional longing with rhythmic elegance. The melody unfolds like a whispered confession carried through the night."
    },
    {
      trackNumber: 5,
      title: "You're The One",
      duration: "4:45",
      description:
        "A heartfelt declaration wrapped in melodic clarity. This track celebrates connection, devotion, and the rare feeling of recognizing someone as your true counterpart."
    },
    {
      trackNumber: 6,
      title: "Another Day",
      duration: "4:17",
      description:
        "A reflective, uplifting piece that captures the quiet beauty of everyday life. It moves with gentle optimism, reminding the listener that each day carries its own promise."
    },
    {
      trackNumber: 7,
      title: "Shake Your Body",
      duration: "4:49",
      description:
        "Energetic, rhythmic, and full of movement. This track brings a lively, dance-driven pulse to the album, blending world-music grooves with modern production flair."
    },
    {
      trackNumber: 8,
      title: "What Ever You Feel",
      duration: "6:45",
      description:
        "A deeply expressive composition that gives space for emotion to breathe. The music flows like an inner monologue, honest and unfiltered, encouraging the listener to feel freely."
    },
    {
      trackNumber: 9,
      title: "You And I",
      duration: "5:18",
      description:
        "A cinematic, emotionally rich world-music single featured in the Akademia Strategic Plan. The piece unfolds like a conversation between two hearts — intimate, timeless, and beautifully restrained."
    },
    {
      trackNumber: 10,
      title: "Percussion Jam",
      duration: "4:20",
      description:
        "A vibrant, rhythm-driven finale showcasing the heartbeat of the album. Layers of percussion create a dynamic tapestry, celebrating the energy and spirit of Turkish rhythmic tradition."
    }
  ],
  linerNotes,
  commentary,
  // Rich fields for UI
  id: "legends",
  concept: "Cinematic Turkish World Music Fusion",
  story: "A landmark fusion album blending Turkish classical heritage with cinematic world-music storytelling. Winner of the 2016 Akademia Award for Best Instrumental / World Beat Album.",
  image: "/2012 The Meeting of the Legends Cover.jpg",
  youtubeEmbedUrl: "https://www.youtube.com/embed/videoseries?list=PL_X_x_x", // Placeholder or real if known
  spotifyUrl: "https://open.spotify.com/album/4aawyAB9vmqN3uQ7FjRGTy",
  appleMusicUrl: "https://music.apple.com/us/album/the-meeting-of-the-legends-vol-1-fantasy/524345658",
  spotifyEmbedUrl: "https://open.spotify.com/embed/album/4aawyAB9vmqN3uQ7FjRGTy",
  tracklist: [
    { trackNumber: 1, title: "Fantasy", duration: "4:23", youtubeVideoId: "dQw4w9WgXcQ" },
    { trackNumber: 2, title: "Crazy Heart", duration: "7:53" },
    { trackNumber: 3, title: "Dreamy Eyes", duration: "4:25" },
    { trackNumber: 4, title: "Be Mine Tonight", duration: "5:42" },
    { trackNumber: 5, title: "You're The One", duration: "4:45" },
    { trackNumber: 6, title: "Another Day", duration: "4:17" },
    { trackNumber: 7, title: "Shake Your Body", duration: "4:49" },
    { trackNumber: 8, title: "What Ever You Feel", duration: "6:45" },
    { trackNumber: 9, title: "You And I", duration: "5:18" },
    { trackNumber: 10, title: "Percussion Jam", duration: "4:20" }
  ],
  detailedCredits: [
    { role: "Clarinet, Kanun, Ney, Keyboards", name: "Aşkın Şerbetçi" },
    { role: "Executive Producer", name: "Omar Faruk Tekbilek" },
    { role: "Producer", name: "Brian Keane" },
    { role: "Oud", name: "Ara Dinkjian" },
    { role: "Kanun, Violin", name: "Hasan Işakkut" }
  ],
  recordingInfo: [
    "Recorded at Aşkın Studios, New York",
    "Mixed by Brian Keane",
    "Mastered at Sterling Sound"
  ]
};
