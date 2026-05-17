function toggleDrawer() {
  const drawer    = document.getElementById('mobileDrawer');
  const hamburger = document.getElementById('hamburger');
 
  drawer.classList.toggle('open');
  hamburger.classList.toggle('open');
 
  // Khoá cuộn trang khi drawer mở
  document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
}
 
function closeDrawer() {
  document.getElementById('mobileDrawer').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
  document.body.style.overflow = '';
}
 
function scrollToSection(id, btn) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
 
  // Đặt active cho nút được nhấn
  document.querySelectorAll('.bn-item')
    .forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}


const SECTION_IDS = ['home', 'skills', 'courses', 'roadmap', 'faq'];
 
window.addEventListener('scroll', () => {
  let current = 'home';
 
  SECTION_IDS.forEach(id => {
    const el = document.getElementById(id);
    
    if (el && window.scrollY >= el.offsetTop - 120) {
      current = id;
    }
  });
 
  document.querySelectorAll('.bn-item').forEach((btn, i) => {
    btn.classList.toggle('active', SECTION_IDS[i] === current);
  });
 
}, { passive: true }); 
 

function filterTab(btn, level) {

  document.querySelectorAll('.tab')
    .forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.course-card').forEach(card => {
    const match = level === 'all' || card.dataset.level === level;
    card.style.display = match ? 'flex' : 'none';
  });
}
 
function toggleFaq(btn) {
  const isOpen = item.classList.contains('open');

  document.querySelectorAll('.faq-item')
    .forEach(i => i.classList.remove('open'));
 
  if (!isOpen) item.classList.add('open');
}
 
function openModal(courseName, price) {
 
  document.getElementById('modalCourseName').textContent = courseName;
  document.getElementById('modalPrice').textContent      = price;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
 
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(resetModal, 400);
}
function closeModalOutside(e) {

  if (e.target === document.getElementById('modalOverlay')) {
    closeModal();
  }
}
function submitEnroll() {
  document.getElementById('modalBox').innerHTML = `
    <div style="text-align:center; padding:24px 0;">
      <div style="font-size:3rem; margin-bottom:14px;">🎉</div>
      <h3 style="color:#fff; margin-bottom:8px;">Đăng ký thành công!</h3>
      <p style="color:var(--muted); font-size:.85rem; line-height:1.7;">
        Chúng tôi sẽ liên hệ với bạn<br>trong vòng 24 giờ.
      </p>
      <button
        onclick="closeModal()"
        style="margin-top:22px; padding:12px 28px;
               background:var(--accent); color:#000; border:none;
               border-radius:10px; font-family:'Syne',sans-serif;
               font-weight:700; font-size:.9rem; cursor:pointer;">
        Đóng
      </button>
    </div>
  `;
}
 
 
function resetModal() {
  document.getElementById('modalBox').innerHTML = `
    <button class="modal-close" onclick="closeModal()">✕</button>
    <h3>Đăng ký khoá học</h3>
    <div class="modal-course-name" id="modalCourseName"></div>
 
    <div class="form-group">
      <label>Họ và tên</label>
      <input type="text" placeholder="Nguyễn Văn A">
    </div>
    <div class="form-group">
      <label>Email</label>
      <input type="email" placeholder="example@gmail.com">
    </div>
    <div class="form-group">
      <label>Số điện thoại</label>
      <input type="tel" placeholder="0901 234 567">
    </div>
 
    <div class="price-row">
      <span class="price-label">Học phí</span>
      <span class="price" id="modalPrice"></span>
    </div>
 
    <button class="btn-submit" onclick="submitEnroll()">Xác nhận đăng ký →</button>
  `;
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.08 
  }
);
document.querySelectorAll('.reveal')
  .forEach(el => revealObserver.observe(el));