# kitapsepeti-cypress-e2e

Bu proje, bir e-ticaret uygulamasının temel kullanıcı akışlarını kapsayan kritik senaryoları; Cypress ve Page Object Model (POM) mimarisi kullanılarak geliştirilen uçtan uca test otomasyon projesidir.

---

## 💡 Proje Özeti

* **Login Testi** (Pozitif/Negatif Senaryolar)
* **Ürün Arama ve Filtreleme**  (Pozitif/Negatif Senaryolar)
* **Ürün Detay Sayfası Görüntüleme**
* **Sepet Yönetimi ve Kontrolü** (Ekleme/Silme/Güncelleme)
* **Ödeme ve Sipariş Onayı** (Pozitif/Negatif Senaryolar)
* **Misafir Olarak Satın Alma İşlemleri** (Pozitif/Negatif Senaryolar)
* **Mimari:** Testler, Page Object Model **(POM)** yapısına uygun olarak yazılmıştır.
* **Teknik Detay:** Tekrarlanan adımların (Örn: "Her testten önce Login olma") kod tekrarını önlemek ve bakımı kolaylaştırmak için test dosyalarında **Mocha Hooks (`beforeEach`)** metodu etkin olarak kullanılmıştır.

---

## 📁 Dosya Yapısı ve Mimari

Projenin temiz ve sürdürülebilir olması için Page Object Model (POM) mimarisi kullanılmıştır.

```bash
KITAPSEPETI_OTOMASYON
├── cypress/
│   ├── downloads/     
│   ├── e2e/           -> Test senaryoları (Kullanıcı Akışları)
│   ├── fixtures/      
│   ├── reports/       -> Mochawesome rapor klasörü
│   ├── screenshots/   
│   └── support/       -> Custom commands ve ayarlar
├── pages/             -> Page Object Model (Element ve Aksiyon Metotları)
├── package.json       -> Proje bağımlılıkları ve çalıştırma komutları
└── README.md
```

---

## ⚙️ Kurulum ve Çalıştırma

Bu proje, test koşum ve raporlama işlemlerini kolaylaştırmak için **'package.json'** dosyasında özel **NPM Scriptleri** kullanmaktadır. Testler ve raporlar bu scriptler aracılığıyla çalıştırılır. Aşağıdaki adımları sırasıyla uygulayın:

1.  **Projeyi Klonlama:**
    ```bash
    git clone https://github.com/AysenurB01/kitapsepeti-cypress-e2e.git
    ```
2.  **Bağımlılıkları Yükleme:** Proje klasörüne girin ve gerekli tüm NPM paketlerini kurun.
    ```bash
    cd kitapsepeti-cypress-e2e
    npm install
    ```
3.  **Testleri Tek Tek Çalıştırma (CLI):** (Tek tek çalıştırarak başarılı raporların oluşturulması önerilir.)
    ```bash
    # Örnek Kullanım:
    npm run test:search
    # ...Diğer tüm test senaryoları buraya gelir
    npm run test:login
    ```
4.  **HTML Raporu Oluşturma:** (Tüm başarılı testlerden gelen JSON dosyalarını tek bir HTML raporunda birleştirir.)
    ```bash
    npm run report:all
    ```
5.  **Test Runner ile Çalıştırma (Opsiyonel):**
    ```bash
    npx cypress open
    ```

---

## 📚 Proje Dokümantasyonları ve Test Sonuçları

Projenin çıktıları, kabul kriterleri, senaryoları ve başarı kanıtları aşağıdaki dokümanlarda mevcuttur.

- [📄 User Story Kriterleri](https://docs.google.com/spreadsheets/d/1yI188XeFEMgtu2LrL9QDRiNO8rF1pnPFFAomGV-uI-0/edit?usp=sharing) **—** Proje gereksinimlerinin detaylı listesi.
- [📄 Test Senaryoları](https://docs.google.com/spreadsheets/d/1kO7rVFXAK4pEAtFeZYSg857EQROckgzAxzwClk2Gqyo/edit?usp=sharing) **—** (User Story) Kabul Kriterleri temel alınarak hazırlanan detaylı test senaryoları.
- [🔗 HTML Test Raporu](https://github.com/AysenurB01/kitapsepeti-cypress-e2e/blob/main/cypress/reports/html/report.html) **—** Tüm testlerin başarıyla geçtiğini gösteren, Mochawesome tarafından oluşturulmuş sonuç raporu.

---
