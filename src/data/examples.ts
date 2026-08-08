import { CodeExample } from '../types';

export const EXAMPLES: CodeExample[] = [
  {
    id: 'js-math-variables',
    name: 'JavaScript: Simple Math & Variables',
    language: 'javascript',
    description: 'Basic variable declarations, arithmetic addition, and console output.',
    code: `let x = 10;\nlet y = 20;\nconsole.log(x + y);`,
    buggyCode: `console.log(username);`,
    terminalError: `ReferenceError: username is not defined
    at Object.<anonymous> (/app/index.js:1:13)
    at Module._compile (node:internal/modules/cjs/loader:1105:14)`
  },
  {
    id: 'js-conditionals-age',
    name: 'JavaScript: Age Verifier (Conditionals)',
    language: 'javascript',
    description: 'Checking a user age condition with if-else logic.',
    code: `let age = 18;\nif (age >= 18) {\n  console.log("Welcome! Access granted.");\n} else {\n  console.log("Sorry, you must be 18 or older.");\n}`,
    buggyCode: `let user = null;\nconsole.log(user.name);`,
    terminalError: `TypeError: Cannot read properties of null (reading 'name')
    at processUserData (/app/src/user.js:14:22)
    at Object.<anonymous> (/app/src/index.js:5:1)`
  },
  {
    id: 'python-loops',
    name: 'Python: Fruit List Iteration',
    language: 'python',
    description: 'Looping through an array of items in Python.',
    code: `fruits = ["apple", "banana", "cherry"]\nfor fruit in fruits:\n    print("I love eating " + fruit)`,
    buggyCode: `fruits = ["apple", "banana"]\nprint(fruits[5])`,
    terminalError: `IndexError: list index out of range
    File "main.py", line 2, in <module>
      print(fruits[5])`
  },
  {
    id: 'cpp-array-sum',
    name: 'C++: Sum of Array Numbers',
    language: 'cpp',
    description: 'C++ vector iteration and integer sum calculation.',
    code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int sum = 0;\n    int numbers[] = {5, 10, 15};\n    for(int i = 0; i < 3; i++) {\n        sum += numbers[i];\n    }\n    cout << "Total Sum: " << sum << endl;\n    return 0;\n}`,
    buggyCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int* ptr = nullptr;\n    *ptr = 42;\n    return 0;\n}`,
    terminalError: `Segmentation fault (core dumped)
    Program terminated with signal SIGSEGV, Segmentation fault.`
  }
];
