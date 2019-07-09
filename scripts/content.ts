import tabelDetail from "../assets/tabel/detail.png";
import tabelHero from "../assets/tabel/hero.png";
import toonamiHero from "../assets/toonami/hero.png";
import wonderland from "../assets/wonderland/wonderland.jpg";
import pinglrHero from "../assets/pinglr/hero.png";
import surfgayHero from "../assets/surfgay/hero.png";
import { Project } from "./models/project";

export const work: Project[] = [
    {
        title: "Winter Wonderland",
        mainImage: wonderland,
        images: [ wonderland, wonderland ],
    },
    {
        title: "Tabel",
        mainImage: tabelHero,
        images: [ tabelDetail ],
    },
    {
        title: "Toonami",
        mainImage: toonamiHero,
        images: [],
    },
    {
        title: "Alien Artifact",
        mainImage: wonderland,
        images: [],
    },
    {
        title: "Pinglr",
        mainImage: pinglrHero,
        images: [],
    },
    {
        title: "Surfspot or Gaybar",
        mainImage: surfgayHero,
        images: [],
    }
];
