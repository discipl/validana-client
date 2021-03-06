/**
 * @license
 * Copyright Coinversable B.V. All Rights Reserved.
 *
 * Use of this source code is governed by a AGPLv3-style license that can be
 * found in the LICENSE file at https://validana.io/license
 */
/// <reference types="node" />
import { ECPair } from "bitcoinjs-lib";
/** A public key. We use and accept compressed keys only. */
export declare class PublicKey {
    protected readonly key: ECPair;
    private address;
    /** Create a new public key from a buffer. Will throw an error if the buffer is not a valid public key. */
    constructor(publicKey: Buffer | ECPair);
    /** Check if a public key is valid or not. We accept only compressed public keys. */
    getPublicKey(): Buffer;
    /** Check if a public key is valid or not. We accept only compressed public keys. */
    static isValidPublic(publicKey: Buffer): boolean;
    /** Check if an address is valid or not. Only prefix 0 is accepted. */
    static isValidAddress(address: string): boolean;
    /** Get the address of this public key. We use the address of the compressed key with prefix 0. */
    getAddress(): string;
    /** Verify a message and its signature against a public key. Will throw an error if any of the input values is not valid. */
    static verify(publicKey: Buffer, hash: Buffer, signature: Buffer): boolean;
}
/**
 * A private key.
 * Technical info: Only the secp256k1 curve is supported, We use compressed
 * wif prefix 0x80 (same as bitcoin) by default, but accept all others.
 */
export declare class PrivateKey extends PublicKey {
    private constructor();
    /** Generate a new random private key. An error will be thrown if no suitable random source is available. */
    static generate(): PrivateKey;
    /** Check if a WIF is valid or not. Only compressed wifs with prefix 0x80 are accepted. */
    static isValidWIF(wif: string): boolean;
    /**
     * Get the wif of this private key.
     * By default it will use the same format it was imported in.
     * If it was generated by generate() this will be compressed with network prefix 0x80
     */
    toWIF(): string;
    /** Turn a WIF into a private key. Throws an error if wif is not a valid private key. */
    static fromWIF(wif: string): PrivateKey;
    /** Sign data with this private key. Returns the signature as 32 bytes r followed by 32 bytes s. */
    sign(data: Buffer): Buffer;
}
