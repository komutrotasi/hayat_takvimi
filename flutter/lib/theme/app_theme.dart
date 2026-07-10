flueimport 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

// ── Renk Paleti ──────────────────────────────────────────────────────────────

class AppColors {
  // Dark theme
  static const darkBg = Color(0xFF0f172a);
  static const darkSurface = Color(0xFF1e293b);
  static const darkCard = Color(0xFF1e293b);
  static const darkCardBorder = Color(0xFF334155);

  // Accent
  static const teal = Color(0xFF14b8a6);
  static const tealLight = Color(0xFF2dd4bf);
  static const tealDark = Color(0xFF0d9488);

  // Category colors
  static const catWork = Color(0xFF6366f1);    // indigo
  static const catPersonal = Color(0xFF14b8a6); // teal
  static const catHealth = Color(0xFF22c55e);   // green
  static const catEducation = Color(0xFFf59e0b); // amber
  static const catShopping = Color(0xFFec4899);  // pink
  static const catOther = Color(0xFF94a3b8);     // slate

  // Status colors
  static const success = Color(0xFF22c55e);
  static const warning = Color(0xFFf59e0b);
  static const danger = Color(0xFFef4444);
  static const info = Color(0xFF3b82f6);

  // Light theme
  static const lightBg = Color(0xFFf8fafc);
  static const lightSurface = Color(0xFFFFFFFF);
  static const lightCard = Color(0xFFFFFFFF);
  static const lightBorder = Color(0xFFe2e8f0);
  static const lightText = Color(0xFF0f172a);
  static const lightSubtext = Color(0xFF64748b);

  // Dark text
  static const darkText = Color(0xFFf1f5f9);
  static const darkSubtext = Color(0xFF94a3b8);
}

// ── Kategori Yardımcıları ─────────────────────────────────────────────────────

Color categoryColor(String category) {
  return switch (category) {
    'İş' => AppColors.catWork,
    'Kişisel' => AppColors.catPersonal,
    'Sağlık' => AppColors.catHealth,
    'Eğitim' => AppColors.catEducation,
    'Alışveriş' => AppColors.catShopping,
    _ => AppColors.catOther,
  };
}

// ── Tema Fabrikası ────────────────────────────────────────────────────────────

class AppTheme {
  AppTheme._();

