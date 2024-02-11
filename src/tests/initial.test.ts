describe("Code tests", () => {
  it("should return as expected", () => {
    const replaceWith: any = {
      "Jalan ": "Jl.",
    };
    const text =
      "Jalan Surabaya, Menteng kel., Menteng, Jakarta Pusat, 10310, Indonesia";
    expect(
      text.replace(/Jalan |, [0-9]{5}, Indonesia/g, (m) =>
        !replaceWith[m] ? "" : replaceWith[m],
      ),
    ).toBe("Jl.Surabaya, Menteng kel., Menteng, Jakarta Pusat");
  });
});
