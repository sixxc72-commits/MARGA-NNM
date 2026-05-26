// --- 1. ANIMASI KELOPAK SAKURA GUGUR ---
const fragment = document.createDocumentFragment();
for (let i = 0; i < 20; i++) {
    const sakura = document.createElement("div");
    sakura.className = "sakura";
    sakura.style.left = Math.random() * 100 + "vw";
    sakura.style.animationDuration = (6 + Math.random() * 6) + "s";
    sakura.style.opacity = Math.random();
    const size = (8 + Math.random() * 8) + "px";
    sakura.style.width = size;
    sakura.style.height = size;
    fragment.appendChild(sakura);
}
document.body.appendChild(fragment);

// --- 2. LOGIKA INTERAKSI MODAL & DELEGASI EVENT ---
const modal = document.getElementById('universalModal');
const modalImg = document.getElementById('modalImg');
const modalName = document.getElementById('modalName');
const btnContainer = document.getElementById('modalBtnContainer');

document.querySelector('.container').addEventListener('click', (e) => {
    const targetElement = e.target.closest('.admin-card, .link-box');
    if (!targetElement) return;

    const type = targetElement.getAttribute('data-type');
    const name = targetElement.getAttribute('data-name');
    const imgSrc = targetElement.getAttribute('data-img');

    modalImg.src = imgSrc;
    modalName.innerText = name;

    if (type === 'admin') {
        const waUrl = targetElement.getAttribute('data-wa');
        const ttUrl = targetElement.getAttribute('data-tiktok');
        btnContainer.innerHTML = `
            <div class="social-buttons-row">
                <a href="${waUrl}" target="_blank" class="modal-btn btn-wa">WhatsApp</a>
                <a href="${ttUrl}" target="_blank" class="modal-btn btn-tt">TikTok</a>
            </div>
            <button class="modal-btn-close" id="modalCloseBtn">Kembali</button>
        `;
    } else if (type === 'link') {
        const targetUrl = targetElement.getAttribute('data-url');
        btnContainer.innerHTML = `
            <a href="${targetUrl}" target="_blank" class="btn-link-go">Buka Tautan</a>
            <button class="modal-btn-close" id="modalCloseBtn">Kembali</button>
        `;
    }

    modal.classList.add('active');
    
    // Pasang event close untuk tombol kembali baru yang di-render
    document.getElementById('modalCloseBtn').addEventListener('click', () => modal.classList.remove('active'));
});

// Tutup modal ketika mengklik area overlay hitam transparan
modal.addEventListener('click', (e) => { 
    if (e.target === modal) modal.classList.remove('active'); 
});

// --- 3. MEKANISME AUTOPLAY & KONTROL MUSIK ---
const audio = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');

// Fungsi pemicu saat user berinteraksi pertama kali dengan layar
function pemicuMusik() {
    audio.play().then(() => {
        musicToggle.classList.add('playing'); // Jalankan animasi putar tombol
        // Bersihkan event listener agar musik tidak ter-restart pada klik berikutnya
        document.removeEventListener('click', pemicuMusik);
        document.removeEventListener('touchstart', pemicuMusik);
    }).catch(err => console.log("Autoplay ditahan browser, menunggu interaksi layar..."));
}

// Deteksi sentuhan/klik awal pengguna pada halaman
document.addEventListener('click', pemicuMusik);
document.addEventListener('touchstart', pemicuMusik);

// Logika klik manual pada tombol musik melayang (Play / Jeda)
musicToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Mencegah event bubling ke pemicu global
    if (audio.paused) {
        audio.play();
        musicToggle.classList.add('playing');
    } else {
        audio.pause();
        musicToggle.classList.remove('playing');
    }
});
          
