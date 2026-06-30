import { TAG_LENGTH } from "./config.js";

const TAG_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function tagGenerator(): string {
  let tag = "";

  for (let i = 0; i < TAG_LENGTH; i++) {
    const index = Math.floor(Math.random() * TAG_CHARS.length);
    tag += TAG_CHARS[index];
  }

  return tag;
}
