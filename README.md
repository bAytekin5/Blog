# Blog 

## Proje Hakkında

Bu proje, kullanıcıların blog yazıları oluşturabileceği, paylaşabileceği, yorum yapabileceği ve beğenebileceği tam kapsamlı bir web uygulamasıdır.

## Özellikler

- **Kullanıcı Yönetimi**: Kayıt olma, giriş yapma, profil düzenleme
- **Blog Makaleleri**: Oluşturma, düzenleme, silme, görüntüleme
- **Kategoriler**: Bloglara kategori atama ve kategoriye göre filtreleme
- **Yorum Sistemi**: Blog yazılarına yorum yapabilme
- **Beğeni Sistemi**: Blog yazılarını beğenebilme
- **Arama**: Blog içeriklerinde arama yapabilme
- **Yetkilendirme**: Normal kullanıcı ve admin rolleri
- **Responsive Tasarım**: Mobil uyumlu kullanıcı arayüzü

## Teknoloji Stack

### Backend
- Node.js & Express.js: API sunucusu
- MongoDB & Mongoose: Veritabanı ve ORM
- JWT: Kullanıcı kimlik doğrulama
- Bcrypt: Şifre hashing
- Cloudinary: Dosya yükleme servisi

### Frontend
- React.js: UI kütüphanesi
- Vite: Build tool
- Redux Toolkit & Redux Persist: State yönetimi
- React Router: Sayfa yönlendirme
- TailwindCSS & Shadcn UI: Stil ve bileşenler
- React Hook Form & Zod: Form yönetimi ve validasyon
- CKEditor: Zengin metin editörü
- React Toastify: Bildirimler

## Kurulum

### Gereksinimler
- Node.js (v14 veya üzeri)
- MongoDB
- Git

### Backend Kurulumu

1. Projeyi klonlayın:
   ```
   git clone https://github.com/bAytekin5/Blog.git
   cd Blog
   ```

2. Backend bağımlılıklarını yükleyin:
   ```
   cd backend
   npm install
   ```

3. `.env.new` dosyasını `.env` olarak yeniden adlandırın ve gerekli değişkenleri ayarlayın:
   ```
   PORT=3000
   MONGODB_CONNECT=<MongoDB Bağlantı URL'iniz>
   JWT_SECRET=<Güvenli bir anahtar>
   FRONTEND_URL=http://localhost:5173
   CLOUDINARY_CLOUD_NAME=<Cloudinary cloud name>
   CLOUDINARY_API_KEY=<Cloudinary API key>
   CLOUDINARY_API_SECRET=<Cloudinary API secret>
   ```

4. Backend sunucusunu başlatın:
   ```
   npm run dev
   ```

### Frontend Kurulumu

1. Frontend bağımlılıklarını yükleyin:
   ```
   cd ../frontend
   npm install
   ```

2. Frontend geliştirme sunucusunu başlatın:
   ```
   npm run dev
   ```

3. Tarayıcınızda `http://localhost:5173` adresini ziyaret edin.

## Kullanım

### Admin Kullanıcısı Oluşturma
1. Önce normal bir kullanıcı hesabı oluşturun
2. MongoDB veritabanına bağlanın ve user collection'da ilgili kullanıcının `isAdmin` alanını `true` olarak güncelleyin.

### Kategoriler
- Yalnızca admin kullanıcıları kategori ekleyebilir, düzenleyebilir ve silebilir
- Kategoriler, blog yazılarını sınıflandırmak için kullanılır

### Blog Yazıları
- Giriş yapmış tüm kullanıcılar blog yazısı oluşturabilir
- Bir blog yazısı oluştururken kategori seçimi ve içerik formatlaması yapılabilir
- Blog yazarı kendi yazılarını düzenleyebilir veya silebilir

### Yorumlar ve Beğeniler
- Giriş yapmış kullanıcılar blog yazılarına yorum yapabilir ve beğenebilir
- Kullanıcılar kendi yorumlarını düzenleyebilir veya silebilir

## API Endpoint'leri

### Kimlik Doğrulama
- `POST /api/auth/signin`: Kullanıcı girişi
- `POST /api/auth/signup`: Yeni kullanıcı kaydı
- `POST /api/auth/signout`: Kullanıcı çıkışı

### Kullanıcılar
- `GET /api/user`: Tüm kullanıcıları listeler (admin)
- `GET /api/user/:id`: Belirli bir kullanıcıyı getirir
- `PUT /api/user/:id`: Kullanıcı bilgilerini günceller

### Kategoriler
- `GET /api/category`: Tüm kategorileri listeler
- `POST /api/category`: Yeni kategori oluşturur (admin)
- `GET /api/category/:id`: Belirli bir kategoriyi getirir
- `PUT /api/category/:id`: Kategoriyi günceller (admin)
- `DELETE /api/category/:id`: Kategoriyi siler (admin)

### Blog Yazıları
- `GET /api/blog`: Tüm blog yazılarını listeler
- `POST /api/blog`: Yeni blog yazısı oluşturur
- `GET /api/blog/:id`: Belirli bir blog yazısını getirir
- `PUT /api/blog/:id`: Blog yazısını günceller
- `DELETE /api/blog/:id`: Blog yazısını siler

### Yorumlar
- `GET /api/comment`: Tüm yorumları listeler
- `POST /api/comment`: Yeni yorum ekler
- `GET /api/comment/:id`: Belirli bir yorumu getirir
- `PUT /api/comment/:id`: Yorumu günceller
- `DELETE /api/comment/:id`: Yorumu siler

### Beğeniler
- `POST /api/blog-like`: Blog yazısını beğenir
- `DELETE /api/blog-like/:id`: Beğeniyi kaldırır

## Deployment

Proje, Vercel üzerinde kolayca deploy edilebilir:

### Backend Deployment
1. Vercel CLI'yi yükleyin: `npm i -g vercel`
2. Backend klasöründe: `vercel`
3. Gerekli yapılandırmalar için talimatları izleyin

### Frontend Deployment
1. Frontend klasöründe: `vercel`
2. Gerekli yapılandırmalar için talimatları izleyin

## Katkıda Bulunma

1. Bu repo'yu fork edin
2. Feature branch'i oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inize push edin (`git push origin feature/amazing-feature`)
5. Pull request açın



