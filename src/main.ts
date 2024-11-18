import "./style.css";

export interface ValidacionClave {
    esValida: boolean;
    error?: string;
  }
  
  export const tieneMayusculasYMinusculas = (clave: string): ValidacionClave => {
    if (!/[a-z]/.test(clave) || !/[A-Z]/.test(clave)) {
      return { esValida: false, error: "La clave debe de tener mayúsculas y minúsculas" };
    }
    return { esValida: true };
  };
  
  export const tieneNumeros = (clave: string): ValidacionClave => {
    if (!/[0-9]/.test(clave)) {
      return { esValida: false, error: "La clave debe de tener números" };
    }
    return { esValida: true };
  };
  
  export const tieneCaracteresEspeciales = (clave: string): ValidacionClave => {
    if (!/[!@#$%^&*(),.?":{}|<>_\-+=]/.test(clave)) {
      return { esValida: false, error: "La clave debe de tener caracteres especiales" };
    }
    return { esValida: true };
  };
  
  export const tieneLongitudMinima = (clave: string): ValidacionClave => {
    if (clave.length < 8) {
      return { esValida: false, error: "La clave debe de tener una longitud mínima de 8 caracteres" };
    }
    return { esValida: true };
  };
  
  export const tieneNombreUsuario = (nombreUsuario: string, clave: string): ValidacionClave => {
    if (clave.toLowerCase().includes(nombreUsuario.toLowerCase())) {
      return { esValida: false, error: "La clave no debe tener el nombre del usuario" };
    }
    return { esValida: true };
  };
  
  export const tienePalabrasComunes = (clave: string, commonPasswords: string[]): ValidacionClave => {
    const claveNormalizada = clave.toLowerCase();
    if (commonPasswords.some(pwd => claveNormalizada.includes(pwd.toLowerCase()))) {
      return { esValida: false, error: "La clave no debe de contener palabras comunes" };
    }
    return { esValida: true };
  };
  
  export const validarClave = (
    nombreUsuario: string,
    clave: string,
    commonPasswords: string[]
  ): ValidacionClave => {
    const validaciones = [
      tieneMayusculasYMinusculas(clave),
      tieneNumeros(clave),
      tieneCaracteresEspeciales(clave),
      tieneLongitudMinima(clave),
      tieneNombreUsuario(nombreUsuario, clave),
      tienePalabrasComunes(clave, commonPasswords)
    ];
  
    for (const validacion of validaciones) {
      if (!validacion.esValida) {
        return validacion;
      }
    }
  
    return { esValida: true };
  };
  
