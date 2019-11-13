import tabelDetail from "../assets/tabel/detail.png";
import tabelHero from "../assets/tabel/hero.png";
import toonamiHero from "../assets/toonami/hero.png";
import toonamiDetail from "../assets/toonami/alarm-slow-cropped.gif";
import wonderlandHero from "../assets/wonderland/hero.png";
import wonderlandDetail from "../assets/wonderland/detail.jpg";
import pinglrHero from "../assets/pinglr/hero.png";
import surfgayHero from "../assets/surfgay/hero.png";
import earthHero from "../assets/earthstudio/hero.jpg";
import earthDetail from "../assets/earthstudio/detail.jpg";
import nasaHero from "../assets/nasa/hero.png";
import nasaDetail1 from "../assets/nasa/detail-1.png";
import nasaDetail2 from "../assets/nasa/detail-2.png";
import alienHero from "../assets/alien/hero.jpg";
import alienDetail1 from "../assets/alien/detail-1.jpg";
import alienDetail2 from "../assets/alien/detail-2.jpg";
import alienDetail3 from "../assets/alien/detail-3.jpg";

export interface Project {
    title: string;
    images: string[];
    paragraphs: string[];
    buttons?: { [ key: string ]: string };
}

export const work: Project[] = [
    {
        title: "NASA FDL + Google Cloud",
        images: [ nasaHero, nasaDetail1, nasaDetail2 ],
        paragraphs: [
            `NASA’s Frontier Development Lab partnered with Google Cloud to understand how artificial
            intelligence can help accelerate existing research to find life on other planets.`,

            `We created a user experience that utalizes an artistic geneerative interpretation of
            exoplanets to guide the user through both the problem of finding life as well as the
            process that has been made.`
        ],
        buttons: {
            "LAUNCH PROJECT": "https://showcase.withgoogle.com/nasa-fdl/"
        }
    },
    {
        title: "Winter Wonderland",
        images: [ wonderlandHero, wonderlandDetail ],
        paragraphs: [
            `Take a walk through New York City's dazzling assortment of retail window
            displays and immerse yourself in the magic of the holidays.`,

            `Window Wonderland utilizes sequences of high-res photography to bring the wonder
            and christmas spirit of New York City's 5th avenue to the masses.`,

            `For a full immersion it also provides a 360 VR view with authentic street sounds to
            truely experience the celebratory spirit.`
        ],
        buttons: {
            "LAUNCH PROJECT": "https://windowwonderland.withgoogle.com"
        }
    },
    {
        title: "Tabel",
        images: [ tabelHero, tabelDetail ],
        paragraphs: [
            `With 6 storylines unfolding simultaneously, Tabel uses interactive directional audio to
            put you at the center of the chaos.`,

            `Tabel utilzes a WebGL based VR experience that gives the user agency in the unfolding of
            the short movie. By looking at different characters, the viewer can choose which
            storyline to follow and which to ignore.`
        ],
        buttons: {
            "LAUNCH PROJECT": "https://tabel.withgoogle.com"
        }
    },
    {
        title: "Google Earth Studio",
        images: [ earthHero, earthDetail ],
        paragraphs: [
            "Let the world tell your story.",

            `Earth Studio is an animation tool for Google Earth’s satellite and 3D imagery.
            Being built fully in the browser it requires no installs.`,

            `We built a simple interface that allows the user use all of google earth as footage
            for animated films. In addition a set of simple Quickstarts allow you to provide a few
            simple inputs to generate a full animation.`
        ],
        buttons: {
            "LAUNCH PROJECT": "https://earth.google.com/studio"
        }
    },
    {
        title: "Toonami",
        images: [ toonamiHero, toonamiDetail ],
        paragraphs: [
            `Toonami's mobile application for Android and iOS was made out of almost entirely
            procedurally generated graphics using the web's canvas 2D API. Toonami is a part of
            Adult Swim’s weekly line up on Cartoon Network. It is a block of time dedicated to
            anime and has an extremely loyal fanbase. The fans deserved an app to help them
            countdown to the next event and to show their allegiance for everything Toonami.`
        ],
    },
    {
        title: "Alien Artifact",
        images: [ alienHero, alienDetail1, alienDetail2, alienDetail3 ],
        paragraphs: [
            `Alien was a mini game developed to highlight the new technology hidden in the
            Google Tango. One of the first hand held AR devices it includes sensores and software
            for spacial awareness.`,

            `The gameplay we developed required the user to walk around in the physical
            environment they are in. The movements are translated into the digital roam. The goal of
            the game was to use perspective to align the artifacts found floating in the different
            levels to create a cohesive pieces. This would would open up a portal which took the
            player to the next level.`,

            "This game was built using Unity."
        ],
    },
    {
        title: "Pinglr",
        images: [ pinglrHero ],
        paragraphs: [
            "This is the story of Darrian Pinglr.",

            `We are not quite sure how he got here, but he is ready for the next big move. Angels are
            interested in some series A funding. That is great news because we are talking about a
            slow burn rate here. After all this is freemium he is working with. But with the new
            full stack engineer he hired, he is ready to gamify the upgrade and offer us some
            big new beta.`,

            "Check it out. The app is in beta."
        ],
        buttons: {
            "WATCH IT": "https://www.youtube.com/watch?v=sajO0H8Xe44",
            "DOWNLOAD": "https://play.google.com/store/apps/details?id=biz.pinglr.Pinglr"
        }
    },
    {
        title: "Surfspot or Gaybar",
        images: [ surfgayHero ],
        paragraphs: [
            `If one would draw a ven diagram with possible names for gaybars, and theoretical names
            for surf spots and breaks, then it would have a pretty wide overlapping sections.`,

            `We put that hypothesis to the test by creating a little game that let's you guess if the
            given name is a gaybar or a surfspot.`
        ],
        buttons: {
            "LAUNCH PROJECT": "http://surfspot-or-gaybar.robosho.es/"
        }
    }
];
