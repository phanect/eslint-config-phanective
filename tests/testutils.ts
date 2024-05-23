import type { PartialDeep } from "type-fest";

export const omitProps = <T extends { [key: string | number | symbol]: unknown }>(targetObj: T, propsToOmit: (keyof T)[]): PartialDeep<T> => {
  const newObj: PartialDeep<T> = {};
  const rootPropsToOmit = propsToOmit
    .filter(prop => !prop.toString().includes("."))
  const childPropsToOmit = propsToOmit
    .filter(prop => prop.toString().includes("."))
    .map(prop => prop.toString().split("."));

  for (const key of Object.keys(targetObj)) {
    if (rootPropsToOmit.includes(key)) {
      continue;
    } else {

      if () {

      } else {
        newObj[key] = targetObj[key];
      }
    }
  }


  const messages = result.messages.map(({
    line,
    endLine,
    column,
    endColumn,
    ruleId,
    messageId,
    severity,
    suggestions,
  }) => ({
    line,
    endLine,
    column,
    endColumn,
    ruleId,
    messageId,
    severity,
    suggestions: suggestions?.map(({ messageId, fix }) => ({
      messageId,
      fix,
    })),
  }));
};
