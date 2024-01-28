export type Widths = {
  [string: string]: number;
};

class Breakpoint {
  public static current: string = "sm";
  public static widths: Widths = {
    xs: 0, // => @media (min-width: 0) { ... }
    sm: 640, // => @media (min-width: 640px) { ... }
    md: 768, // => @media (min-width: 768px) { ... }
    lg: 1024, // => @media (min-width: 1024px) { ... }
    xl: 1280, // => @media (min-width: 1280px) { ... }
    "2xl": 1536, // => @media (min-width: 1536px) { ... }
  };
  public static clientWidth: number = window.innerWidth;

  constructor() {
    window.addEventListener("resize", Breakpoint.handleResize);
  }

  get currentWidth(): number {
    return Breakpoint.widths[Breakpoint.current];
  }

  static handleResize(): void {
    Breakpoint.clientWidth = window.innerWidth;
    if (Breakpoint.clientWidth >= Breakpoint.widths["2xl"]) {
      Breakpoint.current = "2xl";
    } else if (Breakpoint.clientWidth >= Breakpoint.widths.xl) {
      Breakpoint.current = "xl";
    } else if (Breakpoint.clientWidth >= Breakpoint.widths.lg) {
      Breakpoint.current = "lg";
    } else if (Breakpoint.clientWidth >= Breakpoint.widths.md) {
      Breakpoint.current = "md";
    } else if (Breakpoint.clientWidth >= Breakpoint.widths.sm) {
      Breakpoint.current = "sm";
    } else if (Breakpoint.clientWidth < Breakpoint.widths.sm) {
      Breakpoint.current = "xs";
    }
  }

  static is(breakpoints: string | string[]): Boolean {
    Breakpoint.handleResize();
    let bsArr = breakpoints instanceof Array ? breakpoints : [breakpoints];
    switch (bsArr[0]) {
      case "xsAndUp":
        bsArr = ["xs", "sm", "md", "lg", "xl", "2xl"];
        break;
      case "smAndUp":
        bsArr = ["sm", "md", "lg", "xl", "2xl"];
        break;
      case "mdAndUp":
        bsArr = ["md", "lg", "xl", "2xl"];
        break;
      case "lgAndUp":
        bsArr = ["lg", "xl", "2xl"];
        break;
      case "xlAndUp":
        bsArr = ["xl", "2xl"];
        break;
      case "smAndDown":
        bsArr = ["sm", "xs"];
        break;
      case "mdAndDown":
        bsArr = ["md", "sm", "xs"];
        break;
      case "lgAndDown":
        bsArr = ["lg", "md", "sm", "xs"];
        break;
      case "xlAndDown":
        bsArr = ["xl", "lg", "md", "sm", "xs"];
        break;
      case "2xlAndDown":
        bsArr = ["2xl", "xl", "lg", "md", "sm", "xs"];
        break;
    }
    return bsArr.indexOf(Breakpoint.current) !== -1;
  }
}

window.addEventListener("resize", Breakpoint.handleResize);
export default Breakpoint;
