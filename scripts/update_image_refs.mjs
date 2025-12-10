import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

const extensions = ['.tsx', '.ts', '.js', '.jsx', '.css', '.json', '.html'];
const ignoreDirs = ['node_modules', '.git', '.next', 'images-safe', 'scripts'];

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            if (!ignoreDirs.includes(file)) {
                results = results.concat(walk(filePath));
            }
        } else {
            if (extensions.includes(path.extname(file))) {
                results.push(filePath);
            }
        }
    });
    return results;
}

const files = walk(rootDir);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // Replace .png, .jpg, .jpeg with .webp, BUT ignore http:// or https://
    // Regex explanation:
    // (?<!https?:)  Negative lookbehind: ensure not preceded by https: or http:
    // (?<!\/\/)     Negative lookbehind: ensure not preceded by // (protocol relative)
    // ([a-zA-Z0-9_\-\./]+)\.(png|jpg|jpeg)  Match filename and diff extension

    // Simpler approach: Match strings that look like local paths
    // We'll iterate through all matches and check if they look safe.

    const regex = /([a-zA-Z0-9_\-\.\/]+)\.(png|jpg|jpeg)/gi;

    const newContent = content.replace(regex, (match, prefix, ext) => {
        if (prefix.includes('http://') || prefix.includes('https://')) {
            console.log(`Skipping external URL in ${path.relative(rootDir, file)}: ${match}`);
            return match;
        }
        changed = true;
        console.log(`Updating in ${path.relative(rootDir, file)}: ${match} -> ${prefix}.webp`);
        return `${prefix}.webp`;
    });

    if (changed) {
        fs.writeFileSync(file, newContent, 'utf8');
    }
});
