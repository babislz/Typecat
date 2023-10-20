import Interpreter from "./Interpreter.js";

const code = Interpreter.GetFile('../code.txt');
Interpreter.Compile(code);