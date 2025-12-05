export interface EncryptedEligibilityResponse {
  eligible: boolean;
}

export interface EncryptInputs {
  age: number;
  regionCode: number;
  incomeBracket: number;
  examScore: number;
}
