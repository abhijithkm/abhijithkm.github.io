/**
 * True when the page is driven by automation (puppeteer prerender, bots).
 * Entrance animations pass `initial={false}` in that case so elements render
 * directly in their final state — prerendered HTML then bakes in visible
 * content instead of an opacity-0 first frame.
 */
export const isAutomated =
  typeof navigator !== "undefined" && navigator.webdriver === true;
