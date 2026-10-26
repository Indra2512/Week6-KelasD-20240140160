// ==========================================
// 1. FITUR FETCH API (Mengambil Data Produk)
// ==========================================
const btnLoadProducts = document.querySelector('#btnLoadProducts');
const productGrid = document.querySelector('#productGrid');
const apiStatus = document.querySelector('#apiStatus');

async function fetchProductsData() {
  // Tampilkan status loading
  apiStatus.hidden = false;
  apiStatus.className = 'status-box loading';
  apiStatus.textContent = 'Memuat data produk dari server...';
  productGrid.innerHTML = '';

  try {
    // Menggunakan endpoint dari instruksi tugas: https://dummyjson.com/products
    const response = await fetch('https://dummyjson.com/products?limit=4');

    if (!response.ok) {
      throw new Error(`Gagal mengambil data! HTTP Status: ${response.status}`);
    }

    const data = await response.json();
    const products = data.products;

    // Sembunyikan status loading jika berhasil
    apiStatus.hidden = true;

    // Render data produk ke DOM (Minimal menampilkan nama dan harga produk sesuai instruksi)
    products.forEach(item => {
      const productCard = document.createElement('div');
      productCard.className = 'product-item';
      
      // Konversi harga USD ke format Rupiah simulasi agar sesuai tema UMKM
      const hargaRupiah = `Rp ${(item.price * 15000).toLocaleString('id-ID')}`;

      productCard.innerHTML = `
        <div>
          <h4>${item.title}</h4>
          <p style="font-size: 0.8rem; color: #64748b; margin-bottom: 0.5rem;">Kategori: ${item.category}</p>
        </div>
        <div class="product-price">${hargaRupiah}</div>
      `;

      productGrid.appendChild(productCard);
    });

  } catch (error) {
    console.error('Fetch Error:', error);
    apiStatus.hidden = false;
    apiStatus.className = 'status-box error';
    apiStatus.textContent = 'Gagal memuat data produk. Periksa koneksi internet Anda.';
  }
}

// Event listener untuk tombol Fetch API
btnLoadProducts.addEventListener('click', fetchProductsData);


// ==========================================
// 2. FORM INTERAKTIF, DOM & EVENT HANDLING
// ==========================================
const rentalForm = document.querySelector('#rentalForm');
const namaPemesan = document.querySelector('#namaPemesan');
const pilihanAlat = document.querySelector('#pilihanAlat');
const durasiSewa = document.querySelector('#durasiSewa');

const errorNama = document.querySelector('#errorNama');
const errorAlat = document.querySelector('#errorAlat');
const errorDurasi = document.querySelector('#errorDurasi');

const outputContainer = document.querySelector('#outputContainer');
const outputDetail = document.querySelector('#outputDetail');
const btnReset = document.querySelector('#btnReset');

// Fungsi Validasi Input Sederhana
function validateForm() {
  let isValid = true;

  // Reset pesan error
  errorNama.textContent = '';
  errorAlat.textContent = '';
  errorDurasi.textContent = '';

  // Validasi Nama (Minimal 3 karakter)
  if (namaPemesan.value.trim().length < 3) {
    errorNama.textContent = 'Nama pemesan minimal harus 3 karakter.';
    isValid = false;
  }

  // Validasi Pilihan Alat (Tidak boleh kosong)
  if (pilihanAlat.value === '') {
    errorAlat.textContent = 'Silakan pilih salah satu kamera atau lensa.';
    isValid = false;
  }

  // Validasi Durasi (Minimal 1 hari)
  if (durasiSewa.value === '' || Number(durasiSewa.value) < 1) {
    errorDurasi.textContent = 'Durasi sewa minimal 1 hari.';
    isValid = false;
  }

  return isValid;
}

// Event listener saat form disubmit
rentalForm.addEventListener('submit', function(e) {
  e.preventDefault(); // Mencegah halaman mereload otomatis

  if (validateForm()) {
    // Ambil nilai dari input form
    const nama = namaPemesan.value.trim();
    const alat = pilihanAlat.value;
    const durasi = durasiSewa.value;

    // Tampilkan hasil secara dinamis ke DOM
    outputDetail.textContent = `Terima kasih, ${nama}! Pesanan sewa alat "${alat}" untuk durasi ${durasi} hari berhasil dicatat dan sedang diproses.`;
    outputContainer.hidden = false;
  } else {
    outputContainer.hidden = true;
  }
});

// Event listener tombol reset form
btnReset.addEventListener('click', function() {
  rentalForm.reset();
  errorNama.textContent = '';
  errorAlat.textContent = '';
  errorDurasi.textContent = '';
  outputContainer.hidden = true;
});