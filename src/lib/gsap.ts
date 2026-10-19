"use client";

import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, Draggable, Flip, useGSAP);

// Every animation on the site runs inside this media query, so people who
// ask for reduced motion get the final, static state.
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export { gsap, Draggable, Flip, ScrollTrigger, useGSAP };
