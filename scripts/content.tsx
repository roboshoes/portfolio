import tabelDetail from "../assets/tabel/detail.png";
import tabelHero from "../assets/tabel/hero.png";
import toonamiHero from "../assets/toonami/hero.png";
import wonderlandHero from "../assets/wonderland/hero.png";
import wonderlandDetail from "../assets/wonderland/detail.jpg";
import pinglrHero from "../assets/pinglr/hero.png";
import surfgayHero from "../assets/surfgay/hero.png";
import { Project } from "./models/project";
import * as React from "react";

export const work: Project[] = [
    {
        title: "Winter Wonderland",
        mainImage: wonderlandHero,
        images: [ wonderlandDetail ],
        description: <>
            Take a walk through New York City's dazzling assortment of retail window
            displays and immerse yourself in the magic of the holidays.
            <br/><br/>
            Window Wonderland utilizes sequences of high-res photography to bring the wonder
            and christmas spirit of New York City's 5th avenue to the masses.
            <br/><br/>
            For a full immersion it also provides a 360 VR view with authentic street sounds to
            truely experience the celebratory spirit.
        </>,
        buttons: {
            "LAUNCH PROJECT": "https://windowwonderland.withgoogle.com"
        }
    },
    {
        title: "Tabel",
        mainImage: tabelHero,
        images: [ tabelDetail ],
        description: <>
            With 6 storylines unfolding simultaneously, Tabel uses interactive directional audio to
            put you at the center of the chaos.
            <br/><br/>
            Tabel utilzes a WebGL based VR experience that gives the user agency in the unfolding of
            the short movie. By looking at different characters, the viewer can choose which
            storyline to follow and which to ignore.
        </>,
    },
    {
        title: "Toonami",
        mainImage: toonamiHero,
        images: [],
        description: <>
            Toonami's mobile application for Android and iOS was made out of almost entirely
            procedurally generated graphics using the web's canvas 2D API. Toonami is a part of
            Adult Swim’s weekly line up on Cartoon Network. It is a block of time dedicated to
            anime and has an extremely loyal fanbase. The fans deserved an app to help them
            countdown to the next event and to show their allegiance for everything Toonami.
        </>,
    },
    {
        title: "Alien Artifact",
        mainImage: wonderlandHero,
        images: [],
        description: <>
            Alien was a mini game developed to highlight the new technology hidden in the
            Google Tango. One of the first hand held AR devices it includes sensores and software
            for spacial awareness.
            <br/><br/>
            The gameplay we developed required the user to walk around in the physical
            environment they are in. The movements are translated into the digital roam. The goal of
            the game was to use perspective to align the artifacts found floating in the different
            levels to create a cohesive pieces. This would would open up a portal which took the
            player to the next level.
            <br/><br/>
            This game was built using Unity.
        </>,
    },
    {
        title: "Pinglr",
        mainImage: pinglrHero,
        images: [],
        description: <>
            This is the story of Darrian Pinglr.
            <br/><br/>
            We are not quite sure how he got here, but he is ready for the next big move. Angels are
            interested in some series A funding. That is great news because we are talking about a
            slow burn rate here. After all this is freemium he is working with. But with the new
            full stack engineer he hired, he is ready to gamify the upgrade and offer us some
            big new beta.
            <br/><br/>
            Check it out. The app is in beta.
        </>,
    },
    {
        title: "Surfspot or Gaybar",
        mainImage: surfgayHero,
        images: [],
        description: <>
            If one would draw a ven diagram with possible names for gaybars, and theoretical names
            for surf spots and breaks, then it would have a pretty wide overlapping sections.
            <br/><br/>
            We put that hypothesis to the test by creating a little game that let's you guess if the
            given name is a gaybar or a surfspot.
        </>,
    }
];
