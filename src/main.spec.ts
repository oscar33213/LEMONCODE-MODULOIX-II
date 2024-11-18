import { validarClave } from "./main";

const commonPasswords: string[] = [
  "password", "123456", "qwerty", "admin", "letmein", "welcome",
  "monkey", "sunshine", "password1", "123456789", "football", "iloveyou",
  "1234567", "123123", "12345678", "abc123", "qwerty123", "1q2w3e4r",
  "baseball", "password123", "superman", "987654321", "mypass", "trustno1",
  "hello123", "dragon", "1234", "555555", "loveme", "hello", "hockey",
  "letmein123", "welcome123", "mustang", "shadow", "12345", "passw0rd",
  "abcdef", "123abc", "football123", "master", "jordan23", "access",
  "flower", "qwertyuiop", "admin123", "iloveyou123", "welcome1",
  "monkey123", "sunshine1", "password12", "1234567890"
];

describe("Validación de claves", () => {
  it("Debe ser válida una clave que cumple todos los requisitos", () => {
    const resultado = validarClave("usuario123", "ClaveSegura123@", commonPasswords);
    expect(resultado).toEqual({ esValida: true });
  });

  it("Debe fallar si no tiene mayúsculas y minúsculas", () => {
    const resultado = validarClave("usuario123", "clave123@", commonPasswords);
    expect(resultado).toEqual({ esValida: false, error: "La clave debe de tener mayúsculas y minúsculas" });
  });

  it("Debe fallar si no tiene números", () => {
    const resultado = validarClave("usuario123", "ClaveSegura@", commonPasswords);
    expect(resultado).toEqual({ esValida: false, error: "La clave debe de tener números" });
  });

  it("Debe fallar si no tiene caracteres especiales", () => {
    const resultado = validarClave("usuario123", "ClaveSegura123", commonPasswords);
    expect(resultado).toEqual({ esValida: false, error: "La clave debe de tener caracteres especiales" });
  });

  it("Debe fallar si no tiene longitud mínima", () => {
    const resultado = validarClave("usuario123", "C123@", commonPasswords);
    expect(resultado).toEqual({ esValida: false, error: "La clave debe de tener una longitud mínima de 8 caracteres" });
  });

  it("Debe fallar si contiene el nombre del usuario", () => {
    const resultado = validarClave("usuario123", "ClaveSeguraUsuario123@", commonPasswords);
    expect(resultado).toEqual({ esValida: false, error: "La clave no debe tener el nombre del usuario" });
  });

  it("Debe fallar si contiene palabras comunes", () => {
    const resultado = validarClave("usuario123", "password123@", commonPasswords);
    expect(resultado).toEqual({ esValida: false, error: "La clave no debe de contener palabras comunes" });
  });
});
