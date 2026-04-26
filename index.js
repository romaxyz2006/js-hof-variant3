// src/index.js
import {
  groupBy,
  sortBy,
  partition,
  pluck,
  uniqBy,
  filterBy,
  mapBy,
  sumBy,
  pipe,
} from "./utilities.js";

const students = [
  { id: 1, name: "Олег", group: "ІПЗ-21", score: 86, city: "Луцьк" },
  { id: 2, name: "Марія", group: "ІПЗ-22", score: 94, city: "Київ" },
  { id: 3, name: "Іван", group: "ІПЗ-21", score: 71, city: "Луцьк" },
  { id: 4, name: "Анна", group: "ІПЗ-23", score: 65, city: "Львів" },
  { id: 5, name: "Денис", group: "ІПЗ-22", score: 94, city: "Київ" },
  { id: 6, name: "Софія", group: "ІПЗ-23", score: 80, city: "Одеса" },
  { id: 7, name: "Марія", group: "ІПЗ-22", score: 94, city: "Київ" },
];

console.log("Початкові дані:");
console.table(students);

console.log("\n1. groupBy: групування студентів за групою");
console.log(groupBy((student) => student.group)(students));

console.log("\n2. sortBy: сортування за балом, а потім за іменем");
console.table(sortBy([(student) => student.score, (student) => student.name])(students));

console.log("\n3. partition: розділення студентів на тих, хто склав і не склав");
const [passed, failed] = partition((student) => student.score >= 75)(students);
console.log("Склали:");
console.table(passed);
console.log("Не склали:");
console.table(failed);

console.log("\n4. pluck: отримання списку імен");
console.log(pluck("name")(students));

console.log("\n5. uniqBy: унікальні студенти за іменем");
console.table(uniqBy((student) => student.name)(students));

console.log("\n6. map/filter/reduce + pipe: рейтинг студентів з балом 80+");
const getHighRatedStudents = pipe(
  filterBy((student) => student.score >= 80),
  sortBy([(student) => -student.score]),
  mapBy((student) => `${student.name} — ${student.score} балів`)
);

console.log(getHighRatedStudents(students));

console.log("\n7. reduce: сума балів усіх студентів");
console.log(sumBy((student) => student.score)(students));
