// --- 1. ANIMASI KELOPAK SAKURA GUGUR (OPTIMIZED) ---
document.addEventListener("DOMContentLoaded", () => {
    // Deteksi perangkat untuk membatasi jumlah partikel demi performa HP
    const isMobile = window.innerWidth < 768;
    const maxSakura = isMobile ? 20 : 50; 
    let currentSakuraCount = 0;

    function spawnSakura() {
        if (currentSakuraCount >= maxSakura) return;

        const sakura = document.createElement("div");
        sakura.className = "sakura";
        
        sakura.style.left = Math.random() * 100 + "vw";
        
        const duration = (5 + Math.random() * 5);
        sakura.style.animationDuration = duration + "s";
        
        sakura.style.opacity = Math.random() * 0.5 + 0.5; 
        
        const size = (8 + Math.random() * 8) + "px";
        sakura.style.width = size;
        sakura.style.height = size;

        // Mengirimkan nilai pergerakan X dan rotasi ke CSS lewat variabel agar diproses GPU
        const endX = (Math.random() * 60 - 30) + "px"; 
        const randomRotation = (Math.random() * 360 + 360) + "deg"; 
        sakura.style.setProperty('--end-x', endX);
        sakura.style.setProperty('--rot', randomRotation);

        document.body.appendChild(sakura);
        currentSakuraCount++;

        // Fitur Pembersih Otomatis agar RAM tidak kepenuhan
        setTimeout(() => {
            sakura.remove();
            currentSakuraCount--;
            spawnSakura(); 
        }, duration * 1000);
    }

    const spawnDelay = isMobile ? 400 : 200;
    for (let i = 0; i < maxSakura; i++) {
        setTimeout(spawnSakura, i * spawnDelay);
    }
});

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
    
    document.getElementById('modalCloseBtn').addEventListener('click', () => modal.classList.remove('active'));
});

modal.addEventListener('click', (e) => { 
    if (e.target === modal) modal.classList.remove('active'); 
});

// --- 3. MEKANISME AUTOPLAY & KONTROL MUSIK ---
const audio = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');

function pemicuMusik() {
    audio.play().then(() => {
        musicToggle.classList.add('playing');
        document.removeEventListener('click', pemicuMusik);
        document.removeEventListener('touchstart', pemicuMusik);
    }).catch(err => console.log("Autoplay ditahan browser, menunggu interaksi layar..."));
}

document.addEventListener('click', pemicuMusik);
document.addEventListener('touchstart', pemicuMusik);

musicToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (audio.paused) {
        audio.play();
        musicToggle.classList.add('playing');
    } else {
        audio.pause();
        musicToggle.classList.remove('playing');
    }
});
