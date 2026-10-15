'use strict';

/**
 * DIEZY LIBSIGNAL NODE
 * Open Whisper Systems' libsignal protocol for Node.js
 * Clean, safe, high-performance cryptography for WhatsApp & Baileys multi-device.
 *
 * Reference Architecture:
 * - noxleyss (@noxzaid/libsignal-node): Solid, minimal, standards-compliant Whisper Systems engine
 * - rexxhayanasi (@rexxhayanasi/elaina-libsignal): Resilient session pruning & queue executor
 * - alipclutch (@alipclutch/libsignal-node): Full Baileys API compatibility & method signatures
 *
 * Author: diezy clutch
 * Telegram: t.me/seannanvy
 * Instagram: rnzdzy_
 *
 * 100% npm Security & Policy Compliant (No filesystem tampering, no postinstall hooks).
 */

exports.crypto = require('./src/crypto');
exports.curve = require('./src/curve');
exports.keyhelper = require('./src/keyhelper');
exports.ProtocolAddress = require('./src/protocol_address');
exports.SessionBuilder = require('./src/session_builder');
exports.SessionCipher = require('./src/session_cipher');
exports.SessionRecord = require('./src/session_record');
Object.assign(exports, require('./src/errors'));

// Safe, clean compatibility stubs for legacy scripts (pure no-op)
exports.installNewsletterPatch = function () {
    return true;
};

exports.restoreNewsletterOriginal = function () {
    return true;
};
