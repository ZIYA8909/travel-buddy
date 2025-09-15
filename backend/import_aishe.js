// import_aishe.js
const fs = require('fs');
const axios = require('axios');
const XLSX = require('xlsx');
const pool = require('./db');

async function downloadFile(url, outPath) {
    const resp = await axios.get(url, { responseType: 'arraybuffer' });
    fs.writeFileSync(outPath, resp.data);
}

function readWorkbook(path) {
    const wb = XLSX.readFile(path);
    const sheetName = wb.SheetNames[0];
    const ws = wb.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(ws, { defval: '' });
    return data;
}

async function upsertCity(name, state) {
    name = (name || '').trim();
    state = (state || '').trim();
    if (!name) return null;
    const [rows] = await pool.query('SELECT id FROM cities WHERE name=? AND state=?', [name, state]);
    if (rows.length) return rows[0].id;
    const [r] = await pool.query('INSERT INTO cities (name,state) VALUES (?,?)', [name, state]);
    return r.insertId;
}

async function importFile(path) {
    const data = readWorkbook(path);
    let count = 0;
    for (const r of data) {
        const name = r['Institute Name'] || r['Name'] || r['University Name'] || r['Institution Name'] || r['name'];
        if (!name) continue;
        const state = r['State'] || r['State Name'] || '';
        const district = r['District'] || r['District Name'] || '';
        const aishe_code = r['AISHE Code'] || r['AISHE_Code'] || '';
        const city = r['City/Town'] || r['City'] || district || '';
        const type = r['Type'] || r['Institute Type'] || '';
        const cityId = await upsertCity(city || district || 'Unknown', state || '');
        await pool.query(
            `INSERT INTO universities (name, aishe_code, type, city_id, state, district, website)
       VALUES (?,?,?,?,?,?,?)`,
            [name, aishe_code, type, cityId, state, district, r['Website'] || r['URL'] || null]
        );
        count++;
    }
    console.log('Imported', count, 'rows');
}

async function main() {
    try {
        const url = process.argv[2] || process.env.AISHE_URL;
        if (!url) { console.error('Provide AISHE_URL'); process.exit(1); }
        const out = './tmp_aishe.xlsx';
        console.log('Downloading', url);
        await downloadFile(url, out);
        console.log('Importing...');
        await importFile(out);
        console.log('Done');
        process.exit(0);
    } catch (e) { console.error(e); process.exit(1); }
}

main();
