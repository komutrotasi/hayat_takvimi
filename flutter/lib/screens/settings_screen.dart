import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

import '../models/app_state.dart';
import '../services/crypto_service.dart';
import '../theme/app_theme.dart';
import '../widgets/confirm_dialog.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  final _cityCtrl = TextEditingController();

  @override
  void initState() {
    super.initState();
    _cityCtrl.text = context.read<AppState>().city;
  }

  @override
  void dispose() {
    _cityCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Consumer<AppState>(
      builder: (context, state, _) {
        return Scaffold(
          appBar: AppBar(
            title: Text('Ayarlar', style: GoogleFonts.outfit(fontSize: 22, fontWeight: FontWeight.w700)),
          ),
          body: ListView(
            padding: const EdgeInsets.all(16),
            children: [
              // ── Görünüm ──
              _SectionHeader('Görünüm'),
              _SettingCard(
                child: Row(
                  children: [
                    Icon(
                      state.isDark ? Icons.dark_mode_rounded : Icons.light_mode_rounded,
                      color: AppColors.teal,
                    ),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Tema', style: GoogleFonts.outfit(fontWeight: FontWeight.w600, fontSize: 15)),
                          Text(
                            state.isDark ? 'Koyu tema aktif' : 'Açık tema aktif',
                            style: GoogleFonts.outfit(
                              fontSize: 12,
                              color: isDark ? AppColors.darkSubtext : AppColors.lightSubtext,
                            ),
                          ),
                        ],
                      ),
                    ),
                    Switch(
                      value: state.isDark,
                      onChanged: (_) => state.toggleTheme(),
                      activeColor: AppColors.teal,
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),
              // ── Namaz Vakitleri ──
              _SectionHeader('Namaz Vakitleri'),
              _SettingCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        const Icon(Icons.location_on_rounded, color: AppColors.teal),
                        const SizedBox(width: 14),
                        Text('Şehir', style: GoogleFonts.outfit(fontWeight: FontWeight.w600, fontSize: 15)),
                      ],
                    ),
                    const SizedBox(height: 12),
                    Row(
                      children: [
                        Expanded(
                          child: TextField(
                            controller: _cityCtrl,
                            decoration: InputDecoration(
                              hintText: 'Örn: Konya, İstanbul, Ankara',
                              hintStyle: GoogleFonts.outfit(fontSize: 13),
                              contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                            ),
                          ),
                        ),
                        const SizedBox(width: 10),
                        ElevatedButton(
                          onPressed: () {
                            state.setCity(_cityCtrl.text);
                            FocusScope.of(context).unfocus();
                            _showSnack(context, '✅ Şehir güncellendi');
                          },
                          style: ElevatedButton.styleFrom(
                            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 13),
                          ),
                          child: const Text('Kaydet'),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),
              // ── Yedekleme ──
              _SectionHeader('Yedekleme & Geri Yükleme'),
              _SettingCard(
                child: Column(
                  children: [
                    _ActionTile(
                      icon: Icons.upload_rounded,
                      label: 'Şifreli Yedek Al',
                      subtitle: 'Verilerini şifreli dosyaya aktar',
                      color: AppColors.teal,
                      onTap: () => _exportBackup(context, state),
                    ),
                    const Divider(height: 1),
                    _ActionTile(
                      icon: Icons.download_rounded,
                      label: 'Yedekten Geri Yükle',
                      subtitle: 'Şifreli yedek dosyasını içe aktar',
                      color: AppColors.info,
                      onTap: () => _importBackup(context, state),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),
              // ── Veri ──
              _SectionHeader('Veri Yönetimi'),
              _SettingCard(
                child: _ActionTile(
                  icon: Icons.delete_forever_rounded,
                  label: 'Tüm Verileri Sıfırla',
                  subtitle: 'Görevler, alışkanlıklar ve istatistikler silinir',
                  color: AppColors.danger,
                  onTap: () => _factoryReset(context, state),
                ),
              ),
              const SizedBox(height: 32),
              // Versiyon
              Center(
                child: Text(
                  'Hayat Takvimi v2.0',
                  style: GoogleFonts.outfit(
                    fontSize: 12,
                    color: isDark ? AppColors.darkSubtext : AppColors.lightSubtext,
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  Future<void> _exportBackup(BuildContext context, AppState state) async {
    final password = await _passwordDialog(context, title: 'Yedek Şifresi Belirle');
    if (password == null || password.isEmpty) return;

    try {
      final data = {
        'tasks': state.tasks.map((t) => t.toJson()).toList(),
        'habits': state.habits.map((h) => h.toJson()).toList(),
        'catTimes': state.catTimes,
      };
      final backup = await Future.value(CryptoService.exportBackup(data, password));

      if (context.mounted) {
        _showBackupResult(context, backup);
      }
    } catch (e) {
      if (context.mounted) {
        _showSnack(context, '❌ Yedekleme hatası: $e');
      }
    }
  }

  Future<void> _importBackup(BuildContext context, AppState state) async {
    final backup = await _textDialog(context, title: 'Yedek Kodunu Yapıştır', hint: 'Base64 yedek kodu...');
    if (backup == null || backup.isEmpty) return;

    final password = await _passwordDialog(context, title: 'Yedek Şifresini Gir');
    if (password == null || password.isEmpty) return;

    try {
      await CryptoService.importBackup(backup.trim(), password);
      // Verileri yükle
      await state.factoryReset();
      if (context.mounted) {
        _showSnack(context, '✅ Yedek başarıyla geri yüklendi');
      }
    } catch (e) {
      if (context.mounted) {
        _showSnack(context, '❌ Geri yükleme hatası: Hatalı şifre veya bozuk yedek');
      }
    }
  }

  Future<void> _factoryReset(BuildContext context, AppState state) async {
    final ok = await ConfirmDialog.show(
      context,
      title: 'Tüm Verileri Sıfırla',
      message: 'Tüm görevler, alışkanlıklar ve istatistikler kalıcı olarak silinecek. Bu işlem geri alınamaz!',
      confirmLabel: 'Sıfırla',
      isDestructive: true,
    );
    if (ok) {
      await state.factoryReset();
      if (context.mounted) {
        _showSnack(context, '✅ Tüm veriler sıfırlandı');
      }
    }
  }

  Future<String?> _passwordDialog(BuildContext context, {required String title}) {
    final ctrl = TextEditingController();
    return showDialog<String>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(title),
        content: TextField(
          controller: ctrl,
          obscureText: true,
          decoration: const InputDecoration(
            labelText: 'Şifre',
            prefixIcon: Icon(Icons.lock_rounded),
          ),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx), child: const Text('Vazgeç')),
          ElevatedButton(
            onPressed: () => Navigator.pop(ctx, ctrl.text),
            child: const Text('Devam'),
          ),
        ],
      ),
    );
  }

  Future<String?> _textDialog(BuildContext context, {required String title, required String hint}) {
    final ctrl = TextEditingController();
    return showDialog<String>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(title),
        content: TextField(
          controller: ctrl,
          maxLines: 4,
          decoration: InputDecoration(
            hintText: hint,
            border: const OutlineInputBorder(),
          ),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx), child: const Text('Vazgeç')),
          ElevatedButton(
            onPressed: () => Navigator.pop(ctx, ctrl.text),
            child: const Text('Devam'),
          ),
        ],
      ),
    );
  }

  void _showBackupResult(BuildContext context, String backup) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Yedek Oluşturuldu'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text('Bu kodu güvenli bir yere kaydedin:'),
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: AppColors.darkCard,
                borderRadius: BorderRadius.circular(8),
              ),
              child: SelectableText(
                backup,
                style: GoogleFonts.jetBrainsMono(fontSize: 10),
              ),
            ),
          ],
        ),
        actions: [
          ElevatedButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Tamam'),
          ),
        ],
      ),
    );
  }

  void _showSnack(BuildContext context, String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message, style: GoogleFonts.outfit()),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      ),
    );
  }
}

