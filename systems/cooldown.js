
const cooldowns = new Map();

/**
 * cooldown thingy
 * @param {string} userId - user ID
 * @param {string} commandName - command name
 * @param {number} seconds - cooldown dur
 * @returns {number|null} - seconds left if on cooldown
 */
export function COOLDOWN(userId, commandName, seconds) {
  const key = `${userId}_${commandName}`;
  const now = Date.now();

  if (cooldowns.has(key)) {
    const expiration = cooldowns.get(key) + seconds * 1000;
    if (now < expiration) {
      return Math.ceil((expiration - now) / 1000);
    }
  }

  // not on cooldown → set timestamp
  cooldowns.set(key, now);
  setTimeout(() => cooldowns.delete(key), seconds * 1000);
  return null;
}
