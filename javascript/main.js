let cart = [];
let addedProducts = new Set(); // Set to track added products

document.querySelectorAll('.btnDetail').forEach(item => {
    item.addEventListener('click', (e) => {
        let parent = e.target.closest('.card');

        let gambar = parent.querySelector('.card-img-top').src;
        let harga = parent.querySelector('.harga').innerHTML;
        let judul = parent.querySelector('.card-text').innerHTML;
        let deskripsi = parent.querySelector('.deskripsi') ? parent.querySelector('.deskripsi').innerHTML : '<i>tidak ada informasi yang tersedia</i>';

        let tombolModal = document.querySelector('.btnModal');
        tombolModal.click();

        document.querySelector('.modalTitle').innerHTML = judul;
        let image = document.createElement('img');
        image.src = gambar;
        image.classList.add('w-100');
        document.querySelector('.modalImage').innerHTML = '';
        document.querySelector('.modalImage').appendChild(image);
        document.querySelector('.modalDeskripsi').innerHTML = deskripsi;
        document.querySelector('.modalHarga').innerHTML = harga;

        const nohp = '6282319192604';
        let pesan = `https://api.whatsapp.com/send?phone=${nohp}&text=Hallo%20Kak,%20saya%20mau%20pesan%20produk%20ini : %20\n${judul} \nHarga : ${harga}`;

        document.querySelector('.btnBeli').href = pesan;

        // Add to cart functionality
        document.querySelector('.btnKeranjang').addEventListener('click', () => {
            if (!addedProducts.has(judul)) {
                cart.push({judul, harga});
                addedProducts.add(judul);

                // Show the toast notification
                showToast(`Produk ${judul} telah ditambahkan ke keranjang`);

                let cartItems = document.querySelector('.cart-items');
                let row = document.createElement('tr');
                row.innerHTML = `
                    <td>${judul}</td>
                    <td>${harga}</td>
                    <td><button class="btn btn-sm btn-danger btn-remove" data-judul="${judul}">Hapus</button></td>
                `;
                cartItems.appendChild(row);

                // Add functionality to remove item from cart
                row.querySelector('.btn-remove').addEventListener('click', (e) => {
                    let itemJudul = e.target.getAttribute('data-judul');
                    row.remove();
                    cart = cart.filter(item => item.judul !== itemJudul);
                    addedProducts.delete(itemJudul);
                    showToast(`Produk ${itemJudul} telah dihapus dari keranjang`);
                });
            }
        });
    });
});

// Checkout functionality
document.getElementById('checkoutBtn').addEventListener('click', () => {
    const nohp = '6282319192604';
    let pesan = `Hallo Kak,%20saya%20mau%20pesan%20produk%20berikut:%0A`;

    let totalHarga = 0;

    cart.forEach(item => {
        pesan += `- Produk : ${item.judul} Harga : ${item.harga}%0A`;
        let hargaNumerik = parseInt(item.harga.replace(/[^0-9]/g, ''), 10);
        totalHarga += hargaNumerik;
    });

    pesan += `%0ATotal%20Harga%20:%20Rp.%20${totalHarga.toLocaleString('id-ID')}`;

    let whatsappURL = `https://api.whatsapp.com/send?phone=${nohp}&text=${pesan}`;
    window.open(whatsappURL, '_blank');
});

// Fungsi untuk menampilkan toast notification
function showToast(message) {
    let toastEl = document.getElementById('liveToast');
    toastEl.querySelector('.toast-body').innerText = message;
    let toast = new bootstrap.Toast(toastEl);
    toast.show();
}