  static ThemeData dark() {
    final base = ThemeData.dark(useMaterial3: true);
    return base.copyWith(
      colorScheme: const ColorScheme.dark(
        primary: AppColors.teal,
        primaryContainer: AppColors.tealDark,
        secondary: AppColors.tealLight,
        surface: AppColors.darkSurface,
        error: AppColors.danger,
        onPrimary: Colors.white,
        onSecondary: Colors.white,
        onSurface: AppColors.darkText,
      ),
      scaffoldBackgroundColor: AppColors.darkBg,
      textTheme: _textTheme(AppColors.darkText, AppColors.darkSubtext),
      cardTheme: CardThemeData(
        color: AppColors.darkCard,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: const BorderSide(color: AppColors.darkCardBorder, width: 1),
        ),
        margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      ),
      navigationBarTheme: NavigationBarThemeData(
        backgroundColor: AppColors.darkSurface,
        indicatorColor: AppColors.teal.withValues(alpha: 0.2),
        labelTextStyle: WidgetStateProperty.all(
          GoogleFonts.outfit(fontSize: 11, fontWeight: FontWeight.w500),
        ),
        iconTheme: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) {
            return const IconThemeData(color: AppColors.teal, size: 24);
          }
          return const IconThemeData(color: AppColors.darkSubtext, size: 24);
        }),
      ),
      appBarTheme: AppBarTheme(
        backgroundColor: AppColors.darkSurface,
        elevation: 0,
        scrolledUnderElevation: 0,
        centerTitle: false,
        titleTextStyle: GoogleFonts.outfit(
          fontSize: 20,
          fontWeight: FontWeight.w700,
          color: AppColors.darkText,
        ),
        iconTheme: const IconThemeData(color: AppColors.darkText),
      ),
      chipTheme: ChipThemeData(
        backgroundColor: AppColors.darkCard,
        selectedColor: AppColors.teal.withValues(alpha: 0.2),
        labelStyle: GoogleFonts.outfit(fontSize: 12),
        side: const BorderSide(color: AppColors.darkCardBorder),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: AppColors.darkCard,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.darkCardBorder),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.darkCardBorder),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.teal, width: 2),
        ),
        labelStyle: GoogleFonts.outfit(color: AppColors.darkSubtext),
        hintStyle: GoogleFonts.outfit(color: AppColors.darkSubtext),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.teal,
          foregroundColor: Colors.white,
          elevation: 0,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          textStyle: GoogleFonts.outfit(fontWeight: FontWeight.w600, fontSize: 15),
        ),
      ),
      floatingActionButtonTheme: const FloatingActionButtonThemeData(
        backgroundColor: AppColors.teal,
        foregroundColor: Colors.white,
        elevation: 4,
      ),
      dividerTheme: const DividerThemeData(
        color: AppColors.darkCardBorder,
        thickness: 1,
      ),
      bottomSheetTheme: const BottomSheetThemeData(
        backgroundColor: AppColors.darkSurface,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
        ),
      ),
      dialogTheme: DialogThemeData(
        backgroundColor: AppColors.darkSurface,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        titleTextStyle: GoogleFonts.outfit(
          fontSize: 18,
          fontWeight: FontWeight.w700,
          color: AppColors.darkText,
        ),
      ),
      progressIndicatorTheme: const ProgressIndicatorThemeData(
        color: AppColors.teal,
      ),
    );
  }

  static ThemeData light() {
    final base = ThemeData.light(useMaterial3: true);
    return base.copyWith(
      colorScheme: const ColorScheme.light(
        primary: AppColors.teal,
        primaryContainer: AppColors.tealLight,
        secondary: AppColors.tealDark,
        surface: AppColors.lightSurface,
        error: AppColors.danger,
        onPrimary: Colors.white,
        onSurface: AppColors.lightText,
      ),
      scaffoldBackgroundColor: AppColors.lightBg,
      textTheme: _textTheme(AppColors.lightText, AppColors.lightSubtext),
      cardTheme: CardThemeData(
        color: AppColors.lightCard,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: const BorderSide(color: AppColors.lightBorder, width: 1),
        ),
        margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      ),
      navigationBarTheme: NavigationBarThemeData(
        backgroundColor: AppColors.lightSurface,
        indicatorColor: AppColors.teal.withValues(alpha: 0.15),
        labelTextStyle: WidgetStateProperty.all(
          GoogleFonts.outfit(fontSize: 11, fontWeight: FontWeight.w500),
        ),
        iconTheme: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) {
            return const IconThemeData(color: AppColors.teal, size: 24);
          }
          return const IconThemeData(color: AppColors.lightSubtext, size: 24);
        }),
      ),
      appBarTheme: AppBarTheme(
        backgroundColor: AppColors.lightSurface,
        elevation: 0,
        scrolledUnderElevation: 0,
        centerTitle: false,
        titleTextStyle: GoogleFonts.outfit(
          fontSize: 20,
          fontWeight: FontWeight.w700,
          color: AppColors.lightText,
        ),
        iconTheme: const IconThemeData(color: AppColors.lightText),
      ),
      chipTheme: ChipThemeData(
        backgroundColor: AppColors.lightCard,
        selectedColor: AppColors.teal.withValues(alpha: 0.15),
        labelStyle: GoogleFonts.outfit(fontSize: 12, color: AppColors.lightText),
        side: const BorderSide(color: AppColors.lightBorder),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: AppColors.lightCard,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.lightBorder),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.lightBorder),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.teal, width: 2),
        ),
        labelStyle: GoogleFonts.outfit(color: AppColors.lightSubtext),
        hintStyle: GoogleFonts.outfit(color: AppColors.lightSubtext),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.teal,
          foregroundColor: Colors.white,
          elevation: 0,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          textStyle: GoogleFonts.outfit(fontWeight: FontWeight.w600, fontSize: 15),
        ),
      ),
      floatingActionButtonTheme: const FloatingActionButtonThemeData(
        backgroundColor: AppColors.teal,
        foregroundColor: Colors.white,
        elevation: 4,
      ),
      dividerTheme: const DividerThemeData(
        color: AppColors.lightBorder,
        thickness: 1,
      ),
      bottomSheetTheme: const BottomSheetThemeData(
        backgroundColor: AppColors.lightSurface,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
        ),
      ),
      dialogTheme: DialogThemeData(
        backgroundColor: AppColors.lightSurface,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        titleTextStyle: GoogleFonts.outfit(
          fontSize: 18,
          fontWeight: FontWeight.w700,
          color: AppColors.lightText,
        ),
      ),
      progressIndicatorTheme: const ProgressIndicatorThemeData(
        color: AppColors.teal,
      ),
    );
  }

  static TextTheme _textTheme(Color primary, Color secondary) {
    return TextTheme(
      displayLarge: GoogleFonts.outfit(fontSize: 57, fontWeight: FontWeight.w700, color: primary),
      displayMedium: GoogleFonts.outfit(fontSize: 45, fontWeight: FontWeight.w700, color: primary),
      displaySmall: GoogleFonts.outfit(fontSize: 36, fontWeight: FontWeight.w600, color: primary),
      headlineLarge: GoogleFonts.outfit(fontSize: 32, fontWeight: FontWeight.w700, color: primary),
      headlineMedium: GoogleFonts.outfit(fontSize: 28, fontWeight: FontWeight.w600, color: primary),
      headlineSmall: GoogleFonts.outfit(fontSize: 24, fontWeight: FontWeight.w600, color: primary),
      titleLarge: GoogleFonts.outfit(fontSize: 22, fontWeight: FontWeight.w600, color: primary),
      titleMedium: GoogleFonts.outfit(fontSize: 16, fontWeight: FontWeight.w600, color: primary),
      titleSmall: GoogleFonts.outfit(fontSize: 14, fontWeight: FontWeight.w500, color: primary),
      bodyLarge: GoogleFonts.outfit(fontSize: 16, fontWeight: FontWeight.w400, color: primary),
      bodyMedium: GoogleFonts.outfit(fontSize: 14, fontWeight: FontWeight.w400, color: primary),
      bodySmall: GoogleFonts.outfit(fontSize: 12, fontWeight: FontWeight.w400, color: secondary),
      labelLarge: GoogleFonts.outfit(fontSize: 14, fontWeight: FontWeight.w600, color: primary),
      labelMedium: GoogleFonts.outfit(fontSize: 12, fontWeight: FontWeight.w500, color: secondary),
      labelSmall: GoogleFonts.outfit(fontSize: 11, fontWeight: FontWeight.w400, color: secondary),
    );
  }
}
