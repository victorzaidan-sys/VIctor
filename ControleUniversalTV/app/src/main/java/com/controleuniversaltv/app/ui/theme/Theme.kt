package com.controleuniversaltv.app.ui.theme

import android.app.Activity
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

private val DarkColorScheme = darkColorScheme(
    primary = Emerald500,
    secondary = Emerald400,
    tertiary = Amber400,
    background = Zinc950,
    surface = Zinc900,
    onPrimary = Zinc950,
    onBackground = Zinc100,
    onSurface = Zinc100
)

private val LightColorScheme = lightColorScheme(
    primary = Emerald600,
    secondary = Emerald500,
    tertiary = Amber400,
    background = Zinc100,
    surface = Zinc900,
    onPrimary = Zinc100,
    onBackground = Zinc950,
    onSurface = Zinc100
)

@Composable
fun ControleUniversalTVTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme
    val view = LocalView.current

    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            window.statusBarColor = colorScheme.background.toArgb()
            WindowCompat.getInsetsController(window, view).isAppearanceLightStatusBars = !darkTheme
        }
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}
