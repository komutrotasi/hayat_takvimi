import 'dart:convert';
import 'dart:math';
import 'dart:typed_data';

import 'package:encrypt/encrypt.dart' as enc;
import 'package:pointycastle/export.dart';

/// AES-256-GCM şifreleme servisi
/// Web sürümüyle uyumlu format: base64(salt[32] + iv[12] + ciphertext)
class CryptoService {
  static const int _saltLen = 32;
  static const int _ivLen = 12;
  static const int _iterations = 100000;
  static const int _keyLen = 32; // 256 bit

  // ── Key Derivation ─────────────────────────────────────────────────────────

  static Uint8List _deriveKey(String password, Uint8List salt) {
    final pbkdf2 = PBKDF2KeyDerivator(HMac(SHA256Digest(), 64));
    pbkdf2.init(Pbkdf2Parameters(salt, _iterations, _keyLen));
    final passBytes = Uint8List.fromList(utf8.encode(password));
    return pbkdf2.process(passBytes);
  }

  // ── Random Bytes ───────────────────────────────────────────────────────────

  static Uint8List _randomBytes(int length) {
    final rng = Random.secure();
    return Uint8List.fromList(
        List<int>.generate(length, (_) => rng.nextInt(256)));
  }

  // ── Encrypt ────────────────────────────────────────────────────────────────

  /// Encrypts [plaintext] with [password].
  /// Returns base64-encoded string: salt(32) + iv(12) + ciphertext
  static String encrypt(String plaintext, String password) {
    final salt = _randomBytes(_saltLen);
    final iv = _randomBytes(_ivLen);
    final keyBytes = _deriveKey(password, salt);

    final key = enc.Key(keyBytes);
    final ivObj = enc.IV(iv);
    final encrypter = enc.Encrypter(enc.AES(key, mode: enc.AESMode.gcm));

    final encrypted = encrypter.encrypt(plaintext, iv: ivObj);

    // Combine: salt + iv + ciphertext
    final combined = Uint8List(_saltLen + _ivLen + encrypted.bytes.length);
    combined.setRange(0, _saltLen, salt);
    combined.setRange(_saltLen, _saltLen + _ivLen, iv);
    combined.setRange(
        _saltLen + _ivLen, combined.length, encrypted.bytes);

    return base64.encode(combined);
  }

  // ── Decrypt ────────────────────────────────────────────────────────────────

  /// Decrypts [base64Data] with [password].
  /// Returns decrypted string or throws on failure.
  static String decrypt(String base64Data, String password) {
    final combined = base64.decode(base64Data);
    if (combined.length < _saltLen + _ivLen + 1) {
      throw const FormatException('Geçersiz yedek verisi');
    }

    final salt = Uint8List.fromList(combined.sublist(0, _saltLen));
    final iv = Uint8List.fromList(
        combined.sublist(_saltLen, _saltLen + _ivLen));
    final cipherBytes =
        Uint8List.fromList(combined.sublist(_saltLen + _ivLen));

    final keyBytes = _deriveKey(password, salt);
    final key = enc.Key(keyBytes);
    final ivObj = enc.IV(iv);
    final encrypter = enc.Encrypter(enc.AES(key, mode: enc.AESMode.gcm));

    final encrypted = enc.Encrypted(cipherBytes);
    return encrypter.decrypt(encrypted, iv: ivObj);
  }

  // ── Backup / Restore ───────────────────────────────────────────────────────

  /// Serialize [data] to JSON and encrypt with [password].
  static String exportBackup(Map<String, dynamic> data, String password) {
    final json = jsonEncode(data);
    return encrypt(json, password);
  }

  /// Decrypt [base64Data] with [password] and parse JSON.
  static Map<String, dynamic> importBackup(
      String base64Data, String password) {
    final json = decrypt(base64Data, password);
    return jsonDecode(json) as Map<String, dynamic>;
  }
}
