package com.controleuniversaltv.app.domain.model

enum class TVCommand {
    POWER,
    VOLUME_UP,
    VOLUME_DOWN,
    MUTE,
    CHANNEL_UP,
    CHANNEL_DOWN,
    HOME,
    BACK,
    MENU,
    INPUT,
    UP,
    DOWN,
    LEFT,
    RIGHT,
    OK,
    PLAY,
    PAUSE,
    STOP,
    REWIND,
    FAST_FORWARD,
    NUM_0, NUM_1, NUM_2, NUM_3, NUM_4, NUM_5, NUM_6, NUM_7, NUM_8, NUM_9,
    APP_NETFLIX,
    APP_YOUTUBE,
    APP_PRIME,
    APP_DISNEY,
    APP_SPOTIFY,
    APP_BROWSER
}

enum class ConnectionType {
    WIFI,
    BLUETOOTH,
    DEMO
}

enum class TVConnectionStatus {
    CONNECTED,
    CONNECTING,
    DISCONNECTED,
    UNSUPPORTED
}
