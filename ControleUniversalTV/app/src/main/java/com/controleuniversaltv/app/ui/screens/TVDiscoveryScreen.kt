package com.controleuniversaltv.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.filled.Tv
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.controleuniversaltv.app.data.model.TVDevice
import com.controleuniversaltv.app.ui.theme.Emerald500
import com.controleuniversaltv.app.ui.theme.Red400
import com.controleuniversaltv.app.ui.theme.Zinc900

@Composable
fun TVDiscoveryScreen(
    discoveredTVs: List<TVDevice>,
    isScanning: Boolean,
    onScan: () -> Unit,
    onSelectTV: (TVDevice) -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(
                    text = "Dispositivos na Rede",
                    style = MaterialTheme.typography.titleLarge,
                    color = Color.White
                )
                Text(
                    text = "Smart TVs encontradas na sua rede Wi-Fi",
                    color = Color.Gray,
                    fontSize = 12.sp
                )
            }

            IconButton(
                onClick = onScan,
                enabled = !isScanning
            ) {
                Icon(
                    Icons.Default.Refresh,
                    contentDescription = "Atualizar",
                    tint = Emerald500
                )
            }
        }

        if (isScanning) {
            LinearProgressIndicator(
                modifier = Modifier.fillMaxWidth(),
                color = Emerald500,
                trackColor = Zinc900
            )
        }

        LazyColumn(
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            items(discoveredTVs) { device ->
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(16.dp))
                        .background(Zinc900)
                        .clickable { onSelectTV(device) }
                        .padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = if (device.isSupported) Icons.Default.Tv else Icons.Default.Warning,
                            contentDescription = null,
                            tint = if (device.isSupported) Emerald500 else Red400,
                            modifier = Modifier.size(28.dp)
                        )
                        Spacer(modifier = Modifier.width(12.dp))
                        Column {
                            Text(
                                text = device.name,
                                color = Color.White,
                                fontWeight = FontWeight.Bold,
                                fontSize = 15.sp
                            )
                            Text(
                                text = "${device.manufacturer} • ${device.ipAddress}",
                                color = Color.Gray,
                                fontSize = 12.sp
                            )
                            if (!device.isSupported && device.unsupportedReason != null) {
                                Text(
                                    text = device.unsupportedReason,
                                    color = Red400,
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Medium
                                )
                            }
                        }
                    }

                    Button(
                        onClick = { onSelectTV(device) },
                        colors = ButtonDefaults.buttonColors(
                            containerColor = if (device.isSupported) Emerald500 else Color.DarkGray
                        ),
                        shape = RoundedCornerShape(12.dp)
                    ) {
                        Text(
                            text = if (device.isSupported) "Conectar" else "Indisponível",
                            color = if (device.isSupported) Color.Black else Color.LightGray,
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
            }
        }
    }
}
