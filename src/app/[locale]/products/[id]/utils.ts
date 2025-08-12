export function mapProductForLocale<T extends Record<string, any>>(
  product: T,
  locale: string
): Partial<T> {
  const translatedKeys = ["name", "brand", "description", "type", "characteristics"];

  return Object.entries(product).reduce((acc, [key, value]) => {
    if (translatedKeys.includes(key) && value && typeof value === "object") {
      const localizedValue = value[locale];

      if (localizedValue === null) {
        return acc;
      }

      if (key === "characteristics") {
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

        (acc as any)[key] = filteredCharacteristics;
      } else {
        (acc as any)[key] = localizedValue;
      }
    } else {
      if (value !== null && value !== undefined) {
        (acc as any)[key] = value;
      }
    }
    return acc;
  }, {} as Partial<T>);
}
