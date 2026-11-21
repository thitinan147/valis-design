// VALIS prototype helpers: Esc closes a dialog page, login form goes to the dashboard, show/hide password.
document.addEventListener('keydown', function (e) {
  if (e.key !== 'Escape') return;
  var c = document.querySelector('[data-esc]');
  if (c) { e.preventDefault(); location.href = c.getAttribute('href'); }
});
document.addEventListener('submit', function (e) {
  var f = e.target;
  if (!f.hasAttribute('data-proto')) return;
  e.preventDefault();
  location.href = f.getAttribute('action');
});
document.addEventListener('click', function (e) {
  var b = e.target.closest('[data-toggle-pw]');
  if (!b) return;
  var i = document.getElementById(b.getAttribute('data-toggle-pw'));
  var show = i.type === 'password';
  i.type = show ? 'text' : 'password';
  b.setAttribute('aria-label', show ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน');
  b.setAttribute('aria-pressed', show ? 'true' : 'false');
});
// phone drawer: the sidebar slides in below 768 px; Esc, the scrim or the close button shut it and focus returns to the menu button
(function () {
  function setOpen(open) {
    var b = document.querySelector('.nav-tg'), nav = document.getElementById('nav'), s = document.querySelector('.nav-scrim');
    if (!b || !nav) return;
    document.body.classList.toggle('nav-open', open);
    b.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (s) s.hidden = !open;
    if (open) { var f = nav.querySelector('[data-nav-close]'); if (f) f.focus(); }
    else b.focus();
  }
  document.addEventListener('click', function (e) {
    if (e.target.closest('.nav-tg')) { setOpen(!document.body.classList.contains('nav-open')); return; }
    if (e.target.closest('[data-nav-close]')) setOpen(false);
  });
  // WebKit (iPhone) doesn't send a document-level click for a tap on a plain div, so the scrim gets its own handler
  document.addEventListener('DOMContentLoaded', function () {
    var s = document.querySelector('.nav-scrim');
    if (s) s.addEventListener('click', function (e) { e.preventDefault(); setOpen(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.body.classList.contains('nav-open')) { e.stopImmediatePropagation(); setOpen(false); }
  }, true);
  // the first invalid field gets focus on an error state
  document.addEventListener('DOMContentLoaded', function () {
    var bad = document.querySelector('#main [aria-invalid="true"], .dlg [aria-invalid="true"]');
    if (bad && !window.matchMedia('(max-width: 767px)').matches) bad.focus({ preventScroll: true });
  });
})();
// a dialog page puts focus inside the dialog (first invalid field, else first field, else the primary button)
document.addEventListener('DOMContentLoaded', function () {
  var d = document.querySelector('.dlg');
  if (!d) return;
  var t = d.querySelector('[aria-invalid="true"]') || d.querySelector('input:not([type=hidden]),select,textarea') || d.querySelector('.btn.pr, a.btn');
  if (t) t.focus({ preventScroll: true });
});
// review bar on phones: one short row; the options button shows states, widths and the other links
document.addEventListener('click', function (e) {
  var b = e.target.closest('.rv-more');
  if (!b) return;
  var n = b.closest('.rv'), open = !n.classList.contains('rv-open');
  n.classList.toggle('rv-open', open);
  b.setAttribute('aria-expanded', open ? 'true' : 'false');
});
