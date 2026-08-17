# Controle Universal TV — Aplicativo Android Release

Aplicativo Android nativo em Kotlin e Jetpack Compose para controle remoto universal de Smart TVs (LG webOS, Samsung Tizen, TCL Google TV, Sony Bravia, Panasonic Viera, Roku TV, SEMP e Toshiba) através da rede Wi-Fi e Bluetooth local.

---

## 📱 Especificações Técnicas

* **Nome do Aplicativo:** Controle Universal TV
* **Package / Application ID:** `com.controleuniversaltv.app`
* **Linguagem:** Kotlin 1.9.22
* **Interface UI:** Jetpack Compose + Material Design 3
* **Arquitetura:** Clean Architecture + MVVM
* **Injeção de Dependência:** Hilt (Dagger)
* **Assincronismo:** Kotlin Coroutines + Flow
* **SDK Mínimo:** Android 8.0 (API 26)
* **SDK Alvo / Compilação:** Android 14 (API 34)
* **Versão:** `1.0.0` (`versionCode = 1`)

---

## 🚀 Como Gerar o APK Release (`app-release.apk`)

Você pode compilar o arquivo `app-release.apk` com um único comando na sua máquina local ou abrir o projeto no Android Studio.

### Opção 1: Linha de Comando (Gradle)

#### Linux / macOS:
```bash
chmod +x gradlew
./gradlew assembleRelease
```

#### Windows:
```cmd
gradlew.bat assembleRelease
```

O arquivo compilado será gerado exatamente em:
```text
app/build/outputs/apk/release/app-release.apk
```

---

### Opção 2: Pelo Android Studio

1. Abra o **Android Studio**.
2. Selecione **Open an Existing Project** e escolha a pasta `ControleUniversalTV`.
3. Aguarde o Android Studio sincronizar o Gradle.
4. No menu superior, clique em **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.
5. Quando concluir, clique na notificação em **locate** para abrir a pasta do APK `app-release.apk`.

---

## 🛠️ Instalação no Smartphone Android

1. Transfira o arquivo `app-release.apk` para o celular (via cabo USB, WhatsApp, Telegram, Google Drive ou e-mail).
2. Abra o gerenciador de arquivos no celular e toque no `app-release.apk`.
3. Se o Android solicitar, permita a instalação de aplicativos de fontes desconhecidas.
4. Abra o **Controle Universal TV**.
5. Garanta que o celular e a Smart TV estejam conectados à mesma rede Wi-Fi.
6. Toque em **Encontrar minha TV** e selecione o seu televisor.

---

## 📺 Fabricantes e Protocolos Suportados

* **LG Smart TV**: Protocolo webOS SSAP via WebSocket.
* **Samsung Smart TV**: Protocolo Tizen WebSocket.
* **TCL & Google TV**: Protocolo Android TV Remote v2.
* **Sony Bravia**: REST API / IRCC over HTTP.
* **Panasonic Viera**: SOAP / HTTP API.
* **Roku TV**: ECP (External Control Protocol).
* **Modo Demonstração**: Permite testar a interface de controle sem necessitar de uma TV física ligada.
* **Modelos sem suporte**: Exibe aviso amigável "Este modelo ainda não possui suporte".
