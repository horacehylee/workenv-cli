import { TestCommand } from "./../commands/testCommand";

describe("Sample test", () => {
  it("should pass 1 + 1 == 2", () => {
    const result = 1 + 1;
    expect(result).toBe(2);
  });
});
