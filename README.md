# RoiDev-Tools CLI

## Deskripsi
RoiDev-Tools adalah alat baris perintah untuk mengunduh media dari berbagai platform seperti TikTok, YouTube, dan Instagram. Alat ini memungkinkan pengguna untuk mengunduh video dan audio tanpa watermark dan dengan kualitas tinggi.(alat ini memakai api dari lolHuman API jadi buat yang mau API-key nya bisa kalian dapetin secara gratis di [Website LolHuman](https://api.lolhuman.xyz/) )

## Persyaratan
- Node.js
- npm atau yarn

## Instalasi
Untuk menggunakan RoiDev-Tools, ikuti langkah-langkah berikut:

1. Klon repositori ini.
2. Navigasi ke direktori proyek dan jalankan `npm install` untuk menginstal dependensi.

## Konfigurasi
Salin file `.env.example` ke file baru bernama `.env` dan sesuaikan nilai berikut:
- `API_KEY`: Kunci API Anda dari lolhuman.
- `API_URL`: URL API lolhuman.

Contoh:
```
API_KEY = uhdsYESBcgchfbfdgceyyegdceg
API_URL = https://api.lolhuman.xyz/api/
```


## Penggunaan
Untuk menjalankan RoiDev-Tools, gunakan perintah berikut:

```bash
npm start
```
Setelah menjalankan, Anda akan melihat menu interaktif di mana Anda dapat memilih jenis media yang ingin Anda unduh dan menyediakan URL yang sesuai.

### Menu yang Tersedia
- **Tiktok Video**: Mendownload video dari TikTok tanpa watermark.
- **Tiktok Audio**: Mendownload audio dari TikTok.
- **Youtube Video**: Mendownload video dari YouTube.
- **Youtube Audio**: Mendownload audio dari YouTube.
- **Instagram Video**: Mendownload video dari Instagram.

Setelah memilih opsi dan memasukkan URL, media akan secara otomatis diunduh ke direktori `Downloads` di komputer Anda.

## Lisensi
Proyek ini dilisensikan di bawah ISC.

## Catatan
Pastikan Anda memiliki koneksi internet yang stabil dan kunci API yang valid untuk menggunakan alat ini secara efektif.

Made with ❤ by [@idlanyor](https://github.com/idlanyor)

