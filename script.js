// ==========================================
// 1. BAGIAN FORM: DOM SELECTOR & EVENT HANDLING
// ==========================================
const form = document.querySelector('#captionForm');
const namaProduk = document.querySelector('#namaProduk');
const keunggulan = document.querySelector('#keunggulan');
const platform = document.querySelector('#platform');

const errorNama = document.querySelector('#errorNama');
const errorKeunggulan = document.querySelector('#errorKeunggulan');

const outputContainer = document.querySelector('#outputContainer');
const captionOutput = document.querySelector('#captionOutput');
const badgePlatform = document.querySelector('#badgePlatform');
const btnReset = document.querySelector('#btnReset');

// Fungsi Validasi Sederhana
function validateForm() {
  let valid = true;
  errorNama.textContent = '';
  errorKeunggulan.textContent = '';

  // Validasi Nama Produk (Minimal 3 Karakter)
  if (namaProduk.value.trim().length < 3) {
    errorNama.textContent = 'Nama produk minimal 3 karakter.';
    valid = false;
  }

  // Validasi Keunggulan (Minimal 10 Karakter)
  if (keunggulan.value.trim().length < 10) {
    errorKeunggulan.textContent = 'Keunggulan minimal 10 karakter.';
    valid = false;
  }

  return valid;
}

// Event Listener saat form disubmit
form.addEventListener('submit', function(e) {
  e.preventDefault(); // Mencegah reload halaman

  if (validateForm()) {
    const nama = namaProduk.value.trim();
    const detail = keunggulan.value.trim();
    const plat = platform.value;

    // Generate teks caption dinamis
    let generatedText = `✨ Promo Spesial ${nama}! ✨\n\n${detail}\n\nYuk order sekarang juga sebelum kehabisan! Hubungi kami untuk pemesanan ya. 👇\n\n#UMKM #${nama.replace(/\s+/g, '')} #ProdukLokal`;

    // Tampilkan ke DOM
    captionOutput.textContent = generatedText;
    badgePlatform.textContent = plat;
    outputContainer.hidden = false;
  } else {
    outputContainer.hidden = true;
  }
});

// Event Listener tombol Reset
btnReset.addEventListener('click', function() {
  form.reset();
  errorNama.textContent = '';
  errorKeunggulan.textContent = '';
  outputContainer.hidden = true;
});


// ==========================================
// 2. BAGIAN FETCH API: MENGAMBIL DATA PRODUK
// ==========================================
const btnFetch = document.querySelector('#btnFetch');
const productContainer = document.querySelector('#productContainer');
const apiStatus = document.querySelector('#apiStatus');

async function loadProductsFromAPI() {
  // Tampilkan status loading
  apiStatus.hidden = false;
  apiStatus.className = 'status-box loading';
  apiStatus.textContent = 'Mengambil data dari https://dummyjson.com/products...';
  productContainer.innerHTML = '';

  try {
    // Memanggil Fetch API ke endpoint tugas
    const response = await fetch('https://dummyjson.com/products?limit=5');

    if (!response.ok) {
      throw new Error(`Gagal mengambil data! Status: ${response.status}`);
    }

    const data = await response.json();
    const products = data.products;

    // Sembunyikan status loading
    apiStatus.hidden = true;

    // Menampilkan data produk ke DOM (Lengkap dengan gambar, nama, dan harga)
    products.forEach(item => {
      const itemEl = document.createElement('div');
      itemEl.className = 'product-card-item';

      itemEl.innerHTML = `
        <img src="${item.thumbnail}" alt="${item.title}" class="product-img">
        <div class="product-info">
          <h4>${item.title}</h4>
          <p>Kategori: ${item.category}</p>
        </div>
        <div class="product-price">$ ${item.price}</div>
      `;

      productContainer.appendChild(itemEl);
    });

  } catch (error) {
    console.error('Fetch Error:', error);
    apiStatus.hidden = false;
    apiStatus.className = 'status-box error';
    apiStatus.textContent = 'Gagal mengambil data dari API. Periksa koneksi internet Anda.';
  }
}

// Event Listener untuk tombol Fetch API
btnFetch.addEventListener('click', loadProductsFromAPI);