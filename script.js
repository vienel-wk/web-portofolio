/* ============================================================
   PORTFOLIO TKJ — AURORA UI
   File  : script.js
   Author: Vienel Reyhan Choir
   ============================================================ */

/* ──────────────────────────────────────────
   1. SCROLL REVEAL ANIMATION
   Menggunakan IntersectionObserver agar elemen
   muncul dengan animasi saat masuk viewport.
────────────────────────────────────────── */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {

        // Tampilkan elemen dengan sedikit delay bertahap
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);

        // Animasikan skill bar jika ada di dalam elemen ini
        const bar = entry.target.querySelector('.skill-bar');
        if (bar) {
          const targetWidth = bar.dataset.width;
          setTimeout(() => {
            bar.style.width = targetWidth + '%';
          }, 300 + i * 80);
        }

        // Hentikan observasi setelah elemen sudah muncul
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observer.observe(el));
}

/* ──────────────────────────────────────────
   2. SPOTLIGHT CARD EFFECT
   Efek cahaya mengikuti posisi kursor di dalam
   card, mirip efek Aceternity UI Spotlight.
────────────────────────────────────────── */
function initSpotlightCards() {
  const cards = document.querySelectorAll('.spotlight-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mx', x + 'px');
      card.style.setProperty('--my', y + 'px');
    });
  });
}

/* ──────────────────────────────────────────
   3. TYPING ANIMATION
   Menampilkan teks bergantian dengan efek
   mengetik dan menghapus (typewriter effect).
────────────────────────────────────────── */
function initTypingAnimation() {
  const words = [
    'Vienel Reyhan Choir',
    'Web Developer',
    'Network Engineer',
    'Linux Admin',
    'Cyber Security'
  ];

  const element = document.getElementById('typed-name');
  if (!element) return; // Keluar jika elemen tidak ditemukan

  let wordIndex   = 0;   // Index kata saat ini
  let charIndex   = 0;   // Index karakter saat ini
  let isDeleting  = false;

  function type() {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      // Mode mengetik: tambah 1 karakter
      element.textContent = currentWord.slice(0, ++charIndex);

      if (charIndex === currentWord.length) {
        // Selesai mengetik, tunggu sebentar lalu hapus
        isDeleting = true;
        return setTimeout(type, 1800);
      }
    } else {
      // Mode menghapus: kurangi 1 karakter
      element.textContent = currentWord.slice(0, --charIndex);

      if (charIndex === 0) {
        // Selesai menghapus, pindah ke kata berikutnya
        isDeleting = false;
        wordIndex  = (wordIndex + 1) % words.length;
      }
    }

    // Kecepatan mengetik vs menghapus
    const speed = isDeleting ? 60 : 110;
    setTimeout(type, speed);
  }

  // Mulai animasi setelah 1.2 detik
  setTimeout(type, 1200);
}

/* ──────────────────────────────────────────
   4. ACTIVE NAV LINK HIGHLIGHT
   Menandai link navigasi yang aktif sesuai
   section yang sedang terlihat di viewport.
────────────────────────────────────────── */
function initNavHighlight() {
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let currentSection = '';

    // Cari section yang sedang aktif (posisi scroll)
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) {
        currentSection = section.id;
      }
    });

    // Tandai link yang sesuai dengan section aktif
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === '#' + currentSection) {
        link.style.color = 'var(--aurora-1)';
      } else {
        link.style.color = '';
      }
    });
  });
}

/* ──────────────────────────────────────────
   5. CONTACT FORM — VALIDASI & KIRIM
   Validasi input sederhana + simulasi pengiriman
   (bisa dihubungkan ke backend/EmailJS nanti).
────────────────────────────────────────── */
function initContactForm() {
  const btn = document.querySelector('.btn-primary.btn-full');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const nameInput  = document.querySelector('input[type="text"]');
    const emailInput = document.querySelector('input[type="email"]');
    const msgInput   = document.querySelector('textarea');

    // Validasi: semua field harus diisi
    if (!nameInput.value.trim() || !emailInput.value.trim() || !msgInput.value.trim()) {
      showNotification('⚠️ Mohon isi semua field terlebih dahulu!', 'warning');
      return;
    }

    // Validasi format email sederhana
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      showNotification('⚠️ Format email tidak valid!', 'warning');
      return;
    }

    // Simulasi pengiriman (ganti dengan fetch/EmailJS di produksi)
    btn.textContent = 'Mengirim...';
    btn.disabled    = true;

    setTimeout(() => {
      showNotification('✅ Pesan berhasil dikirim! Terima kasih.', 'success');
      btn.textContent  = 'Kirim Pesan ✦';
      btn.disabled     = false;

      // Reset form
      nameInput.value  = '';
      emailInput.value = '';
      msgInput.value   = '';
    }, 1500);
  });
}

/* ──────────────────────────────────────────
   6. NOTIFICATION HELPER
   Menampilkan notifikasi popup sementara.
────────────────────────────────────────── */
function showNotification(message, type = 'success') {
  // Hapus notifikasi lama jika ada
  const existing = document.querySelector('.notif-popup');
  if (existing) existing.remove();

  const colors = {
    success: { bg: 'rgba(0,255,135,0.15)', border: 'rgba(0,255,135,0.4)', text: '#00ff87' },
    warning: { bg: 'rgba(255,200,0,0.12)', border: 'rgba(255,200,0,0.35)', text: '#ffc800' },
    error:   { bg: 'rgba(255,60,60,0.12)', border: 'rgba(255,60,60,0.35)',  text: '#ff6060' }
  };

  const c   = colors[type] || colors.success;
  const div = document.createElement('div');
  div.className = 'notif-popup';

  Object.assign(div.style, {
    position:     'fixed',
    bottom:       '2rem',
    right:        '2rem',
    zIndex:       '9999',
    padding:      '1rem 1.5rem',
    background:   c.bg,
    border:       `1px solid ${c.border}`,
    borderRadius: '14px',
    color:        c.text,
    fontFamily:   'var(--font-body)',
    fontSize:     '0.9rem',
    fontWeight:   '600',
    backdropFilter: 'blur(10px)',
    boxShadow:    `0 0 30px ${c.border}`,
    animation:    'fadeInUp 0.4s ease both',
    maxWidth:     '320px'
  });

  div.textContent = message;
  document.body.appendChild(div);

  // Hapus setelah 3 detik
  setTimeout(() => {
    div.style.opacity = '0';
    div.style.transform = 'translateY(10px)';
    div.style.transition = 'opacity 0.4s, transform 0.4s';
    setTimeout(() => div.remove(), 400);
  }, 3000);
}

/* ──────────────────────────────────────────
   7. SMOOTH SCROLL untuk anchor links
────────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ──────────────────────────────────────────
   8. INIT — Jalankan semua fungsi
   Dijalankan saat DOM sudah siap.
────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initSpotlightCards();
  initTypingAnimation();
  initNavHighlight();
  initContactForm();
  initSmoothScroll();

  console.log('%c⟨ Vienel.dev ⟩ Portfolio loaded! 🚀', 'color:#00d4ff; font-size:14px; font-weight:bold;');
});