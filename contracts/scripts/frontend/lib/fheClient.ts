import { EncryptInputs } from "./types";

/**
 * Mock encryption for testing without full FHE setup
 * In production, this would use fhevmjs to encrypt data
 */
export async function encryptStudentInputs(inputs: EncryptInputs) {
  // Mock encrypted data - just convert to bytes
  // In real FHE, this would use fhevmjs.encrypt8/encrypt16
  
  const encAge = new Uint8Array([inputs.age]);
  const encRegion = new Uint8Array([inputs.regionCode]);
  const encIncome = new Uint8Array([inputs.incomeBracket]);
  const encScore = new Uint8Array([
    inputs.examScore >> 8,
    inputs.examScore & 0xff
  ]);

  return { 
    encAge: "0x" + Array.from(encAge).map(b => b.toString(16).padStart(2, '0')).join(''),
    encRegion: "0x" + Array.from(encRegion).map(b => b.toString(16).padStart(2, '0')).join(''),
    encIncome: "0x" + Array.from(encIncome).map(b => b.toString(16).padStart(2, '0')).join(''),
    encScore: "0x" + Array.from(encScore).map(b => b.toString(16).padStart(2, '0')).join('')
  };
}
