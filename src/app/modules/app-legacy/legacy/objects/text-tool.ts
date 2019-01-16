export class TextTool {
    static firstLetterLowerCase(word: string) {
        if (word && word.length > 1) {
            let firstLetter = word.substr(0, 1).toLocaleLowerCase();
            let remain = word.substr(1, word.length - 1);
            return firstLetter + remain;
        }
        return '';
    }
}
