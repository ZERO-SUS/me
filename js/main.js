(() => {
  const USER = 'ZERO-SUS';
  const GROUPS = {
    'Languages': ['C++', 'C#', 'Python', 'JavaScript', 'TypeScript', 'Lua', 'HTML', 'CSS'],
    'Tools': ['VSCode', 'Figma', 'Firebase Studio', 'Cloudflare', 'Docker', 'Google AI Studio', 'Canva', 'Perplexity', 'GitLab'],
    'Design & UI/UX': ['Figma', 'Tailwind CSS', 'Material-UI', 'Responsive Design', 'Adobe XD', 'Canva'],
    'Frameworks': ['React', 'Vue', 'Flask', 'FastAPI'],
  };
  const WORDS = ['Intentional', 'Minimal', 'Premium', 'Futuristic', 'Performance-first', 'Accessible', 'Intentional'];
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const pad = (n) => String(n).padStart(2, '0');

  /* loader */
  const name = $('#ldrName');
  'ZERO SUS'.split('').forEach((ch, i) => {
    const s = document.createElement('span');
    s.className = 'ldr-l';
    s.textContent = ch === ' ' ? '\u00A0' : ch;
    s.style.animationDelay = `${i * 0.08}s`;
    name.appendChild(s);
  });
  const count = $('#ldrCount');
  let n = 0;
  const tick = setInterval(() => {
    n = Math.min(100, n + Math.ceil(Math.random() * 9));
    count.textContent = n;
    if (n >= 100) {
      clearInterval(tick);
      setTimeout(() => {
        $('#loader').classList.add('gone');
        document.body.classList.remove('locked');
      }, 250);
    }
  }, 40);

  /* marquee, chips, year */
  const run = WORDS.map((w) => `<span>${w}</span><span>\u00B7</span>`).join('');
  $('#marqueeTrack').innerHTML = run + run + run + run;
  const ARSENAL = [
    ['C++', 'Language'], ['C#', 'Language'], ['Python', 'Language'], ['JavaScript', 'Language'], ['TypeScript', 'Language'], ['Lua', 'Language'],
    ['HTML', 'Language'], ['CSS', 'Language'], ['React', 'Frontend'], ['Vue', 'Frontend'], ['Tailwind CSS', 'Frontend'], ['Material-UI', 'Frontend'],
    ['Flask', 'Backend'], ['FastAPI', 'Backend'], ['Responsive Design', 'Design'], ['Adobe XD', 'Design'], ['Figma', 'Design'], ['Canva', 'Design'],
    ['VSCode', 'Tools'], ['Docker', 'Tools'], ['GitLab', 'Tools'], ['Cloudflare', 'Tools'], ['Firebase Studio', 'Tools'],
    ['Google AI Studio', 'AI'], ['Perplexity', 'AI'],
  ];
  const cols = 6;
  const fill = (cols - (ARSENAL.length % cols)) % cols;
  $('#skillGroups').innerHTML = '<div class="arsenal">' +
    ARSENAL.map(([s, c]) => `<div class="cell"><b>${esc(s)}</b><small>${esc(c)}</small></div>`).join('') +
    '<div class="cell cell--fill"></div>'.repeat(fill) + '</div>';
  $('#year').textContent = new Date().getFullYear();

  /* typing tab title */
  (() => {
    const text = 'ZERO SUS';
    const caret = '\u258C';
    let i = 0, dir = 1;
    const step = () => {
      document.title = text.slice(0, i) + (i < text.length || dir < 0 ? caret : '');
      let wait = 140;
      if (dir > 0 && i === text.length) { dir = -1; wait = 2200; document.title = text; }
      else if (dir < 0 && i === 0) { dir = 1; wait = 700; }
      else i += dir;
      setTimeout(step, wait);
    };
    step();
  })();

  /* footer clock */
  const clock = () => {
    const d = new Date();
    $('#footTime').textContent =
      d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) +
      ' - ' + d.toLocaleTimeString('en-US');
  };
  clock();
  setInterval(clock, 1000);

  /* menu */
  const fab = $('#nav-fab');
  const menu = $('#menu');
  const setMenu = (open) => {
    menu.hidden = !open;
    $('#fabLbl').textContent = open ? 'Close' : 'Navigate';
    fab.setAttribute('aria-expanded', open);
    document.body.classList.toggle('locked', open);
  };
  fab.addEventListener('click', () => setMenu(menu.hidden));
  menu.addEventListener('click', (e) => e.target.closest('a') && setMenu(false));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
    else if (e.key === '/' && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); setMenu(menu.hidden); }
  });

  /* scroll progress + header colour */
  const prog = $('#prog');
  const themed = [...document.querySelectorAll('[data-theme]')];
  const onScroll = () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    prog.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + '%';
    const hit = themed.find((el) => {
      const r = el.getBoundingClientRect();
      return r.top <= 30 && r.bottom >= 30;
    });
    document.body.classList.toggle('hdr-light', !!hit && hit.dataset.theme === 'dark');
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* reveal */
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.1 });
  const observe = () => document.querySelectorAll('.title,.body,.facts,.term,.statrow,.panel,.proj,.arsenal').forEach((el) => {
    if (!el.classList.contains('reveal')) { el.classList.add('reveal'); io.observe(el); }
  });
  observe();

  /* glass cursor */
  const cur = $('#cursor');
  let cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy;
  addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; cur.classList.add('on'); });
  document.addEventListener('mouseleave', () => cur.classList.remove('on'));
  document.addEventListener('mouseover', (e) => cur.classList.toggle('big', !!e.target.closest('a,button')));
  (function loop() {
    cx += (tx - cx) * 0.22; cy += (ty - cy) * 0.22;
    cur.style.transform = `translate(${cx}px,${cy}px)`;
    requestAnimationFrame(loop);
  })();

  /* state shared with terminal */
  const data = { repos: [], user: null };

  /* terminal */
  const body = $('#termBody');
  const input = $('#termInput');
  const history = [];
  let hi = 0;
  const line = (cls, text) => {
    const d = document.createElement('div');
    d.className = cls;
    d.textContent = text;
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
    return d;
  };
  const COMMANDS = {
    help: () => 'Commands: whoami, skills, projects, github, contact, clear, help',
    whoami: () => 'ZERO SUS\nFull-Stack Developer\nGraphic designer & programmer\nCurrently open to work',
    skills: () => Object.entries(GROUPS).map(([g, a]) => g + ': ' + a.join(', ')).join('\n'),
    projects: () => data.repos.length ? data.repos.slice(0, 8).map((r, i) => `${pad(i + 1)}  ${r.name}`).join('\n') : 'Still loading from GitHub - try again in a sec.',
    github: () => `https://github.com/${USER}`,
    contact: () => 'suszero9@gmail.com\nDiscord: https://discord.gg/YxBX82Tdgp\nguns.lol: https://guns.lol/zero_sus\nSpotify / YouTube: see the footer',
    clear: () => { body.innerHTML = ''; return null; },
  };
  const run1 = (raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    line('cmd', raw.trim());
    const fn = COMMANDS[cmd];
    const out = fn ? fn() : `command not found: ${cmd} - try 'help'`;
    if (out !== null) line('out', out);
  };
  line('cmd', 'whoami');
  line('out', COMMANDS.whoami());
  $('#termForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value.trim()) { history.push(input.value); hi = history.length; }
    run1(input.value);
    input.value = '';
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const m = Object.keys(COMMANDS).find((c) => input.value && c.startsWith(input.value.toLowerCase()));
      if (m) input.value = m;
    } else if (e.key === 'ArrowUp' && history.length) {
      hi = Math.max(0, hi - 1); input.value = history[hi] || '';
    } else if (e.key === 'ArrowDown' && history.length) {
      hi = Math.min(history.length, hi + 1); input.value = history[hi] || '';
    }
  });


  /* stacked cards: the next card slides up over the pinned one, which sinks back */
  const stackFx = () => {
    const cards = [...document.querySelectorAll('#projects .proj')];
    const vh = innerHeight;
    cards.forEach((c, i) => {
      const next = cards[i + 1];
      const base = i % 2 === 0 ? -0.7 : 0.6;
      let p = 0;
      if (next) p = Math.min(1, Math.max(0, (vh * 0.95 - next.getBoundingClientRect().top) / (vh * 0.75)));
      c.style.transform = `translateY(${-p * 26}px) scale(${1 - p * 0.06}) rotate(${base + p * (i % 2 === 0 ? -1.6 : 1.6)}deg)`;
      c.style.filter = `brightness(${1 - p * 0.35})`;
      c.style.transformOrigin = '50% 0%';
    });
  };
  addEventListener('scroll', stackFx, { passive: true });
  addEventListener('resize', stackFx);
  setInterval(stackFx, 400); // also catches cards added by live GitHub refresh
  /* ---------- everything below is LIVE from GitHub ---------- */
  const countUp = (el, to) => {
    const from = Number(el.dataset.v || 0);
    el.dataset.v = to;
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0) / 900);
      el.textContent = Math.round(from + (to - from) * p);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const ago = (iso) => {
    const s = Math.max(1, (Date.now() - new Date(iso)) / 1000);
    const u = [[31536000, 'year'], [2592000, 'month'], [86400, 'day'], [3600, 'hour'], [60, 'minute']];
    for (const [sec, name] of u) if (s >= sec) { const n = Math.floor(s / sec); return `${n} ${name}${n > 1 ? 's' : ''} ago`; }
    return 'just now';
  };
  // fetch JSON; remember the last good answer so the site still shows data if GitHub rate-limits
  const getJSON = async (url, key) => {
    try {
      const r = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } });
      if (!r.ok) throw new Error(r.status);
      const j = await r.json();
      try { localStorage.setItem('gh:' + key, JSON.stringify(j)); } catch (e) { /* ignore */ }
      return { j, live: true };
    } catch (e) {
      try { const c = localStorage.getItem('gh:' + key); if (c) return { j: JSON.parse(c), live: false }; } catch (e2) { /* ignore */ }
      throw e;
    }
  };

  const renderGraph = (days) => {
    const first = new Date(days[0].date + 'T00:00:00');
    $('#graph').innerHTML = '<i style="visibility:hidden"></i>'.repeat(first.getDay()) +
      days.map((d) => `<i class="l${d.level}" title="${d.count} on ${d.date}"></i>`).join('');
    $('#graphRange').textContent = `${days[0].date} - ${days[days.length - 1].date}`;
    countUp($('#rcDays'), days.filter((d) => d.count > 0).length);
    countUp($('#rcBest'), Math.max(0, ...days.map((d) => d.count)));
  };

  const loadContrib = async () => {
    try {
      const { j } = await getJSON(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`, 'contrib');
      countUp($('#rcContrib'), j.total.lastYear);
      renderGraph(j.contributions);
    } catch (e) { if (!$('#graph').children.length) $('#graph').textContent = 'Could not load the contribution graph right now.'; }
  };

  const loadGithub = async () => {
    try {
      const [u, r, s] = await Promise.all([
        getJSON(`https://api.github.com/users/${USER}`, 'user'),
        getJSON(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`, 'repos'),
        getJSON(`https://api.github.com/users/${USER}/starred?per_page=100`, 'starred'),
      ]);
      const user = u.j, repos = Array.isArray(r.j) ? r.j : [], starred = Array.isArray(s.j) ? s.j : [];
      data.user = user;
      const mine = repos.filter((x) => !x.fork && x.name.toLowerCase() !== USER.toLowerCase());
      data.repos = starred;

      countUp($('#rcRepos'), user.public_repos);
      $('#since').textContent = `Shipping since ${new Date(user.created_at).getFullYear()}`;
      $('#fFollow').textContent = `${user.followers} followers - ${user.following} following`;
      const latest = repos.filter((x) => !x.fork)[0];
      if (latest) $('#fPush').textContent = `${latest.name} - ${ago(latest.pushed_at)}`;
      $('#liveTxt').textContent = (u.live && r.live && s.live) ? `Live - ${new Date().toLocaleTimeString('en-US')}` : 'Cached';

      const tally = {};
      mine.forEach((x) => { if (x.language) tally[x.language] = (tally[x.language] || 0) + 1; });
      const total = Object.values(tally).reduce((a, b) => a + b, 0) || 1;
      $('#langs').innerHTML = Object.entries(tally).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([l, c], i) => `
        <div><div class="lang-row"><span>${esc(l)}</span><span>${Math.round((c / total) * 100)}% - ${c} repos</span></div>
        <div class="bar ${i % 2 ? 'alt' : ''}"><b style="width:${(c / total) * 100}%"></b></div></div>`).join('');

      const box = $('#projects');
      const sig = starred.map((x) => x.id + x.pushed_at + x.stargazers_count + x.description).join();
      if (box.dataset.sig !== sig) {
        box.dataset.sig = sig;
        box.classList.add('stack');
        box.innerHTML = starred.map((x, i) => `
          <article class="proj" style="--i:${Math.min(i, 3)}">
            <div class="proj-top"><span>${pad(i + 1)} / ${pad(starred.length)}</span><span>${new Date(x.created_at).getFullYear()} - updated ${ago(x.pushed_at)}</span></div>
            <h3>${esc(x.name.replace(/[-_]/g, ' '))}</h3>
            <p>${esc(x.description || 'A project from my GitHub.')}</p>
            <div class="tags">${x.language ? `<span>${esc(x.language)}</span>` : ''}${x.stargazers_count ? `<span>${x.stargazers_count} stars</span>` : ''}${x.forks_count ? `<span>${x.forks_count} forks</span>` : ''}</div>
            <div class="proj-btns">
              <a class="cbtn" href="${esc(x.html_url)}" target="_blank" rel="noopener">GitHub</a>
              ${x.homepage ? `<a class="cbtn" href="${esc(x.homepage)}" target="_blank" rel="noopener">Live</a>` : ''}
            </div>
            <span class="bignum">${pad(i + 1)}</span>
          </article>`).join('');
        observe();
      }
    } catch (e) {
      $('#liveTxt').textContent = 'Offline';
      const box = $('#projects');
      if (!box.children.length) {
        box.innerHTML = `<article class="proj" style="--i:0"><h3>View on GitHub</h3><p>Could not load projects right now. They all live on my profile.</p><div class="proj-btns"><a class="cbtn" href="https://github.com/${USER}" target="_blank" rel="noopener">GitHub</a></div></article>`;
        observe();
      }
    }
  };

  const refresh = () => { loadGithub(); loadContrib(); };
  refresh();
  setInterval(refresh, 5 * 60 * 1000);                       // every 5 minutes
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refresh(); });
})();