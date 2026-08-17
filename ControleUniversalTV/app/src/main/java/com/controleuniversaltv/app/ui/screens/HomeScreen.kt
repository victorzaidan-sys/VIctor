package com.controleuniversaltv.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
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
import com.controleuniversaltv.app.ui.theme.Zinc800
import com.controleuniversaltv.app.ui.theme.Zinc900

@Composable
fun HomeScreen(
    savedTVs: List<TVDevice>,
    activeTV: TVDevice?,
    onSelectTV: (TVDevice) -> Unit,
    onOpenDiscovery: () -> Unit,
    onOpenRemote: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Hero Banner Card
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(24.dp),
            colors = CardDefaults.cardColors(containerColor = Zinc900)
        ) {
            Column(
                modifier = Modifier.padding(20.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Surface(
                    color = Emerald500.copy(alpha = 0.2f),
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Row(
                        modifier = Modifier.padding(horizontal = 10.dp, vertical = 4.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(
                            Icons.Default.Wifi,
                            contentDescription = null,
                            tint = Emerald500,
                            modifier = Modifier.size(16.dp)
                        )
                        Spacer(modifier = Modifier.width(6.dp))
                        Text(
                            text = "Controle por Wi-Fi & Bluetooth",
                            color = Emerald500,
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }

                Text(
                    text = "Controle sua TV pelo celular",
                    style = MaterialTheme.typography.titleLarge,
                    color = Color.White
                )

                Text(
                    text = "Conecte-se a TVs LG, Samsung, TCL, Sony, Panasonic, Roku e SEMP na sua rede local.",
                    fontSize = 13.sp,
                    color = Color.Gray
                )

                Button(
                    onClick = onOpenDiscovery,
                    colors = ButtonDefaults.buttonColors(containerColor = Emerald500),
                    shape = RoundedCornerShape(16.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Icon(
                        Icons.Default.Search,
                        contentDescription = null,
                        tint = Color.Black
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = "Encontrar minha TV",
                        color = Color.Black,
                        fontWeight = FontWeight.Bold
                    )
                }
            }
        }

        // Active / Saved Devices
        Text(
            text = "Minhas TVs",
            style = MaterialTheme.typography.titleMedium,
            color = Color.White
        )

        LazyColumn(
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            items(savedTVs) { tv ->
                val isActive = activeTV?.id == tv.id
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(16.dp))
                        .background(if (isActive) Emerald500.copy(alpha = 0.15f) else Zinc900)
                        .clickable {
                            onSelectTV(tv)
                            onOpenRemote()
                        }
                        .padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            Icons.Default.Tv,
                            contentDescription = null,
                            tint = if (isActive) Emerald500 else Color.Gray,
                            modifier = Modifier.size(32.dp)
                        )
                        Spacer(modifier = Modifier.width(12.dp))
                        Column {
                            Text(
                                text = tv.name,
                                color = Color.White,
                                fontWeight = FontWeight.Bold,
                                fontSize = 15.sp
                            )
                            Text(
                                text = "${tv.manufacturer} • ${tv.ipAddress}",
                                color = Color.Gray,
                                fontSize = 12.sp
                            )
                        }
                    }

                    if (isActive) {
                        Surface(
                            color = Emerald500,
                            shape = RoundedCornerShape(8.dp)
                        ) {
                            Text(
                                text = "Conectada",
                                color = Color.Black,
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold,
                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                            )
                        }
                    }
                }
            }
        }
    }
}
