// src/utilities.js
// Варіант 3: Collection Utilities
// Усі функції написані у функціональному стилі без зміни початкових даних.

// Каррінг: перетворює функцію з кількома аргументами на ланцюжок функцій.
export const curry = (fn) => {
  const curried = (...args) =>
    args.length >= fn.length
      ? fn(...args)
      : (...nextArgs) => curried(...args, ...nextArgs);

  return curried;
};

// Композиція зліва направо: pipe(f, g, h)(x) === h(g(f(x)))
export const pipe =
  (...functions) =>
  (initialValue) =>
    functions.reduce((value, fn) => fn(value), initialValue);

// groupBy — групування елементів за критерієм.
export const groupBy = curry((selector, collection) =>
  collection.reduce((groups, item) => {
    const key = selector(item);

    return {
      ...groups,
      [key]: [...(groups[key] || []), item],
    };
  }, {})
);

// sortBy — багатокритеріальне сортування.
// criteria — масив функцій, наприклад: [user => user.age, user => user.name]
export const sortBy = curry((criteria, collection) =>
  [...collection].sort((a, b) => {
    for (const criterion of criteria) {
      const valueA = criterion(a);
      const valueB = criterion(b);

      if (valueA > valueB) return 1;
      if (valueA < valueB) return -1;
    }

    return 0;
  })
);

// partition — розділення на дві групи: підходить / не підходить.
export const partition = curry((predicate, collection) =>
  collection.reduce(
    ([passed, failed], item) =>
      predicate(item)
        ? [[...passed, item], failed]
        : [passed, [...failed, item]],
    [[], []]
  )
);

// pluck — витягування значення властивості з кожного об'єкта.
export const pluck = curry((property, collection) =>
  collection.map((item) => item[property])
);

// uniqBy — унікальні елементи за критерієм.
export const uniqBy = curry((selector, collection) => {
  const result = collection.reduce(
    (acc, item) => {
      const key = selector(item);

      if (acc.seen.includes(key)) {
        return acc;
      }

      return {
        seen: [...acc.seen, key],
        values: [...acc.values, item],
      };
    },
    { seen: [], values: [] }
  );

  return result.values;
});

// Додаткова функція для демонстрації filter.
export const filterBy = curry((predicate, collection) =>
  collection.filter(predicate)
);

// Додаткова функція для демонстрації map.
export const mapBy = curry((mapper, collection) =>
  collection.map(mapper)
);

// Додаткова функція для демонстрації reduce.
export const sumBy = curry((selector, collection) =>
  collection.reduce((sum, item) => sum + selector(item), 0)
);
