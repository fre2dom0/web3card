# Web3Card - Decentralized Profile Cards

[English](#english) | [Türkçe](#türkçe)

---

## English

### 🎯 Overview

Web3Card is a decentralized profile card application that allows users to create and share personalized profile cards linked to their blockchain wallet addresses. Built with modern Web3 technologies, it provides a seamless way to showcase your digital identity in the decentralized ecosystem.

### ✨ Features

- **🔐 Decentralized Identity**: Connect with your wallet address
- **🎨 Customizable Themes**: Personalize your profile with custom color schemes
- **📱 Responsive Design**: Works perfectly on all devices
- **🔗 Social Links**: Add and manage your social media links
- **🖼️ Avatar Support**: Upload and manage profile pictures
- **⚡ Real-time Updates**: Instant profile updates with IPFS
- **🌐 Shareable Profiles**: Share your profile via wallet address

### 🏗️ Architecture

#### Frontend Stack
- **React 18** + **TypeScript** - Modern UI framework
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Query** - Server state management

#### Web3 Stack
- **Wagmi** + **Viem** - Ethereum interaction and wallet management
- **ThirdWeb** - IPFS storage and blockchain utilities
- **Reown AppKit** - Enhanced wallet management

#### Smart Contract
- **Address**: `0x77DCB886E09B7f2f602fd97301924EB8021F0545`
- **Network**: Ethereum Sepolia
- **Functions**:
  - `getCid(address)` - Retrieve user's IPFS CID
  - `setCID(cid)` - Store new IPFS CID

### 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # UI Components
│   │   ├── ProfileCard.tsx  # Main profile card component
│   │   ├── Avatar.tsx       # Profile picture component
│   │   ├── Name.tsx         # Username component
│   │   ├── Bio.tsx          # Bio description component
│   │   ├── Address.tsx      # Wallet address display
│   │   ├── Links.tsx        # Social media links
│   │   └── Settings.tsx     # Theme and settings
│   ├── hooks/               # Custom React hooks
│   │   ├── useProfileGet.ts # Profile data fetching
│   │   ├── useProfileForm.ts # Form state management
│   │   ├── useProfileSubmit.ts # Profile submission
│   │   ├── useOwner.ts      # Ownership verification
│   │   └── useCids.ts       # IPFS CID management
│   ├── pages/               # Route components
│   │   ├── Profile.tsx      # Main profile page
│   ├── constants/           # Contract configurations
│   │   ├── contract.json    # Smart contract ABI
│   │   └── erc2771.json    # Forwarder configuration
│   ├── lib/                 # Utility libraries
│   │   └── ipfs.ts         # IPFS interaction
│   └── utils/               # Helper utilities
│       ├── client.ts        # ThirdWeb client
│       └── toast.ts         # Notification system
```

### 🚀 Getting Started

#### Prerequisites
- Node.js 18+ 
- npm or yarn
- MetaMask or any Web3 wallet

#### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:5173`

### 🎮 Usage

#### Creating Your Profile
1. Connect your wallet using the navbar
2. Click the bookmark icon (bottom-right) to enter edit mode
3. Customize your profile:
   - Upload avatar
   - Set username (max 18 characters)
   - Write bio (max 160 characters)
   - Add social media links
   - Choose custom theme colors
4. Click "Set Profile" to save changes

#### Viewing Profiles
- **Your Profile**: Visit the homepage when connected
- **Other Profiles**: Use URL format `/0x...` with wallet address

#### Features in Detail

**Profile Components:**
- **Avatar**: Upload and crop profile pictures
- **Name**: Editable username with character counter
- **Bio**: Multi-line description with character limit
- **Address**: Display wallet address with copy functionality
- **Links**: Add/remove social media links
- **Theme**: Customize colors for your profile

**Edit Mode:**
- Inline editing with real-time validation
- Character counters for text fields
- Smooth animations and transitions
- Owner-only access to edit functionality

### 🔧 Development

#### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run linter
npm run preview  # Preview production build
```

#### Key Technologies Used
- **Biome** - Fast linter and formatter
- **React Icons** - Icon library
- **React Image Crop** - Image cropping functionality
- **React Select** - Enhanced select components
- **React Toastify** - Toast notifications
- **TinyColor2** - Color manipulation

### 🌐 Data Flow

1. **Profile Creation**:
   ```
   User Input → Form Validation → IPFS Upload → Smart Contract → Profile Saved
   ```

2. **Profile Retrieval**:
   ```
   Wallet Address → Smart Contract → IPFS CID → IPFS Data → Profile Display
   ```

3. **Profile Update**:
   ```
   Edit Mode → Form Changes → IPFS Upload → Smart Contract → Profile Updated
   ```

### 🔒 Security Features

- **Ownership Verification**: Only profile owners can edit
- **Input Validation**: Character limits and format validation
- **IPFS Integrity**: Decentralized data storage
- **Wallet Authentication**: Secure wallet-based identity

### 🎨 Theming System

The application uses CSS custom properties for dynamic theming:
- `--color-theme-1`: Background color
- `--color-theme-2`: Secondary background
- `--color-theme-3`: Accent color
- `--color-theme-4`: Primary text color

### 📱 Responsive Design

- **Mobile-first** approach
- **Flexible layouts** for all screen sizes
- **Touch-friendly** interface

---

## Türkçe

### 🎯 Genel Bakış

Web3Card, kullanıcıların blockchain cüzdan adresleriyle bağlantılı kişiselleştirilmiş profil kartları oluşturmasına ve paylaşmasına olanak tanıyan merkezi olmayan bir profil kartı uygulamasıdır. Modern Web3 teknolojileriyle geliştirilmiş olup, merkezi olmayan ekosistemde dijital kimliğinizi sergilemenin sorunsuz bir yolunu sunar.

### ✨ Özellikler

- **🔐 Merkezi Olmayan Kimlik**: Cüzdan adresinizle bağlanın
- **🎨 Özelleştirilebilir Temalar**: Profilinizi özel renk şemalarıyla kişiselleştirin
- **📱 Responsive Tasarım**: Tüm cihazlarda mükemmel çalışır
- **🔗 Sosyal Linkler**: Sosyal medya linklerinizi ekleyin ve yönetin
- **🖼️ Avatar Desteği**: Profil fotoğraflarını yükleyin ve yönetin
- **⚡ Gerçek Zamanlı Güncellemeler**: IPFS ile anında profil güncellemeleri
- **🌐 Paylaşılabilir Profiller**: Profilinizi cüzdan adresiyle paylaşın

### 🏗️ Mimari

#### Frontend Teknolojileri
- **React 18** + **TypeScript** - Modern UI framework
- **Vite** - Hızlı build tool ve development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Query** - Server state management

#### Web3 Teknolojileri
- **Wagmi** + **Viem** - Ethereum etkileşimi ve cüzdan yönetimi
- **ThirdWeb** - IPFS depolama ve blockchain utilities
- **Reown AppKit** - Gelişmiş cüzdan yönetimi

#### Akıllı Kontrat
- **Adres**: `0x77DCB886E09B7f2f602fd97301924EB8021F0545`
- **Ağ**: Sepolia (yapılandırılabilir)
- **Fonksiyonlar**:
  - `getCid(address)` - Kullanıcının IPFS CID'sini getir
  - `setCID(cid)` - Yeni IPFS CID'sini kaydet

### 📁 Proje Yapısı

```
frontend/
├── src/
│   ├── components/          # UI Bileşenleri
│   │   ├── ProfileCard.tsx  # Ana profil kartı bileşeni
│   │   ├── Avatar.tsx       # Profil fotoğrafı bileşeni
│   │   ├── Name.tsx         # Kullanıcı adı bileşeni
│   │   ├── Bio.tsx          # Bio açıklama bileşeni
│   │   ├── Address.tsx      # Cüzdan adresi gösterimi
│   │   ├── Links.tsx        # Sosyal medya linkleri
│   │   └── Settings.tsx     # Tema ve ayarlar
│   ├── hooks/               # Özel React hook'ları
│   │   ├── useProfileGet.ts # Profil verisi çekme
│   │   ├── useProfileForm.ts # Form state yönetimi
│   │   ├── useProfileSubmit.ts # Profil gönderimi
│   │   ├── useOwner.ts      # Sahiplik doğrulaması
│   │   └── useCids.ts       # IPFS CID yönetimi
│   ├── pages/               # Route bileşenleri
│   │   ├── Profile.tsx      # Ana profil sayfası
│   ├── constants/           # Kontrat yapılandırmaları
│   │   ├── contract.json    # Akıllı kontrat ABI
│   │   └── erc2771.json    # Forwarder yapılandırması
│   ├── lib/                 # Utility kütüphaneleri
│   │   └── ipfs.ts         # IPFS etkileşimi
│   └── utils/               # Yardımcı utilities
│       ├── client.ts        # ThirdWeb client
│       └── toast.ts         # Bildirim sistemi
```

### 🚀 Başlangıç

#### Gereksinimler
- Node.js 18+
- npm veya yarn
- MetaMask veya herhangi bir Web3 cüzdanı

#### Kurulum

1. **Repository'yi klonlayın**
```bash
git clone <repository-url>
cd frontend
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Development server'ı başlatın**
```bash
npm run dev
```

4. **Tarayıcınızı açın**
`http://localhost:5173` adresine gidin

### 🎮 Kullanım

#### Profilinizi Oluşturma
1. Navbar'dan cüzdanınızı bağlayın
2. Edit moduna girmek için bookmark ikonuna (sağ-alt) tıklayın
3. Profilinizi özelleştirin:
   - Avatar yükleyin
   - Kullanıcı adı belirleyin (maksimum 18 karakter)
   - Bio yazın (maksimum 160 karakter)
   - Sosyal medya linkleri ekleyin
   - Özel tema renkleri seçin
4. Değişiklikleri kaydetmek için "Set Profile"a tıklayın

#### Profil Görüntüleme
- **Kendi Profiliniz**: Bağlıyken ana sayfayı ziyaret edin
- **Diğer Profiller**: Cüzdan adresiyle `/0x...` URL formatını kullanın

#### Detaylı Özellikler

**Profil Bileşenleri:**
- **Avatar**: Profil fotoğraflarını yükleyin ve kırpın
- **Name**: Karakter sayacı ile düzenlenebilir kullanıcı adı
- **Bio**: Karakter limiti ile çok satırlı açıklama
- **Address**: Kopyalama işlevi ile cüzdan adresi gösterimi
- **Links**: Sosyal medya linklerini ekleyin/kaldırın
- **Theme**: Profiliniz için renkleri özelleştirin

**Edit Modu:**
- Gerçek zamanlı doğrulama ile inline düzenleme
- Metin alanları için karakter sayaçları
- Yumuşak animasyonlar ve geçişler
- Sadece sahip erişimi ile düzenleme işlevi

### 🔧 Geliştirme

#### Mevcut Scriptler
```bash
npm run dev      # Development server'ı başlat
npm run build    # Production için build
npm run lint     # Linter çalıştır
npm run preview  # Production build'ini önizle
```

#### Kullanılan Ana Teknolojiler
- **Biome** - Hızlı linter ve formatter
- **React Icons** - İkon kütüphanesi
- **React Image Crop** - Resim kırpma işlevi
- **React Select** - Gelişmiş select bileşenleri
- **React Toastify** - Toast bildirimleri
- **TinyColor2** - Renk manipülasyonu

### 🌐 Veri Akışı

1. **Profil Oluşturma**:
   ```
   Kullanıcı Girişi → Form Doğrulama → IPFS Yükleme → Akıllı Kontrat → Profil Kaydedildi
   ```

2. **Profil Getirme**:
   ```
   Cüzdan Adresi → Akıllı Kontrat → IPFS CID → IPFS Verisi → Profil Gösterimi
   ```

3. **Profil Güncelleme**:
   ```
   Edit Modu → Form Değişiklikleri → IPFS Yükleme → Akıllı Kontrat → Profil Güncellendi
   ```

### 🔒 Güvenlik Özellikleri

- **Sahiplik Doğrulaması**: Sadece profil sahipleri düzenleyebilir
- **Giriş Doğrulama**: Karakter limitleri ve format doğrulaması
- **IPFS Bütünlüğü**: Merkezi olmayan veri depolama
- **Cüzdan Kimlik Doğrulaması**: Güvenli cüzdan tabanlı kimlik

### 🎨 Tema Sistemi

Uygulama dinamik tema için CSS custom properties kullanır:
- `--color-theme-1`: Arka plan rengi
- `--color-theme-2`: İkincil arka plan
- `--color-theme-3`: Vurgu rengi
- `--color-theme-4`: Birincil metin rengi

### 📱 Responsive Tasarım

- **Mobile-first** yaklaşım
- Tüm ekran boyutları için **esnek düzenler**
- **Dokunmatik dostu** arayüz
- Mobil cihazlar için **optimize edilmiş performans**

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

---

## 📞 Contact

- **Author**: fre2dom0
- **Project**: Web3Card
- **Version**: 1.0.0
