const config = window.PORTFOLIO;
document.querySelectorAll('[data-name]').forEach(el => { el.textContent = config.name; });
document.title = `${config.name} — Developer & Visual Creator`;
document.getElementById('year').textContent = new Date().getFullYear();
const sidebar = document.getElementById('sidebar');
const sidebarScrim = document.getElementById('sidebar-scrim');
const menuToggle = document.getElementById('menu-toggle');
function setMenu(open) {
  sidebar.classList.toggle('open', open);
  sidebarScrim.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
}
menuToggle.addEventListener('click', () => setMenu(!sidebar.classList.contains('open')));
document.getElementById('sidebar-close').addEventListener('click', () => setMenu(false));
sidebarScrim.addEventListener('click', () => setMenu(false));
document.querySelectorAll('.sidebar a[href^="#"]').forEach(link => link.addEventListener('click', () => setMenu(false)));
const dialogs = document.querySelectorAll('dialog');
function openDialog(dialog) { dialog.showModal(); document.body.classList.add('modal-open'); }
dialogs.forEach(dialog => {
  dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
  dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
});
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(other => { const active = other === button; other.classList.toggle('active', active); other.setAttribute('aria-pressed', String(active)); });
  document.querySelectorAll('.project-card').forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; });
}));
const projectDialog = document.getElementById('project-dialog');
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = config.projects[Number(button.dataset.project)];
  document.getElementById('dialog-title').textContent = project.title;
  document.getElementById('dialog-category').textContent = project.category;
  document.getElementById('dialog-description').textContent = project.description;
  const list = document.getElementById('dialog-deliverables'); list.replaceChildren();
  project.deliverables.forEach(text => { const item = document.createElement('li'); item.textContent = text; list.append(item); });
  const projectLink = document.getElementById('project-link'); projectLink.href = project.url; projectLink.textContent = project.cta;
  openDialog(projectDialog);
}));
document.querySelector('.dialog-contact').addEventListener('click', () => projectDialog.close());
const contactEmail = config.email.trim();
const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail);
if (hasEmail) {
  const link = document.createElement('a'); link.href = `mailto:${contactEmail}`; link.textContent = contactEmail;
  document.getElementById('contact-status').append(link);
  document.getElementById('submit-label').textContent = 'Let’s talk about your project';
  document.getElementById('form-hint').textContent = 'Opens your email app with your project details. You review and send.';
} else {
  document.getElementById('contact-status').textContent = 'Direct contact details coming soon.';
}
let brief = '';
document.getElementById('inquiry-form').addEventListener('submit', event => {
  event.preventDefault(); const form = event.currentTarget; if (!form.reportValidity()) return;
  const values = new FormData(form);
  const name = String(values.get('name')).trim(), email = String(values.get('email')).trim(), message = String(values.get('message')).trim();
  if (!name || !message) { document.getElementById('form-status').textContent = 'Please add your name and a little about your project.'; return; }
  brief = `PROJECT INQUIRY\n\nName: ${name}\nEmail: ${email}\nServices: ${values.getAll('service').join(', ') || 'Let’s discuss'}\n\nProject details:\n${message}`;
  if (hasEmail) {
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(`Project inquiry from ${name}`)}&body=${encodeURIComponent(brief)}`;
    document.getElementById('form-status').textContent = 'Your email app should open. Review and send your message there.';
  } else { document.getElementById('brief-preview').textContent = brief; openDialog(document.getElementById('brief-dialog')); }
});
document.getElementById('download-brief').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([brief], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a'); link.href = url; link.download = 'project-brief.txt'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
});
