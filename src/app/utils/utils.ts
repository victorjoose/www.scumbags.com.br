export function isMobileScreen(breakpoint: number = 768): boolean {
  return window.innerWidth <= breakpoint;
}