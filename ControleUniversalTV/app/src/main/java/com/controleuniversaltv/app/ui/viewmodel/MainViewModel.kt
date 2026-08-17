package com.controleuniversaltv.app.ui.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.controleuniversaltv.app.data.model.TVDevice
import com.controleuniversaltv.app.data.repository.TVRepository
import com.controleuniversaltv.app.domain.model.TVCommand
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class MainViewModel @Inject constructor(
    private val repository: TVRepository
) : ViewModel() {

    val activeTV: StateFlow<TVDevice?> = repository.activeTV as StateFlow<TVDevice?>
    val discoveredTVs: StateFlow<List<TVDevice>> = repository.discoveredTVs as StateFlow<List<TVDevice>>

    private val _isScanning = MutableStateFlow(false)
    val isScanning: StateFlow<Boolean> = _isScanning.asStateFlow()

    private val _lastFeedback = MutableStateFlow<String?>(null)
    val lastFeedback: StateFlow<String?> = _lastFeedback.asStateFlow()

    private val _demoMode = MutableStateFlow(false)
    val demoMode: StateFlow<Boolean> = _demoMode.asStateFlow()

    fun toggleDemoMode() {
        _demoMode.value = !_demoMode.value
    }

    fun scanDevices() {
        viewModelScope.launch {
            _isScanning.value = true
            repository.startDiscovery()
            _isScanning.value = false
        }
    }

    fun selectTV(device: TVDevice) {
        viewModelScope.launch {
            val success = repository.connectToTV(device)
            if (!success && !device.isSupported) {
                _lastFeedback.value = device.unsupportedReason ?: "Modelo não suportado."
            } else {
                _lastFeedback.value = "Conectado a ${device.name}"
            }
        }
    }

    fun sendCommand(command: TVCommand) {
        viewModelScope.launch {
            if (_demoMode.value) {
                _lastFeedback.value = "Modo demonstração — comandos não enviados para TV real."
                return@launch
            }
            val success = repository.sendCommand(command)
            if (success) {
                _lastFeedback.value = "Comando $command enviado"
            } else {
                _lastFeedback.value = "Falha ao enviar comando"
            }
        }
    }
}
