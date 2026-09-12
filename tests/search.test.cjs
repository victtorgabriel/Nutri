const { readFileSync, existsSync } = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { join } = require('node:path');
const frontend = join(__dirname, '..', 'frontend');
assert.ok(existsSync(join(frontend, 'app.js')), 'A versão JavaScript nativa deve existir');
const context = vm.createContext({});
vm.runInContext(readFileSync(join(frontend, 'data.js'), 'utf8') + '\n' + readFileSync(join(frontend, 'app.js'), 'utf8'), context);
const search = (q, cost = 'all', type = 'Todos') => vm.runInContext(`filterServices(SERVICES, ${JSON.stringify(q)}, ${JSON.stringify(cost)}, ${JSON.stringify(type)}).map(s => s.id).join(',')`, context);
assert.equal(search('').split(',').length, 18);
for (const type of ['Serviço SUS', 'Projeto Universitário', 'Ação Social', 'Ação Comunitária', 'Hospital Universitário']) {
  assert.ok(search('', 'all', type).split(',').filter(Boolean).length >= 2, type);
}
assert.equal(search(' SAO LUIS '), '7');
assert.equal(search('sao paulo', 'free'), '2,5');
assert.equal(search('', 'social', 'Clínica-Escola'), '6');
assert.equal(search('Campinas', 'social'), '');
assert.equal(search('cidade inexistente'), '');
assert.equal(search('pampulha'), '6');
const exampleCard = vm.runInContext('serviceCard(SERVICES[8])', context);
assert.ok(exampleCard.includes('Exemplo fictício'));
assert.ok(!exampleCard.includes('href="tel:'));
assert.ok(!exampleCard.includes('href="https://wa.me/'));
console.log('Busca, cinco categorias e cartões fictícios sem links de contato: verificações passaram.');
