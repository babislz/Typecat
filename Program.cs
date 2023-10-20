List<int> commands = new List<int>();
// 999: inicio de função
// 999 + i: especificação de função
// 0: fim de dados da função
// 1: print
// 2: atribuição de variável
// 998: fim de declaração de dados
//3: if
try
{
    StreamReader sr = new StreamReader("run.cat");
    String line;

    line = sr.ReadLine();
    while (line != null)
    {
        if(line.Contains("ifeow"))
        {
            commands.Add(999);
            commands.Add(3);

            var split = line.Split('(')[1].Split(')')[0];
            Console.WriteLine(split);

            var splittedConditions = split.Split(' ');

            var cond = splittedConditions[0];
            foreach(char c in cond)
                commands.Add(Convert.ToInt32(c));

            commands.Add(997);

            cond = splittedConditions[1];
            foreach(char c in cond)
                commands.Add(Convert.ToInt32(c));

            commands.Add(996);

            cond = splittedConditions[2];
            foreach(char c in cond)
                commands.Add(Convert.ToInt32(c));
            
            commands.Add(0);



            Console.WriteLine(split);

        }
        if(line.Contains("vareow"))
        {
            commands.Add(999);
            commands.Add(2);

            var split = line.Split(' ');
            var variable = split[1];
            var value = split[3].Select(x => x).Where(x => x.ToString() != ";");

            foreach(char c in variable)
                commands.Add(Convert.ToInt32(c));

            commands.Add(998);

            foreach(char c in value)
                commands.Add(Convert.ToInt32(c));

            commands.Add(0);
        }

        if (line.Contains("meow"))
        {
            commands.Add(999);
            commands.Add(1);

            var split = line.Split('(')[1].Split(')')[0];
            Console.WriteLine(split);
            foreach(char c in split)
                commands.Add(Convert.ToInt32(c));

            commands.Add(0);
        }

        line = sr.ReadLine();
    }
}
catch (Exception e)
{
    Console.WriteLine("error: " + e.Message);
}

File.WriteAllText("code.txt", string.Join(',', commands));
Console.WriteLine("Compilado com sucesso!");