import * as fs from 'fs';

const messages = JSON.parse(fs.readFileSync(__dirname + '/messages.json', 'utf-8'));

export const getMessage = (path: string) => {
    return messages[path] || null;
};