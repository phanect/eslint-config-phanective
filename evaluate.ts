//const is = <T extends unknown>(variable: T) =>

import { PartialDeep } from "type-fest";

type ArrType = {
  column: number;
  endColumn: number;
  endLine: number;
  line: number;
  messageId: string;
  ruleId: string;
  severity: 0 | 1 | 2;
  suggestions?: {
    fix: {
      range: [ number, number ],
      text: string;
    },
    messageId: string;
  }[],
};

const arr: ArrType[] = [
  {
    column: 1,
    endColumn: 3,
    endLine: 13,
    line: 11,
    messageId: "disabledTest",
    ruleId: "vitest/no-disabled-tests",
    severity: 2,
  },
  {
    column: 6,
    endColumn: 23,
    endLine: 23,
    line: 23,
    messageId: "multipleTestTitle",
    ruleId: "vitest/no-identical-title",
    severity: 2,
  },
];

arr.map((el) => {
  const element = el as PartialDeep<typeof el, {
    recurseIntoArrays: true,
  }>;

  delete element.column;
  delete element.endColumn;
  element.suggestions = element.suggestions?.map(_suggestion => {
    const suggestion = _suggestion as Partial<typeof _suggestion>;
    delete suggestion?.text;
    return suggestion;
  });

  return element;
});

console.log(arr)
