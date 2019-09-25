# #1 Систематизация файлов по папкам

## Задание:

Есть сложная структура папок (обязательна вложенность папок) с файлами. Необходимо разобрать коллекцию, создав новую общую папку и расположив внутри все файлы по папкам в алфавитном порядке, т.е. все файлы начинающиеся на “a” должны быть в папке “A” и т.д. Путь к исходной и итоговой папкам, а также необходимость удаления исходной передавать в качестве параметров в командной строке.

## Реализация:

1. Передача параметров командной строки реализована с помощью библиотеки [Yargs](https://www.npmjs.com/package/yargs).
1. Чтобы разобрать коллекцию, в командной строке необходимо написать следующую команду `node index.js copy --base=test --dir=fileName`, где `index.js` имя нашего исполняемого файла, `test` имя папки с нашей коллекцией, а `fileName` папка для уже отсортированной коллекции.
1. Для удаления папки в командной строке следует ввести `node index.js delete --base=test`
