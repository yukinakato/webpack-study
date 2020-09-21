import { myadd, mysub } from "./myfunc";

test("adds 1 + 2 to equal 3", () => {
  expect(myadd(1, 2)).toBe(3);
});

test("subs 1 - 2 to equal -1", () => {
  expect(mysub(1, 2)).toBe(-1);
});
