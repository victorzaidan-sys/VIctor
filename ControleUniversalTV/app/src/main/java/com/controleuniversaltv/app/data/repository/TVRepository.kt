package com.controleuniversaltv.app.data.repository

import com.controleuniversaltv.app.data.model.TVDevice
import com.controleuniversaltv.app.domain.model.ConnectionType
import com.controleuniversaltv.app.domain.model.TVCommand
import com.controleuniversaltv.app.domain.model.TVConnectionStatus
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class TVRepository @Inject constructor() {

    private val _discoveredTVs = MutableStateFlow<List<TVDevice>>(emptyList())
    val discoveredTVs: Flow<List<TVDevice>> = _discoveredTVs.asStateFlow()

    private val _activeTV = MutableStateFlow<TVDevice?>(null)
    val activeTV: Flow<TVDevice?> = _activeTV.asStateFlow()

    private val sampleDevices = listOf(
        TVDevice(
            id = "lg_webos_1",
            name = "TV da Sala",
            manufacturer = "LG",
            model = "OLED55C3",
            ipAddress = "192.168.1.105",
            connectionType = ConnectionType.WIFI,
            isFavorite = true,
            isSupported = true,
            status = TVConnectionStatus.CONNECTED
        ),
        TVDevice(
            id = "samsung_tizen_1",
            name = "Smart TV Quarto",
            manufacturer = "Samsung",
            model = "Neo QLED 4K",
            ipAddress = "192.168.1.112",
            connectionType = ConnectionType.WIFI,
            isFavorite = false,
            isSupported = true,
            status = TVConnectionStatus.DISCONNECTED
        ),
        TVDevice(
            id = "tcl_android_1",
            name = "TV TCL Google TV",
            manufacturer = "TCL",
            model = "55P635",
            ipAddress = "192.168.1.120",
            connectionType = ConnectionType.WIFI,
            isFavorite = false,
            isSupported = true,
            status = TVConnectionStatus.DISCONNECTED
        ),
        TVDevice(
            id = "sony_bravia_1",
            name = "Sony Bravia Living",
            manufacturer = "Sony",
            model = "XR-65A80K",
            ipAddress = "192.168.1.135",
            connectionType = ConnectionType.WIFI,
            isFavorite = false,
            isSupported = true,
            status = TVConnectionStatus.DISCONNECTED
        ),
        TVDevice(
            id = "panasonic_viera_1",
            name = "Panasonic Viera",
            manufacturer = "Panasonic",
            model = "TH-42A400",
            ipAddress = "192.168.1.140",
            connectionType = ConnectionType.WIFI,
            isFavorite = false,
            isSupported = true,
            status = TVConnectionStatus.DISCONNECTED
        ),
        TVDevice(
            id = "semp_toshiba_legacy",
            name = "SEMP Toshiba Modelo Antigo",
            manufacturer = "SEMP",
            model = "32L1500",
            ipAddress = "192.168.1.180",
            connectionType = ConnectionType.WIFI,
            isFavorite = false,
            isSupported = false,
            status = TVConnectionStatus.UNSUPPORTED,
            unsupportedReason = "Este modelo ainda não possui suporte. Verifique atualizações futuras."
        )
    )

    init {
        _discoveredTVs.value = sampleDevices
        _activeTV.value = sampleDevices.first()
    }

    suspend fun startDiscovery(): List<TVDevice> {
        delay(1200) // Simulates Wi-Fi SSDP / mDNS scan
        return sampleDevices
    }

    suspend fun connectToTV(device: TVDevice): Boolean {
        if (!device.isSupported) return false
        delay(300)
        val updated = device.copy(status = TVConnectionStatus.CONNECTED)
        _activeTV.value = updated
        return true
    }

    suspend fun sendCommand(command: TVCommand, value: String? = null): Boolean {
        val current = _activeTV.value ?: return false
        if (!current.isSupported) return false
        delay(25) // Low latency network socket call simulation
        return true
    }
}
