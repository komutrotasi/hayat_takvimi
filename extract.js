const fs = require('fs');
const lines = fs.readFileSync('C:\\Users\\XXX-DELL\\.gemini\\antigravity-ide\\brain\\3fea3989-2966-447b-9983-5e34221078f2\\.system_generated\\logs\\transcript.jsonl', 'utf8').split('\n');
for (const line of lines) {
  if (!line) continue;
  try {
    const obj = JSON.parse(line);
    if (obj.type === 'VIEW_FILE' && obj.content && obj.content.includes('index.html')) {
      const match = obj.content.match(/<original_line>\.\s*\n([\s\S]+?)\nThe above content shows/);
      if (match) {
        let content = match[1];
        content = content.replace(/^\d+:\s/gm, '');
        fs.writeFileSync('web/index_extracted.html', content);
        console.log('Extracted index.html! Bytes:', Buffer.byteLength(content));
        break;
      } else {
         console.log('Found index.html VIEW_FILE but no full content match. Truncated?');
         if (obj.content.includes('<truncated')) {
           console.log('Yes, it is truncated!');
         }
      }
    }
  } catch (e) {}
}
