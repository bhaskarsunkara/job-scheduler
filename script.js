let jobs = [];
const $ = id => document.getElementById(id);

function show() {
  $('tbl').innerHTML = '<tr><th>ID</th><th>Deadline</th><th>Profit</th></tr>' +
    jobs.map(j => `<tr><td>${j.id}</td><td>${j.dl}</td><td>${j.pf}</td></tr>`).join('');
}

function addJob() {
  const id = $('jid').value.trim();
  const dl = parseInt($('jdl').value);
  const pf = parseInt($('jpf').value);
  if (!id || !(dl >= 1) || isNaN(pf)) return alert('Enter valid ID, deadline (>=1) and profit');
  jobs.push({ id, dl, pf });
  $('jid').value = $('jdl').value = $('jpf').value = '';
  show();
}

function sample() {
  jobs = [
    { id: 'J1', dl: 2, pf: 100 },
    { id: 'J2', dl: 1, pf: 19 },
    { id: 'J3', dl: 2, pf: 27 },
    { id: 'J4', dl: 1, pf: 25 },
    { id: 'J5', dl: 3, pf: 15 }
  ];
  show();
}

function run() {
  if (!jobs.length) return alert('Add some jobs first');
  const sorted = [...jobs].sort((a, b) => b.pf - a.pf);
  const maxD = Math.max(...jobs.map(j => j.dl));
  const slot = Array(maxD + 1).fill(null);
  let total = 0;
  const log = ['Sorted by profit: ' + sorted.map(j => j.id).join(', ')];

  for (const j of sorted) {
    let placed = false;
    for (let t = Math.min(maxD, j.dl); t >= 1; t--) {
      if (!slot[t]) {
        slot[t] = j;
        total += j.pf;
        placed = true;
        log.push(`✅ ${j.id} (profit ${j.pf}, deadline ${j.dl}) → slot ${t}`);
        break;
      }
    }
    if (!placed) log.push(`❌ ${j.id} (profit ${j.pf}) rejected: no free slot up to ${j.dl}`);
  }

  let html = '';
  for (let t = 1; t <= maxD; t++) {
    html += `<div class="slot ${slot[t] ? 'filled' : ''}">Slot ${t}<br><b>${slot[t] ? slot[t].id : '-'}</b></div>`;
  }
  $('slots').innerHTML = html;
  $('sum').innerHTML = `<b>Total profit: ${total}</b>`;
  $('log').innerHTML = log.join('<br>');
  $('out').style.display = 'block';
}
