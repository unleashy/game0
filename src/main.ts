import { Game } from "./Game/Game.ts";
import "./style.css";

const canvas: HTMLCanvasElement | null = document.querySelector("#main-canvas");
if (!canvas) throw new Error("No canvas");

const ctx = canvas.getContext("2d");
if (!ctx) throw new Error("No 2d canvas context");

const game = new Game({ msPerUpdate: 16, maxUpdatesPerCycle: 65 });
game.start();
