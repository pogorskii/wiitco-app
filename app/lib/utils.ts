//////////////////
// Fuzzy search //
//////////////////

type RomanNumeral = keyof typeof romanNumerals;
const romanNumerals: Record<string, number> = {
  I: 1,
  II: 2,
  III: 3,
  IV: 4,
  V: 5,
  VI: 6,
  VII: 7,
  VIII: 8,
  IX: 9,
  X: 10,
  XI: 11,
  XII: 12,
  XIII: 13,
  XIV: 14,
  XV: 15,
  XVI: 16,
  XVII: 17,
  XVIII: 18,
  XIX: 19,
  XX: 20,
  XXI: 21,
  XXII: 22,
  XXIII: 23,
  XXIV: 24,
  XXV: 25,
  XXVI: 26,
  XXVII: 27,
  XXVIII: 28,
  XXIX: 29,
  XXX: 30,
  C: 100,
  CC: 200,
  CCC: 300,
  CD: 400,
  D: 500,
  DC: 600,
  DCC: 700,
  DCCC: 800,
  CM: 900,
  M: 1000,
  MM: 2000,
  MMM: 3000,
};

const romanToArabic = (romanString: RomanNumeral): number => {
  if (!romanNumerals.hasOwnProperty(romanString)) {
    throw new Error("Invalid Roman numeral");
  }

  let result = 0;
  for (let i = romanString.length - 1; i >= 0; i--) {
    const currentNumeral = romanNumerals[romanString[i]];
    const nextNumeral =
      i < romanString.length - 1 ? romanNumerals[romanString[i + 1]] : 0;

    if (currentNumeral < nextNumeral) {
      result -= currentNumeral;
    } else {
      result += currentNumeral;
    }
  }

  return result;
};

const arabicToRoman = (arabicNumber: number): string => {
  if (arabicNumber < 1 || arabicNumber > 3999) {
    throw new Error("Arabic number must be between 1 and 3999");
  }
  let result = "";
  for (const key in romanNumerals) {
    while (arabicNumber >= romanNumerals[key]) {
      result += key;
      arabicNumber -= romanNumerals[key];
    }
  }
  return result;
};

export const createFuzzySearchQuery = (query?: string) => {
  const fuzzyQuery = query
    ? query
        .replace(/\s+/g, " ")
        .trim()
        .replaceAll(":", "")
        .replaceAll("-", "")
        .split(" ")
        .map((word) => {
          const romanNumeralRegex =
            /^M{0,3}(CM|CD|DCCC|CCCLX|CC|XC|L|XL|X|IX|VIII|VII|VI|V|IV|III|II|I)$/i;
          let convertedWord = "";
          if (/^[0-9]+/.test(word)) {
            const romanNumeral = arabicToRoman(Number(word));
            convertedWord = `( ${word} | ${romanNumeral} )`;
          }
          if (romanNumeralRegex.test(word)) {
            const arabicNumeral = romanToArabic(word.toUpperCase()).toString();
            convertedWord = `( ${word} | ${arabicNumeral})`;
          } else {
            convertedWord = word;
          }
          return convertedWord;
        })
        .map((word) => {
          let result;
          if (/.{2,}s$/.test(word)) {
            const wordWithApostrophe = word.replace(
              /s$/,
              (match) => "'" + match
            );
            result = `( ${word} | ${wordWithApostrophe})`;
          } else {
            result = word;
          }
          return result;
        })
        .join(" & ")
    : undefined;

  return fuzzyQuery;
};

/////////////////////////
// Calendar navigation //
/////////////////////////

// Links for Section Navigation
export const getPrevMonthURL = (
  currentURL: string,
  year: string,
  month: string
): string => {
  const categoryPath = currentURL.slice(0, currentURL.search(/\d/));
  const prevYear = (Number(year) - 1).toString();
  const prevMonth = (Number(month) - 1).toString();
  const prevPagePath =
    month === "1"
      ? `${categoryPath}${prevYear}/12`
      : `${categoryPath}${year}/${prevMonth}`;

  return prevPagePath;
};
export const getNextMonthURL = (
  currentURL: string,
  year: string,
  month: string
): string => {
  const categoryPath = currentURL.slice(0, currentURL.search(/\d/));
  const nextYear = (Number(year) + 1).toString();
  const nextMonth = (Number(month) + 1).toString();
  const nextPagePath =
    month === "12"
      ? `${categoryPath}${nextYear}/1`
      : `${categoryPath}${year}/${nextMonth}`;

  return nextPagePath;
};

export const getShortDayMonthName = (
  day: number,
  month: string,
  year: string,
  locale: string = "en-US"
): string => {
  const date = new Date();
  date.setFullYear(Number(year), Number(month) - 1, day);

  return date.toLocaleString(locale, {
    day: "numeric",
    month: "short",
  });
};

export const getMonthYearName = (
  month: string,
  year: string,
  locale: string = "en-US"
): string => {
  const date = new Date();
  date.setFullYear(Number(year), Number(month) - 1);

  return date.toLocaleString(locale, {
    month: "long",
    year: "numeric",
  });
};
