import fs from 'fs';

class Interpreter {
    static GetFile = (file) => {
        try {
            var data = fs.readFileSync(file, 'utf8');
            data = data.split(',');
            return data;
        } catch (err) {
            console.error(err);
        }

    }

    static variableInMemory = (memory, variable) => {
        if (memory[variable] != undefined)
            return memory[variable];
        else
            throw new Error("Variável não existe.");
    }

    static Compile = (code) => {
        var memory = {};

        for (var i = 0; i < code.length; i++) {
            if (code[i] == '999') {
                var func = code[i + 1];
                switch (parseInt(func)) {
                    case 1:
                        var text = "";
                        var isText = false;
                        for (var j = i + 2; j < code.length; j++) {
                            if (parseInt(code[j]) == 0)
                                break;

                            if (
                                j == i + 2 &&
                                String.fromCharCode(code[j]) == '"' ||
                                String.fromCharCode(code[j]) == "'"
                            )
                                isText = true;

                            text = text.concat(String.fromCharCode(parseInt(code[j])));
                        }
                        i = j;

                        if (isText) {
                            text = text.replace(/"/g, '');
                            console.log(text);
                        }
                        else {
                            if (
                                text.includes('+') ||
                                text.includes('-') ||
                                text.includes('*') ||
                                text.includes('/')
                            ) {
                                var result = eval(text);
                                console.log(result);
                            }
                            else {
                                console.log(this.variableInMemory(memory, text));
                            }
                        }

                        break;
                    case 2:
                        var variableName = "";
                        var variableValue = "";

                        for (var j = i + 2; j < code.length; j++) {
                            if (parseInt(code[j]) == 998)
                                break;

                            variableName = variableName.concat(String.fromCharCode(parseInt(code[j])));
                        }
                        i = j + 1;

                        for (var j = i; j < code.length; j++) {
                            if (parseInt(code[j]) == 0)
                                break;

                            variableValue = variableValue.concat(String.fromCharCode(parseInt(code[j])));
                        }

                        i = j;

                        if (String(parseInt(variableValue)) != "NaN") {
                            variableValue = parseInt(variableValue);
                        } else {
                            variableValue = variableValue.replace(/"/g, '');
                        }

                        memory[variableName] = variableValue;
                        break;
                    case 3:
                        var c1, c2, cond;
                        for (var j = i + 2; j < code.length; j++) {
                            if (parseInt(code[j]) == 995)
                                break;
                            
                            if(j == i + 2)
                                c1 = String.fromCharCode(parseInt(code[j]));

                            if(parseInt(code[j]) == 997){
                                cond = String.fromCharCode(parseInt(code[j + 1]));
                            }
                            
                            if(parseInt(code[j]) == 996)
                                c2 = String.fromCharCode(parseInt(code[j + 1]));

                        }

                        i = j;
                        var intC1 = parseInt(c1);
                        var intC2 = parseInt(c2);

                        var ifResponse = 
                            (cond === '<') ? intC1 < intC2 :
                            (cond === '>') ? intC1 > intC2 :
                            (cond === '==') ? intC1 == intC2 :
                            (cond === '!=') ? intC1 != intC2 : false
                        
                        if(ifResponse) {
                            const text = "";
                            for (var j = i + 2; j < code.length; j++) {
                                text.concat(String.fromCharCode(code[j]))
                            }
                            console.log(text);
                        }else
                            return;

                        break;
                }
            }
        }
    }
}

export default Interpreter;