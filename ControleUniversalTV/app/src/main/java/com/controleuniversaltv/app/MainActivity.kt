package com.controleuniversaltv.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material.icons.filled.Tv
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import com.controleuniversaltv.app.ui.screens.HomeScreen
import com.controleuniversaltv.app.ui.screens.RemoteControlScreen
import com.controleuniversaltv.app.ui.screens.SettingsScreen
import com.controleuniversaltv.app.ui.screens.TVDiscoveryScreen
import com.controleuniversaltv.app.ui.theme.ControleUniversalTVTheme
import com.controleuniversaltv.app.ui.theme.Emerald500
import com.controleuniversaltv.app.ui.theme.Zinc950
import com.controleuniversaltv.app.ui.viewmodel.MainViewModel
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : ComponentActivity() {

    private val viewModel: MainViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate()
        setContent {
            ControleUniversalTVTheme {
                var selectedTab by remember { mutableStateOf(0) }

                val activeTV by viewModel.activeTV.collectAsState()
                val discoveredTVs by viewModel.discoveredTVs.collectAsState()
                val isScanning by viewModel.isScanning.collectAsState()
                val demoMode by viewModel.demoMode.collectAsState()

                Scaffold(
                    containerColor = Zinc950,
                    bottomBar = {
                        NavigationBar(
                            containerColor = MaterialTheme.colorScheme.surface
                        ) {
                            NavigationBarItem(
                                selected = selectedTab == 0,
                                onClick = { selectedTab = 0 },
                                icon = { Icon(Icons.Default.Home, contentDescription = "Início") },
                                label = { Text("Início") },
                                colors = NavigationBarItemDefaults.colors(
                                    selectedIconColor = Emerald500,
                                    indicatorColor = Emerald500.copy(alpha = 0.2f)
                                )
                            )
                            NavigationBarItem(
                                selected = selectedTab == 1,
                                onClick = { selectedTab = 1 },
                                icon = { Icon(Icons.Default.Tv, contentDescription = "Controle") },
                                label = { Text("Controle") },
                                colors = NavigationBarItemDefaults.colors(
                                    selectedIconColor = Emerald500,
                                    indicatorColor = Emerald500.copy(alpha = 0.2f)
                                )
                            )
                            NavigationBarItem(
                                selected = selectedTab == 2,
                                onClick = { selectedTab = 2 },
                                icon = { Icon(Icons.Default.Search, contentDescription = "Buscar") },
                                label = { Text("Buscar") },
                                colors = NavigationBarItemDefaults.colors(
                                    selectedIconColor = Emerald500,
                                    indicatorColor = Emerald500.copy(alpha = 0.2f)
                                )
                            )
                            NavigationBarItem(
                                selected = selectedTab == 3,
                                onClick = { selectedTab = 3 },
                                icon = { Icon(Icons.Default.Settings, contentDescription = "Ajustes") },
                                label = { Text("Ajustes") },
                                colors = NavigationBarItemDefaults.colors(
                                    selectedIconColor = Emerald500,
                                    indicatorColor = Emerald500.copy(alpha = 0.2f)
                                )
                            )
                        }
                    }
                ) { innerPadding ->
                    Box(modifier = Modifier.padding(innerPadding)) {
                        when (selectedTab) {
                            0 -> HomeScreen(
                                savedTVs = discoveredTVs,
                                activeTV = activeTV,
                                onSelectTV = { viewModel.selectTV(it) },
                                onOpenDiscovery = { selectedTab = 2 },
                                onOpenRemote = { selectedTab = 1 }
                            )
                            1 -> RemoteControlScreen(
                                activeTV = activeTV,
                                onSendCommand = { viewModel.sendCommand(it) },
                                demoMode = demoMode
                            )
                            2 -> TVDiscoveryScreen(
                                discoveredTVs = discoveredTVs,
                                isScanning = isScanning,
                                onScan = { viewModel.scanDevices() },
                                onSelectTV = {
                                    viewModel.selectTV(it)
                                    if (it.isSupported) selectedTab = 1
                                }
                            )
                            3 -> SettingsScreen(
                                demoMode = demoMode,
                                onToggleDemoMode = { viewModel.toggleDemoMode() }
                            )
                        }
                    }
                }
            }
        }
    }
}
