import { isDateValid } from "@/utils/DateUtils";

describe("Date tests", () => {
  it("should be equal or greater than 1 hour from now!", () => {
    const date = new Date(
      "Mon Feb 12 2024 00:50:00 GMT+0700 (Western Indonesia Time)",
    );
    expect(isDateValid(date)).toBe(false);
  });
});
