const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push('ERR:' + e.message.substring(0, 200)));
  page.on('console', m => { if(m.type()==='error') errors.push('CON:'+m.text().substring(0,200)); });
  
  try {
    await page.goto('http://localhost:3738/my-website/', { waitUntil: 'domcontentloaded', timeout: 10000 });
  } catch(e) {
    console.log('goto error:', e.message);
  }
  
  await new Promise(r => setTimeout(r, 5000));
  
  try {
    const title = await page.title();
    const rootChildren = await page.evaluate(() => document.getElementById('root')?.children?.length || 0);
    const html = await page.evaluate(() => document.getElementById('root')?.innerHTML?.substring(0, 300) || 'EMPTY');
    
    console.log('Title:', title);
    console.log('Root children:', rootChildren);
    console.log('Root HTML:', html);
    console.log('Errors:', errors.slice(0, 5));
  } catch(e) {
    console.log('eval error:', e.message);
  }
  
  await browser.close();
  process.exit(0);
})().catch(e => { console.error(e.message); process.exit(1); });