// ── Section Header ────────────────────────────────────────────────────────────

class _SectionHeader extends StatelessWidget {
  const _SectionHeader(this.title);
  final String title;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Text(
        title.toUpperCase(),
        style: GoogleFonts.outfit(
          fontSize: 11,
          fontWeight: FontWeight.w700,
          letterSpacing: 1.5,
          color: AppColors.teal,
        ),
      ),
    );
  }
}

// ── Setting Card ──────────────────────────────────────────────────────────────

class _SettingCard extends StatelessWidget {
  const _SettingCard({required this.child});
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkCard : AppColors.lightCard,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: isDark ? AppColors.darkCardBorder : AppColors.lightBorder),
      ),
      child: child,
    );
  }
}

// ── Action Tile ───────────────────────────────────────────────────────────────

class _ActionTile extends StatelessWidget {
  const _ActionTile({
    required this.icon,
    required this.label,
    required this.subtitle,
    required this.color,
    required this.onTap,
  });
  final IconData icon;
  final String label;
  final String subtitle;
  final Color color;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      contentPadding: EdgeInsets.zero,
      leading: Container(
        width: 44,
        height: 44,
        decoration: BoxDecoration(
          color: color.withOpacity(0.15),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Icon(icon, color: color, size: 22),
      ),
      title: Text(label, style: GoogleFonts.outfit(fontWeight: FontWeight.w600, fontSize: 14)),
      subtitle: Text(subtitle, style: GoogleFonts.outfit(fontSize: 12)),
      trailing: Icon(Icons.chevron_right_rounded, color: AppColors.darkSubtext),
      onTap: onTap,
    );
  }
}
