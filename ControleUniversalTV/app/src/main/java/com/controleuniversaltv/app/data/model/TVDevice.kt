package com.controleuniversaltv.app.data.model

import com.controleuniversaltv.app.domain.model.ConnectionType
import com.controleuniversaltv.app.domain.model.TVConnectionStatus

data class TVDevice(
    val id: String,
    val name: String,
    val manufacturer: String,
    val model: String,
    val ipAddress: String,
    val connectionType: ConnectionType = ConnectionType.WIFI,
    val isFavorite: Boolean = false,
    val isSupported: Boolean = true,
    val status: TVConnectionStatus = TVConnectionStatus.DISCONNECTED,
    val unsupportedReason: String? = null
)
