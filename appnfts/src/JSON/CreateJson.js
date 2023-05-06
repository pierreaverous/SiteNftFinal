const fs = require('fs');

for (let i = 1; i <= 12; i++) {
    fs.writeFileSync(`${i}.json`, '{}', 'utf8');
}
