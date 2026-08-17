package com.controleuniversaltv.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.controleuniversaltv.app.data.model.TVDevice
import com.controleuniversaltv.app.domain.model.TVCommand
import com.controleuniversaltv.app.ui.theme.Emerald500
import com.controleuniversaltv.app.ui.theme.Red400
import com.controleuniversaltv.app.ui.theme.Zinc800
import com.controleuniversaltv.app.ui.theme.Zinc900

@Composable
fun RemoteControlScreen(
    activeTV: TVDevice?,
    onSendCommand: (TVCommand) -> Unit,
    demoMode: Boolean
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Active TV status bar
        Surface(
            color = Zinc900,
            shape = RoundedCornerShape(16.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            Row(
                modifier = Modifier.padding(12.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        Icons.Default.Tv,
                        contentDescription = null,
                        tint = Emerald500
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = activeTV?.name ?: "Nenhuma TV Conectada",
                        color = Color.White,
                        fontWeight = FontWeight.Bold,
                        fontSize = 14.sp
                    )
                }
                Text(
                    text = activeTV?.ipAddress ?: "",
                    color = Color.Gray,
                    fontSize = 12.sp
                )
            }
        }

        if (demoMode) {
            Surface(
                color = Color(0xFF78350F),
                shape = RoundedCornerShape(12.dp)
            ) {
                Text(
                    text = "Modo demonstração — os comandos não serão enviados para uma TV real.",
                    color = Color(0xFFFDE68A),
                    fontSize = 11.sp,
                    modifier = Modifier.padding(8.dp)
                )
            }
        }

        // Top Row: Power, Mute, Input
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            RemoteButton(
                icon = Icons.Default.PowerSettingsNew,
                tint = Red400,
                onClick = { onSendCommand(TVCommand.POWER) }
            )
            RemoteButton(
                icon = Icons.Default.VolumeOff,
                onClick = { onSendCommand(TVCommand.MUTE) }
            )
            RemoteButton(
                icon = Icons.Default.Input,
                onClick = { onSendCommand(TVCommand.INPUT) }
            )
        }

        // D-PAD Directional Nav
        Box(
            modifier = Modifier
                .size(200.dp)
                .clip(CircleShape)
                .background(Zinc900),
            contentAlignment = Alignment.Center
        ) {
            // OK Center Button
            Box(
                modifier = Modifier
                    .size(68.dp)
                    .clip(CircleShape)
                    .background(Emerald500)
                    .clickable { onSendCommand(TVCommand.OK) },
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = "OK",
                    color = Color.Black,
                    fontWeight = FontWeight.ExtraBold,
                    fontSize = 18.sp
                )
            }

            // Up, Down, Left, Right
            IconButton(
                onClick = { onSendCommand(TVCommand.UP) },
                modifier = Modifier.align(Alignment.TopCenter).padding(top = 8.dp)
            ) {
                Icon(Icons.Default.KeyboardArrowUp, contentDescription = null, tint = Color.White)
            }
            IconButton(
                onClick = { onSendCommand(TVCommand.DOWN) },
                modifier = Modifier.align(Alignment.BottomCenter).padding(bottom = 8.dp)
            ) {
                Icon(Icons.Default.KeyboardArrowDown, contentDescription = null, tint = Color.White)
            }
            IconButton(
                onClick = { onSendCommand(TVCommand.LEFT) },
                modifier = Modifier.align(Alignment.CenterStart).padding(start = 8.dp)
            ) {
                Icon(Icons.Default.KeyboardArrowLeft, contentDescription = null, tint = Color.White)
            }
            IconButton(
                onClick = { onSendCommand(TVCommand.RIGHT) },
                modifier = Modifier.align(Alignment.CenterEnd).padding(end = 8.dp)
            ) {
                Icon(Icons.Default.KeyboardArrowRight, contentDescription = null, tint = Color.White)
            }
        }

        // Navigation Row: Back, Home, Menu
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            RemoteButton(
                icon = Icons.Default.ArrowBack,
                onClick = { onSendCommand(TVCommand.BACK) }
            )
            RemoteButton(
                icon = Icons.Default.Home,
                onClick = { onSendCommand(TVCommand.HOME) }
            )
            RemoteButton(
                icon = Icons.Default.Menu,
                onClick = { onSendCommand(TVCommand.MENU) }
            )
        }

        // Volume and Channel Controls
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceAround
        ) {
            // Vol Column
            Column(
                verticalArrangement = Arrangement.spacedBy(8.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                RemoteButton(icon = Icons.Default.Add) { onSendCommand(TVCommand.VOLUME_UP) }
                Text("VOL", color = Color.Gray, fontSize = 12.sp, fontWeight = FontWeight.Bold)
                RemoteButton(icon = Icons.Default.Remove) { onSendCommand(TVCommand.VOLUME_DOWN) }
            }

            // CH Column
            Column(
                verticalArrangement = Arrangement.spacedBy(8.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                RemoteButton(icon = Icons.Default.KeyboardArrowUp) { onSendCommand(TVCommand.CHANNEL_UP) }
                Text("CH", color = Color.Gray, fontSize = 12.sp, fontWeight = FontWeight.Bold)
                RemoteButton(icon = Icons.Default.KeyboardArrowDown) { onSendCommand(TVCommand.CHANNEL_DOWN) }
            }
        }
    }
}

@Composable
fun RemoteButton(
    icon: ImageVector,
    tint: Color = Color.White,
    onClick: () -> Unit
) {
    Box(
        modifier = Modifier
            .size(56.dp)
            .clip(CircleShape)
            .background(Zinc900)
            .clickable(onClick = onClick),
        contentAlignment = Alignment.Center
    ) {
        Icon(icon, contentDescription = null, tint = tint)
    }
}
