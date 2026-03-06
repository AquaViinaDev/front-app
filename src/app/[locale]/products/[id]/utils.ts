export function mapProductForLocale<T extends Record<string, unknown>>(
  product: T,
  locale: string
): Partial<T> {
  const translatedKeys = ["name", "brand", "description", "type", "characteristics"];

  return Object.entries(product).reduce((acc, [key, value]) => {
    if (translatedKeys.includes(key) && value && typeof value === "object" && !Array.isArray(value)) {
      const localizedValue = (value as Record<string, unknown>)[locale];

      if (localizedValue === null || localizedValue === undefined) {
        return acc;
      }

      if (key === "characteristics") {
        if (!localizedValue || typeof localizedValue !== "object") {
          return acc;
        }
        const filteredCharacteristics = Object.entries(localizedValue).reduce(
          (charAcc, [charKey, charValue]) => {
            if (charValue !== null) {
              if (typeof charValue === "string") {
                charAcc[charKey] = charValue;
              }
            }
            return charAcc;
          },
          {} as Record<string, string>
        );

        if (Object.keys(filteredCharacteristics).length === 0) {
          return acc;
        }

        (acc as Record<string, unknown>)[key] = filteredCharacteristics;
      } else {
        (acc as Record<string, unknown>)[key] = localizedValue;
      }
    } else {
      if (value !== null && value !== undefined) {
        (acc as Record<string, unknown>)[key] = value;
      }
    }
    return acc;
  }, {} as Partial<T>);
}
