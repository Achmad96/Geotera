import { isPickUpTimeValid } from "@/utils/time";

describe("Date tests", () => {
  it("should be equal or greater than 1 hour from now!", () => {
    const date = new Date("February 13, 2024 15:28:00");
    expect(isPickUpTimeValid(date)).toBe(true);
  });
});
